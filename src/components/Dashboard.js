// src/components/Dashboard.js
import React, { useState } from "react";
import styled from "styled-components";
import InputPage from "./InputPage";
import CorrelationPage from "./CorrelationPage";
import ForecastPage from "./ForecastPage";
import ManualPage from "./ManualPage";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("");
  const [inputData, setInputData] = useState([]);
  const [regressionParams, setRegressionParams] = useState(null);
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

  return (
    <DashboardContainer>
      <Sidebar
        inputUploaded={inputUploaded}
        correlationDone={correlationDone}
        onButtonClick={handleButtonClick}
      />
      <Main>
        <Header>Oil Sands Viscosity Analytics (Author: Jason Xu)</Header>
        <Content>
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
        </Content>
      </Main>
    </DashboardContainer>
  );
};

const DashboardContainer = styled.div`
  display: flex;
`;

const Main = styled.main`
  flex-grow: 1;
  background-color: #f5f5f5;
  padding: 20px;
`;

const Header = styled.header`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Welcome = styled.h1`
  color: #212529;
`;

export default Dashboard;
