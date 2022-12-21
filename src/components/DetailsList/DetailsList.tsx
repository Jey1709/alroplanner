import React, { forwardRef, useImperativeHandle, useState } from "react";
import Meeting from "../model/Meeting";
import Model from "../model/Model";
import "./DetailsList.css";

type DetailsListType = {
  model: Model;
};

export type DetialListRef = {
  update: (details: Meeting[]) => void;
};

const DetailsList = forwardRef(
  (props: DetailsListType, ref: React.Ref<DetialListRef>) => {
    const [list, setList] = useState<Meeting[]>([]);

    useImperativeHandle(ref, () => ({
      update: (details: Meeting[]) => {
        setList(details);
      },
    }));
    return (
      <div className="details_list">
        {list.map((item) => {
          return <div>{"" + item.firstname + " " + item.lastname}</div>;
        })}
      </div>
    );
  }
);

export default DetailsList;
