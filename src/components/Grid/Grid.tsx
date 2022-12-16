import React, { createRef, useRef } from "react";
import Calender, { RefType } from "../Calender/Calender";
import ControlHeader from "../ControlHeader/ControlHeader";
import DetailsList from "../DetailsList/DetailsList";
import Model from "../Model";
import NavigationHeader from "../NavigationHeader/NavigationHeader";
import "./Grid.css";

type GridTypes = {
  model: Model;
};

const Grid = (props: GridTypes) => {
  const updateRef = createRef<RefType>();

  const updateCalenderPropHandler = () => {
    if (updateRef !== null && updateRef.current !== null) {
      updateRef.current.update();
    }
  };

  return (
    <div className="grid">
      <div className="header">
        {/* <button onClick={testModel}></button> */}
        <ControlHeader />
        <NavigationHeader
          model={props.model}
          updateCalenderProp={updateCalenderPropHandler}
        />
      </div>
      <div className="content">
        <Calender model={props.model} ref={updateRef} />
      </div>
      <div className="footer">
        <DetailsList></DetailsList>
      </div>
    </div>
  );
};

export default Grid;
