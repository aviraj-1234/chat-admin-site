// ----- ADMIN PASSWORD -----
const adminPassword = "admin123";  // aap apna password yaha daal sakte ho

// ----- SUPABASE INIT -----
const supabaseUrl = "YOUR_SUPABASE_URL";   // apna Supabase Project URL
const supabaseKey = "YOUR_ANON_KEY";       // apna Supabase anon public key
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// ----- DOM ELEMENTS -----
const loginMsg = document.getElementById('login-msg');
const chatBox = document.getElementById('chat-box');

// ----- LOGIN FUNCTION -----
function login() {
  const pw = document.getElementById('password').value;
  if(pw === adminPassword) {
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
