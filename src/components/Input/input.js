import React from "react";
import "./input.css";

export const Input = (props) => {
  const { type, onChange, ...additionalProps } = props;

  const onChangeWrapper = (e) => {
    e.preventDefault();
    if (props.onChange) {
      props.onChange(e.target.value);
    }
  };

  return (
    <input
      className="input-field"
      type={props.type}
      onChange={onChangeWrapper}
      {...additionalProps}
    />
  );
};

export default Input;
