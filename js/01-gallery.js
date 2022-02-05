// Выполняй это задание в файлах 01-gallery.html и 01-gallery.js. Разбей его на несколько подзадач:

// Создание и рендер разметки по массиву данных galleryItems и предоставленному шаблону элемента галереи.
// Реализация делегирования на div.gallery и получение url большого изображения.
// Подключение скрипта и стилей библиотеки модального окна basicLightbox. Используй CDN сервис jsdelivr и добавь в проект ссылки на минифицированные (.min) файлы библиотеки.
// Открытие модального окна по клику на элементе галереи. Для этого ознакомься с документацией и примерами.
// Замена значения атрибута src элемента < img > в модальном окне перед открытием.Используй готовую разметку модального окна с изображением из примеров библиотеки basicLightbox.

//   Разметка элемента галереи
// Ссылка на оригинальное изображение должна храниться в data - атрибуте source на элементе < img >, и указываться в href ссылки.Не добавляй другие HTML теги или CSS классы кроме тех, что есть в этом шаблоне.

//   Закрытие с клавиатуры
// ВНИМАНИЕ
// Этот функционал не обязателен при сдаче задания, но будет хорошей дополнительной практикой.

// Добавь закрытие модального окна по нажатию клавиши Escape.Сделай так, чтобы прослушивание клавиатуры было только пока открыто модальное окно.У библиотеки basicLightbox есть метод для программного закрытия модального окна.

//   <div class="gallery__item">
//   <a class="gallery__link" href="large-image.jpg">
//     <img
//       class="gallery__image"
//       src="small-image.jpg"
//       data-source="large-image.jpg"
//       alt="Image description"
//     />
//   </a>
// </div>

import { galleryItems } from "./gallery-items.js";

const galleryRef = document.querySelector(".gallery");

const markup = galleryItems
  .map(({ preview, original, description }) => {
    return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
    //   src="${preview}"
    //   data-source="${original}"
    //   alt="${description}"
    // />
  </a>
</div>`;
  })
  .join("");

galleryRef.insertAdjacentHTML("afterbegin", markup);

let instance;

function onModalOpen(event) {
  event.preventDefault();

  if (event.target.tagName !== "IMG") {
    return;
  }
  window.addEventListener("keydown", onEscModalClose);

  const imageSrc = event.target.dataset.source;
  instance = basicLightbox.create(
    `
		<img width="1400" height="900" src="${imageSrc}">
	`,
    {
      onClose: () => window.removeEventListener("keydown", onEscModalClose),
    }
  );
  instance.show();
}

function onEscModalClose(event) {
  if (event.code === "Escape") {
    instance.close();
  }
}

galleryRef.addEventListener("click", onModalOpen);
