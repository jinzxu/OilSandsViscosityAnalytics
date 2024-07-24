// src/components/InputPage.js
import React, { useState, useRef } from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import styled from "styled-components";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  PointElement,
  Tooltip,
  Legend
);

const InputPage = ({ onInputData }) => {
  const [data, setData] = useState(null);
  const [key, setKey] = useState(0);
  const fileInputRef = useRef();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.trim().split("\n");
      const parsedData = lines.map((line) => {
        const [temperature, viscosity] = line.split(/\s+/).map(Number);
        return { x: temperature, y: viscosity };
      });

      setData({
        datasets: [
          {
            label: "Viscosity vs Temperature",
            data: parsedData,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            pointRadius: 5,
          },
        ],
      });

      onInputData(parsedData); // Pass data to parent component
      setKey((prevKey) => prevKey + 1); // Update key to force re-render
      fileInputRef.current.value = null; // Clear the file input value
    };

    reader.readAsText(file);
  };

  return (
    <Container>
      <UploadSection>
        <input
          type="file"
          accept=".txt"
          onChange={handleFileUpload}
          ref={fileInputRef}
          style={{ fontSize: "18px", padding: "10px" }}
        />
      </UploadSection>
      {data && (
        <ChartContainer>
          <Scatter
            key={key} // Add key prop to force re-render
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

const UploadSection = styled.div`
  margin-bottom: 20px;
`;

const ChartContainer = styled.div`
  height: 70vh;
  width: 80vw;
  margin: 0 auto;
`;

export default InputPage;
