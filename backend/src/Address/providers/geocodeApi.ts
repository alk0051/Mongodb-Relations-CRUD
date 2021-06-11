import axios from 'axios';


async function getLatLong(logradouro: string) {

  let latitude: number = 0, longitude: number = 0;

  await axios.get('https://maps.googleapis.com/maps/api/geocode/json?', {
      params: {
        address: logradouro,
        key: 'AIzaSyBzobKl6as9rBXTO9hHh3xxS5BnIFone4Q'
      }
    })
    .then((response) => {
        latitude = response.data.results[0].geometry.location.lat;
        longitude = response.data.results[0].geometry.location.lng;
    })
    .catch((err) => {
      console.error(err);
    }
  );

  return [latitude, longitude];
}

export default getLatLong;