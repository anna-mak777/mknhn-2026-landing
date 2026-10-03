# МКЧН-2026 Лендинг

Статический одностраничник IV Межкорпоративного кейс-чемпионата по наставничеству.

**Событие:** 10–12 ноября 2026, Екатеринбург, МВЦ «Экспо»
**Организатор:** АНО «ПРОФТРЕКЕР»

## Структура

```
mkchn-lending/
├── index.html          # Главная (все секции)
├── styles.css          # Все стили
├── script.js           # Форма КП + бургер-меню
├── favicon.svg
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── img/           # Логотипы и фото
│   └── docs/          # PDF документы для скачивания
├── DEPLOY-GUIDE.md    # 👉 Полная инструкция по деплою, Formspree, CRM, логотипам
└── README-TECH.md     # Технические детали сборки
```

## Быстрый деплой

**Netlify Drop** (30 секунд):
1. https://app.netlify.com/drop
2. Перетащить всю папку `mkchn-lending/`
3. Готово

**Vercel:**
```bash
npm i -g vercel
vercel
```

Подробности, настройка Formspree, подключение CRM и требования к логотипам → **[DEPLOY-GUIDE.md](DEPLOY-GUIDE.md)**

## Стек

- Чистый HTML/CSS/JS, без фреймворков и зависимостей
- Шрифты через Google Fonts (Montserrat + Roboto + Roboto Mono)
- Форма через [Formspree](https://formspree.io/f/xgavgrjv) (endpoint уже активен)
- Адаптивность: 3 брейкпоинта (mobile/tablet/desktop)

## Контакты

- **Заказчик:** Анна, АНО «ПРОФТРЕКЕР», info@proftreker.ru
- **Разработчик:** Андрей
