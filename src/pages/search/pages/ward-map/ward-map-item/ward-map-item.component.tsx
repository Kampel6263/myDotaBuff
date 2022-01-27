import classNames from "classnames";
import React, { useEffect, useState } from "react";
import classes from "./ward-map-item.module.scss";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import Preloader from "../../../../../components/preloader/preloader.coponent";
type WardMapProps = {
  data: any;
  dotColor: "yellow" | "blue";
};

const WardMapItem: React.FC<WardMapProps> = ({ data, dotColor }) => {
  const converdData = (arr: any) => {
    const dataForPlot: any = [
      { id: dotColor === "yellow" ? "Observers" : "Sentrys", data: [] },
    ];
    for (let el in data) {
      for (let itm in data[el]) {
        for (let k = 0; k < Number(data[el][itm]); k++) {
          dataForPlot[0].data.push({ x: Number(el) - 68, y: Number(itm) - 68 });
        }
      }
    }
    return dataForPlot;
  };
  const [plotData, setPlotData] = useState<any>({});
  useEffect(() => {
    setPlotData(converdData(data));
  }, [data]);

  // const plotData = converdData(data);

  if (plotData[0]?.data?.length === 0 || !plotData[0] || !plotData[0]?.data) {
    return <Preloader />;
  }

  return (
    <div
      className={
        dotColor === "yellow"
          ? classNames(classes.map, classes.yellow)
          : classNames(classes.map, classes.blue)
      }
    >
      <ResponsiveScatterPlot
        data={plotData}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        xScale={{ type: "linear", min: 0, max: "auto" }}
        xFormat=" >-.2e"
        yScale={{ type: "linear", min: 0, max: "auto" }}
        yFormat=">-.2e"
        blendMode="multiply"
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={null}
        enableGridX={false}
        enableGridY={false}
        colors={"red"}
        isInteractive={false}
        nodeSize={7}
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

export default WardMapItem;
