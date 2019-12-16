const { ServiceProvider } = require('@adonisjs/fold')

class GeocoderProvider extends ServiceProvider {
  register () {
    this.app.singleton('Geocoder', () => {
      return new (require('.'))()
    })
  }
}

module.exports = GeocoderProvider