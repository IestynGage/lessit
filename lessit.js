const mask = document.createElement("div");
const defaultOverflow = document.body.style.overflow;
mask.className = "mask";

const modal = document.createElement("div");
modal.className = "lessit-modal center-children";
mask.appendChild(modal);

const redditRegex = /www.reddit.com\/r\/[^\/;]+/;
const urlFound = window.location.href.match(redditRegex)[0] ?? 'www.reddit.com';

const createTextElement = (text) => {
  const textNode = document.createTextNode(text);
  const textElement = document.createElement("p");
  textElement.appendChild(textNode)
  return textElement;
}
console.log("Hello world asdasdasdasdas")
const enterMessage = createTextElement("Please enter the following URL to unlock the page");
const enterUrlText = createTextElement(urlFound);

function checkUrlForm(event) {
  event.preventDefault();
  const enteredUrl = document.getElementById('lessit-url-input').value.toLocaleLowerCase();
  if (urlFound.toLocaleLowerCase() === enteredUrl) {
    mask.innerHTML = '';
    mask.remove();
    document.body.style.overflow = defaultOverflow;
  } else {
    console.log("Not a match");
    console.log("enteredUrl", enteredUrl);
    console.log("urlFound", urlFound);
  }
}
const form = document.createElement("form");
form.addEventListener('submit', checkUrlForm);

const textInput = document.createElement("input");
textInput.setAttribute('id', 'lessit-url-input');
textInput.setAttribute("type", "text");
textInput.setAttribute("name", "FullName");
textInput.setAttribute("placeholder", "Enter the above URL");
textInput.setAttribute("autocomplete", "off");

const submitElement = document.createElement("input");
submitElement.setAttribute("type", "submit");
submitElement.setAttribute("value", "Submit");

form.appendChild(textInput);
form.appendChild(submitElement);

modal.appendChild(enterMessage);
modal.appendChild(enterUrlText);

browser.storage.local.get("reddit")
  .then(x => {
    const countText = createTextElement(`You've visited this site ${x.reddit.count}`);
    modal.appendChild(countText);
    modal.appendChild(form)
    const currentDiv = document.getElementById("div1");
    document.body.insertBefore(mask, currentDiv);
    window.scrollTo(0,0);
    document.body.style.overflow = "hidden";
  });

function increaseSiteCount (site, count) {
  console.log("here", count)
  browser.storage.local.set({
    reddit: {date:"08/02/2023", count: count + 1, limit: 100},
});
}

browser.storage.local.get("reddit")
  .then(x => {
    const count = Object.keys(x).length === 0 ? 0 : x.reddit.count;
    increaseSiteCount("reddit", count);
    console.log("x.count", x.count)
  }).then(() => {
    browser.storage.local.get("reddit")
      .then(y => {
        console.log("secound get", y)
      });
  })

