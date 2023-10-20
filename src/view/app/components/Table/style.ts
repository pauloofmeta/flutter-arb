import styled from 'styled-components';

export const TableContent = styled.table`
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 14px;
  font-family: sans-serif;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  padding: 0.5rem 0;
`;

export const Header = styled.tr`
  background-color: #163f6f;
  color: #ffffff;
`;

export const Column = styled.th`
  padding: 10px 15px;
  text-align: left;
`;

export const Cell = styled.td``;

export const Row = styled.tr`
  border-bottom: 1px solid #dddddd;

  :nth-of-type(even) {
    background-color: #363844;
  }
`;

export const InputCell = styled.input`
  background: transparent;
  color: #ffffff;
  border: none;
  padding: 10px 15px;

  :focus {
    background-color: #3c3c3c;
  }
`;

export const AddButton = styled.button`
  border: none;
  background-color: transparent;
  color: #ffffff;
  padding: 10px;
  cursor: pointer;
`;
