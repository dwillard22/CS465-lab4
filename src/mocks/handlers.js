import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/topics', () =>
    HttpResponse.json([
      { id: 1, name: 'Math' },
      { id: 2, name: 'Football' },
      { id: 3, name: 'General EU Knowledge' },

    ])
  ),

  http.get('/api/quizzes', () =>
    HttpResponse.json([
      { id: 1, title: 'Basic Arithmetic', topicId: 1 },
      { id: 2, title: 'Geometry Basics', topicId: 1 },
      { id: 3, title: 'NFL Trivia', topicId: 2 },
      { id: 4, title: 'Super Bowl Facts', topicId: 2 },
      { id: 5, title: 'EU Capitals', topicId: 3 },
    ])
  ),

  http.get('/api/questions/:quizId', ({ params }) => {
    const questions = {
      1: [
        { id: 1, question: '2 + 2?', options: ['3', '4', '5'], answer: '4' },
        { id: 2, question: '5 x 3?', options: ['8', '15', '10'], answer: '15' },
        { id: 3, question: '9 - 4?', options: ['6', '5', '4'], answer: '5' },
      ],
      2: [
        { id: 4, question: 'Triangle has how many sides?', options: ['3','4','5'], answer: '3' },
        { id: 5, question: 'What shape has four equal sides?', options: ['Rectangle','Square','Circle'], answer: 'Square' },
        { id: 6, question: 'What is the sum of all angles in triangle?', options: ['90°','180°','270°'], answer: '180°' },
      ],
      3: [
        { id: 7, question: 'Touchdown points?', options: ['3','6','7'], answer: '6' },
        { id: 8, question: 'Green Bay team?', options: ['Bears','Packers','Lions'], answer: 'Packers' },
        { id: 9, question: 'Quarter length?', options: ['10','12','15'], answer: '15' },
      ],
      4: [
        { id: 10, question: 'Who has the most Super Bowl wins?', options: ['Patriots','Cowboys','Packers'], answer: 'Patriots' },
        { id: 11, question: 'What month does the SuperBowl occur in?', options: ['January','February','March'], answer: 'February' },
        { id: 12, question: 'What team won the first ever SuperBowl?', options: ['New England Patriots','Green Bay Packers','Kansas City Chiefs'], answer: 'Green Bay Packers' },
      ],
      5: [
        { id: 13, question: 'What is the capital of France?', options: ['Berlin','Madrid','Paris'], answer: 'Paris' },
        { id: 14, question: 'What EU capital is west-northwest of Brussels?', options: ['Amsterdam','Madrid','London'], answer: 'London' },
        { id: 15, question: 'The largest EU capital by area is?', options: ['Lisbon','Rome','Athens'], answer: 'Rome' },
      ],


      
    };
    return HttpResponse.json(questions[params.quizId] || []);
  }),
];
