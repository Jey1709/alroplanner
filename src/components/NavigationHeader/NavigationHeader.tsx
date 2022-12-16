import React, { ReactNode, useState } from "react";
import Button1 from "../Buttons/Button1";
import Model from "../Model";
import "./NavigationHeader.css";

type NavigationTypes = {
  updateCalenderProp(): void;
  model: Model;
};

const NavigationHeader = (props: NavigationTypes) => {
  const computeDate = () => {
    const monthnum = parseInt(props.model.actualDate.split("_")[1]);

    return [
      props.model.getMonthAsWord(monthnum),
      props.model.selectedDate.getFullYear(),
    ];
  };

  const [date, setDate] = useState(computeDate());

  const fktLeft = () => {
    props.model.setPreviousMonth();
    setDate(computeDate());
    props.updateCalenderProp();
  };

  const fktRight = () => {
    props.model.setNextMonth();
    setDate(computeDate());
    props.updateCalenderProp();
  };

  return (
    <div className="nav_hdr_container">
      <div>
        <Button1 style="bgr_left" handler={fktLeft}></Button1>
      </div>
      <div>
        <div>{date[1]}</div>
        <div>{date[0]}</div>
      </div>
      <div>
        <Button1 style="bgr_right" handler={fktRight}></Button1>
      </div>
    </div>
  );
};

export default NavigationHeader;
