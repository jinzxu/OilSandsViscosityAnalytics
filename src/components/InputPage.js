// src/components/InputPage.js
import React, { useState } from "react";
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

const InputPage = ({ onInputData }) => {
  const [data, setData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split("\n").filter((line) => line.trim() !== "");
      const inputData = lines.map((line) => {
        const [temp, visc] = line.split(/\s+/).map(Number);
        return { x: temp, y: visc };
      });
      setData({
        datasets: [
          {
            label: "Viscosity vs Temperature",
            data: inputData,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            pointRadius: 5,
          },
        ],
      });
      onInputData(inputData);
    };
    reader.readAsText(file);
  };

  return (
    <Container>
      <UploadContainer>
        <input type="file" accept=".txt" onChange={handleFileUpload} />
      </UploadContainer>
      {data && (
        <ChartContainer>
          <Scatter
            data={data}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              animation: false, // Disable animation
              scales: {
                x: { title: { display: true, text: "Temperature (°C)" } },
                y: {
                  type: "logarithmic", // Set y-axis to logarithmic scale
                  title: { display: true, text: "Viscosity (cp)" },
                },
              },
            }}
          />
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

const UploadContainer = styled.div`
  margin-bottom: 20px;
`;

const ChartContainer = styled.div`
  height: 70vh;
  width: 80vw;
  margin: 0 auto;
`;

export default InputPage;
