(function () {
  const style = document.createElement("style");
  style.textContent = `
    #nova {
      max-width: 500px;
      margin: 20px auto;
      padding: 18px;
      border-radius: 18px;
      background: #171b2e;
      color: white;
      font-family: Arial;
    }
    #nova h2 { text-align: center; color: #8da5ff; }
    #chat {
      height: 300px;
      overflow-y: auto;
      background: #101426;
      padding: 12px;
      border-radius: 12px;
    }
    .msg { margin: 10px 0; line-height: 1.5; }
    .user { color: #8da5ff; }
    .bot { color: #8ff0c5; }
    #nova input, #nova select {
      box-sizing: border-box;
      width: 100%;
      padding: 12px;
      margin-top: 10px;
      border-radius: 9px;
      border: none;
    }
    #nova button {
      padding: 11px;
      margin: 5px 2px;
      border: none;
      border-radius: 9px;
      background: #7189ff;
      color: white;
      font-weight: bold;
    }
  `;
  document.head.appendChild(style);

  const app = document.createElement("div");
  app.id = "nova";
  app.innerHTML = `
    <h2>✨ NOVA AI</h2>
    <p style="text-align:center">Your Smart AI Assistant</p>
    <select id="voiceMode">
      <option value="auto">🌐 Auto Detect Language</option>
      <option value="english">🇬🇧 Full English Voice</option>
      <option value="hinglish">🇮🇳 Hinglish Voice</option>
    </select>
    <div id="chat">
      <div class="msg bot">NOVA: Hello! I'm NOVA AI. Ask me anything!</div>
    </div>
    <input id="question" placeholder="Ask me anything...">
    <button id="send">Send</button>
    <button id="mic">🎤 Speak</button>
    <button id="replay">🔊 Replay</button>
  `;
  document.body.appendChild(app);

  const chat = document.getElementById("chat");
  const input = document.getElementById("question");
  const mode = document.getElementById("voiceMode");
  let lastAnswer = "";

  function addMessage(text, type) {
    const div = document.createElement("div");
    div.className = "msg " + type;
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
  }

  function detectLanguage(text) {
    if (mode.value === "english") return "english";
    if (mode.value === "hinglish") return "hinglish";

    return /kya|kaise|kyun|hai|hain|mera|meri|mujhe|batao|karo|krdo|acha|accha|nahi|haan|aur|matlab|iska|meaning|hota|h|hu|ho|tum|aap|mujhe|chahiye|kuch|ka|ki|ke/i.test(text)
      ? "hinglish" : "english";
  }

  function getAnswer(question) {
    const q = question.toLowerCase().trim();
    const lang = detectLanguage(question);

    const answers = {
      arrogant: ["Arrogant means someone who thinks they are better than others.", "Arrogant ka matlab hota hai ghamandi, yani jo khud ko dusron se superior samajhta hai."],
      beauty: ["Beauty means the quality of being beautiful.", "Beauty ka matlab hota hai khoobsurati."],
      confidence: ["Confidence means believing in yourself and your abilities.", "Confidence ka matlab hai khud par bharosa rakhna."],
      humble: ["Humble means being modest and not thinking you are superior.", "Humble ka matlab hai vinamra hona, bina attitude ke rehna."],
      ambitious: ["Ambitious means having strong goals and wanting to achieve them.", "Ambitious ka matlab hai bade goals rakhna aur unhe achieve karne ki strong desire hona."],
      empathy: ["Empathy means understanding another person's feelings.", "Empathy ka matlab hai dusron ki feelings ko samajhna."],
      discipline: ["Discipline means controlling your actions and following good habits.", "Discipline ka matlab hai apne actions control karna aur achhi habits follow karna."],
      intelligent: ["Intelligent means being good at learning and understanding.", "Intelligent ka matlab hai samajhdaar aur tez dimaag wala."],
      optimistic: ["Optimistic means expecting positive things.", "Optimistic ka matlab hai positive soch rakhna."],
      introvert: ["An introvert usually enjoys quiet environments and smaller social groups.", "Introvert woh hota hai jise quiet environment aur chhota social circle pasand hota hai."],
      extrovert: ["An extrovert usually enjoys socialising and meeting people.", "Extrovert woh hota hai jise logon se milna aur baatein karna pasand hota hai."]
    };

    for (let word in answers) {
      if (new RegExp("\\\\b" + word + "\\\\b", "i").test(q)) {
        return answers[word][lang === "hinglish" ? 1 : 0];
      }
    }

    if (/hello|hi|hey/.test(q))
      return lang === "hinglish" ? "Hey! Kya haal hai? NOVA AI is ready!" : "Hello! How can I help you today?";

    if (/how are you/.test(q))
      return "I'm doing great! Ready to help you.";

    if (/joke|chutkula|funny/.test(q))
      return lang === "hinglish"
        ? "Teacher: Homework kahan hai? Student: Sir, homework bhi work from home kar raha hai!"
        : "Teacher: Why was the computer cold? Because it left its Windows open!";

    if (/riddle|paheli/.test(q))
      return lang === "hinglish"
        ? "Paheli: Aisi kaunsi cheez hai jo tootne par awaaz nahi karti? Answer: Promise!"
        : "Riddle: What has keys but cannot open locks? Answer: A piano!";

    if (/fact|interesting/.test(q))
      return lang === "hinglish"
        ? "Interesting fact: Octopus ke three hearts hote hain!"
        : "Interesting fact: An octopus has three hearts!";

    if (/photosynthesis/.test(q))
      return lang === "hinglish"
        ? "Photosynthesis ek process hai jisme plants sunlight, water aur carbon dioxide use karke food banate hain."
        : "Photosynthesis is the process by which plants use sunlight, water and carbon dioxide to make food.";

    if (/gravity/.test(q))
      return lang === "hinglish"
        ? "Gravity ek force hai jo objects ko ek dusre ki taraf attract karti hai."
        : "Gravity is the force that attracts objects towards each other.";

    if (/artificial intelligence|\\bai\\b/.test(q))
      return lang === "hinglish"
        ? "AI yani Artificial Intelligence, machines ko human-like tasks perform karne ki ability deta hai."
        : "Artificial Intelligence is technology that enables machines to perform tasks that usually require human intelligence.";

    if (/capital of india/.test(q))
      return "The capital of India is New Delhi.";

    if (/largest ocean/.test(q))
      return "The Pacific Ocean is the largest ocean in the world.";

    if (/javascript/.test(q))
      return lang === "hinglish"
        ? "JavaScript ek programming language hai jo websites ko interactive banati hai."
        : "JavaScript is a programming language used to make websites interactive.";

    if (/html/.test(q))
      return lang === "hinglish"
        ? "HTML ka full form HyperText Markup Language hai. Isse webpages ka structure banta hai."
        : "HTML stands for HyperText Markup Language. It is used to structure web pages.";

    if (/thank/.test(q))
      return lang === "hinglish" ? "You're welcome! Kabhi bhi pooch sakte ho." : "You're welcome! Happy to help.";

    if (/time|date/.test(q))
      return lang === "hinglish"
        ? "Abhi date aur time tumhare device par available hai."
        : "You can check the current date and time on your device.";

    return lang === "hinglish"
      ? "Interesting question! Is topic ke baare mein mujhe abhi limited information hai. Thoda specific poochho!"
      : "That's an interesting question! I don't have enough information about that yet. Try asking something more specific!";
  }

  function speak(text) {
    if (!("speechSynthesis" in window)) {
      addMessage("Voice output is not supported in this browser.", "bot");
      return;
    }

    window.speechSynthesis.cancel();

    const lang = detectLanguage(input.value);
    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = lang === "hinglish" ? "hi-IN" : "en-IN";
    speech.rate = 0.95;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
  }

  function sendMessage() {
    const question = input.value.trim();
    if (!question) return;

    addMessage("You: " + question, "user");

    const answer = getAnswer(question);
    lastAnswer = answer;

    addMessage("NOVA: " + answer, "bot");

    speak(answer);
    input.value = "";
  }

  document.getElementById("send").onclick = sendMessage;

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") sendMessage();
  });

  document.getElementById("replay").onclick = function () {
    if (lastAnswer) speak(lastAnswer);
  };

  document.getElementById("mic").onclick = function () {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!Recognition) {
      addMessage("Voice input is not supported in this browser.", "bot");
      return;
    }

    const recognition = new Recognition();
    recognition.lang = mode.value === "hinglish" ? "hi-IN" : "en-IN";
    recognition.onresult = function (event) {
      input.value = event.results[0][0].transcript;
      sendMessage();
    };
    recognition.start();
  };
})();

