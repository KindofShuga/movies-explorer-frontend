# Проект Movies-explorer `frontend`  
###### Репозиторий фронтенд-части приложения Movies-explorer.

___

### :clipboard: __Описание:__

`«Movies-explorer»` — завершающий дипломный проект ***[на платформе Яндекс.Практикум](https://practicum.yandex.ru/)***. Проект представляет собой сервис поиска и сохранения фимльмов по ключевым словам.

- ### **[Сайт](https://movies-explorer.alinat.nomoredomains.monster/)**
- ### **[Пул реквест](https://github.com/KindofShuga/movies-explorer-frontend/pull/2)**  

___

### :bookmark_tabs: __Функционал:__
###### *Инфраструктурные файлы проекта созданы через Create React App.*
- __JS__:
    - Поиск фильмов по русскому / английскому названию.
    - Сохранение / удаление фильмов в свой профиль.
    - Редактирование своего профиля.
    - Запоминание состояния форм входа / данных профиля пользователя.
    - Моментальная валидация форм.
    - Поиск фильмов со стороннего API.
    - Фильтрация короткометражных фильмов.
    - Всплытие модального окна, при ошибках сервера / некорректных введённых данных / успешной регистрации.
    - Во время загрузки данных, показывается прелоадер.
    - Доступ к сервису фильмов открыт только при авторизации.
    - На странице поиска фильмов реализована кнопка «Ещё» - показываются дополнительные фильмы.

- __CSS__:
    - Отзывчивая вёрстка на Flex layout и Grid layout.
    - Бургерное меню для мобильной и планшетной версии.
    - Микроанимация всех кнопок, ссылок и инпутов.
    - Приложение свёрстано по БЭМ, соблюдается семантичность.
    - Проект адаптирован под различные разрешения экрана.
    - В разных частях проекта есть переиспользуемые блоки.
___

### :wrench: __Технологии:__
[![Технологии](https://skillicons.dev/icons?i=html,css,webpack,react,js,git,figma&theme=light)](https://skillicons.dev)  

___

### :open_file_folder: __Директории:__
| Папка | Описание |
|:------|:---------|
| ***`/components`*** | React-компоненты |
| ***`/images`*** | изображения проекта |
| ***`/vendor`*** | файлы сторонних разработчиков |
| ***`/utils`*** | вспомогательные функций/запросы к API |

____

### :arrow_up_small: __Версии зависимостей:__
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.10.0",
    "react-scripts": "5.0.1",
    "validator": "^13.9.0"

### :bulb: __Запуск:__

- #### __Развернуть API:__
| Команда | Описание |
|:------|:---------|
| ***`git clone https://github.com/KindofShuga/movies-explorer-api.git`*** | клонировать репозиторий |
| ***`npm install`*** | установка зависимостей |
| ***`npm run dev`*** | запуск сервера *(порт 3000)* |

- #### __Развернуть фронтенд:__
| Команда | Описание |
|:------|:---------|
| ***`git clone https://github.com/KindofShuga/movies-explorer-frontend.git`*** | клонировать репозиторий |
| ***`npm install`*** | установка зависимостей |
| ***`npm run build`*** | собрать проект |
| ***`npm run start`*** | запуск проекта |
____

### :link: __Дополнительные ссылки__
- __Проект__:
    - [`Репозиторий с Бекендом`](https://github.com/KindofShuga/movies-explorer-api)  
    - [`Макет проекта Figma`](https://disk.yandex.ru/d/xv3V8z1EjBBu0w)   
    - `Домен фронтенда` — https://movies-explorer.alinat.nomoredomains.monster
    - `Домен бэкенда` — https://api.movies-explorer.alina.nomoredomains.monster
    - `Домен со сторонним API фильмов` — https://api.nomoreparties.co/beatfilm-movies  

- __Материалы Яндекса__:  
    - [`Чек-лист диплома`](https://code.s3.yandex.net/web-developer/static/new-program/web-diploma-criteria-2.0/index.html)  
    - [`Стандарты Яндекс.Практикума` по оформлению HTML и CSS кода](https://code.s3.yandex.net/web-developer/landings/design-rules/index.html)
