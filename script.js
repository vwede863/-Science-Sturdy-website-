function showSection(sectionId) {
  const sections = document.querySelectorAll('section');
  sections.forEach(sec => sec.classList.remove('active'));
  document.getElementById(sectionId).classList.add('active');
}

function getCurrentTime() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return `${hours}:${minutes} ${ampm}`;
}

function sendMessage() {
  const name = document.getElementById('username').value.trim();
  const message = document.getElementById('messageBox').value.trim();
  if (name && message) {
    addMessage(name, message);
    document.getElementById('messageBox').value = "";
    setTimeout(() => botReply(name, message), 800);
  } else {
    alert("Please enter your name and message.");
  }
}

function addMessage(sender, text, isBot = false) {
  const output = document.getElementById('chatOutput');
  const msgContainer = document.createElement('div');
  msgContainer.classList.add('chat-message');
  if (isBot) msgContainer.classList.add('bot-message');

  const msgText = document.createElement('p');
  msgText.innerHTML = `<strong>${sender}:</strong> ${text}`;
  msgContainer.appendChild(msgText);

  const msgTime = document.createElement('span');
  msgTime.classList.add('msg-time');
  msgTime.textContent = "🕒 " + getCurrentTime();
  msgContainer.appendChild(msgTime);

  output.appendChild(msgContainer);
  output.scrollTop = output.scrollHeight;
}

function speakText(text) {
  // Use browser’s built-in speech synthesis
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-GB"; // English UK accent
  speech.rate = 1;       // normal speed
  speech.pitch = 1;      // normal pitch
  window.speechSynthesis.speak(speech);
}

function botReply(username, userMsg) {
  userMsg = userMsg.toLowerCase();
  let reply = "";

  if (userMsg.includes("hi") || userMsg.includes("hello")) {
    reply = `Hello ${username}! 👋 Ready to study? You can ask me about Biology, Chemistry, or JAMB syllabuses.`;
  } 
  else if (userMsg.includes("biology syllabus")) {
    reply = "🧬 Biology topics include Cell structure, Genetics, Ecology, Nutrition, and Evolution.";
  } 
  else if (userMsg.includes("physics syllabus")) {
    reply = "⚛️ Physics covers Motion, Energy, Waves, Electricity, Magnetism, and Atomic Physics.";
  } 
  else if (userMsg.includes("chemistry syllabus")) {
    reply = "🧪 Chemistry includes Atomic structure, Periodic table, Organic chemistry, and Reactions.";
  } 
  else if (userMsg.includes("maths syllabus") || userMsg.includes("mathematics syllabus")) {
    reply = "📐 Mathematics includes Algebra, Geometry, Trigonometry, Probability, and Calculus.";
  } 
  else if (userMsg.includes("english syllabus")) {
    reply = "📚 English includes Comprehension, Summary, Lexis, Structure, and Essay Writing.";
  } 
  else if (userMsg.includes("science fact")) {
    const facts = [
      "Lightning is hotter than the Sun.",
      "Your body has about 37 trillion cells.",
      "Water expands when it freezes.",
      "Plants make food by photosynthesis."
    ];
    reply = facts[Math.floor(Math.random() * facts.length)];
  } 
  else if (userMsg.includes("crypto")) {
    reply = "💰 Crypto is digital money based on blockchain technology, like Bitcoin or Ethereum.";
  } 
  else if (userMsg.includes("career")) {
    reply = "🚀 Build your career by studying hard, gaining skills, and staying focused!";
  } 
  else if (userMsg.includes("bye")) {
    reply = "Goodbye 👋, " + username + "! Keep learning and believing in yourself.";
  } 
  else {
    reply = "🤖 I didn’t understand that yet. Try saying 'Biology syllabus' or 'Tell me a science fact'.";
  }

  addMessage("🤖 Bot", reply, true);
  speakText(reply); // <-- makes the bot talk!
}