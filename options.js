function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    totalPageVisit: document.querySelector("#totalPageVisit").value
  });
}

function restoreOptions() {
  function setCurrentChoice(result) {
    document.querySelector("#totalPageVisit").value = result.totalPageVisit || "40";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.sync.get("totalPageVisit");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
