import numeral from "numeral";
import React from "react";
import { Circle, Popup } from "react-leaflet";

//Creating a dictionary for showing cases,recovered and deaths in different color
const casesTypeColors = {
  cases: {
    hex: "#220AF8",
    multiplier: 100,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 200,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 300,
  },
};

export const sortData = (data) => {
  const sortedData = [...data];

  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};
export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

//draw circles on the map with interactive tooltop
export const showDataOnMap = (data, casesType) =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypeColors[casesType].hex}
      fillColor="{casesTypeColors[casesType].hex}"
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
