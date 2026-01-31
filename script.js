let currentTab = 'all';

// --- ABDULLAH KÖKSAL'S MASTER DATABASE ---
// To add new words: Just add a new object to this array!
const synapseDatabase = [
    { id: 1, text: "Britleness", meaning: "Kırılganlık", category: "technical", type: "word" },
    { id: 2, text: "Density", meaning: "Yoğunluk", category: "technical", type: "word" },
    { id: 3, text: "Hardness", meaning: "Sertlik", category: "technical", type: "word" },
    { id: 4, text: "Infrastructure", meaning: "Altyapı", category: "technical", type: "word" },
    { id: 5, text: "Circular Polarization", meaning: "Dairesel Polarizasyon (Crucial for antenna design)", category: "technical", type: "word" },
    { id: 6, text: "Impedance Matching", meaning: "Maximum power transfer through impedance alignment.", category: "technical", type: "word" },
    { id: 7, text: "The system utilizes RTK for centimeter-level accuracy.", meaning: "Sistem, santimetre seviyesinde doğruluk için RTK kullanır.", category: "technical", type: "sentence" },
    { id: 8, text: "Collaborate", meaning: "İş birliği yapmak", category: "daily", type: "word" },
    { id: 9, text: "Deadline", meaning: "Son teslim tarihi", category: "daily", type: "word" },
    { id: 10, text: "I am highly motivated to work on autonomous systems.", meaning: "Otonom sistemler üzerinde çalışmak için oldukça motivasyonluyum.", category: "daily", type: "sentence" }
];

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
    const musics = ["Interstellar Main Theme", "Daft Punk - Contact", "Pink Floyd - Learning to Fly"];
    const movies = ["The Imitation Game", "Interstellar", "A Beautiful Mind"];
    document.getElementById('daily-music').innerText = musics[Math.floor(Math.random() * musics.length)];
    document.getElementById('daily-movie').innerText = movies[Math.floor(Math.random() * movies.length)];
}

function refreshUI() {
    const grid = document.getElementById('contentGrid');
    grid.innerHTML = '';
    
    let items = synapseDatabase;

    let filtered = items;
    // Filtering Logic for specific sidebar buttons
    if (currentTab === 'tech-word') filtered = items.filter(i => i.category === 'technical' && i.type === 'word');
    else if (currentTab === 'tech-sentence') filtered = items.filter(i => i.category === 'technical' && i.type === 'sentence');
    else if (currentTab === 'daily-word') filtered = items.filter(i => i.category === 'daily' && i.type === 'word');
    else if (currentTab === 'daily-sentence') filtered = items.filter(i => i.category === 'daily' && i.type === 'sentence');

    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = `item-card ${item.category}`;
        card.innerHTML = `
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