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
import toast from "react-hot-toast";
import apiHandler from "../../api/apiHandler";
import axios from "axios";
import {
  addMateri,
  clearState,
  materiSelector,
  updateMateri,
} from "../../state/materi/materiSlice";

function EditMateri() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const [isTeacher, setisTeacher] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fileState, setfileState] = useState(null);
  const [fileUrl, setfileUrl] = useState(null);
  const [loading, setloading] = useState(false);
  const {
    materis,
    isSuccessUpdateMateri,
    isSuccessAddMateri,
    isSuccessDeleteMateri,
    isFetching,
    isSuccessFetch,
    isErrorFetch,
    errorMessage,
  } = useSelector(materiSelector);

  const RegisterSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, "Terlalu pendek!")
      .required("Nama wajib di isi"),
    description: Yup.string()
      .min(2, "Terlalu pendek!")
      .required("Gelar wajib di isi"),
  });

  const formik = useFormik({
    initialValues: {
      title: state.title,
      url: state.url,
      description: state.description,
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      let data = {
        title: values.title,
        url: values.url,
        type: state.type,
        description: values.description,
        thumbnail: fileUrl,
      };
      onSubmit(data);
    },
  });
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  const onSubmit = (data) => {
    dispatch(updateMateri({ id: state.id, data: data }));
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (isErrorFetch) {
      toast.error(errorMessage);
      dispatch(clearState());
    }

    if (isSuccessUpdateMateri) {
      dispatch(clearState());
      toast.success("Update Materi Berhasil");
      navigate("/app/materi", { replace: true });
    }
  }, [isErrorFetch, isSuccessUpdateMateri]);

  const onChangeFile = (event) => {
    setfileState(event.target.files[0]);
    uploadImage(event.target.files[0]);
  };

  const uploadImage = (value) => {
    setloading(true);
    const url = " http://localhost:4000";
    const formData = new FormData();
    formData.append("file", value, value?.name);
    formData.append("folder", "materi");
    let headers = {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      Authorization: "Bearer " + window.localStorage.getItem("token"),
    };
    axios({
      method: "POST",
      url: `${url}/api/file`,
      data: formData,
      headers: headers,
      timeout: 10000,
    })
      .then((res) => {
        if (res.status === 200) {
          setloading(false);
          setfileUrl(res.data.url);
          toast.success("Berhasil upload foto");
        } else {
          setloading(false);
          setfileUrl(null);
          toast.error("Gagal upload foto");
        }
      })
      .catch((err) => {
        setloading(false);
        setfileUrl(null);
        toast.error("Gagal upload foto");
      });
  };

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
            Edit Materi
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
                    label="Title"
                    {...getFieldProps("title")}
                    error={Boolean(touched.title && errors.title)}
                    helperText={touched.title && errors.title}
                  />

                  <TextField
                    fullWidth
                    label="Link url youtube"
                    {...getFieldProps("url")}
                    error={Boolean(touched.url && errors.url)}
                    helperText={touched.url && errors.url}
                  />

                  <TextField
                    fullWidth
                    type="text"
                    label="Deskripsi"
                    multiline={true}
                    rows={4}
                    rowsMax={5}
                    {...getFieldProps("description")}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                  />

                  <label htmlFor="btn-upload">
                    <input
                      id="btn-upload"
                      name="btn-upload"
                      style={{ display: "none" }}
                      type="file"
                      onChange={onChangeFile}
                    />
                    <LoadingButton
                      loading={loading}
                      className="btn-choose"
                      variant="outlined"
                      component="span"
                    >
                      Unggah thumbnail
                    </LoadingButton>
                  </label>
                  <span>{fileState?.name}</span>

                  <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    disabled={loading}
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

export default EditMateri;
