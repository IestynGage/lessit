const mask = document.createElement("div");
const defaultOverflow = document.body.style.overflow;
mask.className = "mask mask-hidden";

const modal = document.createElement("div");
modal.className = "lessit-modal center-children";
mask.appendChild(modal);

const redditRegex = /www.reddit.com\/r\/[^\/;]+/;
const urlFound = (window.location.href.match(redditRegex) ?? ['www.reddit.com'])[0];

const createTextElement = (text) => {
  const textNode = document.createTextNode(text);
  const textElement = document.createElement("p");
  textElement.appendChild(textNode)
  return textElement;
}

const enterMessage = createTextElement("Please enter the following URL to unlock the page");
const enterUrlText = createTextElement(urlFound);

function checkUrlForm(event) {
  event.preventDefault();
  const enteredUrl = document.getElementById('lessit-url-input').value.toLocaleLowerCase();
  if (urlFound.toLocaleLowerCase() === enteredUrl) {
    mask.innerHTML = '';
    mask.classList.remove('mask-hidden');
    document.body.style.overflow = defaultOverflow;
    
    setTimeout(() => {
      mask.remove();
    }, 500);

    browser.storage.local.get("reddit")
      .then(x => {
          increaseSiteCount(x.reddit.count, "reddit", x.reddit.count, x.reddit.limit);
      });
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

function increaseSiteCount (lastRecordedDate, site, count, countLimit) {
  let nextCount = typeof(count) === "number" || count !== NaN ? count + 1 : 0;
 
  browser.storage.local.set({
    reddit: {date:lastRecordedDate , count: nextCount, limit: countLimit},
  });
}

browser.storage.local.get("reddit")
  .then(x => {
    const count = x.reddit ? x.reddit.count : 0;
    const countLimit = x.reddit ? x.reddit.limit : 40;
    const date = x.reddit ? x.reddit.date : undefined;
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    
    if (date === undefined || date.getTime() > todayDate.getTime()) {
      browser.storage.local.set({
        reddit: {date:todayDate , count: 0, limit: countLimit},
      });
    } else if(count > countLimit) {
      const countText = createTextElement(`You've visited this site ${count}`);

      modal.appendChild(countText);
      modal.appendChild(form)
      const currentDiv = document.getElementById("div1");
      document.body.insertBefore(mask, currentDiv);
      window.scrollTo(0,0);
      document.body.style.overflow = "hidden";
    } else {
      console.log("count", count);
      console.log("countLimit", countLimit);
      console.log("date", date.getTime());
      increaseSiteCount(date, "reddit", count, countLimit);
    }
  });
