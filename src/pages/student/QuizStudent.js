import {
  Card,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import { styled } from "@material-ui/styles";
import closeFill from "@iconify/icons-eva/close-fill";
import React, { Component } from "react";
import toast from "react-hot-toast";
import apiHandler from "../../api/apiHandler";
import QuestionPanel from "../../components/QuestionPanel/QuestionPanel";
import ResultChart from "./ResultChart";
// import data from "../../_mocks_/quiz-data.json";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <closeFill />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};
class QuizStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      current_question: null,
      current_question_no: 1,
      total_question_no: 0,
      progress: 5,
      score: 0,
      maxScore: 0,
      correctAnswered: 0,
      wrongAnswered: 0,
      openDialog: false,
    };
    this.finishAnswer = this.finishAnswer.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.getQuestion();
  }

  handleClose() {
    this.setState({
      openDialog: false,
    });
    window.location.reload();
  }

  async getQuestion() {
    let response = await apiHandler.get("/api/quiz");
    if (response.status == 200) {
      this.setState({
        questions: response.data.data ?? [],
        total_question_no: response.data?.data?.length,
        current_question: response.data.data[0],
      });
    } else {
      toast.error("Terjadi kesalahan, mohon reload kembali");
    }
  }

  nextQuestion = () => {
    let current = this.state.current_question_no + 1;
    if (current <= this.state.total_question_no) {
      this.setState({ current_question_no: current });
      this.setState({ current_question: this.state.questions[current - 1] });

      this.setState({
        progress: (current / this.state.total_question_no) * 100,
      });
    }
  };
  checkUserAnswer = (userAns) => {
    const {
      current_question,
      current_question_no,
      correctAnswered: correctAnswered,
      wrongAnswered,
      total_question_no,
    } = this.state;
    if (decodeURIComponent(current_question["correct_answer"]) == userAns) {
      this.setState({ correctAnswered: correctAnswered + 1 });

      const _score = (
        ((correctAnswered + 1) / current_question_no) *
        100
      ).toFixed(2);
      this.setState({ score: _score });
    } else {
      this.setState({ wrongAnswered: wrongAnswered + 1 });

      const _score = ((correctAnswered / current_question_no) * 100).toFixed(2);
      this.setState({ score: _score });
    }

    let _maxScore = ((current_question_no / total_question_no) * 100).toFixed(
      2
    );
    this.setState({ maxScore: _maxScore });
  };

  finishAnswer(score) {
    this.setState({
      openDialog: true,
    });
  }

  render() {
    return (
      <div className="question-panel-wrapper">
        {this.state.current_question !== null && this.state.questions ? (
          <QuestionPanel
            question={this.state.current_question}
            nextQuestion={this.nextQuestion}
            total={this.state.total_question_no}
            questionNo={this.state.current_question_no}
            progress={this.state.progress}
            checkUserAnswer={this.checkUserAnswer}
            maxScore={this.state.maxScore}
            score={this.state.score}
            finishAnswer={this.finishAnswer}
          />
        ) : (
          ""
        )}
        <BootstrapDialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.openDialog}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={this.handleClose}
          >
            Hasil dari jawaban Anda
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              Dari beberapa pertanyaan yang anda jawab, berikut adalah hasinya
            </Typography>
            <Typography gutterBottom>{this.state.score}</Typography>
            <ResultChart
              data={[this.state.correctAnswered, this.state.wrongAnswered]}
            />
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={this.handleClose}>
              Tutup
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
    );
  }
}

export default QuizStudent;
