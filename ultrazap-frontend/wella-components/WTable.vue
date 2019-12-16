<template>
  <q-table
    class="full-width w-table"
    :data="data"
    :columns="columnsInside"
    :dense="$q.screen.lt.lg"
    no-data-label="Não encontrei nada"
    :loading="loading"
    :filter="filter"
    row-key="id"
    :pagination="paginate"
    @pagination="$emit('request', $event)"
    @request="$emit('request', $event)"
    :grid="$q.screen.lt.md"
    :rows-per-page-options="[5, 10, 30]"
    v-bind="$attrs"
  >
      <template v-slot:top="props">
        <div class="col">
          <new-button
            :to="newButtonTo"
          />

          <search-input
            :value="filter"
            @input="$emit('filter', $event)"
            v-if="typeof filter === 'string'"
          />
        </div>

        <div
          class="q-ml-md gt-xs"
        >
          <q-checkbox
            color="secondary"
            v-model="advancedInformation"
            @input="checkColumns"
            label="Mais informações"
            v-if="!hideMoreInfo"
          />

          <q-btn
            flat round dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
          />
        </div>
      </template>

      <template v-slot:item="props">
        <div
          class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
          :style="props.selected ? 'transform: scale(0.95);' : ''"
        >
          <q-card :class="props.selected ? 'bg-grey-2' : ''">
            <q-list dense>
              <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name">
                <q-item-section>
                  <q-item-label>{{ col.label }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-item-label caption>
                    <slot
                      :name="`body-cell-${col.name}`"
                      v-bind="props"
                      v-if="Object.keys($scopedSlots).includes(`body-cell-${col.name}`) && col.name != 'actions'"
                    />

                    <span
                      v-else-if="col.name !== 'actions'"
                    >
                    {{ col.value }}
                    </span>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>

            <q-separator />

            <q-card-section>
              <slot name="body-cell-actions" v-bind="props" />
            </q-card-section>
          </q-card>
        </div>
      </template>

      <template
        v-for="(slot, index) in Object.keys($scopedSlots)"
        :slot="slot"
        slot-scope="scope"
      >
        <q-td :key="`slot_scoped_${index}`">
          <slot
            :name="slot"
            v-bind="scope"
          />
        </q-td>
      </template>
    </q-table>
</template>
<script>
import {
  QTable,
  QTd,
  QCard,
  QCheckbox,
  QSeparator,
  QCardSection
} from 'quasar'
import newButton from './NewButton'
import searchInput from './SearchInput'
// Wrapper of QTable for index views
// @group widgets
export default {
  name: 'w-table',
  components: {
    QTable,
    QTd,
    QCard,
    newButton,
    searchInput,
    QCheckbox,
    QSeparator,
    QCardSection
  },
  props: {
    // vue-router's route for `new-button`
    newButtonTo: [Object, String],
    loading: Boolean,
    hideMoreInfo: Boolean,
    // JS Collection to show
    data: Array,
    // Columns to show the data
    columns: Array,
    // Paginate object to show data
    paginate: Object,
    // To filter the data
    filter: String
  },
  data () {
    return {
      advancedInformation: false,
      columnsInside: null
    }
  },
  created () {
    this.checkColumns()
  },
  methods: {
    // @vuese
    // Confirm if it should show the advanced columns
    checkColumns () {
      let columns = JSON.parse(JSON.stringify(this.columns))
      if (this.advancedInformation) {
        columns.push({ name: 'created', align: 'left', label: 'Criado em/por', field: 'created' })
        columns.push({ name: 'updated', align: 'left', label: 'Atualizado em/por', field: 'updated' })
      }
      this.columnsInside = columns
    }
  }
}
</script>

<style>
@media screen and (min-width: 1024px) {
  .w-table.fullscreen .q-table__middle{
    height: calc(100vh - 114px)
  }
  .w-table .q-table__middle{
    height: calc(100vh - 164px)
  }
}
.w-table > .row:not(.q-table__top):not(.q-table__bottom) {
  background-color: #fafafa;
  overflow: auto;
  height: calc(100vh - 164px)
}
.w-table.fullscreen > .row:not(.q-table__top):not(.q-table__bottom){
  height: calc(100vh - 114px);
  background-color: #fafafa;
  overflow: auto;
}
.w-table .q-table__top,
.w-table .q-table__bottom,
.w-table  thead tr:first-child th {
  background-color: white
}
.w-table  thead tr:first-child th{
  position: sticky;
  top: 0;
  opacity: 1;
  z-index: 1;
}
.w-table .q-toolbar{
  position: fixed;
  top: 50px;
  z-index: 1;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.41), 0 0px 10px rgba(0,0,0,0.24)
}
.w-table .q-table__separator.col {
  display: none
}
</style>
