const GoogleMaps = require('@google/maps');
const Promise = require('bluebird');

module.exports = class AvoidTraffic {
  constructor(apiKey) {
    this.googleMapsClient = GoogleMaps.createClient({
      key: apiKey,
    });
  }

  getDistanceMatrix(mapConfigurations) {
    return new Promise((resolve, reject) => {
      this.googleMapsClient.distanceMatrix(mapConfigurations, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  getData(mapConfigurations) {
    return this.getDistanceMatrix(mapConfigurations)
      .then(response => {
        const { distance, duration } = response.json.rows[0].elements[0];

        return {
          distance: distance.text,
          duration: duration.text,
        };
      })
      .catch(error => {
        console.error('Error processing data: ' + error);
      });
  }
}
