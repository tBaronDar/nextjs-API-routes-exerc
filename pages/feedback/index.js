import { useState } from "react";
import { constructFilePath, readFile } from "../api/feedback";

function FeedbackPage(props) {
  const [feedback, setFeedback] = useState();

  async function showDetailsHandler(id) {
    const response = await fetch(`/api/feedback/${id}`);
    const data = await response.json();
    setFeedback(data.feedbackItem);
  }

  console.log(feedback);

  return (
    <>
      {feedback && <p>{feedback.email}</p>}
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            <p>{item.text}</p>
            <button onClick={showDetailsHandler.bind(null, item.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default FeedbackPage;

export async function getStaticProps() {
  const filePath = constructFilePath();
  const data = readFile(filePath);

  return {
    props: {
      feedbackItems: data,
    },
  };
}
