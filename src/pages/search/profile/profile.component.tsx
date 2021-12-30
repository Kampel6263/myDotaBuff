import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { State } from "../../../business-logic/redux/config";
import { getProfile } from "../../../business-logic/redux/store";

type ProfileProps = {
  account_id: number;
  personaname: string;
  name: string;
  plus: boolean;
  cheese: number;
  steamid: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  profileurl: string;
  last_login: string;
  loccountrycode: string;
  is_contributor: boolean;
};

type allProfileProps = {
  tracked_until: string;
  solo_competitive_rank: string;
  competitive_rank: string;
  rank_tier: number;
  leaderboard_rank: number;
  mmr_estimate: { estimate: number };
  profile: ProfileProps;
};

const Profile = () => {
  // const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  // const {profile} = useSelector(sta)

  const { profile } = useSelector(
    (state: State): { profile: allProfileProps } => state.general
  );
  console.log(profile);
  useEffect(() => {
    let id = location.pathname.split("/")[4];
    if (id) {
      console.log(id, "id");

      dispatch(getProfile(Number(id)));
    } else {
    }
  }, []);

  console.log(profile, "navigate");
  return (
    <div>
      {profile.profile && (
        <div>
          {" "}
          <img src={profile?.profile?.avatarfull} alt="" />
          <div>Nick name: {profile?.profile?.personaname} </div>
          <div> MMR: {profile?.mmr_estimate?.estimate} </div>
        </div>
      )}
    </div>
  );
};

export default Profile;