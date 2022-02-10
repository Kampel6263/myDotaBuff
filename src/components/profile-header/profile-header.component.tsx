import React from "react";
import { UseProfileData } from "../../pages/search/pages/profile.hook";
import ActivitiCalendar from "../activiti-calendar/activiti-calendar.component";
import classes from "./profile-header.module.scss";

const ProfileHeader = () => {
  const { profile, winRateToday, winRate, getColor } = UseProfileData();
  const rankTier = profile?.profile?.rank_tier
    ? String(profile?.profile?.rank_tier).split("")[0]
    : "0";
  const starCount = String(profile?.profile?.rank_tier).split("")[1];
  return (
    <div className={classes.header}>
      <img src={profile?.profile.profile?.avatarfull} alt="" />
      <div>
        <span>ID:</span> {profile.profile.profile.account_id}{" "}
      </div>
      <div className={classes.name}>
        <span>Nick name:</span> {profile?.profile.profile?.personaname}{" "}
        <div className={classes.rang}>
          <div className={classes.stars}>
            {rankTier !== "0" && starCount !== "0" && (
              <img
                className={classes.star}
                src={`https://www.opendota.com/assets/images/dota2/rank_icons/rank_star_${starCount}.png`}
              />
            )}
          </div>
          <img
            className={classes.rangImg}
            src={`https://www.opendota.com/assets/images/dota2/rank_icons/rank_icon_${rankTier}.png`}
          />
        </div>
      </div>
      <div>
        <span>MMR:</span> {profile?.profile.mmr_estimate?.estimate}{" "}
      </div>
      <div>
        <span>Matches:</span> {profile.winRate.win + profile.winRate.lose}
      </div>
      <div>
        <span>Win:</span> {profile?.winRate.win}
      </div>
      <div>
        <span>Lose:</span> {profile?.winRate.lose}
      </div>

      <div
        style={{
          color: getColor("a+", winRate / 100),
        }}
      >
        <span>Win rate:</span> {String(winRate).slice(0, 5)}%
        {winRateToday !== 0 && (
          <span
            className={classes.winRateToday}
            style={{
              color: `${winRateToday > 0 ? "rgb(0,255,0)" : "red"}`,
            }}
          >
            {winRateToday > 0 ? "+" : ""}
            {String(winRateToday).slice(0, 5)}% today
          </span>
        )}
      </div>
      <div className={classes.calendar}>
        <ActivitiCalendar />
      </div>
    </div>
  );
};

export default ProfileHeader;
