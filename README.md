# Задание 1: Микрофронтенды для проекта Mesto


## Описание проекта
Mesto <sup>Russia</sup> - это социальная сеть, где пользователи могут делиться фотографиями своих путешествий.


## Проектирование
### Выбор фреймворка для микрофронтендов

Были рассмотрены два наиболее популярных подхода для реализации микрофронтендов: Module Federation и Single SPA.

Некоторые особенности, которые были учтены при выборе, приведены в сравнительной таблице:
| Критерий | Module Federation | Single SPA |
|----------|------------------|------------|
| Уровень интеграции | Компоненты | Приложения |
| Конфигурация | Webpack | Любой бандлер |
| Совместное использование зависимостей | Встроено | Ручная настройка |
| Поддержка фреймворков | В основном React | Любые фреймворки |
| Сложность настройки | Средняя | Высокая |
| Размер бандла | Оптимизирован | Может быть избыточным |

При выборе были учтены следующие особенности текущего фронтенда:
- Использует React для всех компонентов
- Использует Webpack для сборки
- Не имеет legacy кода

Исходя из этого, было принято решение использовать Module Federation, так как он позволяет легко использовать совместные зависимости, не требует значительных изменений в коде и структуре проекта, не требует установки дополнительных зависимостей.

Для обмена данными между микрофронтендами были принято решение использовать shared context.

### Выделение микрофронтендов

Компоненты существующего фронтенда были рассмотрены с точки зрения функциональности и взасимозависимостей. Исходя из этого, было принято решение выделить следующие микрофронтенды:

- Профиль (профиль пользователя, редактирование профиля, редактирование аватара)
- Карточки (карточки с изображениями, лайки, удаление карточки)
- Аутентификация (регистрация, авторизация, выход из системы)
- Хост (общая структура проекта, навигация между микрофронтендами)
- Shared - общие компоненты (с пометкой TODO: переделать в библиотеку компонентов)

В итоге получилась следующая структура проекта (часть дерева проекта скрыто как не имещующее отношение к сути решения):

```
architecture-sprint-1
└─ frontend
   ├─ microfrontend
   │  ├─ auth
   │  │  ├─ Dockerfile
   │  │  ├─ compilation.config.js
   │  │  ├─ package-lock.json
   │  │  ├─ package.json
   │  │  ├─ public
   │  │  │  └─ index.html
   │  │  ├─ src
   │  │  │  ├─ App.jsx
   │  │  │  ├─ blocks
   │  │  │  │  ├─ auth-form
   │  │  │  │  └─ login
   │  │  │  │     └─ login.css
   │  │  │  ├─ components
   │  │  │  │  ├─ InfoTooltip.js
   │  │  │  │  ├─ Login.js
   │  │  │  │  └─ Register.js
   │  │  │  ├─ images
   │  │  │  │  ├─ error-icon.svg
   │  │  │  │  └─ success-icon.svg
   │  │  │  ├─ index.css
   │  │  │  ├─ index.js
   │  │  │  └─ utils
   │  │  │     └─ auth.js
   │  │  └─ webpack.config.js
   │  ├─ compose.yaml
   │  ├─ feeds
   │  │  ├─ Dockerfile
   │  │  ├─ compilation.config.js
   │  │  ├─ package-lock.json
   │  │  ├─ package.json
   │  │  ├─ public
   │  │  │  └─ index.html
   │  │  ├─ src
   │  │  │  ├─ App.jsx
   │  │  │  ├─ blocks
   │  │  │  │  ├─ card
   │  │  │  │  ├─ places
   │  │  │  │  └─ popup
   │  │  │  ├─ components
   │  │  │  │  ├─ AddPlacePopup.js
   │  │  │  │  ├─ Card.js
   │  │  │  │  └─ ImagePopup.js
   │  │  │  ├─ images
   │  │  │  │  ├─ close.svg
   │  │  │  │  ├─ delete-icon.svg
   │  │  │  │  ├─ like-active.svg
   │  │  │  │  └─ like-inactive.svg
   │  │  │  ├─ index.css
   │  │  │  └─ index.js
   │  │  └─ webpack.config.js
   │  ├─ host
   │  │  ├─ Dockerfile
   │  │  ├─ compilation.config.js
   │  │  ├─ package-lock.json
   │  │  ├─ package.json
   │  │  ├─ public
   │  │  │  ├─ favicon.ico
   │  │  │  ├─ logo192.png
   │  │  │  ├─ logo512.png
   │  │  │  ├─ manifest.json
   │  │  │  └─ robots.txt
   │  │  ├─ src
   │  │  │  ├─ blocks
   │  │  │  │  ├─ content
   │  │  │  │  ├─ footer
   │  │  │  │  ├─ header
   │  │  │  │  ├─ page
   │  │  │  │  └─ popup
   │  │  │  ├─ bootstrap.js
   │  │  │  ├─ components
   │  │  │  │  ├─ App.jsx
   │  │  │  │  ├─ Footer.js
   │  │  │  │  ├─ Header.js
   │  │  │  │  └─ Main.js
   │  │  │  ├─ contexts
   │  │  │  │  └─ CurrentUserContext.js
   │  │  │  ├─ images
   │  │  │  │  └─ logo.svg
   │  │  │  ├─ index.css
   │  │  │  ├─ index.html
   │  │  │  ├─ index.js
   │  │  │  ├─ serviceWorker.js
   │  │  │  ├─ utils
   │  │  │  │  ├─ api.js
   │  │  │  │  └─ auth.js
   │  │  │  └─ vendor
   │  │  │     ├─ fonts
   │  │  │     │  ├─ Inter-Black.woff2
   │  │  │     │  └─ Inter-Regular.woff2
   │  │  │     ├─ fonts.css
   │  │  │     └─ normalize.css
   │  │  └─ webpack.config.js
   │  ├─ profile
   │  │  ├─ Dockerfile
   │  │  ├─ compilation.config.js
   │  │  ├─ package-lock.json
   │  │  ├─ package.json
   │  │  ├─ public
   │  │  │  └─ index.html
   │  │  ├─ src
   │  │  │  ├─ App.jsx
   │  │  │  ├─ blocks
   │  │  │  │  ├─ popup
   │  │  │  │  └─ profile
   │  │  │  ├─ components
   │  │  │  │  ├─ EditAvatarPopup.js
   │  │  │  │  ├─ EditProfilePopup.js
   │  │  │  │  └─ ProfileSection.js
   │  │  │  ├─ images
   │  │  │  │  ├─ add-icon.svg
   │  │  │  │  ├─ close.svg
   │  │  │  │  └─ edit-icon.svg
   │  │  │  ├─ index.css
   │  │  │  └─ index.js
   │  │  └─ webpack.config.js
   │  ├─ shared

   │  │  ├─ Dockerfile
   │  │  ├─ compilation.config.js
   │  │  ├─ package-lock.json
   │  │  ├─ package.json
   │  │  ├─ src
   │  │  │  ├─ App.jsx
   │  │  │  ├─ blocks
   │  │  │  │  └─ popup
   │  │  │  ├─ components
   │  │  │  │  └─ PopupWithForm.js
   │  │  │  ├─ images
   │  │  │  │  └─ close.svg
   │  │  │  ├─ index.css
   │  │  │  ├─ index.html
   │  │  │  └─ index.js
   │  │  └─ webpack.config.js
   │  └─ shared-context
   │     ├─ package-lock.json
   │     ├─ package.json
   │     └─ src
   │        ├─ CurrentUserContext.js
   │        └─ index.js

```

### Реализация
Реализация проекта осущствлялась исходя из намеченного плана. 

Помимо прочего была обновлена версия React до 18.2.0 и React Router до 7.1.1. Был создан новый компонент ```ProfileSection``` для микрофроентда ```profile```, вынесенный из компонента ```Main```, т.к. прежний вариант противоречил обновленной архитектуре (содержал логику, относящуюся к "профилю пользователя"). 


### TODO
Микрофронтенд ```shared``` стоит переделать в библиотеку, т.к. он не привязан к определелённой бизнес-логике приложения, а лишь содержит общеиспользуемые копмоненты.


# Задание 2: Декомпозиия приложения на Django 

[Ссылка на схему](https://drive.google.com/file/d/1OyZ2aus2YrmWSi7lUb2Xnx6Ycd0AGwfN/view?usp=sharing)