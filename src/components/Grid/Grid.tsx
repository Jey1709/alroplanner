import React, { createRef } from "react";
import Calender, { CalenderRefType } from "../Calender/Calender";
import ControlHeader from "../ControlHeader/ControlHeader";
import DetailsList, { DetialListRef } from "../DetailsList/DetailsList";
import Meeting from "../model/Meeting";
import Model from "../model/Model";
import NavigationHeader, {
  NavigationRefType,
} from "../NavigationHeader/NavigationHeader";
import "./Grid.css";

type GridPropsType = {
  model: Model;
};

const Grid = (props: GridPropsType) => {
  const updateCalenderRef = createRef<CalenderRefType>();
  const updateDetailsRef = createRef<DetialListRef>();
  const updateNavigationRef = createRef<NavigationRefType>();

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

  const updateNavigationHandler = (left: Boolean) => {
    if (updateNavigationRef !== null && updateNavigationRef.current !== null) {
      updateNavigationRef.current.update(left);
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
          ref={updateNavigationRef}
        />
      </div>
      <div className="content">
        <Calender
          model={props.model}
          ref={updateCalenderRef}
          getMeetingValues={updateDetailsListPropHandler}
          updateNavigation={updateNavigationHandler}
        />
      </div>
      <div className="footer">
        <DetailsList model={props.model} ref={updateDetailsRef}></DetailsList>
      </div>
    </div>
  );
};

export default Grid;
