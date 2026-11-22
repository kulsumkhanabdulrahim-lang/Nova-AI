document.addEventListener("DOMContentLoaded", function () {

const app = document.createElement("div");

app.innerHTML = `
<style>
#nova {
  background:#101522;
  color:white;
  padding:20px;
  border-radius:15px;
  font-family:Arial;
  max-width:750px;
  margin:20px auto;
}
#nova h1 {
  color:#00d9ff;
  text-align:center;
}
#nova .chat {
  height:350px;
  overflow-y:auto;
  background:#1c2535;
  padding:15px;
  border-radius:12px;
}
#nova .message {
  padding:12px;
  margin:10px 0;
  border-radius:10px;
  line-height:1.5;
  overflow-wrap:anywhere;
}
#nova .user {background:#245b80;text-align:right;}
#nova .bot {background:#303b50;}
#nova input {
  width:65%;
  padding:13px;
  border-radius:8px;
  border:0;
}
#nova button {
  padding:13px;
  border:0;
  border-radius:8px;
  background:#00d9ff;
  cursor:pointer;
  margin:5px;
}
</style>

<div id="nova">
<h1>✦ NOVA AI</h1>
<p style="text-align:center">Your Smart Digital Assistant</p>

<div class="chat" id="chat">
<div class="message bot">
Hello! I'm NOVA AI. Ask me anything about learning, vocabulary, science or technology!
</div>
</div>

<br>

<input id="question" placeholder="Ask NOVA anything...">
<button id="send">Send</button>
<button id="voice">🎤</button>

<p>
<button data-q="Tell me a joke">Joke</button>
<button data-q="Tell me a fact">Facts</button>
<button data-q="Give me a riddle">Riddle</button>
</p>
</div>
`;

document.body.appendChild(app);

const chat = document.getElementById("chat");
const input = document.getElementById("question");

const dictionary = {
  arrogant:"Thinking you are superior to others.",
  beauty:"A quality that creates admiration or pleasure.",
  confidence:"Belief in your own abilities.",
  humble:"Being modest and not thinking you are better than others.",
  ambitious:"Having strong goals and wanting to achieve them.",
  empathy:"Understanding another person's feelings.",
  discipline:"The ability to control your actions and stay consistent.",
  intelligent:"Having the ability to learn, understand and solve problems.",
  optimistic:"Expecting positive things to happen.",
  introvert:"Someone who often prefers quieter environments and smaller social interactions.",
  extrovert:"Someone who often enjoys social interactions."
};

const facts = [
"Octopuses have three hearts.",
"Jupiter is the largest planet in our solar system.",
"Sharks existed before trees.",
"The Moon is slowly moving away from Earth."
];

const jokes = [
"Why was the computer cold? Because it left its Windows open!",
"Why did the student eat his homework? Because it was a piece of cake!",
"What do computers eat? Microchips!"
];

const riddles = [
"What gets wetter as it dries? A towel.",
"What has keys but cannot open locks? A piano.",
"What has a face and hands but no arms? A clock."
];

function answer(q) {

q = q.toLowerCase().trim();

if (/^(hi|hello|hey|hii)\b/.test(q))
return "Hello! Welcome to NOVA AI. What would you like to explore?";

if (q.includes("your name"))
return "I'm NOVA AI, your smart digital assistant.";

if (q.includes("how are you"))
return "I'm working perfectly! What can I help you with?";

if (q.includes("time"))
return new Date().toLocaleTimeString();

if (q.includes("date") || q.includes("today"))
return new Date().toDateString();

if (q.includes("joke"))
return jokes[Math.floor(Math.random()*jokes.length)];

if (q.includes("fact"))
return facts[Math.floor(Math.random()*facts.length)];

if (q.includes("riddle"))
return riddles[Math.floor(Math.random()*riddles.length)];

if (q.includes("meaning of")) {
let word = q.split("meaning of").pop().trim().replace(/[?.!]/g,"");
return dictionary[word] || "I don't know this word yet. Try another word.";
}

if (dictionary[q.replace(/[?.!]/g,"")])
return dictionary[q.replace(/[?.!]/g,"")];

if (q.includes("photosynthesis"))
return "Photosynthesis is the process by which green plants use sunlight, water and carbon dioxide to make food.";

if (q.includes("artificial intelligence") || q.includes("what is ai"))
return "Artificial Intelligence is technology that enables computers to perform tasks that normally require human intelligence.";

if (q.includes("gravity"))
return "Gravity is the force of attraction between objects. It keeps us on Earth's surface.";

if (q.includes("javascript"))
return "JavaScript is a programming language used to create interactive websites.";

if (q.includes("html"))
return "HTML stands for HyperText Markup Language. It structures web pages.";

if (q.includes("capital of india"))
return "New Delhi is the capital of India.";

if (q.includes("largest ocean"))
return "The Pacific Ocean is the largest ocean.";

if (q.includes("thank"))
return "You're welcome! Happy to help.";

return "Interesting question! I don't have a reliable answer in my current knowledge database. Try asking about science, technology or vocabulary.";
}

function sendMessage() {

let q = input.value.trim();

if (!q) return;

let user = document.createElement("div");
user.className = "message user";
user.textContent = q;
chat.appendChild(user);

input.value = "";

let bot = document.createElement("div");
bot.className = "message bot";
bot.textContent = answer(q);

chat.appendChild(bot);

chat.scrollTop = chat.scrollHeight;
}

document.getElementById("send").onclick = sendMessage;

input.addEventListener("keydown", function(e) {
if (e.key === "Enter") sendMessage();
});

document.querySelectorAll("#nova button[data-q]").forEach(button => {
button.onclick = function() {
input.value = button.dataset.q;
sendMessage();
};
});

document.getElementById("voice").onclick = function() {

const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!Speech) {
alert("Voice input is not supported in this browser.");
return;
}

const recognition = new Speech();
recognition.lang = "en-IN";

recognition.onresult = function(event) {
input.value = event.results[0][0].transcript;
sendMessage();
};

recognition.start();
};

});
    

  
    
