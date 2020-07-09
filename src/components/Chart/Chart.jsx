import React, { useState, useEffect } from "react";
import { Line, Bar } from 'react-chartjs-2';
import Styles from "./Chart.module.css";


const Chart = (props) => {
  const { confirmed, deaths, recovered, lastUpdate, country ,dailyData } = props;
  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({date}) => date ),
        datasets: [{
          data: dailyData.map(({ confirmed }) => confirmed ),
          label: 'Confirmed',
          borderColor: "#3333ff",
          fill: true,
        },
         {
           data: dailyData.map(( {deaths} ) => deaths),
           label: "Deaths",
           borderColor: "red",
           backgroundColor: "rgb(255, 0, 0, 0.5)",
           fill: true

         }],
      }}
    />
  ) : null;

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Confirmed", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
            ],
            data: [confirmed.value, recovered.value, deaths.value]
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current Situation In ${country}` },
      }}
    />
  ) : null;

  return <div className={Styles.container }>
  {country ? barChart : lineChart}
  </div>;

};

export default Chart;
