import classNames from "classnames";
import React, { Component, useLayoutEffect, useRef, useState } from "react";
import classes from "./ward-map-item.module.scss";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import Preloader from "../../../../../components/preloader/preloader.coponent";
import { animated } from "@react-spring/web";

type WardMapProps = {
  data: any;
  type: "obs" | "sen";
};

const WardMapItem: React.FC<WardMapProps> = ({ data, type }) => {
  const getDiapason = (count: number, returnName = false): string => {
    if (returnName) {
      if (count < 3) {
        return "blue";
      } else if (count >= 3 && count < 6) {
        return "green";
      } else if (count >= 6 && count < 9) {
        return "orange";
      } else {
        return "red";
      }
    } else {
      if (count < 3) {
        return "rgb(0, 225, 255)";
      } else if (count >= 3 && count < 6) {
        return "rgb(30, 255, 75)";
      } else if (count >= 6 && count < 9) {
        return "#f37137";
      } else {
        return "rgb(255, 0, 0)";
      }
    }
  };

  const converdData = (data: any) => {
    const dataForPlot: any = [{ id: type === "obs" ? "" : "", data: [] }];

    let maxCount = 0;
    for (let el in data) {
      for (let itm in data[el]) {
        maxCount = 13;
        for (let k = 0; k < data[el][itm]; k++) {
          dataForPlot[0].data.push({
            x: Number(el) - 72,
            y: Number(itm) - 72,
            color: getDiapason(data[el][itm]),
            nameColor: getDiapason(data[el][itm], true),
          });
        }
      }
    }

    return dataForPlot;
  };
  const [plotData, setPlotData] = useState<
    | {
        id: string;
        data: { x: number; y: number; color: string; nameColor: string }[];
      }[]
    | []
  >([]);

  function isEmptyObject(obj: object) {
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        return false;
      }
    }
    return true;
  }
  useLayoutEffect(() => {
    if (!isEmptyObject(data)) {
      setPlotData(converdData(data));
    }
  }, [data]);

  if (plotData[0]?.data?.length === 0 || !plotData[0] || !plotData[0]?.data) {
    return <Preloader />;
  }
  const wardCount = converdData(data)[0].data.length;

  return (
    <div className={classes.map}>
      <div className={classes.allWard}>
        {type === "obs" ? "Observers" : "Sentrys"}: {wardCount}
      </div>
      <div>
        {plotData[0].data.map((el, i) => (
          <div
            className={classes.plotEl}
            key={i}
            style={{
              bottom: (el.x / 112) * 100 + "%",
              left: (el.y / 112) * 100 + "%",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(WardMapItem);
