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
  clearState,
  deleteMateri,
  getJoinMateri,
  materiSelector,
  quitJoinMateri,
} from "../../state/materi/materiSlice";
import Page from "../../components/Page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import MateriCard from "./MateriCard";
import toast from "react-hot-toast";

const SORT_OPTIONS = [
  { value: "latest", label: "Terbaru" },
  { value: "popular", label: "Popular" },
  { value: "oldest", label: "Lama" },
];

function MateriStudent() {
  const dispatch = useDispatch();

  const {
    studentMateri,
    isSuccessGetJoin,
    isErrorGetJoin,
    isLoadingGetJoin,
    errorMessageGetJoin,

    //quit
    isSuccessQuit,
    isLoadingQuit,
    isErrorQuit,
    errorQuitMessage,
  } = useSelector(materiSelector);

  useEffect(() => {
    dispatch(getJoinMateri());
  }, []);

  useEffect(() => {
    if (isSuccessQuit) {
      toast.success("Berhasil hapus materi");
      dispatch(clearState());
      window.location.reload();
    }
    if (isErrorQuit) {
      toast.error(errorQuitMessage);
      dispatch(clearState());
      window.location.reload();
    }
  }, [isSuccessQuit, isErrorQuit]);

  return (
    <Page title="Materi Siswa">
      <Container>
        <Stack
          mb={5}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h4" gutterBottom>
            Materi kamu
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {studentMateri?.map((item, index) => (
            <MateriCard
              key={item.id}
              item={item.materi}
              takeId={item.id}
              index={index}
              isDelete={true}
            />
          ))}
          {studentMateri?.length == 0 && (
            <Typography>Belum terdapat materi</Typography>
          )}
        </Grid>
      </Container>
    </Page>
  );
}

export default MateriStudent;
