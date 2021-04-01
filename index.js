
const prompt = require('prompt-sync')();
const axios = require("axios").default;
let questions = []

// Connects to API to get questions
function createQuestions()
{
    const options = {
        method: 'GET',
        url: 'https://opentdb.com/api.php?amount=3',
    };

    axios.request(options).then(function (response) {

        setQuestions(response.data)
    //    console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });

}
// Iterates through response to get answers
function setQuestions(response){
    for (let i = 0; i < 1; i++){
        //response returns response_code and results
        //let questions = JSON.parse(response.result);
        questions = response.results[i];
      // console.log(questions)
        //console.log(typeof questions)
        givePosibleAnswers(response.results[i].incorrect_answers, response.results[i].correct_answer,response.results[i].question);
    }
}

createQuestions();

function givePosibleAnswers(incAnswers, correctAnswers, question){
    let answerSet = incAnswers;                     //creates a list with incorrect answers
    answerSet.push(correctAnswers);                 //adds correct answer to list
    answerSet.sort(() => Math.random() - 0.5);      //shuffles list

    const name = prompt(`${question}? ${answerSet} `);

        if (name == correctAnswers) {
            console.log(`Correct`);
        }
        else
        {
            console.log(`Incorrect, the correct anwser was ${correctAnswers}`);
        }

   // console.log(quest, answerSet);
}