import React, { ReactNode } from "react";
import "./Button2.css";

type Button2Types = {
  text: string;
  style: String;
  handler: any;
};

const Button2 = (props: Button2Types) => {
  const onClickHandler = () => {
    props.handler();
  };

  return (
    <div className={`btn2_container ${props.style}`}>
      <button onClick={onClickHandler}>{props.text}</button>
    </div>
  );
};

export default Button2;
