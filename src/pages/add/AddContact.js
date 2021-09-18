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
import { addNewContact, clearStateContact, contactSelector } from "../../state/contact/contactSlice";

function AddContact() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isTeacher, setisTeacher] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    contacts,
    isFetchingContact,
    isSuccessContact,
    isSuccessAddContact,
    isSuccessDeleteContact,
    isErrorContact,
    errorMessageContact,
  } = useSelector(contactSelector);

  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Terlalu pendek!")
      .max(50, "Terlalu panjang!")
      .required("Nama wajib di isi"),
    phone: Yup.string()
      .min(10, "Terlalu pendek!")
      .max(50, "Terlalu panjang!")
      .required("Nomor telepon wajib di isi"),
    email: Yup.string()
      .email("Email harus berupa alamat email yang valid")
      .required("Email wajib di isi"),
    edu_title: Yup.string()
      .min(2, "Terlalu pendek!")
      .max(50, "Terlalu panjang!")
      .required("Gelar wajib di isi"),
    job_desc: Yup.string()
      .min(2, "Terlalu pendek!")
      .max(50, "Terlalu panjang!")
      .required("Gelar wajib di isi"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      job_desc: "",
      edu_title: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      let data = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        address: values.address,
        job_desc: values.job_desc,
        edu_title: values.edu_title,
      };
      onSubmit(data);
    },
  });
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  const onSubmit = (data) => {
    dispatch(clearStateContact());
    dispatch(addNewContact(data));
  };

  useEffect(() => {
    return () => {
      dispatch(clearStateContact());
    };
  }, []);

  useEffect(() => {
    if (isErrorContact) {
      toast.error(errorMessageContact);
      dispatch(clearStateContact());
    }

    if (isSuccessAddContact) {
      dispatch(clearStateContact());
      toast.success("Tambah User Berhasil");
      navigate("/app/kontak", { replace: true });
    }
  }, [isErrorContact, isSuccessAddContact]);

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
            Tambah Kontak Guru
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
                    autoComplete="email"
                    type="email"
                    label="Email"
                    {...getFieldProps("email")}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />

                  <TextField
                    fullWidth
                    label="No Telepon"
                    {...getFieldProps("phone")}
                    error={Boolean(touched.phone && errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />

                  <TextField
                    fullWidth
                    label="Job Deskripsi"
                    {...getFieldProps("job_desc")}
                    error={Boolean(touched.job_desc && errors.job_desc)}
                    helperText={touched.job_desc && errors.job_desc}
                  />

                  <TextField
                    fullWidth
                    label="Gelar"
                    {...getFieldProps("edu_title")}
                    error={Boolean(touched.edu_title && errors.edu_title)}
                    helperText={touched.edu_title && errors.edu_title}
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

                  <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isFetchingContact}
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

export default AddContact;
