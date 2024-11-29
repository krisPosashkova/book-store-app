# Bookstore: Random Book Generator

Users can dynamically change the initial values and parameters to get randomly generated data about books, including their title, authors, publishers, ISBN, as well as the number of likes and reviews. The data is updated automatically when settings are changed, and the table supports endless scrolling for user convenience.

### Main functions:

-   Language and Region selection: The user can select one of three languages and regions to generate data corresponding to the selected localization.
-   Random Data: The user can enter a seed to generate random data for each book, including ISBN, title, authors and publisher.
-   Average number of likes and reviews: Sliders to adjust the average number of likes and reviews for a book, with the ability to specify fractional values.
-   Endless scrolling: The application supports endless scrolling, automatically loading new data as the page scrolls.
-   Detailed information: When you click on a book, additional information is displayed, such as the cover image and review texts.
-   Data consistency: Using random numbers with an initial value that keeps the results unchanged when the same value is entered again.
-   Export to CSV: The ability to export current data in CSV format for future use.
-   Alternative view: Support for a gallery view of the data display.

### Technology stack:

-   Frontend: React, Next.js, Material UI, styled-components
-   Backend: A simple server for generating random data based on selected parameters
-   Libraries: faker, papaparse
-   Deploy the applicationt: Vercel [https://book-store-app-cyan.vercel.app/]

---

# Книжный Магазин: Генератор Случайных Книг

Пользователи могут динамически изменять начальные значения и параметры, чтобы получить случайно сгенерированные данные о книгах, включая их название, авторов, издателей, ISBN, а также количество лайков и отзывов. Данные обновляются автоматически при изменении настроек, и таблица поддерживает бесконечную прокрутку для удобства пользователя.

### Основные функции:

-   Выбор языка и региона: Пользователь может выбрать один из трех языков и регионов, чтобы генерировать данные, соответствующие выбранной локализации.
-   Случайные данные: Пользователь может ввести seed для генерации случайных данных для каждой книги, включая ISBN, название, авторов и издателя.
-   Среднее количество лайков и отзывов: Ползунки для регулирования среднего количества лайков и отзывов на книгу, с возможностью указания дробных значений.
-   Бесконечная прокрутка: Приложение поддерживает бесконечную прокрутку, автоматически подгружая новые данные по мере прокрутки страницы.
-   Детальная информация: При нажатии на книгу отображаются дополнительные сведения, такие как изображение обложки и тексты рецензий.
-   Постоянство данных: Использование случайных чисел с начальным значением, которое сохраняет результаты неизменными при повторном вводе того же значения.
-   Экспорт в CSV: Возможность экспорта текущих данных в CSV-формате для дальнейшего использования.
-   Альтернативный просмотр: Поддержка галерейного вида отображения данных.

### Стек технологий:

-   Frontend: React, Next.js, Material UI, styled-components
-   Backend: Простой сервер для генерации случайных данных на основе выбранных параметров
-   Библиотеки: faker, papaparse
-   Деплой приложения: Vercel [https://book-store-app-cyan.vercel.app/]

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
