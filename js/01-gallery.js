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
    `
    <div class="modal">
        <img
      class="gallery__image"
      src=${evt.target.dataset.source}
      alt=${evt.target.alt}
    />
    </div>
`,
    {
      onShow: (instance) => {
        instance.element().querySelector("div.modal").onclick = instance.close;
        document.addEventListener(
          "keydown",
          (event) => {
            if (event.key === "Escape") {
              instance.close();
            }
          },
          { once: true }
        );
      },
    }
  );
  instance.show();
}
if ("loading" in HTMLImageElement.prototype) {
  const imgArray = document.querySelectorAll('img[loading = "lazy"]');
  imgArray.forEach((img) => (img.src = img.dataset.src));
} else {
  const script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
  script.integrity =
    "sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==";
  script.crossorigin = "anonymous";
  script.referrerpolicy = "no-referrer";
  document.body.appendChild(script);
}
galleryList.addEventListener("click", onGalleryImageClick);
