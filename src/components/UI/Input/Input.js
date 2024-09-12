import styles from "./Input.module.css";
import React, { useRef, useImperativeHandle } from "react";

const Input = React.forwardRef(function (props, ref) {
  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => {
    return {
      focus: activate,
    };
  });

  return (
    <div
      className={`${styles.control} ${
        props.isValid === false ? styles.invalid : ""
      }`}
    >
      <label htmlFor="email">{props.label}</label>
      <input
        type={props.value}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        ref={inputRef}
      />
    </div>
  );
});

export default Input;
