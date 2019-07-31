import React, { Fragment } from "react";
import LoaderHOC from '../HOC/LoaderHOC'

const List = props => {
  const { data, contentDisplayComponent, theme } = props;
  // console.log(props)
  return data.map((item, idx) => {
    // console.log(item)
    return <Fragment key={idx}>{contentDisplayComponent({item, theme})}</Fragment>;
  });
};

export default LoaderHOC(List);