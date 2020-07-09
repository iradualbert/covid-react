import React, { useEffect, useState } from "react";
import "./App.css";

// import Cards from "./components/Cards/Cards";
// import CountryPicker from "./components/CountryPicker/CountryPicker";
// import Chart from "./components/CountryPicker/CountryPicker";

import { Cards, CountryPicker, Chart } from "./components";
import Styles from "./App.module.css";
import { fetchData, getCountries, fetchDailyData } from "./api/index";

function App() {
  const [confirmed, setConfirmed] = useState({});
  const [deaths, setDeaths] = useState({});
  const [recovered, setRecovered] = useState({});
  const [lastUpdate, setLastUpdate] = useState("");
  const [dailyData, setDailyData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");

  useEffect(() => {
    async function getData() {
      const cases = await fetchData(country);
      setConfirmed(() => cases.confirmed);
      setRecovered(() => cases.recovered);
      setDeaths(() => cases.deaths);
      setLastUpdate(() => cases.lastUpdate);
      
    }
    getData();
    
  }, [country]);


  useEffect(() => {
    async function updateCountries(){
      const fetchedCountries = await getCountries()
      setCountries( () => fetchedCountries);
    }
    const getDailyData = async () => {
      setDailyData(await fetchDailyData());
    };
    getDailyData();
    updateCountries()
  }, [])


  async function handleCountrySelector(selectedCountry) {
    if ( selectedCountry !== "global"){
      await setCountry(() => selectedCountry)
    }
    else{
      setCountry(() => "" )
    }
  }

  return (
    <div className={Styles.container}>
      <Cards
        confirmed={confirmed}
        deaths={deaths}
        recovered={recovered}
        lastUpdate={lastUpdate}
      />
      <CountryPicker
        countries={countries}
        handleCountrySelector={handleCountrySelector}
      />
      <Chart
        dailyData={dailyData}
        country={country}
        confirmed={confirmed}
        deaths={deaths}
        recovered={recovered}
        lastUpdate={lastUpdate}
      />
    </div>
  );
}

export default App;
