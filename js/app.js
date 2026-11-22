"use strict";

const NOVA = {
  name: "NOVA AI",
  version: "2.0",
  language: "auto",
  voiceEnabled: true,
  history: [],
  isSearching: false
};

function novaWelcome() {
  console.log("NOVA AI Advanced Edition is ready!");
}

function detectLanguage(text) {
  const hinglishWords =
    /\b(kya|kaise|kyun|hai|hain|mujhe|mera|meri|batao|chahiye|kaisa|karo|nahi|haan|aur|matlab)\b/i;

  return hinglishWords.test(text) ? "hinglish" : "english";
}

function novaSaveHistory(question, answer) {
  NOVA.history.push({
    question,
    answer,
    time: new Date().toISOString()
  });

  try {
    localStorage.setItem("novaHistory", JSON.stringify(NOVA.history));
  } catch (error) {
    console.warn("History could not be saved.");
  }
}

function novaSpeak(text, language = "english") {
  if (!NOVA.voiceEnabled || !("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = language === "hinglish" ? "hi-IN" : "en-IN";
  speech.rate = 0.95;

  window.speechSynthesis.speak(speech);
}

novaWelcome();