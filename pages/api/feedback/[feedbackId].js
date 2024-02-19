import { readFile, constructFilePath } from "./index";

function handler(req, res) {
  //instead of useRouter or context.params
  const id = req.query.feedbackId;
  const filePath = constructFilePath();
  const feedbackArray = readFile(filePath);
  const selectedFeedback = feedbackArray.find((item) => id === item.id);

  res.status(200).json({ feedbackItem: selectedFeedback });
}

export default handler;
