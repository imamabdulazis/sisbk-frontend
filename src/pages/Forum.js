import React from "react";
import { styled } from "@material-ui/system";
//component
import Page from "../components/Page";

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

function Forum() {
  return (
    <RootStyle title="Forum">
      <p>OKe</p>
    </RootStyle>
  );
}

export default Forum;
