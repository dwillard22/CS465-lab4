import express from "express";
import cors from "cors";
import log from "npmlog";

const app = express();
app.use(cors());
app.use(express.json());

// Sample data (same as Lab 3)
const topics = [
  { id: 1, name: "Math" },
  { id: 2, name: "Football" },
  { id: 3, name: "General EU Knowledge" },
];

const quizzes = [
  { id: 1, title: "Basic Arithmetic", topicId: 1 },
  { id: 2, title: "Geometry Basics", topicId: 1 },
  { id: 3, title: "NFL Trivia", topicId: 2 },
  { id: 4, title: "Super Bowl Facts", topicId: 2 },
  { id: 5, title: "EU Capitals", topicId: 3 },
];

const questions = {
  1: [
    { id: 1, question: "2 + 2?", options: ["3", "4", "5"], answer: "4" },
    { id: 2, question: "5 x 3?", options: ["8", "15", "10"], answer: "15" },
    { id: 3, question: "9 - 4?", options: ["6", "5", "4"], answer: "5" },
  ],
  2: [
    { id: 4, question: "Triangle sides?", options: ["3", "4", "5"], answer: "3" },
    { id: 5, question: "Four equal sides?", options: ["Rectangle", "Square", "Circle"], answer: "Square" },
    { id: 6, question: "Sum of triangle angles?", options: ["90°", "180°", "270°"], answer: "180°" },
  ],
  3: [
    { id: 7, question: "Touchdown points?", options: ["3", "6", "7"], answer: "6" },
    { id: 8, question: "Green Bay team?", options: ["Bears", "Packers", "Lions"], answer: "Packers" },
    { id: 9, question: "Quarter length?", options: ["10", "12", "15"], answer: "15" },
  ],
  4: [
    { id: 10, question: "Most Super Bowl wins?", options: ["Patriots", "Cowboys", "Packers"], answer: "Patriots" },
    { id: 11, question: "Month of Super Bowl?", options: ["January", "February", "March"], answer: "February" },
    { id: 12, question: "First Super Bowl winner?", options: ["Patriots", "Packers", "Chiefs"], answer: "Packers" },
  ],
  5: [
    { id: 13, question: "Capital of France?", options: ["Berlin", "Madrid", "Paris"], answer: "Paris" },
    { id: 14, question: "Capital west of Brussels?", options: ["Amsterdam", "Madrid", "London"], answer: "London" },
    { id: 15, question: "Largest EU capital by area?", options: ["Lisbon", "Rome", "Athens"], answer: "Rome" },
  ],
};

// Routes
app.get("/api/topics", (req, res) => {
  log.info("GET", "/api/topics");
  res.json(topics);
});

app.get("/api/quizzes", (req, res) => {
  log.info("GET", "/api/quizzes");
  res.json(quizzes);
});

app.get("/api/questions/:quizId", (req, res) => {
  const quizId = req.params.quizId;
  log.info("GET", `/api/questions/${quizId}`);
  res.json(questions[quizId] || []);
});

// Start server
const PORT = 3000;
app.listen(PORT, () => log.info("Server", `Running on http://localhost:${PORT}`));
