import React from "react";
import * as Yup from "yup";
const useSearchData = () => {
  const searchShema = Yup.object().shape({
    text: Yup.string()
      .trim()
      .min(2, "Too short")
      .max(19, "Too long")
      .required("Required"),
  });

  return { searchShema };
};

export { useSearchData };
