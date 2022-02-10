import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../business-logic/redux/config";
import { search } from "../../business-logic/redux/store";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import classes from "./search.module.scss";
import { PreloaderEnum } from "../../types/preloader";
import Preloader from "../../components/preloader/preloader.coponent";
import { useSearchData } from "./search.hook";
import dayjs from "dayjs";
import useDebounce from "../../core/hooks/debounce.hook";

type SearchResultProps = {
  account_id: number;
  avatarfull: string;
  last_match_time: string;
  personaname: string;
  similarity: number;
};

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const name = location.pathname.split("/")[2];
  const [searchValue, setSearchValue] = useState<string>("");
  const { searchResult, showPreloader } = useSelector(
    (
      state: State
    ): { searchResult: SearchResultProps[]; showPreloader: number | null } =>
      state.general
  );
  const {} = useSearchData();
  useEffect(() => {
    if (name) {
      dispatch(search(name));
    }
  }, [name]);

  const debouncedSearch = useDebounce(searchValue, 500);
  useEffect(() => {
    if (debouncedSearch) {
      navigate(`/search/${debouncedSearch}`);
    } else {
      navigate(`/search/`);
    }
  }, [debouncedSearch]);
  return (
    <div className={classes.search}>
      <h2>Search players</h2>
      <input
        placeholder="Nick name"
        type="text"
        onChange={(e: any) => setSearchValue(e.target.value)}
      />
      <NavLink className={classes.author} to="/profile/1002753142">
        Author(kampel)
      </NavLink>
      <NavLink className={classes.author} to="/profile/1276669669">
        Vova
      </NavLink>
      {showPreloader === PreloaderEnum.SearchResult ? (
        <Preloader />
      ) : (
        <React.Fragment>
          {searchResult.length !== 0 && name ? (
            <div className={classes.result}>
              {searchResult.map((el, i) => (
                <div
                  key={i}
                  className={classes.card}
                  onClick={() => {
                    navigate(`/profile/${el.account_id}`);
                  }}
                >
                  <img src={el.avatarfull} alt="" />
                  <div>{el.personaname}</div>
                  <div>
                    {el.last_match_time
                      ? dayjs(el.last_match_time).format("DD/MM/YYYY")
                      : "no info"}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={classes.emptyList}> Players was not found </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default Search;
