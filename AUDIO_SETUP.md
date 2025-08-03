# 🎵 Настройка на Аудио Файлове

## 📁 Структура на аудио файловете

```
assets/
└── audio/
    ├── main-performance.mp3      # Основно изпълнение (hero секция)
    ├── classical-aria.mp3        # Класическа ария
    ├── modern-acapella.mp3       # Модерна акапела
    ├── bulgarian-folk.mp3        # Българска народна
    └── README.md                 # Този файл
```

## 🎯 Препоръки за аудио файлове

### Формати
- **MP3** - Най-добър за уеб (малък размер, добра качество)
- **WAV** - За най-високо качество (голям размер)
- **OGG** - Отворен формат, добра компресия

### Качество
- **Битрейт:** 128-320 kbps за MP3
- **Честота:** 44.1 kHz
- **Канали:** Стерео

### Размер
- **Максимален размер:** 10MB на файл
- **Препоръчан размер:** 2-5MB за 3-5 минути

## 🔧 Как да добавите вашите аудио файлове

### Стъпка 1: Подгответе файловете
1. **Конвертирайте** в MP3 формат
2. **Оптимизирайте** размера
3. **Преименувайте** файловете според структурата

### Стъпка 2: Качете файловете
1. Поставете аудио файловете в `assets/audio/`
2. Уверете се, че имената съвпадат с HTML кода

### Стъпка 3: Обновете HTML
В `index.html`, намерете аудио плейъра и обновете пътя:

```html
<!-- Основен плейър -->
<audio id="mainAudio" src="assets/audio/main-performance.mp3"></audio>

<!-- Картове с изпълнения -->
<button class="play-card-btn" data-audio="assets/audio/classical-aria.mp3">
    <i class="fas fa-play"></i>
</button>
```

### Стъпка 4: Обновете JavaScript
В `js/scripts.js`, добавете функционалност за реални аудио файлове:

```javascript
// За основния плейър
const mainAudio = new Audio('assets/audio/main-performance.mp3');

// За картовете с изпълнения
const performanceAudios = {
    'classical-aria': new Audio('assets/audio/classical-aria.mp3'),
    'modern-acapella': new Audio('assets/audio/modern-acapella.mp3'),
    'bulgarian-folk': new Audio('assets/audio/bulgarian-folk.mp3')
};
```

## 🎼 Примерни аудио файлове

### За тестване (placeholder файлове)
Можете да използвате безплатни аудио файлове от:
- **Free Music Archive** - https://freemusicarchive.org/
- **Incompetech** - https://incompetech.com/
- **Bensound** - https://www.bensound.com/

### За production
Използвайте вашите собствени записи:
1. **Запишете** всички гласове поотделно
2. **Обработете** с AI инструменти
3. **Смесете** в DAW
4. **Експортирайте** в MP3

## 🔧 Инструменти за обработка

### Запис
- **Audacity** - Безплатен аудио редактор
- **GarageBand** - За Mac потребители
- **Reaper** - Професионален DAW

### AI обработка
- **Cursor AI** - За генериране на различни гласове
- **Adobe Audition** - За вокални ефекти
- **Melodyne** - За корекция на тона

### Микс и мастер
- **Logic Pro** - Професионален DAW
- **Pro Tools** - Индустриен стандарт
- **FL Studio** - За електронна музика

## 📱 Мобилна оптимизация

### Автоматично възпроизвеждане
Мобилните браузъри блокират автоматичното възпроизвеждане. За да решите това:

```javascript
// Позволете възпроизвеждане след потребителско взаимодействие
document.addEventListener('click', function() {
    audio.play().catch(e => console.log('Autoplay prevented'));
}, { once: true });
```

### Прогрес индикатор
Добавете визуален индикатор за зареждане:

```javascript
audio.addEventListener('loadstart', () => {
    showLoadingIndicator();
});

audio.addEventListener('canplay', () => {
    hideLoadingIndicator();
});
```

## 🎯 SEO за аудио

### Meta данни
Добавете мета данни за аудио файловете:

```html
<meta property="og:audio" content="https://yoursite.com/assets/audio/main-performance.mp3">
<meta property="og:audio:type" content="audio/mpeg">
```

### Schema.org маркиране
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "MusicRecording",
  "name": "Виртуален Хор - Основно изпълнение",
  "artist": "Вашето име",
  "duration": "PT3M45S",
  "url": "https://yoursite.com/assets/audio/main-performance.mp3"
}
</script>
```

## 🔒 Правни съображения

### Авторски права
- Уверете се, че имате права върху всички аудио материали
- За ремикси и кавъри, получете разрешение
- Използвайте Creative Commons лицензирани материали

### Лицензиране
Добавете информация за лицензирането:

```html
<div class="audio-license">
    <p>© 2025 Вашето име. Всички права запазени.</p>
    <p>Лиценз: Creative Commons Attribution-NonCommercial 4.0</p>
</div>
```

## 🚀 Производителност

### Кеширане
Настройте кеширане за аудио файлове:

```html
<!-- В .htaccess файл -->
<FilesMatch "\.(mp3|wav|ogg)$">
    ExpiresActive On
    ExpiresDefault "access plus 1 month"
</FilesMatch>
```

### Компресия
Използвайте gzip компресия:

```html
<!-- В .htaccess файл -->
<FilesMatch "\.(mp3|wav|ogg)$">
    SetOutputFilter DEFLATE
</FilesMatch>
```

## 📞 Поддръжка

Ако имате проблеми с аудио файловете:
1. Проверете форматите
2. Уверете се, че пътищата са правилни
3. Тествайте в различни браузъри
4. Проверете конзолата за грешки

---

**Създайте нещо невероятно с вашата музика!** 🎵✨ 