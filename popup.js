document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("checkCors").addEventListener("click", checkCors);
    document.getElementById("checkServer").addEventListener("click", checkServerVersion);
    document.getElementById("checkDns").addEventListener("click", checkDnsMisconfiguration);
  });
  
  // Function to show loading indicator and disable buttons
  function startLoading() {
    document.getElementById("loading").classList.remove("hidden");
    document.querySelectorAll("button").forEach(button => {
      button.disabled = true;
    });
  }
  
  // Function to hide loading indicator and enable buttons
  function stopLoading() {
    document.getElementById("loading").classList.add("hidden");
    document.querySelectorAll("button").forEach(button => {
      button.disabled = false;
    });
  }
  
  // Function to check CORS vulnerability
  function checkCors() {
    startLoading();
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      if (currentTab && currentTab.url) {
        const targetUrl = new URL(currentTab.url).origin;
        const exploitUrl = targetUrl + "/wp-json/";
  
        chrome.scripting.executeScript({
          target: { tabId: currentTab.id },
          func: runCorsExploit,
          args: [exploitUrl]
        }, (results) => {
          if (results && results[0] && results[0].result) {
            displayResult("CORS Check", results[0].result);
          } else {
            displayResult("CORS Check", "Error: Unable to run the exploit.");
          }
          stopLoading();
        });
      } else {
        displayResult("CORS Check", "Error: Unable to fetch the current tab's URL.");
        stopLoading();
      }
    });
  }
  
  // Function to check Server Version Disclosure
  function checkServerVersion() {
    startLoading();
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      if (currentTab && currentTab.url) {
        const targetUrl = new URL(currentTab.url).origin;
  
        fetch(targetUrl, { method: "HEAD" })
          .then(response => {
            const serverHeader = response.headers.get("server");
            if (serverHeader) {
              displayResult("Server Version Check", `Server version disclosed: ${serverHeader}`);
            } else {
              displayResult("Server Version Check", "No server version disclosed.");
            }
          })
          .catch(error => {
            displayResult("Server Version Check", `Error: ${error.message}`);
          })
          .finally(() => {
            stopLoading();
          });
      } else {
        displayResult("Server Version Check", "Error: Unable to fetch the current tab's URL.");
        stopLoading();
      }
    });
  }
  
  // Function to check DNS Misconfiguration
// Function to check DNS Misconfiguration
function checkDnsMisconfiguration() {
    startLoading();
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      if (currentTab && currentTab.url) {
        let targetDomain = new URL(currentTab.url).hostname;
  
        // Remove "www" if present
        if (targetDomain.startsWith("www.")) {
          targetDomain = targetDomain.replace("www.", "");
        }
  
        // Remove "http://" or "https://" if present (though hostname should already exclude these)
        targetDomain = targetDomain.replace(/^https?:\/\//, "");
  
        const testDomain = `localhost.${targetDomain}`;
  
        fetch(`https://dns.google/resolve?name=${testDomain}`, { method: "GET" })
          .then(response => response.json())
          .then(data => {
            if (data.Answer && data.Answer.some(record => record.data === "127.0.0.1")) {
              displayResult("DNS Misconfiguration Check", `Vulnerable! ${testDomain} resolves to 127.0.0.1.`);
            } else {
              displayResult("DNS Misconfiguration Check", `Not vulnerable. ${testDomain} does not resolve to 127.0.0.1.`);
            }
          })
          .catch(error => {
            displayResult("DNS Misconfiguration Check", `Error: ${error.message}`);
          })
          .finally(() => {
            stopLoading();
          });
      } else {
        displayResult("DNS Misconfiguration Check", "Error: Unable to fetch the current tab's URL.");
        stopLoading();
      }
    });
  }
  
  // Function to run the CORS exploit
 // Function to run the CORS exploit
function runCorsExploit(exploitUrl) {
    return new Promise((resolve) => {
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {
            try {
              // Check if the response is valid JSON
              JSON.parse(this.responseText);
              resolve("Vulnerable! Response: " + this.responseText);
            } catch (error) {
              // If parsing fails, it's not valid JSON
              resolve("Not vulnerable. Invalid JSON response.");
            }
          } else {
            resolve("Not vulnerable. Status: " + this.status);
          }
        }
      };
      xhttp.open("GET", exploitUrl, true);
      xhttp.withCredentials = true;
      xhttp.send();
    });
  }
  
  // Function to display results
  function displayResult(checkType, result) {
    document.getElementById("status").innerText = `${checkType} complete!`;
    document.getElementById("result").innerText = result;
  }