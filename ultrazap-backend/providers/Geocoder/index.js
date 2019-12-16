'use strict'

var NodeGeocoder = require('node-geocoder');
const Env = use('Env')

let options = {
    provider: 'google',
   
    // Optional depending on the providers
    httpAdapter: 'https', // Default
    apiKey: Env.get('GOOGLE_GEOCODER_APIKEY'), // for Mapquest, OpenCage, Google Premier
    formatter: null         // 'gpx', 'string', ...
  };

class Geocoder {
  constructor () {
    this._geocoder = NodeGeocoder(options);
  }

  async geocode(address) {
    try {
        let response = await this._geocoder.geocode(address)

        return response
    } catch (error) {
        throw error
    }
  }
}

module.exports = Geocoder