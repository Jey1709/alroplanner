import React from "react";
import Button2 from "../Buttons/Button2";
import "./ControlHeader.css";

const ControlHeader = () => {
  const contextHandler = (event: Event) => {
    console.log("CTX");
  };
  return (
    <div className="ctr_hdr">
      <Button2
        text={"Menü"}
        style={"btn_controlheader"}
        handler={contextHandler}
      />
    </div>
  );
};

export default ControlHeader;
