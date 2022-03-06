import { filter } from "lodash";
import { Icon } from "@iconify/react";
import { sentenceCase } from "change-case";
import { useEffect, useState } from "react";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from "@material-ui/core";
// components
import Page from "../../components/Page";
import Label from "../../components/Label";
import Scrollbar from "../../components/Scrollbar";
import SearchNotFound from "../../components/SearchNotFound";
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
} from "../../components/_dashboard/user";
//
//REDUX
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import moment from "moment";
import apiHandler from "../../api/apiHandler";

// import USERLIST from "../_mocks_/user";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "question", label: "Pertanyaan", alignRight: false },
  { id: "correct_answer", label: "Jawaban", alignRight: false },
  { id: "updated_at", label: "Update", alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) =>
        _user.question.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

function QuizDataByCategory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [quiz, setquiz] = useState([]);
  const [isSuccessDeleteQuiz, setisSuccessDeleteQuiz] = useState(false);

  const [isSuccessFetch, setisSuccessFetch] = useState(false);
  const [isErrorFetch, setisErrorFetch] = useState(false);

  useEffect(() => {
    getAllQuiz();
  }, [isSuccessFetch, isErrorFetch]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = quiz.map((n) => n.question);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, question) => {
    const selectedIndex = selected.indexOf(question);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, question);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - quiz.length) : 0;

  const filteredUsers = applySortFilter(
    quiz,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  const onDelete = (item) => {
    deleteMateri(item.id);
  };

  useEffect(() => {
    if (isSuccessDeleteQuiz) {
      toast.success("Berhasil hapus");
      window.location.reload();
    }
  }, [isSuccessDeleteQuiz]);

  const getAllQuiz = async () => {
    let response = await apiHandler.get(`api/quiz/${location?.state?.id}`);
    if (response.status === 200) {
      setquiz(response.data?.data);
    }
  };

  const deleteMateri = async (id) => {
    setisSuccessDeleteQuiz(false);
    let response = await apiHandler.delete(`/api/quiz/${id}`);
    if (response.status == 200) {
      setisSuccessDeleteQuiz(true);
    }
  };

  return (
    <Page title="Tes">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Tes - {location?.state?.title}
          </Typography>
          <Button
            onClick={() => navigate("/app/quiz/add", { state: location.state })}
            variant="contained"
            startIcon={<Icon icon={plusFill} />}
          >
            Tambah
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={quiz.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, question, correct_answer, updated_at } = row;
                      const isItemSelected = selected.indexOf(question) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            {/* <Checkbox
                          checked={isItemSelected}
                          onChange={(event) => handleClick(event, name)}
                        /> */}
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Typography variant="subtitle2" noWrap>
                                {question}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{correct_answer}</TableCell>
                          {/* <TableCell align="left">{description}</TableCell> */}
                          <TableCell align="left">
                            {moment(updated_at).format("DD MMM yyyy")}
                            {/* {`${updated_at} oke`} */}
                          </TableCell>
                          {/* <TableCell align="left">
                        {isVerified ? "Yes" : "No"}
                      </TableCell> */}
                          {/* <TableCell align="left">
                        <Label
                          variant="ghost"
                          color={
                            (status === "banned" && "error") || "success"
                          }
                        >
                          {sentenceCase(status)}
                        </Label>
                      </TableCell> */}

                          <TableCell align="right">
                            <UserMoreMenu
                              route="/app/quiz/edit"
                              item={row}
                              onDelete={onDelete}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={quiz.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}

export default QuizDataByCategory;
