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

function AddQuiz() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [loading, setloading] = useState(false);

  const [isTrue, setiSTrue] = useState(false);

  const RegisterSchema = Yup.object().shape({
    question: Yup.string()
      .min(5, "Terlalu pendek!")
      .required("Pertanyaan wajib di isi wajib di isi"),
    correct_answer: Yup.string()
      .min(1, "Terlalu pendek!")
      .required("Pertanyaan wajib di isi wajib di isi"),
    incorrect_answers: Yup.string()
      .min(1, "Terlalu pendek!")
      .required("Pertanyaan wajib di isi wajib di isi"),
  });

  // console.log(state.title);

  const formik = useFormik({
    initialValues: {
      question: "",
      correct_answer: "",
      incorrect_answers: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      let data = {
        quiz_type_id: state.id,
        question: values.question,
        correct_answer: values.correct_answer,
        incorrect_answers: values.incorrect_answers,
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
    let response = await apiHandler.post(`api/quiz`, data);
    if (response.status === 200) {
      setloading(false);
      toast.success("Berhasil simpan data");
      navigate(-1);
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
            Tambah Pertanyaan Tes
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
                    label="Pertanyaan"
                    {...getFieldProps("question")}
                    error={Boolean(touched.question && errors.question)}
                    helperText={touched.question && errors.question}
                  />

                  <TextField
                    fullWidth
                    label="Jawaban Benar"
                    {...getFieldProps("correct_answer")}
                    error={Boolean(
                      touched.correct_answer && errors.correct_answer
                    )}
                    helperText={touched.correct_answer && errors.correct_answer}
                  />

                  <TextField
                    fullWidth
                    label="Jawaban Salah"
                    {...getFieldProps("incorrect_answers")}
                    error={Boolean(
                      touched.incorrect_answers && errors.incorrect_answers
                    )}
                    helperText={
                      touched.incorrect_answers && errors.incorrect_answers
                    }
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

export default AddQuiz;
