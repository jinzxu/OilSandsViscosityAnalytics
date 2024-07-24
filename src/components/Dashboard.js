// src/components/Dashboard.js
import React, { useState } from "react";
import styled from "styled-components";
import LoginPage from "./LoginPage";
import InputPage from "./InputPage";
import CorrelationPage from "./CorrelationPage";
import ForecastPage from "./ForecastPage";
import ManualPage from "./ManualPage";

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState("");
  const [inputData, setInputData] = useState([]);
  const [regressionParams, setRegressionParams] = useState(null); // Initialize to null
  const [fittedData, setFittedData] = useState([]);
  const [inputUploaded, setInputUploaded] = useState(false);
  const [correlationDone, setCorrelationDone] = useState(false);

  const handleInputData = (data) => {
    setInputData(data);
    setInputUploaded(true);
    setActivePage("input");
  };

  const handleRegressionParams = (params) => {
    setRegressionParams(params);
    setCorrelationDone(true);
  };

  const handleFittedData = (data) => {
    setFittedData(data);
  };

  const handleButtonClick = (page) => {
    if (
      (page === "correlation" && !inputUploaded) ||
      (page === "forecast" && !correlationDone)
    ) {
      return;
    }
    setActivePage(page);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Container>
      <Header>Oil Sands Viscosity Analytics (Author: Jason Xu)</Header>
      <Content>
        <Sidebar>
          <Button onClick={() => handleButtonClick("input")}>Input</Button>
          <Button
            disabled={!inputUploaded}
            active={inputUploaded}
            onClick={() => handleButtonClick("correlation")}
          >
            Correlation
          </Button>
          <Button
            disabled={!correlationDone}
            active={correlationDone}
            onClick={() => handleButtonClick("forecast")}
          >
            Forecast
          </Button>
          <Button onClick={() => handleButtonClick("manual")}>Manual</Button>
        </Sidebar>
        <Main>
          {activePage === "input" && (
            <InputPage onInputData={handleInputData} />
          )}
          {activePage === "correlation" && (
            <CorrelationPage
              inputData={inputData}
              onRegressionParams={handleRegressionParams}
              onFittedData={handleFittedData}
            />
          )}
          {activePage === "forecast" && regressionParams && (
            <ForecastPage
              inputData={inputData}
              fittedData={fittedData}
              regressionParams={regressionParams}
            />
          )}
          {activePage === "manual" && <ManualPage />}
          {activePage !== "input" &&
            activePage !== "correlation" &&
            activePage !== "forecast" &&
            activePage !== "manual" && (
              <Welcome>Welcome to oil sands viscosity analytics!</Welcome>
            )}
        </Main>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: "Arial", sans-serif;
`;

const Header = styled.header`
  background-color: #007bff;
  color: white;
  padding: 15px;
  text-align: center;
  font-size: 24px;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
`;

const Sidebar = styled.div`
  width: 200px;
  background-color: #343a40;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 20px;
`;

const Button = styled.button`
  padding: 15px;
  margin-bottom: 10px;
  background-color: ${(props) => (props.disabled ? "gray" : "#007bff")};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.disabled ? "gray" : "#0056b3")};
  }
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
`;

const Welcome = styled.h1`
  color: #212529;
`;

export default Dashboard;
