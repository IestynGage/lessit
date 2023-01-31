const mask = document.createElement("div");
const defaultOverflow = document.body.style.overflow;
mask.className = "mask";

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

function myFunction(event) {
  event.preventDefault();
  mask.innerHTML = '';
  mask.remove();
  document.body.style.overflow = defaultOverflow;
}
const form = document.createElement("form");
form.setAttribute("onsubmit", "myFunction()");
form.addEventListener('submit', myFunction)

const textInput = document.createElement("input");
textInput.setAttribute("type", "text");
textInput.setAttribute("name", "FullName");
textInput.setAttribute("placeholder", "Enter the above URL");

const submitElement = document.createElement("input");
submitElement.setAttribute("type", "submit");
submitElement.setAttribute("value", "Submit");

form.appendChild(textInput);
form.appendChild(submitElement);

modal.appendChild(enterMessage);
modal.appendChild(url);
modal.appendChild(form)
const currentDiv = document.getElementById("div1");
document.body.insertBefore(mask, currentDiv);

document.body.style.overflow = "hidden";
