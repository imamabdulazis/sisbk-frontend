import React, { useEffect } from "react";
import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider, useFormikContext } from "formik";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import { useNavigate } from "react-router-dom";
// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Switch,
  Container,
  Typography,
  Button,
  Card,
  Box,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { LoadingButton } from "@material-ui/lab";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import saveFill from "@iconify/icons-eva/save-fill";
import Page from "../../components/Page";
import { useDispatch, useSelector } from "react-redux";
import {
  userSelector,
  clearState,
  updateUserById,
} from "../../state/user/userSlice";
import toast from "react-hot-toast";

function EditUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const [isChangePassword, setisChangePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(userSelector);

  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Terlalu pendek!")
      .max(50, "Terlalu panjang!")
      .required("Nama wajib di isi"),
    username: Yup.string()
      .min(2, "Terlalu pendek!")
      .max(50, "Terlalu panjang!")
      .required("Username wajib di isi"),
    email: Yup.string()
      .email("Email harus berupa alamat email yang valid")
      .required("Email wajib di isi"),
  });

  const formik = useFormik({
    initialValues: {
      name: state.name,
      username: state.username,
      email: state.email,
      address: state.address,
      password: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      if (isChangePassword) {
        let data = {
          name: values.name,
          username: values.username,
          email: values.email,
          password: values.password,
          previlage: state.previlage,
          address: values.address,
          is_change_password: true,
        };
        onSubmit(data);
      } else {
        let data = {
          name: values.name,
          username: values.username,
          email: values.email,
          address: values.address,
          previlage: state.previlage,
          is_change_password: false,
        };
        onSubmit(data);
      }
    },
  });
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  /**handling state */
  const handleChange = (event) => {
    setisChangePassword(event.target.checked);
  };

  const onSubmit = (data) => {
    dispatch(clearState());
    dispatch(updateUserById({ id: state.id, data: data }));
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
      dispatch(clearState());
    }

    if (isSuccess) {
      dispatch(clearState());
      toast.success("Update User Berhasil");
      navigate("/app/user", { replace: true });
    }
  }, [isError, isSuccess]);

  const IOSSwitch = withStyles((theme) => ({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      "&$checked": {
        transform: "translateX(16px)",
        color: theme.palette.common.white,
        "& + $track": {
          backgroundColor: "#52d869",
          opacity: 1,
          border: "none",
        },
      },
      "&$focusVisible $thumb": {
        color: "#52d869",
        border: "6px solid #fff",
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(["background-color", "border"]),
    },
    checked: {},
    focusVisible: {},
  }))(({ classes, ...props }) => {
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
  });

  return (
    <Page title="User">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Edit User
          </Typography>
        </Stack>
        <Card>
          <Box sx={{ p: 5 }}>
            <Box sx={{ mb: 5 }} />
            <FormikProvider value={formik}>
              <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={4}>
                  <TextField
                    fullWidth
                    label="Nama"
                    {...getFieldProps("name")}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />

                  <TextField
                    fullWidth
                    label="Username"
                    {...getFieldProps("username")}
                    error={Boolean(touched.username && errors.username)}
                    helperText={touched.username && errors.username}
                  />

                  <TextField
                    fullWidth
                    autoComplete="email"
                    type="email"
                    label="Email"
                    {...getFieldProps("email")}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />

                  <TextField
                    fullWidth
                    type="text"
                    label="Alamat"
                    multiline={true}
                    rows={2}
                    rowsMax={4}
                    {...getFieldProps("address")}
                    error={Boolean(touched.address && errors.address)}
                    helperText={touched.address && errors.address}
                  />

                  <FormControlLabel
                    control={
                      <IOSSwitch
                        checked={isChangePassword}
                        {...getFieldProps("previlage")}
                        name="checkedB"
                        onChange={handleChange}
                      />
                    }
                    label="Ganti password?"
                  />

                  {isChangePassword && (
                    <TextField
                      fullWidth
                      autoComplete="current-password"
                      type={showPassword ? "text" : "password"}
                      label="Password"
                      {...getFieldProps("password")}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              onClick={() => setShowPassword((prev) => !prev)}
                            >
                              <Icon
                                icon={showPassword ? eyeFill : eyeOffFill}
                              />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
                    />
                  )}

                  <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isFetching}
                    startIcon={<Icon icon={saveFill} />}
                  >
                    Simpan
                  </LoadingButton>
                </Stack>
              </Form>
            </FormikProvider>
          </Box>
        </Card>
      </Container>
    </Page>
  );
}

export default EditUser;
