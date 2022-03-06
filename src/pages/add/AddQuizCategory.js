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

function AddQuizType() {
  const navigate = useNavigate();

  const [loading, setloading] = useState(false);

  const [isTrue, setiSTrue] = useState(false);

  const RegisterSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, "Terlalu pendek!")
      .required("Nama Kategori wajib di isi wajib di isi"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      let data = {
        user_id: localStorage.getItem("user_id"),
        title: values.title,
      };
      onSubmit(data);
    },
  });
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  const onSubmit = (data) => {
    addQuiz(data);
  };

  const addQuiz = async (data) => {
    setloading(true);
    let response = await apiHandler.post(`api/quiz_type`, data);
    if (response.status === 200) {
      setloading(false);
      toast.success("Berhasil simpan data");
      navigate("/app/tes", { replace: true });
    } else {
      toast.error("Terjadi kesalahan");
      setloading(false);
    }
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
            Tambah Kategori Tes
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

                  <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    loading={loading}
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

export default AddQuizType;
