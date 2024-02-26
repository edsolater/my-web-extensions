document.addEventListener("DOMContentLoaded", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {
        code: 'Array.from(document.querySelectorAll("a")).map(link => link.href);',
      },
      function (results) {
        if (chrome.runtime.lastError || !results || !results[0]) return;
        const container = document.getElementById("linksList");
        results[0].forEach((href) => {
          const li = document.createElement("li");
          li.textContent = href;
          container.appendChild(li);
        });
      }
    );
  });
});
