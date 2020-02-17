/* eslint-disable no-undef */
/* eslint-disable strict */
/**
 * Example store structure
 */

//Display score along side question number
//show correct answer if you get it wrong

const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What does wubba lubba dub dub mean?',
      answers: [
        'Please leave',
        "I'm a genius",
        "Let's Party",
        "I'm in great pain"
      ],
      correctAnswer: "I'm in great pain",
      imgUrl: './Images/wrecked.gif'
    },
    {
      question: ' Name the song Rick uses to save the earth',
      answers: [
        'Rock Hortz',
        'Get Schwifty',
        'Do the Bingortz',
        'Stop, Drop, and Slitz'
      ],
      correctAnswer: 'Get Schwifty',
      imgUrl: './Images/dance.gif'
    },
    {
      question: 'Which implement does Rick use to travel between dimensions?',
      answers: ['Rift Ray', 'Jump Laser', 'Interdimensional Ray', 'Portal Gun'],
      correctAnswer: 'Portal Gun',
      imgUrl: './Images/wrecked.gif'
    },
    {
      question:
        'Morty does accidentally have a child who is half alien. What species is his non-human half?',
      answers: ['Smarkian', 'Cromulan', 'Gazorpazorp', 'Gromflomite'],
      correctAnswer: 'Gazorpazorp',
      imgUrl: './Images/peaceful.jpg'
    },
    {
      question: "What is Scary Terry's catchphrase?",
      answers: [
        "I'm your worst nightmare!",
        'Welcome to your nightmare, bitch!',
        'This is your nightmare!',
        "You can run, but you'll still die!"
      ],
      correctAnswer: 'Welcome to your nightmare, bitch!',
      imgUrl: './Images/pickle.gif'
    }
  ],
  correctOrNot: [
    { correct: 'CORRECT!!', incorrect: 'NOPE!' },

    { correct: 'THAT IS CORRECT!!', incorrect: 'HA HA NO...' },

    { correct: 'YOU ARE RIGHT!!', incorrect: 'THE GODS ARE LAUGHING AT YOU' },

    { correct: 'YOU GOT IT!!', incorrect: 'NO EYEHOLES FOR YOU' },

    {
      correct: 'WE HAVE A WINNER!!',
      incorrect: 'CONSPIRING WITH A ROGUE SUMMER I SEE...'
    }
  ],
  score: 0,
  wrong: 0,
  num: 0,
  quizStart: false
};

//click event listener for renderQuestion function
function clickMe() {
  $('main').on('click', '#js-start-btn', function() {
    $(location).attr('href', renderQuestion);
  });
}

//FUNCTIONS FOR CURRENT QUESTION IN STORE OBJECT
function getCurrentQuestion() {
  const questionArr = store.questions;
  let currentQuestion = questionArr[store.num];
  return currentQuestion;
}

function renderQuestion() {
  let currentQuestion = getCurrentQuestion();
  let html = generateQuestion(currentQuestion);
  $('main').html(html);
}

function generateQuestion(question) {
  return `
  <div class="outer-box-question">
  <div class="inner-box-question">
  <header class="question-score-list">
    <ul>
      <li>
          Question ${store.num + 1} of ${store.questions.length} /
      </li> 
      <li>
          Your Current Score is ${store.score}
      </li>
    <ul>
  </header>
  <section class="question-list">${question.question}</section>
      <form class="question-list-form">  
        ${question.answers
          .map((e, index) => {
            return `<input id="answer ${index}" name="questionDisplay" type="radio" value="${e}" required />
            <label id="btnAnswers" for="answer${index}">${e}</label>
            <br>`;
          })
          .join('')}
          <button type="submit" id="submit-button-list">PRESS IF YOU ARE SURE..</button>
      </form>
   
      </div>
      </div>`;
}

//RENDER WRONG ANSWER RESPONSE

function renderWrong(answer) {
  let html = generateWrong(answer);
  $('main').html(html);
}

function generateWrong(input) {
  let currentWrong = store.correctOrNot[store.num].incorrect;
  return `
  <div class="outer-box-answers">
  <section class="inner-box-answers">
    <form>
        <h1>${currentWrong}</h1> 
        <p>You chose "${input}"</p> 
        <p>The correct answer was "${
          store.questions[store.num].correctAnswer
        }"</p>
        <button type="button" id="next-question">Next</button>
    </form>
  </section>
  </div>`;
}

//RENDER CORRECT ANSWER RESPONSE

function renderCorrect() {
  let html = generateCorrect();
  $('main').html(html);
}

function generateCorrect() {
  let currentCorrect = store.correctOrNot[store.num].correct;
  return `
  <div class="outer-box-answers">
  <section class="inner-box-answers">
    <form>
      <h1>${currentCorrect}</h1>
      <img id="correct-img" src=${store.questions[store.num].imgUrl} />
      <p>That was correct</p>
      <button type="button" id="next-question">Next</button>
    </form>
  </section>
  </div>`;
}

function generateScore() {
  if (store.score === 0) {
    return `<div class='outer-score-div'>
    <div class='inner-score-div'>
    <p>Your current Score is ${store.score}</p> 
    <p>YOU GOT NONE OF THEM RIGHT!!</p>
    </div>
    </div>`;
  } else if (store.score > 0 && store.score < store.questions.length) {
    return `<div class='outer-score-div'>
    <div class='inner-score-div'>
    <p>Your current Score is ${store.score}<p> 
    <p>Not too bad, but you can do better!</p>
    </div>
    </div>`;
  } else if (store.score === store.questions.length) {
    return `<div class='outer-score-div'>
    <div class='inner-score-div'>
    <p>Your current Score is ${store.score}</p>
    <p>YOU ARE THE RICKEST OF RICKS!</p>
    </div>
    </div>`;
  }
}

//FINAL PAGE DISPLAY FUNCTIONS

//RESET QUIZ TO BEGINNING
function resetQuiz() {
  const score = generateScore();
  $('main').html(`${score}
  <div id="go-back-btn">
  <button id="goBack">Click Me</button>
  </div>`);
  $('main').on('click', '#goBack', function() {
    store.num = 0;
    store.score = 0;
    renderFirstPage();
  });
}

function registerListeners() {
  $('main').on('submit', 'form', function(e) {
    e.preventDefault();
    let currentQuestion = getCurrentQuestion();
    let userAnswer = $('input:checked').val();

    if (userAnswer === currentQuestion.correctAnswer) {
      store.score += 1;
      $('main').append(renderCorrect());
    } else {
      store.wrong += 1;
      $('main').append(renderWrong(userAnswer));
    }

    store.num += 1;

    $('#next-question').show();
  });

  $('main').on('click', '#next-question', function(e) {
    //make a button on the last page that is a listener
    e.preventDefault();

    if (store.num === store.questions.length) {
      resetQuiz();
    } else {
      renderQuestion();
    }
  });
}

function renderFirstPage() {
  $('main').html(`
  <header id="rick-intro">
    <h1>THE RICK AND MORTY QUIZ</h1>
  </header>
  <div id="intro-info">
        <h2> The Best Rick and Morty quiz ever </h2>
        <h3>
        <p>It's time to do some Rick and Morty trivia!</p>
        <p>ONLY the Rickest of Ricks will be able to pass.</p>
    </h3>
    <div id = "schwift">
      <button id = "js-start-btn">GET SCHWIFTY</button> 
    </div>
  </div>
`);
}

function runQuiz() {
  registerListeners();
  renderFirstPage();
  clickMe();
}

$(runQuiz);

/**
 *
 * Your app should include a render() function, that regenerates
 * the view each time the store is updated. See your course
 * material, consult your instructor, and reference the slides
 * for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 */

// Used to add sibling elements to the
// function domElementMaker(element) {
//   const newElement = document.createElement(element);
//   document.body.appendChild(newElement);
//   return newElement;
// }
