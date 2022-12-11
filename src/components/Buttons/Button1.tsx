import React, { ReactNode } from "react";
import "./Button1.css";

type PropsExtension = {
  style: String;
  handler: any;
};

const Button1 = (props: PropsExtension) => {
  const onClickHandler = () => {
    props.handler();
  };

  return (
    <div className={`btn1_container ${props.style}`}>
      <button onClick={onClickHandler}></button>
    </div>
  );
};

export default Button1;
