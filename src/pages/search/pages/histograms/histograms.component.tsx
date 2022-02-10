import { Field, Form, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../../business-logic/redux/config";
import { getHistograms } from "../../../../business-logic/redux/store";
import Title from "../../../../components/title/title.component";
import classes from "./histograms.module.scss";
import { ResponsiveBar } from "@nivo/bar";
import { PreloaderEnum } from "../../../../types/preloader";
import Preloader from "../../../../components/preloader/preloader.coponent";
import { UseProfileData } from "../profile.hook";

const Histograms: React.FC<{ id: string }> = ({ id }) => {
  const dispatch = useDispatch();
  const { getColor } = UseProfileData();
  const [currentFilter, setCurrentFilter] = useState<string>("kills");

  useEffect(() => {
    dispatch(getHistograms({ id: id, field: currentFilter }));
  }, []);

  const { histograms, showPreloader } = useSelector(
    (
      state: State
    ): {
      histograms: { x: number; games: number; win: number }[];
      showPreloader: number | null;
    } => state.general
  );

  let newData = useMemo(() => {
    return histograms.map((el) => ({
      game: el.games,
      win: el.win,
      [currentFilter]: el.x,
      borderColor: getColor("a", el.win / el.games, 0.7),
      color: getColor("a", el.win / el.games, 0.5),
    }));
  }, [histograms]);

  let maxX = 0;
  for (let el of newData) {
    if (el[currentFilter] > maxX && el.game !== 0) {
      maxX = Number(el[currentFilter]);
    }
  }

  newData = newData.slice(0, 20);

  if (showPreloader === PreloaderEnum.GetHistogram || newData.length === 0) {
    return <Preloader />;
  }

  return (
    <div className={classes.histograms}>
      <Title className={classes.title}>Histograms</Title>

      <Formik
        initialValues={{ field: currentFilter }}
        onSubmit={(values) => {
          dispatch(getHistograms({ id: id, field: values.field }));
          setCurrentFilter(values.field);
        }}
      >
        {({ submitForm }) => (
          <Form onChange={submitForm}>
            <Field as="select" name="field">
              <option value="kills">Kills</option>
              <option value="assists">Assists</option>
              <option value="deaths">Deaths</option>
              <option value="duration">Duration</option>
              <option value="level">Level</option>
              <option value="last_hits">Last Hits</option>
              <option value="denies">Denies</option>
              <option value="hero_damage">Hero Damage</option>
              <option value="tower_damage">Tower Damage</option>
              <option value="tower_kills">Tower Kills</option>
              <option value="pings">Map Pings</option>
              {/* <option value="blue">Blue</option> */}
            </Field>
          </Form>
        )}
      </Formik>

      <div className={classes.hist}>
        <ResponsiveBar
          data={newData}
          keys={["game"]}
          indexBy={currentFilter}
          margin={{ top: 50, right: 30, bottom: 50, left: 30 }}
          padding={0.3}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          borderWidth={2}
          axisTop={null}
          colors={(d) => d.data.color}
          axisRight={null}
          borderColor={(d) => d.data.data.borderColor}
          tooltip={({ data }) => (
            <div className={classes.interactive}>
              <div>Win: {data.win}</div>
              <div>Lose: {data.game - data.win}</div>
              <div
                style={{
                  color: getColor("a", data.win / data.game),
                }}
              >
                Win rate: {String((data.win / data.game) * 100).slice(0, 4)}%
              </div>
            </div>
          )}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: currentFilter,
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,

            legend: "Games",
            legendPosition: "middle",
            legendOffset: -40,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={"#fff"}
          role="application"
          ariaLabel="Nivo bar chart demo"
          barAriaLabel={function (e) {
            return "s" + e.data.game;
          }}
        />
      </div>
    </div>
  );
};

export default React.memo(Histograms);
