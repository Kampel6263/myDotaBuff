import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../business-logic/redux/config";
import { search } from "../../business-logic/redux/store";
import { useLocation, useNavigate } from "react-router-dom";

import classes from "./search.module.scss";
import { PreloaderEnum } from "../../types/preloader";
import Preloader from "../../components/preloader/preloader.coponent";
import { useSearchData } from "./search.hook";

type SearchResultProps = {
  account_id: number;
  avatarfull: string;
  last_match_time: string;
  personaname: string;
  similarity: number;
};

type initialValuesProps = {
  text: string;
};

// const {search} useSelector

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const name = location.pathname.split("/")[2];
  const handleSubmit = (values: initialValuesProps) => {
    navigate(`/search/${values.text}`);
  };
  const { searchResult, showPreloader } = useSelector(
    (
      state: State
    ): { searchResult: SearchResultProps[]; showPreloader: number | null } =>
      state.general
  );
  const { searchShema } = useSearchData();
  useEffect(() => {
    if (name) {
      dispatch(search(name));
    }
  }, [name]);

  const initialValues: initialValuesProps = {
    text: "",
  };

  return (
    <div className={classes.search}>
      <h2>Search players</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={searchShema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Field id="text" name="text" placeholder="Nick name" />
            <button disabled={!!errors.text} type="submit">
              Submit
            </button>
            <div className={classes.error}>{touched.text && errors.text}</div>
          </Form>
        )}
      </Formik>
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
                      ? el.last_match_time
                      : "Never been play Dota 2"}
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
