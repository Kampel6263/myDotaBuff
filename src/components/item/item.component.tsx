import classNames from "classnames";
import React from "react";
import { useMedia } from "../../core/hooks/media.hook";
import { ItemType } from "../../pages/items/items.component";
import Preloader from "../preloader/preloader.coponent";
import ItemInfo from "./item-attr/item-info.component";

import classes from "./item.module.scss";

const Item: React.FC<{
  el: ItemType;
  withName?: boolean;
  position?: "left" | "right" | "leftBottom" | "rightBottom";
}> = ({ el, withName, position = "left" }) => {
  const { mobile } = useMedia();

  // console.log(el, "is mobile");
  if (!el) {
    return <Preloader />;
  }

  return (
    <div className={classes.item}>
      <img src={"https://cdn.cloudflare.steamstatic.com" + el.img} alt="" />
      {withName && (
        <div>
          <div>{el.qual ? el.qual : el.tier}</div>
        </div>
      )}
      <div className={classNames(classes.info, classes[position])}>
        <ItemInfo el={el} />
      </div>
    </div>
  );
};

export default Item;
