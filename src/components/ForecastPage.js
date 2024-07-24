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
import { saveAs } from "file-saver";
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

const ForecastPage = ({ inputData, fittedData, regressionParams }) => {
  const [data, setData] = useState(null);
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    if (inputData.length > 0 && regressionParams) {
      const forecastTemps = [];
      const forecastViscosities = [];

      for (let temp = 0; temp <= 350; temp += 10) {
        const viscosity = Math.pow(
          10,
          regressionParams.a * temp + regressionParams.b
        );
        forecastTemps.push(temp);
        forecastViscosities.push(viscosity);
      }

      const forecastPoints = forecastTemps.map((temp, i) => ({
        x: temp,
        y: forecastViscosities[i],
      }));
      setForecastData(forecastPoints);

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
            label: "Forecast Data",
            data: forecastPoints,
            backgroundColor: "rgba(255, 0, 0, 0.6)",
            pointRadius: 5,
          },
        ],
      });
    }
  }, [inputData, fittedData, regressionParams]);

  const handleDownload = () => {
    let csvContent =
      "data:text/csv;charset=utf-8,Temperature (°C),Viscosity (cp)\n";
    forecastData.forEach((point) => {
      csvContent += `${point.x},${point.y}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    saveAs(encodedUri, "forecast.txt");
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
          <Button onClick={handleDownload}>Download Forecast Data</Button>
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

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

export default ForecastPage;
