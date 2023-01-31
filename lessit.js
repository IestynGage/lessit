const newDiv = document.createElement("div");

newDiv.className = "mask center-children";

const modal = document.createElement("div");
modal.className = "modal center-children"
newDiv.appendChild(modal);

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
document.body.insertBefore(newDiv, currentDiv);
document.body.style.overflow = "hidden";
