import React, { createRef } from "react";
import Calender, { RefType } from "../Calender/Calender";
import ControlHeader from "../ControlHeader/ControlHeader";
import DetailsList, { DetialListRef } from "../DetailsList/DetailsList";
import Meeting from "../model/Meeting";
import Model from "../model/Model";
import NavigationHeader from "../NavigationHeader/NavigationHeader";
import "./Grid.css";

type GridTypes = {
  model: Model;
};

const Grid = (props: GridTypes) => {
  const updateCalenderRef = createRef<RefType>();
  const updateDetailsRef = createRef<DetialListRef>();

  const updateCalenderPropHandler = () => {
    if (updateCalenderRef !== null && updateCalenderRef.current !== null) {
      updateCalenderRef.current.update();
    }
  };

  const updateDetailsListPropHandler = (list: Meeting[]) => {
    if (updateDetailsRef !== null && updateDetailsRef.current !== null) {
      updateDetailsRef.current.update(list);
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
        <Calender
          model={props.model}
          ref={updateCalenderRef}
          getMeetingValues={updateDetailsListPropHandler}
        />
      </div>
      <div className="footer">
        <DetailsList model={props.model} ref={updateDetailsRef}></DetailsList>
      </div>
    </div>
  );
};

export default Grid;
