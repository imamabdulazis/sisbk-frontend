import { useFormik } from "formik";
import { useEffect, useState } from "react";
// material
import { Container, Stack, Typography } from "@material-ui/core";
// components
import Page from "../../components/Page";
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar,
} from "../../components/_dashboard/products";
//
import PRODUCTS from "../../_mocks_/products";
import { useDispatch, useSelector } from "react-redux";
import {
  contactSelector,
  fetchAllContact,
} from "../../state/contact/contactSlice";
import ContactList from "./ContactList";
import CategoryQuizList from "./CategoryQuizList";
import apiHandler from "../../api/apiHandler";

// ----------------------------------------------------------------------

export default function CategoryQuiz() {
  const dispatch = useDispatch();

  const [category, setCategory] = useState([]);

  useEffect(() => {
    getAllCategoryQuiz();
  }, []);

  const getAllCategoryQuiz = async () => {
    let response = await apiHandler.get("api/quiz_type");
    if (response.status === 200) {
      setCategory(response.data?.data);
    }
  };

  return (
    <Page title="Dashboard: Category">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Kategori Tes
        </Typography>
        <CategoryQuizList category={category} />
      </Container>
    </Page>
  );
}
