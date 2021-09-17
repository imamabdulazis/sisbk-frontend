import React, { useEffect } from "react";
import * as Yup from "yup";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { useFormik, Form, FormikProvider } from "formik";
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
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { LoadingButton } from "@material-ui/lab";
//redux
import { useDispatch, useSelector } from "react-redux";
import {
  userSelector,
  clearState,
  signupUser,
} from "../../../state/user/userSlice";
import toast from "react-hot-toast";

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isTeacher, setisTeacher] = useState(false);
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
    password: Yup.string()
      .min(4, "Terlalu pendek")
      .required("Password wajib di isi"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      address: "",
      password: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      let data = {
        name: values.name,
        username: values.username,
        email: values.email,
        password: values.password,
        address: values.address,
        previlage: isTeacher ? "Guru" : "Siswa",
      };
      onSubmit(data);
    },
  });
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  const handleChange = (event) => {
    setisTeacher(event.target.checked);
  };

  /**handling state */
  const onSubmit = (data) => {
    dispatch(clearState());
    dispatch(signupUser(data));
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
      toast.success("Daftar akun baru berhasil");
      navigate("/login", { replace: true });
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
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
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
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <FormControlLabel
            control={
              <IOSSwitch
                checked={isTeacher}
                {...getFieldProps("previlage")}
                name="checkedB"
                onChange={handleChange}
              />
            }
            label="Daftar Sebagai Guru"
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isFetching}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
