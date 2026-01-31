let currentTab = 'all';

document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('synapse-theme') === 'dark') toggleTheme();
    refreshUI();
    updateDateTime();
    setFunRecommendations();
    setInterval(updateDateTime, 60000);
});

function updateDateTime() {
    const now = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    document.getElementById('current-date').innerText = now.toLocaleDateString('en-US', options);
    document.getElementById('current-time').innerText = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function setFunRecommendations() {
    const musics = ["Interstellar Main Theme", "Daft Punk - Contact", "Pink Floyd - Learning to Fly", "Lofi Study Session"];
    const movies = ["The Imitation Game", "Interstellar", "A Beautiful Mind", "Ex Machina", "The Martian"];
    document.getElementById('daily-music').innerText = musics[Math.floor(Math.random() * musics.length)];
    document.getElementById('daily-movie').innerText = movies[Math.floor(Math.random() * movies.length)];
}

function addItem() {
    const text = document.getElementById('textInput');
    const meaning = document.getElementById('meaningInput');
    const category = document.getElementById('categoryInput');
    const type = document.getElementById('typeInput');

    if (!text.value.trim() || !meaning.value.trim()) return alert("Please fill all fields!");

    const newItem = { id: Date.now(), text: text.value, meaning: meaning.value, category: category.value, type: type.value };
    let items = JSON.parse(localStorage.getItem('synapseData')) || [];
    items.push(newItem);
    localStorage.setItem('synapseData', JSON.stringify(items));

    text.value = ''; meaning.value = ''; text.focus();
    refreshUI();
}

function refreshUI() {
    const grid = document.getElementById('contentGrid');
    grid.innerHTML = '';
    let items = JSON.parse(localStorage.getItem('synapseData')) || [];

    let filtered = items;
    // Specific Filtering Logic
    if (currentTab === 'tech-word') filtered = items.filter(i => i.category === 'technical' && i.type === 'word');
    else if (currentTab === 'tech-sentence') filtered = items.filter(i => i.category === 'technical' && i.type === 'sentence');
    else if (currentTab === 'daily-word') filtered = items.filter(i => i.category === 'daily' && i.type === 'word');
    else if (currentTab === 'daily-sentence') filtered = items.filter(i => i.category === 'daily' && i.type === 'sentence');

    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = `item-card ${item.category}`;
        card.innerHTML = `
            <i class="fas fa-times-circle delete-icon" onclick="deleteItem(${item.id})"></i>
            <small style="font-weight:700; color:var(--primary);">${item.category.toUpperCase()} ${item.type.toUpperCase()}</small>
            <h3 style="margin: 10px 0;">${item.text}</h3>
            <p>${item.meaning}</p>
        `;
        grid.appendChild(card);
    });
}

function switchTab(tab) {
    currentTab = tab;
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    document.getElementById(`btn-${tab}`).classList.add('active');
    refreshUI();
}

function deleteItem(id) {
    let items = JSON.parse(localStorage.getItem('synapseData'));
    localStorage.setItem('synapseData', JSON.stringify(items.filter(i => i.id !== id)));
    refreshUI();
}

function searchItems() {
    const q = document.getElementById('searchInput').value.toLowerCase();
    document.querySelectorAll('.item-card').forEach(c => {
        c.style.display = c.innerText.toLowerCase().includes(q) ? 'block' : 'none';
    });
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('synapse-theme', isDark ? 'dark' : 'light');
    document.getElementById('theme-toggle').innerHTML = isDark ? '<i class="fas fa-sun"></i> Light Mode' : '<i class="fas fa-moon"></i> Dark Mode';
}

function exportData() {
    const data = localStorage.getItem('synapseData');
    if(!data) return alert("Library is empty!");
    const blob = new Blob([data], {type: 'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'synapse-backup.json';
    a.click();
}

function importData(e) {
    const reader = new FileReader();
    reader.onload = (event) => {
        localStorage.setItem('synapseData', event.target.result);
        refreshUI();
    };
    reader.readAsText(e.target.files[0]);
}