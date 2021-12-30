import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../business-logic/redux/config";
import { search } from "../../business-logic/redux/store";
import { useNavigate } from "react-router-dom";

import classes from "./search.module.scss";

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
  const handleSubmit = (values: initialValuesProps) => {
    dispatch(search(values.text));
  };
  const navigate = useNavigate();

  const { searchResult } = useSelector(
    (state: State): { searchResult: SearchResultProps[] } => state.general
  );

  const initialValues: initialValuesProps = {
    text: "",
  };

  return (
    <div className={classes.search}>
      <h2>Search</h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <Field id="text" name="text" placeholder="Name" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>

      {searchResult.length !== 0 && (
        <div className={classes.result}>
          {searchResult.map((el, i) => (
            <div
              key={i}
              className={classes.card}
              onClick={() => {
                navigate(`/search/profile/${el.account_id}`);
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
      )}
    </div>
  );
};

export default Search;
