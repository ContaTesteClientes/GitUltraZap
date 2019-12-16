'use strict'

class Paginate {
  get rules () {
    return {
      per_page: 'range:0,16',
    }
  }
}

module.exports = Paginate