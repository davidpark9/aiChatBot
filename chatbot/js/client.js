var evSubmit = document.getElementById("submit");
//when send button is clicked
if(evSubmit) {
    evSubmit.addEventListener("click", send);
}

var evEnter = document.getElementById("message");
//when enter is pressed up
if(evEnter) {
    evEnter.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("submit").click();
        }
    });
}

function send() {    
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  var requestMessage = document.getElementById("message").value;
  if (requestMessage) {
    var originalText = document.getElementById("dialogBox").innerHTML;
    if (originalText) {
        document.getElementById("dialogBox").innerHTML = originalText + '\r\n' + 'ME  ('+ time +'): ' + requestMessage;
    }
    else {
        document.getElementById("dialogBox").innerHTML = 'ME  ('+ time +'): ' + requestMessage;
    }   
    document.getElementById("message").value = "";

    sendMessageToServer(requestMessage);
  

  }
}

function dummyServer() {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();      
    return 'BOT ('+time+'): Hello~';
}

function sendMessageToServer(requestMessage) {
    
    var jsonData;
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    fetch('http://localhost:8080/sendToServer', {
        method: 'POST',
        headers: {            
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            messageToServer: requestMessage
        })
    }).then(response => response.text()) //get response payload
    .then((data) => {
        console.log(data);
        var responseMessage = JSON.parse(data);

        originalText = document.getElementById("dialogBox").innerHTML;
        document.getElementById("dialogBox").innerHTML = originalText + '\r\n' +  'BOT ('+time+'): ' + responseMessage.botResponse;
        
        //keep scroll to bottom
        var textarea = document.getElementById('dialogBox');
        textarea.scrollTop = textarea.scrollHeight;
        //console.log(textarea.scrollHeight);
    });    
}



















/* THIS IS THE MATRIX EFFECT */


var c = document.getElementById("c");
var ctx = c.getContext("2d");

//making the canvas full screen
c.height = window.innerHeight;
c.width = window.innerWidth;

//korean characters - taken from the unicode charset
var korean = "ㅐ ㅒ ㅔ ㅖ ㅘ ㅙ ㅚ ㅝ ㅞ ㅟ ㅢ";
//converting the string into an array of single characters
korean = korean.split("");

var font_size = 10;
var columns = c.width/font_size; //number of columns for the rain
//an array of drops - one per column
var drops = [];
//x below is the x coordinate
//1 = y co-ordinate of the drop(same for every drop initially)
for(var x = 0; x < columns; x++)
	drops[x] = 1; 

//drawing the characters
function draw()
{
	//Black BG for the canvas
	//translucent BG to show trail
	ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
	ctx.fillRect(0, 0, c.width, c.height);
	
	ctx.fillStyle = "#00ff0d"; //green text
	ctx.font = font_size + "px arial";
	//looping over drops
	for(var i = 0; i < drops.length; i++)
	{
		//a random korean character to print
		var text = korean[Math.floor(Math.random()*korean.length)];
		//x = i*font_size, y = value of drops[i]*font_size
		ctx.fillText(text, i*font_size, drops[i]*font_size);
		
		//sending the drop back to the top randomly after it has crossed the screen
		//adding a randomness to the reset to make the drops scattered on the Y axis
		if(drops[i]*font_size > c.height && Math.random() > 0.975)
			drops[i] = 0;
		
		//incrementing Y coordinate
		drops[i]++;
	}
}

setInterval(draw, 22);



