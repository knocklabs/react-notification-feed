import React from "react";
import { ChevronDown } from "../Icons";

import "./styles.css";

export type DropdownProps = {
  value: string;
  onChange: (e: any) => void;
};

const Dropdown: React.FC<DropdownProps> = ({ children, value, onChange }) => (
  <div className="rnf-dropdown">
    <select value={value} onChange={onChange}>
      {children}
    </select>
    <ChevronDown />
  </div>
);

export default Dropdown;
