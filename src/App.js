import React, { useState, useEffect } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import "./App.css";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { sortData } from "./util";
import LineGraph from "./LineGraph";
import Demo from "./DemoChart";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldWide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  // const [casesType, setCasesType] = useState("cases");
  //https://disease.sh/v3/covid-19/countries

  //Useeffect= runs a piece of code based on given condiont
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);
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
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []); //[] this is the condition fire at once if variable is not define.
  // if there is variable, it fire when variable changes

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    //https://disease.sh/v3/covid-19/all
    // https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]`
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
      });
  };
  return (
    <div className="app">
      <div className="app_left">
        {/*Header*/}
        {/*input dropdown field*/}
        <div className="app_header">
          <h1> COVID 19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
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
        <div className="app_stats">
          {/*InfoBoxs title="coronavirus cases" */}
          <InfoBox
            title="coronavirus cases"
            total={countryInfo.cases}
            cases={countryInfo.todayCases}
          />
          {/*InfoBoxs title="coronavirus recovery" */}
          <InfoBox
            title="Recovered"
            total={countryInfo.recovered}
            cases={countryInfo.todayRecovered}
          />
          {/*InfoBoxs title="coronavirus dead" */}
          <InfoBox
            title="Deaths"
            total={countryInfo.deaths}
            cases={countryInfo.todayDeaths}
          />
        </div>
        <Map />
      </div>
      <Card className="app_right">
        <CardContent>
          <div className="app_information">
            {/*Table*/}
            <h3>Live Cases by Coutry</h3>
            <Table countries={tableData} />
            <h3>Worldwide new cases in chart</h3>
            {/*Graph*/}
            <LineGraph />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
