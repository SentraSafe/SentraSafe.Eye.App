import styled from "styled-components/native";

export const Overview = styled.View`
  margin: 20px;
  padding: 20px;
  border-color: #bdbdbdff;
  border-width: 2px;
  border-radius: 20px;
`;

export const OverviewLabel = styled.Text`
  font-weight: 600;
`;

export const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const MeasurementContainer = styled.View`
  flex-basis: 48%;
  padding: 20px;
  border-color: #bdbdbdff;
  border-width: 2px;
  border-radius: 20px;
  height: 80px;
`;

export const AlarmContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-color: #bdbdbdff;
  border-width: 2px;
  border-radius: 20px;
  padding: 10px 20px;
  margin-bottom: 5px;
`;

export const EventContainer = styled.View`
  border-color: #bdbdbdff;
  border-width: 2px;
  border-radius: 20px;
  padding: 10px 20px;
  margin-bottom: 5px;
`;
