import {
  Card,
  Container,
  Divider,
  Avatar,
  Typography,
  Paper,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import Page from "../../components/Page";
import {
  detailMateri,
  materiSelector,
  joinMateri,
  clearState,
} from "../../state/materi/materiSlice";
import ReactPlayer from "react-player/youtube";
import { LoadingButton } from "@material-ui/lab";
import toast from "react-hot-toast";

const VideoStyle = styled("div")({
  position: "relative",
  width: "60%",
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  width: 32,
  height: 32,
  // left: theme.spacing(3),
  // bottom: theme.spacing(-2),
}));

const RowStyle = styled("div")({
  display: "flex",
});

const RowStyleBetween = styled("div")({
  display: "flex",
  width: "60%",
  justifyContent: "space-between",
  paddingRight: 7,
});

function DetailMateri() {
  const { state } = useLocation();
  const dispatch = useDispatch();

  const {
    materi,
    isSuccessUpdateMateri,
    isSuccessAddMateri,
    isSuccessDeleteMateri,
    isFetching,
    isSuccessFetch,
    isErrorFetch,
    errorMessage,
    //JOIN
    isSuccessJoin,
    isLoadingJoin,
    isErrorJoin,
    errorJoinMessage,
  } = useSelector(materiSelector);

  useEffect(() => {
    dispatch(detailMateri(state.id));
  }, []);

  const onJoinMateri = () => {
    dispatch(
      joinMateri({
        student_id: localStorage.getItem("user_id"),
        materi_id: state?.id,
      })
    );
  };

  useEffect(() => {
    if (isErrorJoin) {
      toast.error(errorJoinMessage);
      dispatch(clearState());
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    if (isSuccessJoin) {
      toast.success("Berhasil bergabung ke materi");
      dispatch(clearState());
    }
  }, [isSuccessJoin, isErrorJoin]);

  return (
    <Page title="Materi">
      <Container>
        <VideoStyle>
          {!!materi?.url ? (
            <ReactPlayer
              style={{ width: "60%", top: 0, left: 0 }}
              url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
            />
          ) : (
            <Paper variant="outlined">
              <img src={materi?.thumbnail} />
            </Paper>
          )}
        </VideoStyle>
        <div style={{ height: 10 }} />
        <RowStyleBetween>
          <Typography variant="h4" noWrap>
            {materi?.title}
          </Typography>
          <LoadingButton
            onClick={onJoinMateri}
            size="large"
            variant="contained"
            disabled={isLoadingJoin}
            loading={isLoadingJoin}
          >
            Gabung
          </LoadingButton>
        </RowStyleBetween>
        <Divider style={{ height: 20 }} />
        <div style={{ height: 10 }} />
        <RowStyle>
          <AvatarStyle
            alt={materi?.users?.name}
            src={materi?.users?.image_url}
            sx={{
              width: 50,
              height: 50,
            }}
          />
          <div style={{ width: 10 }} />
          <div>
            <Typography variant="subtitle1" noWrap>
              {materi?.users?.name}
            </Typography>
            <Typography variant="subtitle2" style={{ color: "grey" }} noWrap>
              {materi?.users?.previlage}
            </Typography>
          </div>
        </RowStyle>
        <div style={{ height: 10 }} />
        <p>{materi?.description}</p>
      </Container>
    </Page>
  );
}

export default DetailMateri;
