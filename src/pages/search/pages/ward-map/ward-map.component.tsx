import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../../business-logic/redux/config";
import { getWardMap } from "../../../../business-logic/redux/store";
import Preloader from "../../../../components/preloader/preloader.coponent";
import Title from "../../../../components/title/title.component";
import WardMapItem from "./ward-map-item/ward-map-item.component";
import { PreloaderEnum } from "../../../../types/preloader";
import classes from "./ward-map.module.scss";

const WardMap: React.FC<{ id: string }> = ({ id }) => {
  const dispatch = useDispatch();
  const { wardMapData, showPreloader } = useSelector(
    (
      state: State
    ): {
      wardMapData: { obs: object; sen: object };
      showPreloader: number | null;
    } => state.general
  );
  useEffect(() => {
    dispatch(getWardMap(id));
  }, [id]);

  if (showPreloader === PreloaderEnum.GetWardmap || !wardMapData.obs) {
    return <Preloader />;
  }
  return (
    <div className={classes.wardMap}>
      <Title className={classes.title}>Ward map</Title>
      <div className={classes.maps}>
        <WardMapItem data={wardMapData.obs} dotColor="yellow" />
        <WardMapItem data={wardMapData.sen} dotColor="blue" />
      </div>
    </div>
  );
};

export default WardMap;
