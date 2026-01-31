let currentTab = 'all';

document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('synapse-theme') === 'dark') toggleTheme();
    refreshUI();
    updateDateTime();
    setFunRecommendations();
    setInterval(updateDateTime, 60000); // Saati her dakika güncelle
});

function updateDateTime() {
    const now = new Date();
    const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    document.getElementById('current-date').innerText = now.toLocaleDateString('tr-TR', dateOptions);
    document.getElementById('current-time').innerText = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
}

function setFunRecommendations() {
    const musics = [
        "Interstellar OST - Hans Zimmer",
        "Daft Punk - Giorgio by Moroder",
        "Pink Floyd - Learning to Fly",
        "Lofi Girl - Study Session",
        "Ramin Djawadi - Westworld Theme"
    ];
    const movies = [
        "The Imitation Game (2014)",
        "Interstellar (2014)",
        "A Beautiful Mind (2001)",
        "The Social Network (2010)",
        "Hidden Figures (2016)"
    ];

    document.getElementById('daily-music').innerText = musics[Math.floor(Math.random() * musics.length)];
    document.getElementById('daily-movie').innerText = movies[Math.floor(Math.random() * movies.length)];
}

function addItem() {
    const text = document.getElementById('textInput');
    const meaning = document.getElementById('meaningInput');
    const category = document.getElementById('categoryInput');
    const type = document.getElementById('typeInput');

    if (!text.value.trim() || !meaning.value.trim()) return alert("Lütfen boş bırakmayın!");

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
    if (['technical', 'daily'].includes(currentTab)) filtered = items.filter(i => i.category === currentTab);
    if (['word', 'sentence'].includes(currentTab)) filtered = items.filter(i => i.type === currentTab);

    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = `item-card ${item.category}`;
        card.innerHTML = `
            <i class="fas fa-times-circle delete-icon" onclick="deleteItem(${item.id})"></i>
            <small style="font-weight:700; color:var(--primary);">${item.type.toUpperCase()}</small>
            <h3 style="margin: 10px 0;">${item.text}</h3>
            <p>${item.meaning}</p>
        `;
        grid.appendChild(card);
    });
}

function deleteItem(id) {
    let items = JSON.parse(localStorage.getItem('synapseData'));
    localStorage.setItem('synapseData', JSON.stringify(items.filter(i => i.id !== id)));
    refreshUI();
}

function switchTab(tab) {
    currentTab = tab;
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    document.getElementById(`btn-${tab}`).classList.add('active');
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
    document.getElementById('theme-toggle').innerHTML = isDark ? '<i class="fas fa-sun"></i> Aydınlık Mod' : '<i class="fas fa-moon"></i> Karanlık Mod';
}

function exportData() {
    const data = localStorage.getItem('synapseData');
    if(!data) return alert("Sözlük boş!");
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