import React, { useState } from "react";
import Chart from "react-google-charts";

function LineChart({ historicalData }) {
  const [data, setData] = useState([["Data", "Prices"]]);
  useState(
    function () {
      let dataCopy = [["Data", "Prices"]];
      if (historicalData?.prices) {
        console.log(historicalData.prices.pop());
        historicalData.prices.map((item) => {
          dataCopy.push([
            `${
              new Date(item[0]).toLocaleString().slice(0, -17).split("/")[1]
            } / ${
              new Date(item[0]).toLocaleString().slice(0, -17).split("/")[0]
            }`,
            item[1],
          ]);
        });

        setData(dataCopy);
      }
    },
    [historicalData]
  );
  return (
    <Chart
      chartType="LineChart"
      data={data}
      height="100%"
      legendToggle
      style={{ borderRadius: "5rem" }}
      options={{ colors: ["#f7d71e"] }}
    />
  );
}

export default LineChart;
