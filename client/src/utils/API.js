// connect api endpoints here

import axios from "axios";

export default {
  scrape: function() {
    return axios.get('/scrape');
  }
}