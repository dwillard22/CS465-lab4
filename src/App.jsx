import React, { useEffect, useState } from 'react';
import axios from "axios";

function App() {
  const [topics, setTopics] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Load topics and quizzes
  useEffect(() => {
  axios('/api/topics')
    .then(res => res.json())
    .then(data => {
      console.log('Fetched topics:', data);
      setTopics(data);
    })
    .catch(err => console.error('Topics fetch error:', err));

  axios('/api/quizzes')
    .then(res => res.json())
    .then(data => {
      console.log('Fetched quizzes:', data);
      setQuizzes(data);
    })
    .catch(err => console.error('Quizzes fetch error:', err));

  
  axios('/sampleQuizFile.json')
    .then(res => res.json())
    .then(data => {
      console.log('Loaded local quiz:', data);

      // Add topic if not already in topics
      setTopics(prev => {
        const exists = prev.some(t => t.name === data.topic);
        if (!exists) {
          return [...prev, { id: 'eu-knowledge', name: data.topic }];
        }
        return prev;
      });

      // Add quiz for that topic
      setQuizzes(prev => [
        ...prev,
        {
          id: 'sample-quiz',
          topicId: 'eu-knowledge',
          title: data.title,
          quizMessage: data.quizMessage,
          questions: data.questions,
        },
      ]);
    })
    .catch(err => console.error('Error loading sample quiz:', err));

    
}, []);

  // Load questions when quiz is selected
  useEffect(() => {
    if (selectedQuiz) {
      axios(`/api/questions/${selectedQuiz}`)
        .then(res => res.json())
        .then(data => {
          setQuestions(data);
          setCurrentQIndex(0);
          setScore(0);
          setQuizFinished(false);
        });
    }
  }, [selectedQuiz]);

  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentQIndex];
    if (answer === currentQuestion.answer) {
      setScore(score + 1);
    }

    if (currentQIndex + 1 < questions.length) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setSelectedTopic(null);
    setSelectedQuiz(null);
    setQuestions([]);
    setCurrentQIndex(0);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div
    style={{
      fontFamily: 'Segoe UI, Roboto, Arial',
      textAlign: 'center',
      backgroundColor: '#f9fafb',
      minHeight: '100vh',
      padding: '40px 20px',
    }}
  >
    <h1
      style={{
        color: '#2563eb',
        fontSize: '2.5rem',
        marginBottom: '30px',
      }}
    >
      🎓 Mock Quiz App
    </h1>

    {/* Topics */}
    {!selectedTopic && (
      <section>
        <h2 style={{ color: '#333', marginBottom: '20px' }}>Select a Topic</h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px',
          }}
        >
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic.id)}
              style={{
                padding: '12px 24px',
                cursor: 'pointer',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#2563eb',
                color: 'white',
                fontSize: '1rem',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = '#1e40af')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = '#2563eb')
              }
            >
              {topic.name}
            </button>
          ))}
        </div>
      </section>
    )}

    {/* Quizzes */}
    {selectedTopic && !selectedQuiz && (
      <section>
        <h2 style={{ color: '#333', marginBottom: '20px' }}>Select a Quiz</h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px',
          }}
        >
          {quizzes
            .filter((q) => q.topicId === selectedTopic)
            .map((quiz) => (
              <button
                key={quiz.id}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#10b981',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = '#047857')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = '#10b981')
                }
                onClick={() => setSelectedQuiz(quiz.id)}
              >
                {quiz.title}
              </button>
            ))}
        </div>
      </section>
    )}

    {/* Quiz Questions */}
    {selectedQuiz && !quizFinished && questions.length > 0 && (
      <section>
        <h2 style={{ color: '#333' }}>
          Question {currentQIndex + 1} of {questions.length}
        </h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
          {questions[currentQIndex].question}
        </p>
        {questions[currentQIndex].options.map((option) => (
          <button
            key={option}
            style={{
              display: 'block',
              margin: '10px auto',
              padding: '10px 20px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              backgroundColor: '#f3f4f6',
              cursor: 'pointer',
              width: '60%',
              fontSize: '1rem',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = '#e5e7eb')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = '#f3f4f6')
            }
            onClick={() => handleAnswer(option)}
          >
            {option}
          </button>
        ))}
      </section>
    )}

    {/* Quiz Finished */}
    {quizFinished && (
      <section>
        <h2 style={{ color: '#16a34a' }}>Quiz Finished!</h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
          Your score: {score} / {questions.length}
        </p>
        <button
          style={{
            padding: '12px 24px',
            cursor: 'pointer',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#2563eb',
            color: 'white',
            fontSize: '1rem',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = '#1e40af')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = '#2563eb')
          }
          onClick={handleRestart}
        >
          Restart
        </button>
      </section>
    )}
  </div>
);
}

export default App;
