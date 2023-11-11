import { galleryItems } from "./gallery-items.js";
// Change code below this line

const gallery = document.querySelector(".gallery");

gallery.insertAdjacentHTML("beforeend", createMarkup(galleryItems));

function createMarkup(arr) {
  return arr
    .map(
      ({ preview, original, description }) => `
        <li class="gallery__item">
            <a class="gallery__link" href="${original}">
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
            </a>
      </li>`
    )
    .join("");
}

gallery.addEventListener("click", handleClick);

function handleClick(event) {
  event.preventDefault();
  if (event.target === event.currentTarget) {
    return;
  }
  const source = event.target.dataset.source;

  const instance = basicLightbox.create(`
    <img src="${source}" >`);

  instance.show();

  function closeOnEsc(event) {
    if (event.code !== "Escape") {
      return;
    }
    instance.close();
  }

  if (instance.visible()) {
    document.addEventListener("keydown", closeOnEsc);
  } else {
    document.removeEventListener("keydown", closeOnEsc);
  }
}
