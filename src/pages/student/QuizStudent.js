import { Card } from "@material-ui/core";
import React, { Component } from "react";
import toast from "react-hot-toast";
import apiHandler from "../../api/apiHandler";
import QuestionPanel from "../../components/QuestionPanel/QuestionPanel";
// import data from "../../_mocks_/quiz-data.json";

class QuizStudent extends Component {
  state = {
    questions: [],
    current_question: null,
    current_question_no: 1,
    total_question_no: 0,
    progress: 5,
    score: 0,
    maxScore: 0,
    correctAnswered: 0,
    wrongAnswered: 0,
  };

  componentDidMount() {
    this.getQuestion();
  }

  async getQuestion() {
    let response = await apiHandler.get("/api/quiz");
    if (response.status == 200) {
      this.setState({
        questions: response.data.data,
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
    alert(score);
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
      </div>
    );
  }
}

export default QuizStudent;
