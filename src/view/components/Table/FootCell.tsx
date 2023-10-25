import React from 'react';
import { AddButton } from './style';

interface FootCellProp {
  add?: () => void;
}

export const FootCell = ({ add }: FootCellProp) => {
  return (
    <div>
      <AddButton onClick={add}>Add New +</AddButton>
    </div>
  );
};
