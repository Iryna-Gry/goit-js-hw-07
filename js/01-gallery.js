import { galleryItems } from "./gallery-items.js";
// Change code below this line
const galleryList = document.querySelector("div.gallery");

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
        <div class="gallery__item">
  <a class="gallery__link" href=${original}>
    <img
      class="gallery__image"
      loading="lazy"
      data-src=${preview}
      data-source=${original}
      alt=${description}
    />
  </a>
</div>`;
    })
    .join("");
}
galleryList.innerHTML = createGalleryMarkup(galleryItems);
console.log(galleryItems);

const onGalleryImageClick = (evt) => {
  evt.preventDefault();
  if (evt.target.nodeName !== "IMG") {
    return;
  } else {
    modalWindowOpen(evt);
  }
};
function modalWindowOpen(evt) {
  const instance = basicLightbox.create(
    `<img
      class="gallery__image"
      src=${evt.target.dataset.source}
      alt=${evt.target.alt}
      style="height:90vh; object-fit:contain;"
    />`,
    {
      onShow: () => document.addEventListener("keydown", onEscapePress),
      onClose: () => document.removeEventListener("keydown", onEscapePress),
    }
  );
  instance.show();
  function onEscapePress(event) {
    if (event.key === "Escape") {
      instance.close();
    }
  }
}
//check on browser if it supports lazyloading
if ("loading" in HTMLImageElement.prototype) {
  const imgArray = document.querySelectorAll('img[loading = "lazy"]');
  imgArray.forEach((img) => (img.src = img.dataset.src));
} else {
  const script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
  script.type = "module";
  document.body.appendChild(script);
}
galleryList.addEventListener("click", onGalleryImageClick);
