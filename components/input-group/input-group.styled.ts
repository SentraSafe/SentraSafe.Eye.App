import styled from "styled-components/native";

export const Container = styled.View`
  margin-bottom: 25px;
  margin-left: 20px;
  margin-right: 20px;
  height: 70px;
`;

export const Label = styled.Text`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 5px;
  margin-left: 10px;
`;

export const StyledTextInput = styled.TextInput`
  border-radius: 10px;
  font-size: 18px;
  border-color: #bdbdbdff;

  background-color: #fff;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  border-width: 1.5px;
`;

export const StyledPickerContainer = styled.View`
  border-radius: 10px;
  font-size: 18px;
  border-color: #bdbdbdff;

  background-color: #fff;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  border-width: 1.5px;
`;

export const StyledDatePickerContainer = styled.Pressable`
  border-radius: 10px;
  font-size: 18px;
  border-color: #bdbdbdff;
  background-color: #fff;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-width: 1.5px;
  flex-direction: row;
  justify-content: space-between;
`;
