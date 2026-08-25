let children = JSON.parse(localStorage.getItem('children') || '[]');
let notes = JSON.parse(localStorage.getItem('notes') || '[]');

function showSection(sectionId, event) {
    if (event) event.preventDefault();
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    if (event && event.target.closest('.nav-link')) event.target.closest('.nav-link').classList.add('active');
    if (sectionId === 'children') loadChildren();
    if (sectionId === 'notes') { loadNotes(); updateChildSelect(); }
}

function addChild() {
    const name = prompt('Имя ребёнка:');
    if (!name) return;
    const birthDate = prompt('Дата рождения (YYYY-MM-DD):');
    const sunSign = prompt('Знак Солнца:');
    const moonSign = prompt('Знак Луны:');
    children.push({ id: Date.now(), name, birthDate: birthDate || '', sunSign: sunSign || '', moonSign: moonSign || '' });
    localStorage.setItem('children', JSON.stringify(children));
    loadChildren();
}

function loadChildren() {
    const grid = document.getElementById('childrenGrid');
    if (children.length === 0) {
        grid.innerHTML = '<p style="text-align:center;">Nog geen kinderen toegevoegd</p>';
        return;
    }
    grid.innerHTML = children.map(child => `
        <div class="child-card">
            <div class="child-name">${child.name}</div>
            ${child.birthDate ? `<div>📅 ${child.birthDate}</div>` : ''}
            <div class="zodiac-badges">
                ${child.sunSign ? `<span class="zodiac-badge">☀️ ${child.sunSign}</span>` : ''}
                ${child.moonSign ? `<span class="zodiac-badge">🌙 ${child.moonSign}</span>` : ''}
            </div>
        </div>`).join('');
}

function updateChildSelect() {
    const select = document.getElementById('noteChildSelect');
    select.innerHTML = '<option value="">Выберите ребёнка</option>';
    children.forEach(child => select.innerHTML += `<option value="${child.id}">${child.name}</option>`);
}

function saveNote() {
    const childId = document.getElementById('noteChildSelect').value;
    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;
    const tags = document.getElementById('noteTags').value.split(',').map(t => t.trim()).filter(Boolean);
    if (!childId || !title || !content) { alert('Заполните все поля'); return; }
    notes.push({ id: Date.now(), childId: parseInt(childId), title, content, tags, createdAt: new Date().toISOString() });
    localStorage.setItem('notes', JSON.stringify(notes));
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteContent').value = '';
    document.getElementById('noteTags').value = '';
    loadNotes();
    alert('Пометка сохранена! ✨');
}

function loadNotes() {
    const list = document.getElementById('notesList');
    if (notes.length === 0) { list.innerHTML = '<p style="text-align:center;padding:30px;">Пока нет заметок</p>'; return; }
    list.innerHTML = [...notes].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).map(note => {
        const child = children.find(c => c.id === parseInt(note.childId));
        const date = new Date(note.createdAt).toLocaleDateString('ru-RU');
        return `<div class="note-card">
            <div style="display:flex;justify-content:space-between;margin-bottom:10px;">
                <strong>${child ? child.name : 'Unknown'} - ${date}</strong>
                <button onclick="deleteNote(${note.id})" style="background:none;border:none;cursor:pointer;">🗑️</button>
            </div>
            <h4 style="color:var(--cosmic-purple);margin-bottom:10px;">${note.title}</h4>
            <p style="line-height:1.6;white-space:pre-wrap;">${note.content}</p>
            ${note.tags.length ? `<div style="margin-top:10px;">${note.tags.map(t => `<span style="background:var(--planet-purple);color:white;padding:5px 14px;border-radius:15px;font-size:12px;margin-right:5px;">${t}</span>`).join('')}</div>` : ''}
        </div>`;
    }).join('');
}

function deleteNote(id) {
    if (confirm('Удалить заметку?')) {
        notes = notes.filter(n => n.id !== id);
        localStorage.setItem('notes', JSON.stringify(notes));
        loadNotes();
    }
}

function drawTarot(count) {
    const cards = [
        { name: 'De Dwaas', meaning: 'Nieuwe beginnen, spontaniteit' },
        { name: 'De Magiër', meaning: 'Manifestatie, kracht' },
        { name: 'De Hogepriesteres', meaning: 'Intuïtie, mysterie' },
        { name: 'De Keizerin', meaning: 'Vruchtbaarheid, overvloed' },
        { name: 'De Keizer', meaning: 'Autoriteit, structuur' }
    ];
    const display = document.getElementById('tarotDisplay');
    display.innerHTML = '';
    const drawn = [];
    while (drawn.length < count) {
        const card = cards[Math.floor(Math.random() * cards.length)];
        if (!drawn.includes(card)) drawn.push(card);
    }
    drawn.forEach((card, i) => setTimeout(() => {
        display.innerHTML += `<div style="background:linear-gradient(135deg,var(--gold-primary),var(--gold-light));padding:30px;border-radius:15px;width:200px;box-shadow:0 10px 40px rgba(212,175,55,.5);">
            <div style="font-size:50px;margin-bottom:15px;">🔮</div>
            <div style="font-weight:bold;color:var(--cosmic-dark);font-size:18px;margin-bottom:10px;">${card.name}</div>
            <div style="font-size:14px;color:var(--text-dark);">${card.meaning}</div>
        </div>`;
    }, i * 300));
}

window.addEventListener('DOMContentLoaded', () => { loadChildren(); loadNotes(); updateChildSelect(); });
