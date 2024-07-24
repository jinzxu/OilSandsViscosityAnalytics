// src/components/ManualPage.js
import React from "react";
import styled from "styled-components";

const ManualPage = () => {
  return (
    <Container>
      <Text>
        This website assists you in analyzing oil viscosity through correlation
        and forecasting.
      </Text>
      <Text>
        Please upload your viscosity data as a text file on the Input page.
      </Text>
      <Text>
        Once uploaded, you can proceed with correlation and forecasting
        analyses.
      </Text>
      <Text>
        <strong>Note:</strong> Each step must be completed in sequence to enable
        the next step.
      </Text>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  width: 80%;
  margin: 0 auto;
  text-align: center;
  font-size: 18px;
  line-height: 1.6;
`;

const Text = styled.p`
  margin: 10px 0;
`;

export default ManualPage;
