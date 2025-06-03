const analysisList = document.getElementById('analysisList');
const usernameInput = document.getElementById('usernameInput');
const userIntervals = {};

function addUser(username) {
  const li = document.createElement('li');
  li.className = 'list-group-item d-flex justify-content-between align-items-center';
  li.innerHTML = `<span class="username text-primary">${username}</span><span class="status">...</span>`;
  analysisList.appendChild(li);

  li.querySelector('.username').addEventListener('click', () => showRecordings(username));
  checkStatus(username, li);
  userIntervals[username] = setInterval(() => checkStatus(username, li), 5000);
}

async function checkStatus(username, li) {
  try {
    const res = await fetch(`/api/status/${username}`);
    const data = await res.json();
    if (data.live) {
      li.querySelector('.status').innerHTML = '<i class="bi bi-download text-success"></i>';
    } else {
      clearInterval(userIntervals[username]);
      const recRes = await fetch(`/api/recordings/${username}`);
      const recData = await recRes.json();
      li.querySelector('.status').innerHTML = `<span class="badge bg-secondary">${recData.recordings.length}</span>`;
    }
  } catch (e) {
    li.querySelector('.status').textContent = 'خطأ';
  }
}

async function showRecordings(username) {
  const res = await fetch(`/api/recordings/${username}`);
  const data = await res.json();
  const tbody = document.getElementById('recordsBody');
  tbody.innerHTML = '';
  data.recordings.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${r.date}</td><td>${r.time}</td><td>${r.duration}</td><td>${r.size}</td><td><a href="${r.url}" class="btn btn-sm btn-success" download>تنزيل</a></td>`;
    tbody.appendChild(tr);
  });
  document.querySelector('#recordingsModal .modal-title').textContent = username;
  new bootstrap.Modal(document.getElementById('recordingsModal')).show();
}

document.getElementById('analyzeBtn').addEventListener('click', () => {
  const username = usernameInput.value.trim();
  if (username) {
    addUser(username);
    usernameInput.value = '';
  }
});
