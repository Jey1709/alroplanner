import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Meeting from "../model/Meeting";
import Model from "../model/Model";
import "./Calender.css";

type CalenderPropsType = {
  model: Model;
  getMeetingValues: (list: Meeting[]) => void;
  updateNavigation: (left: Boolean) => void;
};

export type CalenderRefType = {
  update: () => void;
};

const Calender = forwardRef(
  (props: CalenderPropsType, ref: React.Ref<CalenderRefType>) => {
    //
    const init = useRef(false);

    useEffect(() => {
      if (!init.current) {
        init.current = true;
        return;
      }
      // initmethod
    });

    useImperativeHandle(ref, () => ({
      update: () => {
        setDays(props.model.getActualMonthList(6));
      },
    }));

    const dblclickListener = () => {
      console.log("dblclick");
    };

    const [days, setDays] = useState<number[][]>(
      props.model.getActualMonthList(6)
    );

    const clickhandler = (event: any) => {
      const elements = document.querySelectorAll(".row");
      elements.forEach((elem) => {
        elem.classList.remove("selected");
      });
      let val = (event.target as HTMLElement).classList;
      if (val.contains("pre")) {
        props.updateNavigation(true);
        setDays(props.model.getActualMonthList(6));
      } else if (val.contains("post")) {
        props.updateNavigation(false);
        setDays(props.model.getActualMonthList(6));
      } else {
        val.add("selected");
      }
      const tempdate = event.target.id.split("_");
      let retdate = new Date(tempdate[0], tempdate[1], tempdate[2]);
      const list = props.model.getMatchingBirthdays(retdate);
      props.getMeetingValues(list);
    };

    return (
      <React.Fragment>
        {/* div.col>div.head*7^div.col*6>div.row.*7 */}
        {/* New Comment */}
        {/* <button onClick={testList}>Blub</button> */}
        <div className="col">
          <div className="head">Mo</div>
          <div className="head">Di</div>
          <div className="head">Mi</div>
          <div className="head">Do</div>
          <div className="head">Fr</div>
          <div className="head">Sa</div>
          <div className="head">So</div>
        </div>
        {days.map((value, index) => {
          return (
            <div key={"col_" + index} className="col">
              {value.map((val, index) => {
                // console.log(val);
                const [value, date, caltype, meetings] = Object.values(val);

                let contains = meetings.length > 0 ? "contains" : "";
                let actdate = new Date(Date.now());
                let comparedate = date.split("_");
                let isactual =
                  "" + actdate.getFullYear() === comparedate[0] &&
                  "" + actdate.getMonth() === comparedate[1] &&
                  "" + actdate.getDate() === comparedate[2]
                    ? "actual"
                    : "";

                return (
                  <div
                    key={"row_" + index}
                    className={`row ${caltype} ${contains} ${isactual}`}
                    id={date}
                    onDoubleClick={dblclickListener}
                    onClick={clickhandler}
                  >
                    {value}
                  </div>
                );
              })}
            </div>
          );
        })}
      </React.Fragment>
    );
  }
);

export default Calender;
