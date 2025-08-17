// ----- ADMIN PASSWORD -----
const adminPassword = "admin123";

// ----- DOM Elements -----
const loginMsg = document.getElementById('login-msg');
const chatBox = document.getElementById('chat-box');

// ----- SUPABASE INIT -----
const supabaseUrl = "https://cabavzeycprognnyafkg.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhYmF2emV5Y3Byb2dubnlhZmtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0NDkxMzQsImV4cCI6MjA3MTAyNTEzNH0.ypJbosJtgC_04nryHjaxU0602As2LHO58fRks1206Zg";
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// ----- LOGIN FUNCTION -----
function login() {
  const pw = document.getElementById('password').value;
  if(pw === adminPassword){
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('chat-container').style.display = 'block';
    loadChat();
  } else {
    loginMsg.textContent = "Wrong password!";
  }
}

// ----- SEND MESSAGE -----
async function sendMessage() {
  const msg = document.getElementById('chat-input').value.trim();
  if(msg === "") return;

  await supabase.from('messages').insert([{ text: msg }]);
  document.getElementById('chat-input').value = '';
  loadChat();
}

// ----- LOAD CHAT -----
async function loadChat() {
  const { data } = await supabase.from('messages').select('*').order('timestamp', { ascending: true });
  chatBox.innerHTML = '';
  data.forEach(msg => {
    const div = document.createElement('div');
    const time = new Date(msg.timestamp).toLocaleTimeString();
    div.textContent = `[${time}] ${msg.text}`;
    chatBox.appendChild(div);
  });
}
