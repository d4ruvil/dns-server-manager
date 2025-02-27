chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "checkCORS") {
      const targetUrl = request.url + "/wp-json/";
      fetch(targetUrl, { method: "GET" })
        .then(response => response.text())
        .then(data => {
          if (data.includes("garbage")) {
            fetch(targetUrl, {
              method: "GET",
              headers: { "Origin": "https://bing.com" }
            })
              .then(response => {
                const headers = response.headers;
                if (headers.get("access-control-allow-credentials") === "true") {
                  sendResponse({ message: "Vulnerable to CORS misconfiguration!" });
                } else {
                  sendResponse({ message: "Not vulnerable." });
                }
              });
          } else {
            sendResponse({ message: "Not vulnerable." });
          }
        })
        .catch(error => {
          sendResponse({ message: "Error: " + error.message });
        });
      return true; // Keeps the message channel open for sendResponse.
    }
  });