import React, { useCallback, useRef } from "react";
import { ChevronDown } from "../Icons";
import { useKnockFeed } from "../KnockFeedProvider";

import "./styles.css";

export type DropdownProps = {
  value: string;
  onChange: (e: any) => void;
};

const Dropdown: React.FC<DropdownProps> = ({ children, value, onChange }) => {
  const { colorMode } = useKnockFeed();

  return (
    <div className={`rnf-dropdown rnf-dropdown--${colorMode}`}>
      <select value={value} onChange={onChange}>
        {children}
      </select>
      <ChevronDown />
    </div>
  );
};

export default Dropdown;
