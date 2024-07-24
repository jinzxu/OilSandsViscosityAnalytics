// src/components/ForecastPage.js
import React, { useEffect, useState } from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { create, all } from "mathjs";
import styled from "styled-components";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const math = create(all);

const ForecastPage = ({ inputData, fittedData, regressionParams }) => {
  const [data, setData] = useState(null);
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    if (regressionParams) {
      const { a, b } = regressionParams;
      const temperatures = [];
      const viscosities = [];
      for (let temp = 0; temp <= 350; temp += 10) {
        temperatures.push(temp);
        viscosities.push(math.pow(10, a * temp + b));
      }

      const forecast = temperatures.map((temp, i) => ({
        x: temp,
        y: viscosities[i],
      }));
      setForecastData(forecast);

      setData({
        datasets: [
          {
            label: "Viscosity vs Temperature",
            data: inputData,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            pointRadius: 5,
          },
          {
            label: "Fitted Line",
            data: fittedData,
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 2,
            showLine: true,
            fill: false,
          },
          {
            label: "Forecasted Viscosity vs Temperature",
            data: forecast,
            backgroundColor: "rgba(255, 0, 0, 0.6)", // Red color for forecast points
            pointRadius: 5,
          },
        ],
      });
    }
  }, [inputData, fittedData, regressionParams]);

  const downloadForecast = () => {
    const blob = new Blob(
      [forecastData.map(({ x, y }) => `${x}\t${y}`).join("\n")],
      { type: "text/plain" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "forecast.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Container>
      {data && (
        <ChartContainer>
          <Scatter
            data={data}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: { title: { display: true, text: "Temperature (°C)" } },
                y: {
                  type: "logarithmic", // Set y-axis to logarithmic scale
                  title: { display: true, text: "Viscosity (cp)" },
                },
              },
            }}
          />
          <DownloadButton onClick={downloadForecast}>
            Download Forecast Data
          </DownloadButton>
        </ChartContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  width: 100%;
  text-align: center;
`;

const ChartContainer = styled.div`
  height: 70vh;
  width: 80vw;
  margin: 0 auto;
`;

const DownloadButton = styled.button`
  margin-top: 20px;
  padding: 10px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

export default ForecastPage;
