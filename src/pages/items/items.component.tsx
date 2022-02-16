import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../business-logic/redux/config";
import { getItems } from "../../business-logic/redux/store";
import Item from "../../components/item/item.component";
import Preloader from "../../components/preloader/preloader.coponent";
import Title from "../../components/title/title.component";
import { UseProfileData } from "../search/pages/profile.hook";
import { useItemsData } from "./items.hook";
import classes from "./items.module.scss";

type attribType = {
  footer: string;
  header: string;
  key: string;
  value: string;
};

export type ItemType = {
  cost: number;
  id: number;
  components: string[];
  dname: string;
  img: string;
  qual: string;
  tier: number;
  attrib: attribType[];
  hint: string[];
  lore: string;
};

const Items = () => {
  const { itemsArray } = UseProfileData();
  //   myArray.sort((a, b) => a.distance - b.distance)

  if (itemsArray?.length === 0) {
    return <Preloader />;
  }

  return (
    <div className={classes.items}>
      <h2>Items</h2>

      <div className={classes.content}>
        <div className={classes.type}>
          <Title className={classes.title}>Component</Title>
          <div className={classes.itemMap}>
            {itemsArray
              .filter((el) => el.qual === "component" && el.cost !== 0)
              .map((el, i) => (
                <Item el={el} key={i} position={"right"} />
              ))}
          </div>
        </div>
        <div className={classes.type}>
          <Title className={classes.title}>Rare</Title>
          <div className={classes.itemMap}>
            {itemsArray
              .filter((el) => el.qual === "rare" && el.cost !== 0)
              .map((el, i) => (
                <Item el={el} key={i} />
              ))}
          </div>
        </div>
        <div className={classes.type}>
          <Title className={classes.title}>Common</Title>
          <div className={classes.itemMap}>
            {itemsArray
              .filter((el) => el.qual === "common" && el.cost !== 0)
              .map((el, i) => (
                <Item el={el} key={i} position={"rightBottom"} />
              ))}
          </div>

          <Title className={classes.title}>Consumable</Title>
          <div className={classes.itemMap}>
            {itemsArray
              .filter((el) => el.qual === "consumable" && el.cost !== 0)
              .map((el, i) => (
                <Item el={el} key={i} position={"rightBottom"} />
              ))}
          </div>
        </div>
        <div className={classes.type}>
          <Title className={classes.title}>Epic</Title>
          <div className={classes.itemMap}>
            {itemsArray
              .filter((el) => el.qual === "epic" && el.cost !== 0)
              .map((el, i) => (
                <Item el={el} key={i} position={"leftBottom"} />
              ))}
          </div>
        </div>

        <div className={classes.type}>
          <Title className={classes.title}>Artifact</Title>
          <div className={classes.itemMap}>
            {itemsArray
              .filter((el) => el.qual === "artifact" && el.cost !== 0)
              .map((el, i) => (
                <Item el={el} key={i} position={"rightBottom"} />
              ))}
          </div>
        </div>

        <div className={classes.type}>
          <Title className={classes.title}>Secret shop</Title>
          <div className={classes.itemMap}>
            {itemsArray
              .filter((el) => el.qual === "secret_shop" && el.cost !== 0)
              .map((el, i) => (
                <Item el={el} key={i} position={"leftBottom"} />
              ))}
          </div>
        </div>
        <div className={classes.type}>
          <Title className={classes.title}>Neitral</Title>
          <div className={classes.neitralTitle}>Tier 1</div>
          <div className={classes.itemMap}>
            {itemsArray
              .filter((el) => el.tier === 1)
              .sort((a, b) => a.tier - b.tier)
              .map((el, i) => (
                <Item el={el} key={i} position={"rightBottom"} />
              ))}
          </div>
          <div className={classes.neitralTitle}>Tier 2</div>
          <div className={classes.itemMap}>
            {itemsArray
              .filter((el) => el.tier === 2)
              .sort((a, b) => a.tier - b.tier)
              .map((el, i) => (
                <Item el={el} key={i} position={"rightBottom"} />
              ))}
          </div>
          <div className={classes.neitralTitle}>Tier 3</div>
          <div className={classes.itemMap}>
            {itemsArray
              .filter((el) => el.tier === 3)
              .sort((a, b) => a.tier - b.tier)
              .map((el, i) => (
                <Item el={el} key={i} position={"rightBottom"} />
              ))}
          </div>
          <div className={classes.neitralTitle}>Tier 4</div>
          <div className={classes.itemMap}>
            {itemsArray
              .filter((el) => el.tier === 4)
              .sort((a, b) => a.tier - b.tier)
              .map((el, i) => (
                <Item el={el} key={i} position={"rightBottom"} />
              ))}
          </div>
          <div className={classes.neitralTitle}>Tier 5</div>
          <div className={classes.itemMap}>
            {itemsArray
              .filter((el) => el.tier === 5)
              .sort((a, b) => a.tier - b.tier)
              .map((el, i) => (
                <Item el={el} key={i} position={"rightBottom"} />
              ))}
          </div>
        </div>
      </div>
      {/* <div className={classes.type}>
        <Title className={classes.title}>Test</Title>
        <div className={classes.itemMap}>
          {itemsArray
            // .filter((el) => el.qual === "epic" && el.cost !== 0)
            .map((el, i) => (
              <Item el={el} key={i} withName={true} />
            ))}
        </div>
      </div> */}
    </div>
  );
};

export default Items;
