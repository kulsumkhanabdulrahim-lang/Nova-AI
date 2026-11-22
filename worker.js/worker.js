(() => {
  const old = document.getElementById("nova-ai");
  if (old) old.remove();

  const style = document.createElement("style");

  style.textContent = `
    #nova-ai {
      font-family: Arial, sans-serif;
      background: #101522;
      color: white;
      min-height: 100vh;
      padding: 20px;
      box-sizing: border-box;
    }

    #nova-ai * { box-sizing: border-box; }

    #nova-ai .header {
      text-align: center;
      padding: 20px;
      color: #8deaff;
    }

    #nova-ai .header h1 {
      font-size: 32px;
      margin: 5px;
    }

    #nova-ai .header p { color: #aaa; }

    #nova-ai .chatbox {
      max-width: 750px;
      margin: auto;
      background: #1c2535;
      border-radius: 15px;
      padding: 15px;
    }

    #nova-ai .messages {
      height: 55vh;
      overflow-y: auto;
      padding: 10px;
    }

    #nova-ai .msg {
      padding: 12px;
      margin: 10px 0;
      border-radius: 12px;
      line-height: 1.5;
      overflow-wrap: anywhere;
    }

    #nova-ai .user {
      background: #245b80;
      margin-left: 15%;
      text-align: right;
    }

    #nova-ai .bot {
      background: #303b50;
      margin-right: 15%;
    }

    #nova-ai .controls {
      display: flex;
      gap: 8px;
      margin-top: 12px;
    }

    #nova-ai input {
      flex: 1;
      min-width: 0;
      padding: 14px;
      border: none;
      border-radius: 10px;
      background: #fff;
      color: #111;
      font-size: 15px;
    }

    #nova-ai button {
      padding: 12px;
      border: none;
      border-radius: 10px;
      background: #00b8d9;
      color: #071522;
      font-weight: bold;
      cursor: pointer;
    }

    #nova-ai .quick {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 15px;
    }

    #nova-ai .quick button {
      background: #35465f;
      color: white;
    }

    #nova-ai button:hover {
      opacity: .8;
    }
  `;

  document.head.appendChild(style);

  const app = document.createElement("div");
  app.id = "nova-ai";

  app.innerHTML = `
    <div class="header">
      <h1>✦ NOVA AI</h1>
      <p>Your Smart Personal Assistant</p>
      <small>Ask anything. Learn something new.</small>
    </div>

    <div class="chatbox">
      <div class="messages" id="nova-messages">
        <div class="msg bot">
          Hello! I'm NOVA AI. ✨<br>
          I can explain words, answer general
          knowledge questions, tell jokes,
          share facts and much more.<br><br>
          What would you like to know?
        </div>
      </div>

      <div class="quick">
        <button data-q="Tell me a fact">🌍 Facts</button>
        <button data-q="Tell me a joke">😂 Jokes</button>
        <button data-q="Give me a riddle">🧩 Riddle</button>
        <button data-q="Start a quiz">🎯 Quiz</button>
        <button data-q="What time is it?">🕒 Time</button>
      </div>

      <div class="controls">
        <input id="nova-input"
          placeholder="Ask NOVA anything...">
        <button id="nova-send">Send</button>
        <button id="nova-voice">🎤</button>
      </div>
    </div>
  `;

  document.body.innerHTML = "";
  document.body.appendChild(app);

  const messages = document.getElementById("nova-messages");
  const input = document.getElementById("nova-input");

  function addMessage(text, type) {
    const div = document.createElement("div");
    div.className = "msg " + type;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  const dictionary = {
    arrogant: "Arrogant means thinking you are better or more important than others.",
    beautiful: "Beautiful means pleasing to the eyes, mind or heart.",
    beauty: "Beauty is a quality that gives pleasure or admiration.",
    confidence: "Confidence means believing in your abilities.",
    intelligent: "Intelligent means having the ability to learn and understand.",
    ambitious: "Ambitious means having strong goals and wanting to achieve them.",
    introvert: "An introvert is someone who often prefers quieter environments and smaller social interactions.",
    extrovert: "An extrovert often enjoys social interaction and group activities.",
    empathy: "Empathy means understanding and sharing another person's feelings.",
    gratitude: "Gratitude means being thankful and appreciating what you have.",
    humble: "Humble means being modest and not acting
optimistic: "Optimistic means expecting positive outcomes.",
    pessimistic: "Pessimistic means expecting negative outcomes.",
    curious: "Curious means eager to learn or discover something.",
    creative: "Creative means having the ability to produce original ideas.",
    loyal: "Loyal means being faithful and supportive.",
    personality: "Personality means the combination of qualities and behaviours that make someone unique.",
    procrastination: "Procrastination means delaying tasks even when you know they need to be done.",
    discipline: "Discipline means controlling your actions and consistently following your goals."
  };

  const facts = [
    "Octopuses have three hearts.",
    "Honey can remain preserved for thousands of years.",
    "The human brain contains billions of neurons.",
    "A day on Venus is longer than its year.",
    "Sharks existed before trees.",
    "Bananas are botanically classified as berries.",
    "The Moon is slowly moving away from Earth."
  ];

  const jokes = [
    "Why did the computer go to the doctor? It had a virus!",
    "Why was the maths book sad? Because it had too many problems!",
    "Why did the student eat his homework? Because the teacher said it was a piece of cake!",
    "What do you call a sleeping dinosaur? A dino-snore!"
  ];

  const riddles = [
    "What has keys but cannot open locks? A piano.",
    "What gets wetter as it dries? A towel.",
    "What has a face and two hands but no arms or legs? A clock.",
    "What has words but never speaks? A book."
  ];

  const knowledge = [
    {
      keys: ["photosynthesis"],
      answer: "Photosynthesis is the process by which green plants use sunlight, water and carbon dioxide to make food and release oxygen."
    },
    {
      keys: ["gravity"],
      answer: "Gravity is the force that attracts objects towards each other. Earth's gravity keeps us on the ground."
    },
    {
      keys: ["artificial intelligence", "what is ai"],
      answer: "Artificial Intelligence (AI) is technology that allows computers to perform tasks such as learning, recognising patterns and understanding language."
    },
    {
      keys: ["internet"],
      answer: "The Internet is a worldwide network connecting computers and devices to share information."
    },
    {
      keys: ["computer"],
      answer: "A computer is an electronic device that accepts data, processes it and produces information."
    },
    {
      keys: ["javascript"],
      answer: "JavaScript is a programming language used to make websites interactive and dynamic."
    },
    {
      keys: ["html"],
      answer: "HTML stands for HyperText Markup Language. It structures the content of web pages."
    },
    {
      keys: ["css"],
      answer: "CSS stands for Cascading Style Sheets. It controls the appearance and design of websites."
    },
    {
      keys: ["database"],
      answer: "A database is an organised collection of information that can be stored, accessed and managed."
    },
    {
      keys: ["entrepreneur"],
      answer: "An entrepreneur is someone who starts and manages a business, usually by developing an idea or solving a problem."
    }
  ];

  function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function reply(question) {
    const q = question.toLowerCase().trim();

    if (!q) return "Please type a question.";

    if (/^(hi|hello|hey|hii)\b/.test(q))
      return "Hello! Welcome back. What would you like to explore today?";

    if (q.includes("your name"))
      return "I'm NOVA, your smart digital assistant.";

    if (q.includes("who created you"))
      return "I'm a JavaScript-based chatbot created as a learning project.";

    if (q.includes("how are you"))
      return "I'm functioning perfectly! What can I help you with?";

    if (q.includes("thank"))
      return "You're welcome! Happy to help. ✨";

    if (q.includes("time"))
      return "Current time: " + new Date().toLocaleTimeString();

    if (q.includes("date") || q.includes("today"))
      return "Today's date: " + new Date().toDateString();

    if (q.includes("joke"))
      return random(jokes);

    if (q.includes("fact"))
      return random(facts);

    if (q.includes("riddle"))
      return random(riddles);

    if (q.includes("quiz"))
      return "Quiz time! What is the largest planet in our solar system? A) Earth B) Jupiter C) Mars. Type your answer!";

    if (q === "b" || q === "jupiter")
      return "Correct! Jupiter is the largest planet in our solar system. 🎉";

    if (q === "a" || q === "c")
      return "Not quite! The correct answer is Jupiter.";

    if (q.includes("meaning of")) {
      const word = q.split("meaning of").pop().trim().replace(/[?.!]/g, "");
      return dictionary[word] || "I don't have this word in my dictionary yet. Try another word.";
    }

    for (const word in dictionary) {
      if (q === word || q === word + "?")
        return dictionary[word];
    }

    for (const item of knowledge) {
      if (item.keys.some(k => q.includes(k)))
        return item.answer;
    }

    if (q.includes("capital of india"))
      return "New Delhi is the capital of India.";

    if (q.includes("largest ocean"))
      return "The Pacific Ocean is the largest ocean on Earth.";

    if (q.includes("speed of light"))
      return "Light travels in a vacuum at approximately 299,792 kilometres per second.";

    if (q.includes("what can you do"))
      return "I can explain vocabulary, share facts, answer selected educational questions, tell jokes, give riddles and conduct simple quizzes.";

    return "That's an interesting question! I don't have a reliable answer for it in my current knowledge database. Try asking me about science, technology, vocabulary or general knowledge.";
  }

  function send() {
    const question = input.value.trim();
    if (!question) return;

    addMessage(question, "user");
    input.value = "";

    setTimeout(() => {
      addMessage(reply(question), "bot");
    }, 400);
  }

  document.getElementById("nova-send").onclick = send;

  input.addEventListener("keydown", e => {
    if (e.key === "Enter") send();
  });

  document.querySelectorAll("#nova-ai .quick button")
    .forEach(button => {
      button.onclick = () => {
        input.value = button.dataset.q;
        send();
      };
    });

  document.getElementById("nova-voice").onclick = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      addMessage("Voice input is not supported in this browser.", "bot");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.onresult = event => {
      input.value = event.results[0][0].transcript;
      send();
    };

    recognition.start();
  };

})();
