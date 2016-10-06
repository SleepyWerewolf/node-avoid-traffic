const GoogleMaps = require('@google/maps');
const Promise = require('bluebird');

module.exports = class AvoidTraffic {
  constructor(apiKey) {
    this.googleMapsClient = GoogleMaps.createClient({
      key: apiKey,
      Promise: Promise,
    });
  }

  getDistanceMatrix(mapConfigurations) {
    return this.googleMapsClient.distanceMatrix(mapConfigurations).asPromise();
  }

  getData(mapConfigurations) {
    return this.getDistanceMatrix(mapConfigurations)
      .then(response => {
        const { distance, duration } = response.json.rows[0].elements[0];

        return {
          distance,
          duration,
        };
      })
      .catch(error => {
        console.error('Error processing data: ' + error);
        throw error;
      });
  }
}
