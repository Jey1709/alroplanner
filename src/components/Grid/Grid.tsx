import React, { useRef } from "react";
import Calender from "../Calender/Calender";
import ControlHeader from "../ControlHeader/ControlHeader";
import DetailsList from "../DetailsList/DetailsList";
import Model from "../Model";
import NavigationHeader from "../NavigationHeader/NavigationHeader";
import "./Grid.css";

type GridTypes = {
  model: Model;
};

const Grid = (props: GridTypes) => {
  const testModel = () => {
    // const list = [];
    // for (let i = 0; i < 12; i++) {
    //   list.push(`Month: ${i + 1} + ${props.model.actualMonthList()}`);
    // }
    // console.log(list);
    console.log(props.model.getActualMonthList(6));
  };

  return (
    <div className="grid">
      <div className="header">
        {/* <button onClick={testModel}></button> */}
        <ControlHeader />
        <NavigationHeader model={props.model} />
      </div>
      <div className="content">
        <Calender model={props.model} />
      </div>
      <div className="footer">
        <DetailsList></DetailsList>
      </div>
    </div>
  );
};

export default Grid;
