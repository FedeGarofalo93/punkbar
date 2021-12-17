import axios from 'axios';

/**
 * Class beer.service
 * @author Federico Garofalo <federico.garofalo@checkbox.ar>
 */
const baseUrl = 'https://api.punkapi.com/v2';
let response = [];

const getBeers = async () => {
  await axios
    .get(`${baseUrl}/beers`)
    .then(res => {
      response = res.data;
    })
    .catch(err => {
      debugger;
    });
  return response;
};

export default {
  getBeers
};
