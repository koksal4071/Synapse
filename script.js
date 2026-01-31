let currentTab = 'all';

// Başlangıç Ayarları
document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('synapse-theme') === 'dark') toggleTheme();
    refreshUI();
});

// Yeni Veri Ekleme
function addItem() {
    const text = document.getElementById('textInput');
    const meaning = document.getElementById('meaningInput');
    const category = document.getElementById('categoryInput');
    const type = document.getElementById('typeInput');

    if (!text.value.trim() || !meaning.value.trim()) return alert("Lütfen boş alan bırakmayın!");

    const newItem = { 
        id: Date.now(), 
        text: text.value, 
        meaning: meaning.value, 
        category: category.value, 
        type: type.value 
    };

    let items = JSON.parse(localStorage.getItem('synapseData')) || [];
    items.push(newItem);
    localStorage.setItem('synapseData', JSON.stringify(items));

    text.value = '';
    meaning.value = '';
    text.focus();
    refreshUI();
}

// Arayüzü Güncelleme ve Filtreleme
function refreshUI() {
    const grid = document.getElementById('contentGrid');
    grid.innerHTML = '';
    let items = JSON.parse(localStorage.getItem('synapseData')) || [];

    let filtered = items;
    if (['technical', 'daily'].includes(currentTab)) {
        filtered = items.filter(i => i.category === currentTab);
    } else if (['word', 'sentence'].includes(currentTab)) {
        filtered = items.filter(i => i.type === currentTab);
    }

    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = `item-card ${item.category}`;
        card.innerHTML = `
            <i class="fas fa-times-circle delete-icon" onclick="deleteItem(${item.id})"></i>
            <small style="font-weight:700; color:var(--primary); letter-spacing:1px;">
                ${item.type.toUpperCase()} / ${item.category.toUpperCase()}
            </small>
            <h3 style="margin: 15px 0 10px 0;">${item.text}</h3>
            <p style="opacity: 0.8; line-height: 1.6;">${item.meaning}</p>
        `;
        grid.appendChild(card);
    });
}

// Silme Fonksiyonu
function deleteItem(id) {
    let items = JSON.parse(localStorage.getItem('synapseData'));
    localStorage.setItem('synapseData', JSON.stringify(items.filter(i => i.id !== id)));
    refreshUI();
}

// Sekme Değiştirme
function switchTab(tab) {
    currentTab = tab;
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    document.getElementById(`btn-${tab}`).classList.add('active');
    refreshUI();
}

// Arama Motoru
function searchItems() {
    const q = document.getElementById('searchInput').value.toLowerCase();
    document.querySelectorAll('.item-card').forEach(c => {
        const match = c.innerText.toLowerCase().includes(q);
        c.style.display = match ? 'block' : 'none';
    });
}

// Karanlık Mod Geçişi
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('synapse-theme', isDark ? 'dark' : 'light');
    document.getElementById('theme-toggle').innerHTML = isDark ? 
        '<i class="fas fa-sun"></i> Aydınlık Mod' : '<i class="fas fa-moon"></i> Karanlık Mod';
}

// JSON Dışa Aktar (Yedekle)
function exportData() {
    const data = localStorage.getItem('synapseData');
    if(!data) return alert("Kütüphane boş!");
    const blob = new Blob([data], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `synapse-backup-${new Date().toLocaleDateString()}.json`;
    a.click();
}

// JSON İçe Aktar (Yükle)
function importData(e) {
    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            JSON.parse(event.target.result); // Test et
            localStorage.setItem('synapseData', event.target.result);
            refreshUI();
            alert("Synapse Ağı başarıyla güncellendi!");
        } catch(err) { alert("Hatalı dosya formatı!"); }
    };
    reader.readAsText(e.target.files[0]);
}