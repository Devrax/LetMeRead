/**
 * Process to remove blurring for Scribd's docs
 * @param {string} url
 */
function scribdStep(url) {
  if (url.includes("document") || url.includes("doc")) {
    const blurredPages = Array.from(
        document.querySelectorAll(".outer_page.blurred_page")
      ),
      blurTemplates = Array.from(document.querySelectorAll(".blur")),
      promoWallpaper = Array.from(document.querySelectorAll(".promo_wrapper"));

    for (let template of blurTemplates) {
      template.remove();
    }

    for (let promo of promoWallpaper) {
      promo.remove();
    }

    for (let page of blurredPages) {
      const childPage = page.querySelector(".newpage");
      if (childPage == null) continue;
      Array.from(childPage.children).forEach((child) => {
        child.style.textShadow = "black 0px 0px 0px";
      });
      childPage.nextElementSibling.remove();
    }
  }
}

/**
 * Process to remove blurring for Studocu's docs
 * @param {string} url
 */
function studocuStep(url) {
  if (url.includes("document")) {
    const takeDocumentWrapper = document.querySelector("#document-wrapper");
    if (takeDocumentWrapper == null) return;
    const documentWrapperNodes = Array.from(takeDocumentWrapper.children);

    // removes fixed watermark on documents
    for (let child of documentWrapperNodes) {
      if (
        child.nodeName === "DIV" &&
        child.firstChild?.id !== "page-container-wrapper"
      ) {
        child.remove();
      }
    }

    const documentContainer = document.querySelector("#page-container"),
      documentsCopy = Array.from(documentContainer.children);

    // removes watermarks from blurred documents
    for (let document of documentsCopy) {
      if (Array.from(document.children).length > 1) {
        document.lastChild.remove();
      }
    }

    documentContainer.innerHTML = documentContainer.innerHTML
      .replace(/style="user-select:none;filter:blur\(4px\)"/gm, "")
      .replace(
        /style="user-select: none; filter: blur\(4px\); display: block;"/g
      );
  }
}

(function () {
  const url = window.location.href,
    availableSites = url.toLocaleLowerCase().match(/(scribd|studocu)/gm);

  if (availableSites == null) return;
  switch (availableSites[0]) {
    case "scribd":
      return scribdStep(url);
    case "studocu":
      return studocuStep(url);
    default:
      return alert("Sorry :(");
  }
})();
