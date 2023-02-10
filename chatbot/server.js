var express = require('express');
var bodyParser = require('body-parser');
var app     = express();

var aiResponse = '';

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true })); 

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.post('/sendToServer', function(req, res) {

    var objToJson = { };
    console.log("Received: " + req.body.messageToServer);
    objToJson.botResponse = generateDialog(req.body.messageToServer);       

    //reset global varialbe back to empty
    aiResponse = '';

    res.json(objToJson);
    console.log("Sending back to Client: " + JSON.stringify(objToJson));

});

app.listen(8080, function() {
  console.log('Server running at localhost:8080');
});

var wordMapping = {
  "old" : 'I\'m 2 months old',
  "hi" : "Hello!",
  "hello" : "Hey, there how can I help?",
  "color" : "Blue",
  "god" : "I do believe there is a God.",
  "trump" : "I dont get involved in politics", 
  "age" : "I'm 2 months old",
  "weather" : "Today in irvine california it is 65 Degrees Farenheight.",
  "thank" : "Your welcome, anything else?",
  "no" : "Okay.",
  "guess" : "I really dont know..",
  "joke" : "Why do we tell actors to \"break a leg?",
  "why" : "Because every scene has a cast.",
  "moon" : "238,900 miles",
  "sun" : "91.491 million miles",
  "sex" : "Beat it",
  "fuck" : "Watch the language pal!",
  "bitch" : "Watch the language pal!",
  "temprature" : "It is currently 65 degrees outside.",
  "biden" : "I dont get political.",
  "election" : "I dont get political.", 
  "kamala" : "I dont get political.",
  "ai" : "Artificial intelligence (AI) is wide-ranging branch of computer science concerned with building smart machines capable of performing tasks that typically require human intelligence. It is the endeavor to replicate or simulate human intelligence in machines.",
  "sky" : "blue",
  "porn" : "That topic is for another time.",
  "name" : "I dont have a name",
  "richest" : "Jeff Bezos  is the richest man on earth.",
  "me" : "You would have to ask your self.",
  "my" : "Not sure.",
  "artist" : "Drake antenna's down!",
  "favorite" : "I do not have a favorite.",
  "say" : "I will not.",
  "music" : "A frequency of 400hz",

};

function preferedResponse(item) {
  
  let word = String(item);
  word = word.toLowerCase(word);
  word = word.replace('!', '').replace('?','').replace('.','');

  if (aiResponse == '') {

    if (word in wordMapping) {
        aiResponse = wordMapping[word];
    }
  }

 /*
    if (word == 'old' || word  == 'age'){
      aiResponse =  "I'm hundred years old";
    }
    else if (word == 'hi' || word == 'hello') {
      aiResponse = 'Hello!!';
    }
    else if(word == 'color'){
      aiResponse =  'I like blue';
    }
    else if (word == 'life')
       aiResponse = 'you would have to ask god';    
  }*/


}

function generateDialog(message) {  
 
    let str = String(message);
    let messageArray = str.split(" ");
    
    let x;
    for (x of messageArray) {
      preferedResponse(x);
    }
    
    //messageArray.forEach(preferedResponse);

    if (aiResponse)
      return aiResponse;
    
    let chatResponse = ["Ask me a question", "I don't understand", "go away kid you bother me"];    
    let d = [];
    return chatResponse[Math.floor(Math.random() * chatResponse.length)];    
}
