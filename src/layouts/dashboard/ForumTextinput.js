import { Icon } from "@iconify/react";
import { useState } from "react";
import searchFill from "@iconify/icons-eva/search-fill";
// material
import { styled, alpha } from "@material-ui/core/styles";
import {
  Box,
  Input,
  Slide,
  Button,
  InputAdornment,
  ClickAwayListener,
  IconButton,
} from "@material-ui/core";

// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const SearchbarStyle = styled("div")(({ theme }) => ({
  bottom: 0,
  left: 0,
  zIndex: 99,
  width: "100%",
  display: "flex",
  position: "absolute",
  alignSelf:'center',
  alignItems: "center",
  height: APPBAR_MOBILE,
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
  [theme.breakpoints.up("md")]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
  borderRadius: 20,
}));

// ----------------------------------------------------------------------

export default function ForumTextInput(goSearch) {
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
    goSearch = true;
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <SearchbarStyle>
        <Input
          autoFocus
          fullWidth
          disableUnderline
          placeholder="Search…"
          startAdornment={
            <InputAdornment position="start">
              <Box
                component={Icon}
                icon={searchFill}
                sx={{ color: "text.disabled", width: 20, height: 20 }}
              />
            </InputAdornment>
          }
          sx={{ mr: 1, fontWeight: "fontWeightBold" }}
        />
        <Button variant="contained" onClick={handleClose}>
          Kirim
        </Button>
      </SearchbarStyle>
    </ClickAwayListener>
  );
}
