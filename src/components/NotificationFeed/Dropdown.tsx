import React from "react";
import ChevronDown from "../Icons/ChevronDown";
import { SelectWrapper } from "./styles";

type Props = {
  value: string;
  onChange: (e: any) => void;
};

const Dropdown: React.FC<Props> = ({ children, value, onChange }) => {
  return (
    <SelectWrapper>
      <select value={value} onChange={onChange}>
        {children}
      </select>
      <ChevronDown />
    </SelectWrapper>
  );
};

export default Dropdown;
