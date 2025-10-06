// script.js
// ВАЖЛИВО: не вставляйте публічно API-ключ в репозиторій!
// Тут — статичні демо-відео (YouFurry), і всі кнопки працюють локально.

const demoVideos = [
  {
    id: 'yf1',
    title: 'Furry Adventures — Episode 1',
    thumb: 'assets/furry1.jpg',
    channel: 'YouFurry Studio',
    views: '1.2M',
    duration: '4:12',
    src: 'assets/sample-video.mp4' // локальна заглушка (можете замінити)
  },
  {
    id: 'yf2',
    title: 'Corgi Tips & Tricks',
    thumb: 'assets/furry2.jpg',
    channel: 'FurTube',
    views: '842K',
    duration: '6:05',
    src: 'assets/sample-video.mp4'
  },
  {
    id: 'yf3',
    title: 'Meet the Foxes',
    thumb: 'assets/furry3.jpg',
    channel: 'AnimAll',
    views: '420K',
    duration: '3:33',
    src: 'assets/sample-video.mp4'
  },
  {
    id: 'yf4',
    title: 'Cute Cats Compilation',
    thumb: 'assets/furry4.jpg',
    channel: 'YouFurry Studio',
    views: '2.3M',
    duration: '10:11',
    src: 'assets/sample-video.mp4'
  }
];

const videosGrid = document.getElementById('videosGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const sortSelect = document.getElementById('sortSelect');
const playerModal = document.getElementById('playerModal');
const playerArea = document.getElementById('playerArea');
const videoMeta = document.getElementById('videoMeta');
const closeModal = document.getElementById('closeModal');

function renderCards(list){
  videosGrid.innerHTML = '';
  list.forEach(v=>{
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="thumb" data-id="${v.id}">
        <img src="${v.thumb}" alt="${v.title}" />
        <div class="play-btn">▶</div>
      </div>
      <div class="card-body">
        <div class="title">${v.title}</div>
        <div class="meta">${v.channel} • ${v.views} views</div>
      </div>
    `;
    // Клік по обкладинці відкриває модал
    card.querySelector('.thumb').addEventListener('click', () => openPlayer(v));
    videosGrid.appendChild(card);
  });
}

function openPlayer(video){
  // Якщо у вас є YouTube API: тут можна підставити iframe з youtube.com/embed/VIDEO_ID
  playerArea.innerHTML = '';
  const videoEl = document.createElement('video');
  videoEl.controls = true;
  videoEl.src = video.src;
  videoEl.autoplay = true;
  playerArea.appendChild(videoEl);

  videoMeta.innerHTML = `<h3>${video.title}</h3><p>${video.channel} • ${video.views} views</p>`;
  playerModal.classList.remove('hidden');
}

// Закриття модалу
closeModal.addEventListener('click', ()=> {
  playerModal.classList.add('hidden');
  playerArea.innerHTML = '';
});

// Простий пошук
searchBtn.addEventListener('click', ()=> {
  const q = searchInput.value.trim().toLowerCase();
  const filtered = demoVideos.filter(v => v.title.toLowerCase().includes(q) || v.channel.toLowerCase().includes(q));
  renderCards(filtered);
});

// Enter для поля пошуку
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') searchBtn.click();
});

// Навігація бічного меню
document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    // Проста демо-реакція
    const section = btn.dataset.section;
    if(section === 'home') renderCards(demoVideos);
    else if(section === 'trending') renderCards(demoVideos.slice().reverse());
    else renderCards(demoVideos.filter((_,i)=> i % 2 === 0));
  });
});

// Кнопки зверху
document.getElementById('uploadBtn').addEventListener('click', ()=> alert('Функція завантаження (демо). Додайте бекенд для реального завантаження.'));
document.getElementById('profileBtn').addEventListener('click', ()=> alert('Профіль (демо).'));

// Сортування
sortSelect.addEventListener('change', ()=> {
  const val = sortSelect.value;
  let arr = demoVideos.slice();
  if(val === 'new') arr = arr.reverse();
  if(val === 'popular') arr = arr.sort((a,b)=> parseInt(b.views) - parseInt(a.views));
  renderCards(arr);
});

// Ініціалізація
renderCards(demoVideos);
