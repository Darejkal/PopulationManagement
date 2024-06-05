import React, { useState } from "react";
import { Button, TextField, Typography, Container } from "@material-ui/core";
import { ListedView } from "../component/ListedView";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can submit the feedback, for now, just log it.
    console.log(feedback);
    setSubmitted(true);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Phản ánh
      </Typography>
      {submitted ? (
        <Typography variant="body1" align="center">
          Cảm ơn bạn đã phản ánh. Chúng tôi sẽ trả lời sớm nhất
        </Typography>
      ) : (
        <form onSubmit={handleSubmit}>
          <TextField
            id="feedback"
            label="Feedback"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={feedback}
            onChange={handleFeedbackChange}
            required
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      )}
    </Container>
  );
};
export const UserFeedback = () => {
  return <FeedbackForm />;
};
