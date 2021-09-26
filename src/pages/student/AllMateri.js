import { Icon } from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Link as RouterLink } from "react-router-dom";
// material
import { Grid, Button, Container, Stack, Typography } from "@material-ui/core";
// components
import {
  BlogPostCard,
  BlogPostsSort,
  BlogPostsSearch,
} from "../../components/_dashboard/blog";
//

import {
  deleteMateri,
  getAllMateri,
  materiSelector,
} from "../../state/materi/materiSlice";
import Page from "../../components/Page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import MateriCard from "./MateriCard";

const SORT_OPTIONS = [
  { value: "latest", label: "Terbaru" },
  { value: "popular", label: "Popular" },
  { value: "oldest", label: "Lama" },
];

function AllMateri() {
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(getAllMateri());
  }, []);

  return (
    <Page title="Dashboard: Materi">
      <Container>
        <Stack
          mb={5}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {/* <BlogPostsSearch posts={POSTS} /> */}
          {/* <BlogPostsSort options={SORT_OPTIONS} /> */}
        </Stack>

        <Grid container spacing={3}>
          {materis?.map((item, index) => (
            <MateriCard key={item.id} item={item} index={index} />
          ))}
        </Grid>
      </Container>
    </Page>
  );
}

export default AllMateri;
