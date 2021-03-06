import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import homeFill from "@iconify/icons-eva/home-fill";
import personFill from "@iconify/icons-eva/person-fill";
import settings2Fill from "@iconify/icons-eva/settings-2-fill";
import { Link as RouterLink } from "react-router-dom";
// material
import { alpha } from "@material-ui/core/styles";
import {
  Button,
  Box,
  Divider,
  MenuItem,
  Typography,
  Avatar,
  IconButton,
} from "@material-ui/core";
// components
import MenuPopover from "../../components/MenuPopover";
//
// import account from "../../_mocks_/account";
import { useNavigate } from "react-router";
import apiHandler from "../../api/apiHandler";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  // {
  //   label: "Profile",
  //   icon: personFill,
  //   linkTo: "/app/profile",
  // },
  // {
  //   label: "Settings",
  //   icon: settings2Fill,
  //   linkTo: "/app/setting",
  // },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigation = useNavigate();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [account, setAccount] = useState();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onLogout = () => {
    localStorage.removeItem("token");
    navigation("/login", { replace: true });
  };

  useEffect(() => {
    getAccount();
  }, []);

  const getAccount = async () => {
    let response = await apiHandler.get(
      `/api/user/${localStorage.getItem("user_id")}`
    );
    if (response.status == 200) {
      setAccount(response.data?.data);
    }
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        <Avatar src={account?.image_url} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {account?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {account?.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: "body2", py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24,
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button
            onClick={onLogout}
            fullWidth
            color="inherit"
            variant="outlined"
          >
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
