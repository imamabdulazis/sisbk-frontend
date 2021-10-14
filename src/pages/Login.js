import { Link as RouterLink } from "react-router-dom";
// material
import { styled } from "@material-ui/core/styles";
import { Card, Stack, Link, Container, Typography } from "@material-ui/core";
// layouts
import AuthLayout from "../layouts/AuthLayout";
// components
import Page from "../components/Page";
import { MHidden } from "../components/@material-extend";
import { LoginForm } from "../components/authentication/login";
import AuthSocial from "../components/authentication/AuthSocial";

import { useSelector, useDispatch } from "react-redux";
import { loginUsers, userSelector } from "../state/user/userSlice";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const LogoStyle = styled("div")(({ theme }) => ({
  width: 100,
  height: 100,
  display: "flex",
  alignSelf: "center",
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  return (
    <RootStyle title="Login">
      <AuthLayout>
        Apakah kamu belum punya akun? &nbsp;
        <Link
          underline="none"
          variant="subtitle2"
          component={RouterLink}
          to="/register"
        >
          Daftar
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hi, Selamat datang
          </Typography>
          <img src="/static/illustrations/illustration_login.png" alt="login" />
          <Stack direction="row">
            <LogoStyle>
              <img src="/static/logo/uty.png" alt="uty" />
              <img src="/static/logo/smk.jpeg" alt="smk" />
            </LogoStyle>
          </Stack>
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Masuk
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Masukan identitas login.
            </Typography>
          </Stack>
          {/* <AuthSocial /> */}

          <LoginForm />

          <MHidden width="smUp">
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Apakah kamu belum punya akun? &nbsp;
              <Link variant="subtitle2" component={RouterLink} to="/register">
                Daftar
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
