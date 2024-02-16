import { useRef, useState } from "react";

function HomePage() {
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();
  const [feedback, setFeedback] = useState();

  function submitHandler(event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const feedbackObj = {
      email: enteredEmail,
      text: enteredFeedback,
    };

    async function fetcher() {
      const response = await fetch("/api/feedback", {
        method: "POST",
        body: JSON.stringify(feedbackObj),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data.feedback);
    }
    fetcher();
  }

  async function loadFeedbackHandler() {
    const response = await fetch("/api/feedback");
    const data = await response.json();

    setFeedback(data.feedbackArray);
  }

  return (
    <div>
      <h1>The Home Page</h1>

      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Enter your Email</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Enter your feedback</label>
          <textarea id="feedback" rows={3} ref={feedbackInputRef} />
        </div>
        <button type="submit">Submit your feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Get feedback</button>
      {feedback && (
        <ul>
          {feedback.map((item) => (
            <li key={item.id}>
              <p>{item.email}</p>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HomePage;
