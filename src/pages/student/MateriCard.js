import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// import shareFill from "@iconify/icons-eva/share-fill";
import heartFill from "@iconify/icons-eva/heart-fill";
import red from "@material-ui/core/colors/red";
// material
import { alpha, styled } from "@material-ui/core/styles";
import {
  Box,
  Link,
  Card,
  Grid,
  Button,
  Avatar,
  Typography,
  CardContent,
} from "@material-ui/core";
import SvgIconStyle from "../../components/SvgIconStyle";
import { fDate } from "../../utils/formatTime";
import { fShortenNumber } from "../../utils/formatNumber";
import { withStyles } from "@material-ui/styles";
import { LoadingButton } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  materiSelector,
  quitJoinMateri,
} from "../../state/materi/materiSlice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
// utils
//

// ----------------------------------------------------------------------

const CardMediaStyle = styled("div")({
  position: "relative",
  paddingTop: "calc(100% * 3 / 4)",
});

const TitleStyle = styled(Link)({
  height: 44,
  overflow: "hidden",
  WebkitLineClamp: 2,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: "absolute",
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const InfoStyle = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-end",
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const CoverImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

const styles = (theme) => ({
  containedRed: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700],
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: red[500],
      },
    },
  },
});

// ----------------------------------------------------------------------

MateriCard.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number,
  classes: PropTypes.object.isRequired,
  onDeleteMateri: PropTypes.func,
};

function MateriCard({
  classes,
  takeId,
  item,
  isDelete,
  onDeleteMateri,
  index,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { thumbnail, title, users, created_at } = item;
  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;

  const [loading, setloading] = useState(false);

  const POST_INFO = [
    { number: 10, icon: heartFill },
    { number: 10, icon: eyeFill },
    // { number: share, icon: shareFill }
  ];

  const {
    //quit
    isSuccessQuit,
    isLoadingQuit,
    isErrorQuit,
    errorQuitMessage,
  } = useSelector(materiSelector);

  const onQuitMateri = () => {
    setloading(true);
    dispatch(quitJoinMateri(takeId));
  };

  useEffect(() => {
    if (isSuccessQuit) {
      setloading(false);
      toast.success("Berhasil hapus materi");
      dispatch(clearState());
      window.location.reload();
    }
    if (isErrorQuit) {
      setloading(false);
      toast.error(errorQuitMessage);
      dispatch(clearState());
      window.location.reload();
    }
  }, [isSuccessQuit, isErrorQuit]);

  return (
    <Grid
      item
      xs={12}
      sm={latestPostLarge ? 12 : 6}
      md={latestPostLarge ? 6 : 3}
    >
      <Card sx={{ position: "relative" }}>
        <CardMediaStyle
          sx={{
            ...((latestPostLarge || latestPost) && {
              pt: "calc(100% * 4 / 3)",
              "&:after": {
                top: 0,
                content: "''",
                width: "100%",
                height: "100%",
                position: "absolute",
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              },
            }),
            ...(latestPostLarge && {
              pt: {
                xs: "calc(100% * 4 / 3)",
                sm: "calc(100% * 3 / 4.66)",
              },
            }),
          }}
        >
          <SvgIconStyle
            color="paper"
            src="/static/icons/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: "absolute",
              ...((latestPostLarge || latestPost) && { display: "none" }),
            }}
          />
          <AvatarStyle
            alt={users.name}
            src={users.image_url}
            sx={{
              ...((latestPostLarge || latestPost) && {
                zIndex: 9,
                top: 24,
                left: 24,
                width: 40,
                height: 40,
              }),
            }}
          />

          <CoverImgStyle alt={title} src={thumbnail} />
        </CardMediaStyle>

        <CardContent
          sx={{
            pt: 4,
            ...((latestPostLarge || latestPost) && {
              bottom: 0,
              width: "100%",
              position: "absolute",
            }),
          }}
        >
          <Typography
            gutterBottom
            variant="caption"
            sx={{ color: "text.disabled", display: "block" }}
          >
            {fDate(created_at)}
          </Typography>

          <TitleStyle
            to="/app/detail_materi"
            state={item}
            color="inherit"
            variant="subtitle2"
            underline="hover"
            component={RouterLink}
            sx={{
              ...(latestPostLarge && { typography: "h5", height: 60 }),
              ...((latestPostLarge || latestPost) && {
                color: "common.white",
              }),
            }}
          >
            {title}
          </TitleStyle>

          <InfoStyle>
            {POST_INFO.map((info, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  ml: index === 0 ? 0 : 1.5,
                  ...((latestPostLarge || latestPost) && {
                    color: "grey.500",
                  }),
                }}
              >
                <Box
                  component={Icon}
                  icon={info.icon}
                  sx={{ width: 16, height: 16, mr: 0.5 }}
                />
                <Typography variant="caption">
                  {fShortenNumber(info.number)}
                </Typography>
              </Box>
            ))}
          </InfoStyle>
          {!!isDelete && (
            <LoadingButton
              loading={loading}
              disabled={loading}
              onClick={onQuitMateri}
              variant="text"
              className={classes.containedRed}
            >
              Hapus
            </LoadingButton>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
}

export default withStyles(styles)(MateriCard);
