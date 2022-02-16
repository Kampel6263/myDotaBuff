import React from "react";
import { ItemType } from "../../../pages/items/items.component";
import classes from "./item-info.module.scss";

const ItemInfo: React.FC<{ el: ItemType }> = ({ el }) => {
  return (
    <div className={classes.info}>
      <div className={classes.header}>
        <img
          src={"https://cdn.cloudflare.steamstatic.com" + el.img || "ggg"}
          alt=""
        />
        <div>
          <div className={classes.name}>{el.dname}</div>
          <div className={classes.сost}>
            <img
              src="https://www.dotabuff.com/assets/gold-icon-reborn-9909c266d01dc89237bcafc62f1a5e64cc1297a26aeb2390ffe5ff85cd859cfa.png"
              alt=""
            />{" "}
            <span>{el.cost}</span>{" "}
          </div>
        </div>
      </div>

      <div className={classes.attr}>
        {el.attrib.map((itm, i) => (
          <div key={i}>
            {itm.header}{" "}
            {Array.isArray(itm.value) ? (
              itm.value.map((v, i) => (
                <span key={i}>
                  {v}
                  {i !== itm.value.length - 1 ? "/" : ""}
                </span>
              ))
            ) : (
              <span> {itm.value} </span>
            )}{" "}
            {itm.footer}
          </div>
        ))}
      </div>
      {el.hint && (
        <div className={classes.activate}>
          {el.hint.map((itm, i) => (
            <div key={i}> {itm} </div>
          ))}
        </div>
      )}
      <div className={classes.lore}>{el.lore}</div>
    </div>
  );
};

export default ItemInfo;
