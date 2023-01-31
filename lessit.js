const mask = document.createElement("div");

mask.className = "mask center-children";

const modal = document.createElement("div");
modal.className = "lessit-modal center-children";
mask.appendChild(modal);

const redditRegex = /www.reddit.com\/r\/[^\/;]+/;
const found = window.location.href.match(redditRegex);

const createTextElement = (text) => {
  const textNode = document.createTextNode(text);
  const textElement = document.createElement("p");
  textElement.appendChild(textNode)
  return textElement;
}

const enterMessage = createTextElement("Please enter the following URL to unlock the page");
const url = createTextElement(found);

modal.appendChild(enterMessage);
modal.appendChild(url);
const currentDiv = document.getElementById("div1");
document.body.insertBefore(mask, currentDiv);
document.body.style.overflow = "hidden";
