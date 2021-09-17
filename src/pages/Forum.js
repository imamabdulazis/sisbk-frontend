import React from "react";
import { styled } from "@material-ui/system";
import { useFormik } from "formik";
import { useState } from "react";
// material
import {
  Container,
  Stack,
  Box,
  Card,
  Typography,
  IconButton,
  Icon,
  Toolbar,
} from "@material-ui/core";
// components
import Page from "../components/Page";
import AuthSocial from "../components/authentication/AuthSocial";
import { MHidden } from "../components/@material-extend";
import Searchbar from "../layouts/dashboard/Searchbar";
import ForumTextInput from "../layouts/dashboard/ForumTextinput";
import MainChat from "../components/chat/MainChat";

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  marginTop: 10,
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

function Forum() {
  const [goSearch, setgoSearch] = useState(false);
  return (
    <Page title="Dashboard: Products">
      <Container>
        <Card style={{ height: 650 }}>
          <MainChat />
        </Card>
      </Container>
    </Page>
  );
}

export default Forum;
