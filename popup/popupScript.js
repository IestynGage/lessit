const countEle = document.getElementById("count");
const limitEle = document.getElementById("limit");
const dateEle = document.getElementById("date");

browser.storage.local.get("reddit")
  .then(data => {
    const date = new Date(data.reddit.date);

    countEle.textContent = data.reddit.count;
    limitEle.textContent = data.reddit.limit;
    dateEle.textContent = date.getDay() + "/" + date.getMonth() + "/";
    dateEle.textContent = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
  });