import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Model from "../Model";
import "./Calender.css";

type CalenderTypes = {
  model: Model;
};

export type RefType = {
  update: () => void;
};

const Calender = forwardRef((props: CalenderTypes, ref: React.Ref<RefType>) => {
  //
  const init = useRef(false);
  const voidRef = useRef<void>();
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

  const clickhandler = (event: Event) => {
    const elements = document.querySelectorAll(".row");
    elements.forEach((elem) => {
      elem.classList.remove("selected");
    });

    let val = (event.target as HTMLElement).classList;
    val.add("selected");
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
              return (
                <div
                  key={"row_" + index}
                  className="row"
                  onDoubleClick={dblclickListener}
                >
                  {val}
                </div>
              );
            })}
          </div>
        );
      })}
    </React.Fragment>
  );
});

export default Calender;
