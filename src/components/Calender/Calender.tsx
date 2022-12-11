import React, { useEffect, useRef, useState } from "react";
import Model from "../Model";
import "./Calender.css";

type CalenderTypes = {
  model: Model;
};

const Calender = (props: CalenderTypes) => {
  //
  const init = useRef(false);

  useEffect(() => {
    if (!init.current) {
      init.current = true;
      return;
    }
    // initmethod
    const elements = document.querySelectorAll(".row").forEach((elem) => {
      elem.addEventListener("click", clickhandler);
    });
  });

  const dblclickListener = (event: MouseEvent) => {
    console.log("dblclick");
  };

  const [days, setDays] = useState<number[][]>(
    props.model.getActualMonthList(6)
  );

  const clickhandler = (event: Event) => {
    const elements = document.querySelectorAll(".row");
    elements.forEach((elem) => {
      elem.classList.remove("selected");
    });

    let val = (event.target as HTMLElement).classList;
    val.add("selected");
  };

  const testList = () => {
    const mylist = [
      [1, 2, 3, 4],
      [5, 6, 7],
    ];
    setDays(mylist);
  };

  return (
    <React.Fragment>
      {/* div.col>div.head*7^div.col*6>div.row.*7 */}
      <button onClick={testList}>Blub</button>
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
              return (
                <div key={"row_" + index} className="row">
                  {val}
                </div>
              );
            })}
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default Calender;
