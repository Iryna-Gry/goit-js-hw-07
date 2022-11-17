import { galleryItems } from "./gallery-items.js";
// Change code below this line
const galleryList = document.querySelector("ul.gallery");
function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<a class="gallery__item" href=${original}>
  <img class="gallery__image" loading="lazy" data-src=${preview} alt=${description} />
</a>`;
    })
    .join("");
}
galleryList.innerHTML = createGalleryMarkup(galleryItems);
console.log(galleryItems);
let gallery = new SimpleLightbox(".gallery a");
gallery.on("show.simplelightbox", function () {
  gallery.defaultOptions.captionsData = "alt";
  gallery.defaultOptions.captionDelay = 250;
});

gallery.on("error.simplelightbox", function (e) {
  console.log(e);
});
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
