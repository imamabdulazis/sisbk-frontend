import React from "react";
import { styled } from "@material-ui/system";
//component
import Page from "../components/Page";

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

function TesPotensi() {
  return <RootStyle title="Tes Potensi"></RootStyle>;
}

export default TesPotensi;
