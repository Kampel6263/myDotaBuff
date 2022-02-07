import classNames from "classnames";
import React, { useEffect, useLayoutEffect, useState } from "react";
import classes from "./ward-map-item.module.scss";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import Preloader from "../../../../../components/preloader/preloader.coponent";
import { animated } from "@react-spring/web";
import { UseProfileData } from "../../profile.hook";
type WardMapProps = {
  data: any;
  activeEl: "blue" | "green" | "orange" | "red" | "";
  type: "obs" | "sen";
};

const WardMapItem: React.FC<WardMapProps> = ({ data, activeEl, type }) => {
  const { getColor } = UseProfileData();

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
        dataForPlot[0].data.push({
          x: Number(el) - 68,
          y: Number(itm) - 68,
          color: getDiapason(data[el][itm]),
          nameColor: getDiapason(data[el][itm], true),
        });
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
  if (plotData[0].data.length > 600) {
    let koef = Math.ceil(plotData[0].data.length / 600);

    setPlotData([
      {
        id: plotData[0].id,
        data: plotData[0].data.filter((el, i) => i % koef === 0 && el),
      },
    ]);
  }

  return (
    <div
      className={
        activeEl.length > 0
          ? classNames(classes.map, classes["show" + activeEl])
          : classes.map
      }
    >
      <div className={classes.allWard}>
        {type === "obs" ? "Observers" : "Sentrys"}: {wardCount}
      </div>
      <ResponsiveScatterPlot
        data={plotData}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        xScale={{ type: "linear", min: 0, max: "auto" }}
        xFormat=" >-.2e"
        yScale={{ type: "linear", min: 0, max: "auto" }}
        yFormat=">-.2e"
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={null}
        enableGridX={false}
        enableGridY={false}
        // colors={"red"}
        colors={(el) => {
          return "rgba(255,255,255,0.5)";
        }}
        isInteractive={false}
        nodeSize={3}
        nodeComponent={(props) => (
          <React.Fragment>
            <animated.circle
              cx={props.style.x}
              cy={props.style.y}
              r={props.style.size.to((size) => size)}
              fill={props.node.data.color}
              style={{ mixBlendMode: props.blendMode }}
              className={classes[props.node.data.nameColor]}
            />
          </React.Fragment>
        )}
        legends={[
          {
            anchor: "top-left",
            direction: "column",
            justify: false,
            translateX: 10,
            translateY: 10,
            itemWidth: 20,
            itemHeight: 20,
            itemsSpacing: 1,
            itemDirection: "left-to-right",
            symbolSize: 0,
            itemTextColor: "white",
          },
        ]}
      />
    </div>
  );
};

export default React.memo(WardMapItem);
