import React, { useEffect } from "react";
// import { useSearchParams } from "react-router-dom";
import axios from "axios";

const ConfirmEmailScreen = ({ history }) => {
  let search = window.location.search;
  const key = search.split("=")[1];

  useEffect(() => {
    axios
      .get(`http://58.84.34.65:8181/api/email-verification/?key=${key}`)
      .then((res) => {
        history.push(`/login`);
      });
  }, [key, history]);

  return <div></div>;
};

export default ConfirmEmailScreen;
