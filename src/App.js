import React, { useState, useEffect } from "react";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldWide");
  //https://disease.sh/v3/covid-19/countries

  //Useeffect= runs a piece of code based on given condiont
  useEffect(() => {
    //The code inside here will run once when the component loads & not again
    //async-> send request, wait for it, do something
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []); //[] this is the condition fire at once if variable is not define.
  // if there is variable, it fire when variable changes

  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  };
  return (
    <div className="App">
      <div className="app_header">
        <h1> COVID 19 Tracker</h1>

        <FormControl className="app__dropdown">
          <Select variant="outlined" onChange={onCountryChange} value={country}>
            <MenuItem value="worldwide">worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
            {/*Loop through all the countries and show a drop down list of the options*/}
            {/* <MenuItem value="worldwide">option 1</MenuItem>
            <MenuItem value="worldwide">option 2</MenuItem> */}
          </Select>
        </FormControl>
      </div>
      {/*Header*/}
      {/*input dropdown field*/}

      {/*InfoBoxs*/}
      {/*InfoBoxs*/}
      {/*InfoBoxs*/}

      {/*Table*/}
      {/*Map*/}
    </div>
  );
}

export default App;
