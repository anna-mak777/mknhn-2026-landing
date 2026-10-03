# МКЧН-2026 Лендинг — production build

Статический одностраничник IV Межкорпоративного кейс-чемпионата по наставничеству.
Готов к загрузке на любой хостинг.

## Состав

```
public/
├── index.html         # Главная страница (единая, адаптивная)
├── styles.css         # Все стили (брендбук ПРОФТРЕКЕР + сезонный лайм 2026)
├── script.js          # Форма КП + бургер-меню
├── favicon.svg        # Иконка вкладки
├── robots.txt         # Для поисковых роботов
├── sitemap.xml        # Карта сайта (замените домен на реальный)
└── assets/
    ├── img/
    │   ├── mkchn-logo.png
    │   ├── proftreker-light.png
    │   └── hero-team.webp
    └── docs/
        ├── programma-mkchn-2026.pdf
        └── priglashenie-mkchn-2026.pdf
```

## Деплой — варианты

### 1. Netlify Drop (самый быстрый, 30 секунд)
1. Открыть https://app.netlify.com/drop
2. Перетащить папку `public/` целиком
3. Получить публичный URL
4. (Опционально) подключить домен в настройках Netlify

### 2. Vercel
```bash
npm i -g vercel
cd public
vercel
```

### 3. GitHub Pages
1. Создать репозиторий, положить содержимое `public/` в корень
2. Settings → Pages → Branch: main → Save

### 4. Обычный хостинг (FTP/SFTP)
Загрузить всё содержимое `public/` в корень домена.

## Что обновить перед запуском

### Формa КП (Formspree)
- `script.js` → если endpoint сменится, поменять в `index.html` → `action="https://formspree.io/f/xgavgrjv"`
- **Важно:** при первой отправке Formspree отправит письмо-подтверждение на `info@proftreker.ru` — надо нажать «Confirm your email» в этом письме.

### CRM интеграция (когда будет готова)
В `script.js` найти:
```js
var CRM_WEBHOOK_URL = null;
```
Заменить `null` на URL webhook вашей CRM. Форма начнёт параллельно отправлять заявки в CRM.

### Домен
В `sitemap.xml` и `robots.txt` заменить `https://mkchn-2026.ru/` на реальный URL.

В `index.html` можно добавить canonical:
```html
<link rel="canonical" href="https://ваш-домен.ру/">
```

### Внешние регистрации (МВЦ ЭКСПО)
В разметке кнопок «Регистрация» на карточках форума и демо-игры подставить реальные ссылки:
```html
<a href="https://expo.ru/..." class="btn btn-primary">Регистрация</a>
```
Эти кнопки сейчас с `href="#"`.

### Отсутствующие документы
Когда появятся — положить PDF в `assets/docs/` и в `index.html` раскомментировать карточку в блоке «Документы», указав путь:
- Положение МКЧН-2026
- Гайд по отелям
- Памятка участника
- Протоколы Полуфинала (после 12.11)
- Протоколы Финала (после 12.11)

### Видео 2025 года
В блоке «О чемпионате» ссылка `href="#"` на «Видео о том, как это было в 2025 году». Заменить на реальный URL видео (YouTube / VK Video / RuTube).

### Логотипы участников и партнёров
См. `../snippets/README-logos.md` для требований к размеру (600×400 для участников, 500×240 для партнёров, SVG или прозрачный PNG).

## Технические детали

- **Шрифты:** Google Fonts (Montserrat + Roboto + Roboto Mono) с `display: swap`
- **Favicon:** SVG (поддерживается всеми современными браузерами)
- **Адаптивность:** 3 брейкпоинта — mobile (`<768px`), tablet (`<1024px`), desktop (`≥1024px`)
- **SEO:** meta description, keywords, Open Graph, Twitter Card, sitemap, robots
- **Доступность:** семантическая разметка, aria-label на иконках, фокус-состояния на инпутах, keyboard navigation
- **Производительность:** все стили в одном файле, JS с `defer`, нет внешних библиотек

## Отладка формы

Если форма не отправляется:
1. Открыть DevTools → Network → отправить тестовую заявку
2. Посмотреть ответ от `formspree.io/f/xgavgrjv`
3. Если 422 или 403 — проверить настройки формы в панели Formspree
4. Проверить что email `info@proftreker.ru` подтверждён в Formspree

## Контакты
- Организатор: АНО «ПРОФТРЕКЕР»
- Email: info@proftreker.ru
- Телефон: +7 (922) 198-03-75
