import fs from "fs";
import { cwd } from "process";
import path from "path";

export function constructFilePath() {
  //create absolute path to file
  return path.join(cwd(), "data", "feedback.json");
}

export function readFile(path) {
  //this will be json because feedback.json
  const jsonData = fs.readFileSync(path);
  //convert the existing json to std object to use push()
  return JSON.parse(jsonData);
}

function handler(req, res) {
  if (req.method === "POST") {
    const feedbackEmail = req.body.email;
    const feedbackText = req.body.text;

    const newFeedback = {
      id: new Date().toISOString(),
      email: feedbackEmail,
      text: feedbackText,
    };

    const filePath = constructFilePath();

    const data = readFile(filePath);

    //push the incoming json as it is
    data.push(newFeedback);

    //convert to json and sync write
    fs.writeFileSync(filePath, JSON.stringify(data));

    //end the request with a success status
    res.status(201).json({ message: "Success!", feedback: newFeedback });
  } else {
    const filePath = constructFilePath();
    const data = readFile(filePath);

    res.status(200).json({ feedbackArray: data });
  }
}

export default handler;
