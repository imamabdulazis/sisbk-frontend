import React, { useState } from "react";
import { lighten, styled } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import BorderLinearProgress from "@material-ui/core/LinearProgress";
import "./QuestionPanel.css";
import { Stack } from "@material-ui/core";

const useStyles = styled({
  root: {
    width: 700,
    minHeight: 350,
    maxHeight: 400,
    textAlign: "left",
    padding: 50,
  },
  question: {
    color: "black",
    fontSize: "2rem",
  },

  progressRoot: {
    height: 10,
    backgroundColor: lighten("#ff6c5c", 0.5),
    borderRadius: 20,
    positioned: "absolute",
    bottom: 10,
  },
  bar: {
    height: 16,
    borderRadius: 20,
  },
});

export default function QuestionPanel({
  question,
  nextQuestion,
  total,
  questionNo,
  progress,
  checkUserAnswer,
  maxScore,
  score,
  finishAnswer,
}) {
  const [answered, setAnswered] = useState("");
  const [message, setMessage] = useState("");

  const handleAnswer = (ans) => {
    setAnswered(ans);
    checkUserAnswer(ans);
    if (decodeURIComponent(question["correct_answer"]) == ans) {
      setMessage("Correct!");
    } else {
      setMessage("InCorrect!");
    }
    if (questionNo === total) {
      finishAnswer(score);
    }
  };

  const classes = useStyles();
  return (
    <>
      <div className={classes.progressRoot}>
        <BorderLinearProgress
          className={classes.bar}
          variant="determinate"
          color="primary"
          value={progress}
        />
      </div>

      <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            <Typography
              gutterBottom
              variant="body2"
              color="textSecondary"
              component="p"
            >
              Pertanyan {questionNo} / {total}
            </Typography>
            <Divider />
            <Typography
              variant="h5"
              color="textSecondary"
              component="p"
              className={classes.question}
            >
              {decodeURIComponent(question["question"])}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            variant={
              answered === decodeURIComponent(question.incorrect_answers)
                ? "contained"
                : "outlined"
            }
            color="secondary"
            key={decodeURIComponent(question.incorrect_answers)}
            onClick={() =>
              handleAnswer(decodeURIComponent(question.incorrect_answers))
            }
            disabled={answered !== "" ? true : false}
          >
            {decodeURIComponent(question.incorrect_answers)}
          </Button>
          <Button
            variant={
              answered === decodeURIComponent(question["correct_answer"])
                ? "contained"
                : "outlined"
            }
            color="secondary"
            key={decodeURIComponent(question["correct_answer"])}
            onClick={() =>
              handleAnswer(decodeURIComponent(question["correct_answer"]))
            }
            disabled={answered !== "" ? true : false}
          >
            {decodeURIComponent(question["correct_answer"])}
          </Button>
        </CardActions>
        {/* <Typography variant="h5" component="h3" className="message">
          {answered && message}
        </Typography> */}

        <Stack paddingBottom={5}>
          {answered !== "" && progress !== 100 ? (
            <Button
              variant="contained"
              className="next-button"
              color="secondary"
              key="next"
              onClick={() => {
                nextQuestion();
                setAnswered("");
              }}
            >
              Selanjutnya
            </Button>
          ) : (
            ""
          )}
        </Stack>
      </Card>
      {/* <div className="score-wrapper">
        <p>Nilai: {score} %</p>
        <p>Max Nilai: {maxScore} %</p>
      </div> */}

      {/* <div className={classes.progressRoot}>
        <BorderLinearProgress
          className={classes.bar}
          variant="determinate"
          color="primary"
          value={score}
          valueBuffer={maxScore}
        />
      </div> */}
    </>
  );
}
