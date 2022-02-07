import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../../business-logic/redux/config";
import { getWardMap } from "../../../../business-logic/redux/store";
import Preloader from "../../../../components/preloader/preloader.coponent";
import Title from "../../../../components/title/title.component";
import WardMapItem from "./ward-map-item/ward-map-item.component";
import { PreloaderEnum } from "../../../../types/preloader";
import classes from "./ward-map.module.scss";

const WardMap: React.FC<{ id: string }> = ({ id }) => {
  function isEmptyObject(obj: object) {
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        return false;
      }
    }
    return true;
  }
  const dispatch = useDispatch();

  const { wardMapData, showPreloader } = useSelector(
    (
      state: State
    ): {
      wardMapData: { obs: object; sen: object };
      showPreloader: number | null;
    } => state.general
  );
  const [activeEl, setActiveEl] = useState<
    "blue" | "green" | "orange" | "red" | ""
  >("");
  useEffect(() => {
    dispatch(getWardMap(id));

    return () => {
      // clear ward map
    };
  }, [id]);

  if (
    showPreloader === PreloaderEnum.GetWardmap ||
    isEmptyObject(wardMapData.obs)
  ) {
    return <Preloader />;
  }
  return (
    <div className={classes.wardMap}>
      <Title className={classes.title}>Ward map</Title>
      <div className={classes.maps}>
        <WardMapItem data={wardMapData.obs} activeEl={activeEl} type="obs" />
        <WardMapItem data={wardMapData.sen} activeEl={activeEl} type="sen" />
      </div>
      <div className={classes.indicators}>
        <div
          onMouseEnter={() => setActiveEl("blue")}
          onMouseLeave={() => setActiveEl("")}
          className={classes.blue}
        >
          0-3
        </div>
        <div
          onMouseEnter={() => setActiveEl("green")}
          onMouseLeave={() => setActiveEl("")}
          className={classes.green}
        >
          3-6
        </div>
        <div
          onMouseEnter={() => setActiveEl("orange")}
          onMouseLeave={() => setActiveEl("")}
          className={classes.orange}
        >
          6-9
        </div>
        <div
          onMouseEnter={() => setActiveEl("red")}
          onMouseLeave={() => setActiveEl("")}
          className={classes.red}
        >
          9+
        </div>
      </div>
    </div>
  );
};

export default React.memo(WardMap);
