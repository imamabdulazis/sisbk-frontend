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

// ----------------------------------------------------------------------

export default function KontakStudent() {
  const dispatch = useDispatch();
  const {
    contacts,
    isFetchingContact,
    isSuccessContact,
    isSuccessDeleteContact,
    isErrorContact,
    errorMessageContact,
  } = useSelector(contactSelector);

  useEffect(() => {
    dispatch(fetchAllContact());
  }, []);

  return (
    <Page title="Dashboard: Products">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Kontak Guru
        </Typography>
        <ContactList contacts={contacts} />
      </Container>
    </Page>
  );
}
