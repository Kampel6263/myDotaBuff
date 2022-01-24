import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { date } from "yup/lib/locale";
import { UseHomeProfileData } from "../../pages/search/pages/home-profile/home.hook";
import classes from "./activiti-calendar.module.scss";

const ActivitiCalendar = () => {
  const { profileRecentMatches } = UseHomeProfileData();
  const daysCount = 91;
  const [arrForCalendar, setArrForCalendar] = useState<
    { games: number; wins: number; date: string }[]
  >([]);
  useEffect(() => {
    const arrWithDate: { games: number; wins: number; date: string }[] = [];
    for (let el = 0; el < daysCount; el++) {
      arrWithDate.push({
        date: dayjs.unix(Date.now() / 1000 - el * 24 * 3600).format("DD/MM/YY"),
        games: 0,
        wins: 0,
      });
      if (
        daysCount - el <= 7 &&
        dayjs.unix(Date.now() / 1000 - el * 24 * 3600).format("ddd") === "Mon"
      ) {
        el = daysCount + 1;
      }
    }

    const arrWithMatchInfo: { games: number; wins: number; date: string }[] =
      arrWithDate
        .map((el) => {
          let matchByDate = profileRecentMatches.filter(
            (itm) => dayjs.unix(itm.start_time).format("DD/MM/YY") === el.date
          );
          if (matchByDate.length > 0) {
            return {
              date: el.date,
              games: matchByDate.length,
              wins: matchByDate.filter((itm) => itm.win).length,
            };
          }
          return el;
        })
        .reverse();
    let i = 1;
    while (arrWithMatchInfo.length !== daysCount) {
      arrWithMatchInfo.push({
        date: dayjs.unix(Date.now() / 1000 + i * 24 * 3600).format("DD/MM/YY"),
        games: 0,
        wins: 0,
      });
      i++;
    }
    setArrForCalendar(arrWithMatchInfo);
    return () => {
      setArrForCalendar([]);
    };
  }, [profileRecentMatches]);

  return (
    <div className={classes.calendar}>
      <div className={classes.dayW}>Mo</div>
      <div className={classes.dayW}>Tu</div>
      <div className={classes.dayW}>We</div>
      <div className={classes.dayW}>Th</div>
      <div className={classes.dayW}>Fr</div>
      <div className={classes.dayW}>Sa</div>
      <div className={classes.dayW}>Su</div>
      {arrForCalendar.map((el, i) => (
        <div
          className={classes.day}
          key={i}
          style={
            el.date === dayjs.unix(Date.now() / 1000).format("DD/MM/YY")
              ? { borderColor: "#707070" }
              : {}
          }
        >
          <div
            className={classes.sz}
            style={{
              width: `${el.games !== 0 ? el.games + 1 : 0}px`,
              height: `${el.games !== 0 ? el.games + 1 : 0}px`,
              background: `rgb(${255 * (1 - el.wins / el.games)}, ${
                (255 * el.wins) / el.games
              }, 0`,
            }}
          ></div>
          <div className={classes.detail}>
            <div>{el.date}</div>
            <div>
              Record: <span className={classes.win}>{el.wins}</span> -{" "}
              <span className={classes.lose}>{el.games - el.wins}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivitiCalendar;
