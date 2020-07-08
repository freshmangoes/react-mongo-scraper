import React, {useState, useEffect} from 'react'
import '../../utils/api';
import api from '../../utils/api';

const Scraper = () => {
  const [state, setState] = {};

  // useEffect( () => {}); 

  const testScraper = async () => {
    try {
      const data = await api.scrape();
      console.log('Scrape.js Data::', data);
    } catch (err) {
      console.log('error in Scraper.js');
      console.log(error);
    }
  }

  return (
    <div>
      
    </div>
  )
}

export default Scraper
