export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  wrongAnswerMessage: string;
}

export const questions: Question[] = [
  {
    id: 1,
    question: "When is my birthday?",
    options: ["March 15", "April 20", "January 10", "June 27"],
    correctAnswerIndex: 3,
    wrongAnswerMessage: "Oh no! Can't remember my birthday?",
  },
  {
    id: 2,
    question: "What's my favorite food?",
    options: ["Anything", "Nasi Lemak", "Burger", "Nasi Goreng Ayam Kunyit"],
    correctAnswerIndex: 3,
    wrongAnswerMessage: "Wrong! We always eat together, you should know this.",
  },
  {
    id: 3,
    question: "What's my favorite color?",
    options: ["Red", "Black", "Blue", "Green"],
    correctAnswerIndex: 1,
    wrongAnswerMessage: "Not that one! Pay more attention.",
  },
  {
    id: 4,
    question: "Where was our first date?",
    options: ["Shopping Mall", "Cafe", "Park", "Cinema"],
    correctAnswerIndex: 4,
    wrongAnswerMessage: "We have never gone on a date yet (soon dear) :p",
  },
  {
    id: 5,
    question: "What's my dream pet?",
    options: ["Cat", "Dog", "Hamster", "Rabbit"],
    correctAnswerIndex: 0,
    wrongAnswerMessage: "Wrong. It is cat la cinta.",
  },
  {
    id: 6,
    question: "Which side do I prefer to sleep on?",
    options: ["Left", "Right", "Middle", "Anywhere"],
    correctAnswerIndex: 3,
    wrongAnswerMessage: "Any side is fine hihi.",
  },
  {
    id: 7,
    question: "What's my favorite drink?",
    options: [
      "Caramel Macchiato",
      "Matcha",
      "Mocha Frappuccino",
      "Americano",
    ],
    correctAnswerIndex: 1,
    wrongAnswerMessage: "Now you know my fav drink.",
  },
  {
    id: 8,
    question: "What am I most afraid of?",
    options: ["Cockroaches", "Lizards", "Darkness", "Heights"],
    correctAnswerIndex: 0,
    wrongAnswerMessage: "I olredi told you -_-",
  },
  {
    id: 9,
    question: "What's my favorite song?",
    options: ["Perfect", "All of Me", "I Hate It Here", "Thinking Out Loud"],
    correctAnswerIndex: 2,
    wrongAnswerMessage: "It is 'I Hate It Here' by Taylor Swift.",
  },
  {
    id: 10,
    question: "What do I like to do when I'm stressed?",
    options: ["Play games", "Listen to music", "Sleep", "Eat"],
    correctAnswerIndex: 1,
    wrongAnswerMessage: "Wrong! Pay more attention to me, okay?",
  },
];
