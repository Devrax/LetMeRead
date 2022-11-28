function firstCheck(url) {
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
      childPage?.nextElementSibling?.remove();
    }
  }
}

function secondCheck(url) {
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
      .replace(/(display:( ?)none(;?)|filter:( ?)blur\(4px\)(;?)|user-select:( ?)none(;?))/gm, "");

  }
}

function thirdCheck() {

  const blurRemover = (htmlElement) => {

    htmlElement.style.filter = '';
    htmlElement.style.userSelect = '';
    htmlElement.style.textShadow = 'black 0px 0px 0px';

    const children = Array.from(htmlElement.children);

    if(children.length > 0) {
      for(let child of children) {
        blurRemover(child);
      };
    }

  }


  if(document.body) {

    blurRemover(document.body);

  }

}

(function () {
  const url = window.location.href,
    availableSites = url.toLocaleLowerCase().match(/(scribd|studocu)/gm) || [''];

  switch (availableSites[0]) {
    case "scribd":
      return firstCheck(url);
    case "studocu":
      return secondCheck(url);
    default:
      return thirdCheck();
  }
})();
