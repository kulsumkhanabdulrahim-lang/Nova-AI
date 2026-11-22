(function () {

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
#nova .user {
background:#245b80;
text-align:right;
}
#nova .bot {
background:#303b50;
}
#nova input {
width:55%;
padding:13px;
border-radius:8px;
border:0;
}
#nova button {
padding:12px;
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
Hello! I'm NOVA AI. Ask me anything! 😊
</div>
</div>

<br>

<input id="question" placeholder="Ask NOVA anything...">

<button id="send">Send</button>
<button id="voice">🎤</button>
<button id="speak">🔊</button>

<p>
<button data-q="Ek chutkula sunao">😂 Chutkule</button>
<button data-q="Tell me a fact">💡 Facts</button>
<button data-q="Ek paheli pucho">🧠 Paheli</button>
</p>

</div>
`;

document.body.appendChild(app);

const chat = document.getElementById("chat");
const input = document.getElementById("question");

let lastAnswer = "";

const dictionary = {
arrogant:"Ghamandi. Someone who thinks they are superior to others.",
beauty:"Khoobsurati. A quality that creates admiration.",
confidence:"Atmavishwas. Believing in your own abilities.",
humble:"Vinamra. Someone who is modest.",
ambitious:"A person who has big goals.",
empathy:"Understanding another person's feelings.",
discipline:"Self-control and consistency.",
intelligent:"Samajhdaar. Having the ability to learn and solve problems.",
optimistic:"A person who expects positive things.",
introvert:"Someone who often prefers quieter environments.",
extrovert:"Someone who enjoys social interaction."
};

const jokes = [
"Teacher: Homework kahan hai? Student: Sir, dog kha gaya! Teacher: Tumhare paas dog hai? Student: Nahi sir, isliye toh homework safe hai! 😂",
"Teacher: Tum late kyun aaye? Student: Sir, sapne mein school aa raha tha, raste mein traffic mil gaya! 😂",
"Mummy: Phone chhod do! Beta: Bas 5 minute! Mummy: Ye 5 minute kab khatam honge? Beta: Jab battery khatam hogi! 🤣",
"Friend: Padhai kaisi chal rahi hai? Me: WiFi jaisi, kabhi connected kabhi disconnected! 😂"
];

const facts = [
"Octopuses have three hearts.",
"Jupiter is the largest planet in our solar system.",
"Sharks existed before trees.",
"The Moon is slowly moving away from Earth."
];

const riddles = [
"Paheli: Aisi kya cheez hai jo jitni zyada sukhti hai utni geeli hoti hai? Answer: Towel!",
"Paheli: Keys hain lekin locks nahi khol sakti. Kya hai? Answer: Piano!",
"Paheli: Aisi kya cheez hai jiska face aur hands hain, lekin arms nahi? Answer: Clock!"
];

function answer(q) {

q = q.toLowerCase().trim();

const hinglish = /\b(kya|kaise|kyun|hai|hain|ka|ki|ke|mein|me|mujhe|batao|btao|samjhao|matlab|aur|mera|meri|tum|aap|accha|acha|hota|hoti|karo|chahiye|nahi|nahin|sunao|suno|pucho)\b/.test(q);

const reply = (english,hindi) =>
hinglish ? hindi : english;

if (/^(hi|hello|hey|hii)\b/.test(q))
return reply(
"Hello! Welcome to NOVA AI. What would you like to explore?",
"Hello! Welcome to NOVA AI! Aaj kya explore karna chahoge?"
);

if (q.includes("your name"))
return "I'm NOVA AI, your smart digital assistant!";

if (q.includes("how are you"))
return reply(
"I'm doing great! How can I help?",
"Main bilkul great hoon! Batao kya help chahiye?"
);

if (q.includes("time"))
return "Current time: " + new Date().toLocaleTimeString();

if (q.includes("date") || q.includes("today"))
return "Today's date: " + new Date().toDateString();

if (q.includes("joke") || q.includes("chutkula"))
return jokes[Math.floor(Math.random()*jokes.length)];

if (q.includes("fact"))
return facts[Math.floor(Math.random()*facts.length)];

if (q.includes("riddle") || q.includes("paheli"))
return riddles[Math.floor(Math.random()*riddles.length)];

if (q.includes("meaning") || q.includes("matlab")) {

let word = q
.replace(/meaning of|ka meaning|ki meaning|matlab|kya hai/g,"")
.replace(/[?.!]/g,"")
.trim()
.split(" ")[0];

let meaning = dictionary[word];

if (!meaning)
return "Is word ka meaning abhi meri dictionary mein nahi hai.";

return reply(
meaning,
word + " ka matlab hai: " + meaning
);
}

let clean = q.replace(/[?.!]/g,"");

if (dictionary[clean])
return dictionary[clean];

if (q.includes("photosynthesis"))
return reply(
"Photosynthesis is the process by which plants make food using sunlight, water and carbon dioxide.",
"Photosynthesis ek process hai jisme plants sunlight, water aur carbon dioxide ki help se apna food banate hain."
);

if (q.includes("artificial intelligence") || q.includes("what is ai") || q.includes("ai kya"))
return reply(
"Artificial Intelligence allows computers to perform tasks that normally require human intelligence.",
"AI ka full form Artificial Intelligence hai. Iski help se computers human intelligence jaise tasks perform kar sakte hain."
);

if (q.includes("gravity"))
return reply(
"Gravity is the force of attraction between objects.",
"Gravity ek force hai jo objects ko ek dusre ki taraf attract karti hai."
);

if (q.includes("javascript"))
return "JavaScript ek programming language hai jo websites ko interactive banati hai.";

if (q.includes("html"))
return "HTML ka full form HyperText Markup Language hai. Iska use web pages ka structure banane ke liye hota hai.";

if (q.includes("capital of india") || q.includes("india ki capital"))
return "India ki capital New Delhi hai.";

if (q.includes("largest ocean"))
return "Pacific Ocean duniya ka largest ocean hai.";

if (q.includes("thank"))
return "You're welcome! Happy to help! 😊";

return reply(
"I don't have a reliable answer yet. Try asking about science, technology or vocabulary.",
"Interesting question! Iska answer abhi meri knowledge database mein nahi hai. Science, technology ya vocabulary ka question try karo."
);

}

// VOICE OUTPUT

function speak(text) {

if (!("speechSynthesis" in window)) {
alert("Voice output is not supported in this browser.");
return;
}

window.speechSynthesis.cancel();

let speech = new SpeechSynthesisUtterance(text);

speech.lang = "hi-IN";
speech.rate = 0.9;
speech.pitch = 1;

window.speechSynthesis.speak(speech);

}

// SEND MESSAGE

function sendMessage() {

let q = input.value.trim();

if (!q) return;

let user = document.createElement("div");
user.className = "message user";
user.textContent = q;

chat.appendChild(user);

input.value = "";

let response = answer(q);

lastAnswer = response;

let bot = document.createElement("div");
bot.className = "message bot";
bot.textContent = response;

chat.appendChild(bot);

chat.scrollTop = chat.scrollHeight;

// Automatically speak every answer
speak(response);

}

document.getElementById("send").onclick = sendMessage;

input.addEventListener("keydown",function(e) {
if (e.key === "Enter") sendMessage();
});

// QUICK BUTTONS

document.querySelectorAll("#nova button[data-q]").forEach(button => {

button.onclick = function() {
input.value = button.dataset.q;
sendMessage();
};

});

// REPLAY VOICE

document.getElementById("speak").onclick = function() {

if (lastAnswer) {
speak(lastAnswer);
}

};

// VOICE INPUT

document.getElementById("voice").onclick = function() {

const Speech = window.SpeechRecognition ||
window.webkitSpeechRecognition;

if (!Speech) {
alert("Voice input is not supported in this browser.");
return;
}

const recognition = new Speech();

recognition.lang = "hi-IN";

recognition.onresult = function(event) {

input.value = event.results[0][0].transcript;

sendMessage();

};

recognition.start();

};

})();