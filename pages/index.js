import { useRef } from "react";

function HomePage() {
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  async function submitHandler(event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const response = await fetch("/api/feedback", {
      method: "post",
      body: JSON.stringify({
        email: enteredEmail,
        feedbackInputRef: enteredFeedback,
      }),
      headers: { "Content-Type": "application/json" },
    });
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
    </div>
  );
}

export default HomePage;
