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
} from "../../state/materi/materiSlice";

function AddMateri() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [fileState, setfileState] = useState(null);
  const [fileUrl, setfileUrl] = useState(null);

  const [newFileState, setNewFileState] = useState(null);
  const [newFileUri, setNewFileUri] = useState(null);

  const [loading, setloading] = useState(false);
  const [loadingFile, setloadingFile] = useState(false);

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
      .max(50, "Terlalu panjang!")
      .required("Nama wajib di isi"),
    description: Yup.string()
      .min(2, "Terlalu pendek!")
      .required("Gelar wajib di isi"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      url: "",
      file: "",
      description: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      let data = {
        author_id: localStorage.getItem("user_id"),
        title: values.title,
        url: values.url,
        description: values.description,
        type: values.url != null ? 1 : 2,
        thumbnail: fileUrl,
        file: newFileUri,
      };
      onSubmit(data);
    },
  });
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  const onSubmit = (data) => {
    dispatch(addMateri(data));
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

    if (isSuccessAddMateri) {
      dispatch(clearState());
      toast.success("Tambah Materi Berhasil");
      navigate("/app/materi", { replace: true });
    }
  }, [isErrorFetch, isSuccessAddMateri]);

  const onChangeFile = (event) => {
    setfileState(event.target.files[0]);
    uploadImage(event.target.files[0]);
  };

  const onChangeFileState = (event) => {
    setNewFileState(event.target.files[0]);
    uploadFileNew(event.target.files[0]);
  };

  const uploadImage = (value) => {
    setloading(true);
    const url = "https://sisbk-backend.herokuapp.com";
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

  const uploadFileNew = (value) => {
    setloadingFile(true);
    const url = "https://sisbk-backend.herokuapp.com";
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
          setloadingFile(false);
          setNewFileUri(res.data.url);
          toast.success("Berhasil upload file");
        } else {
          setloadingFile(false);
          setNewFileUri(null);
          toast.error("Gagal upload file");
        }
      })
      .catch((err) => {
        setloadingFile(false);
        setNewFileUri(null);
        toast.error("Gagal upload file");
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
            Tambah Materi
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
                    label="Link url"
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

                  <label htmlFor="btn-upload-file">
                    <input
                      id="btn-upload-file"
                      name="btn-upload-file"
                      style={{ display: "none" }}
                      type="file"
                      onChange={onChangeFileState}
                    />
                    <LoadingButton
                      loading={loadingFile}
                      className="btn-choose"
                      variant="outlined"
                      component="span"
                    >
                      Unggah file maximal 1
                    </LoadingButton>
                  </label>
                  <span>{newFileState?.name}</span>

                  <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    disabled={loading || loadingFile}
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

export default AddMateri;
