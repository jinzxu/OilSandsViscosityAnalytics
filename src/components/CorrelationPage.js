// src/components/CorrelationPage.js
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

const linearRegression = (x, y) => {
  const n = x.length;
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
  const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);

  const a = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const b = (sumY - a * sumX) / n;

  return { a, b };
};

const CorrelationPage = ({ inputData, onRegressionParams, onFittedData }) => {
  const [data, setData] = useState(null);
  const [formula, setFormula] = useState("");

  useEffect(() => {
    if (inputData.length > 0) {
      const temperatures = inputData.map((point) => point.x);
      const viscosities = inputData.map((point) => math.log10(point.y));

      // Perform linear regression
      const { a, b } = linearRegression(temperatures, viscosities);
      onRegressionParams({ a, b });

      const fittedViscosities = temperatures.map((temp) =>
        math.pow(10, a * temp + b)
      );
      const fittedData = temperatures.map((temp, i) => ({
        x: temp,
        y: fittedViscosities[i],
      }));
      onFittedData(fittedData);

      setData({
        datasets: [
          {
            label: "Viscosity vs Temperature",
            data: inputData,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            pointRadius: 5,
          },
          {
            label: `Fitted Line: log10(Viscosity) = ${a.toFixed(
              2
            )} * Temperature + ${b.toFixed(2)}`,
            data: fittedData,
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 2,
            showLine: true,
            fill: false,
          },
        ],
      });

      setFormula(
        `log10(Viscosity) = ${a.toFixed(2)} * Temperature + ${b.toFixed(2)}`
      );
    }
  }, [inputData]);

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
          <Formula>{formula}</Formula>
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

const Formula = styled.p`
  font-size: 18px;
  margin-top: 20px;
`;

export default CorrelationPage;
