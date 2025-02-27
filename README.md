
# Vulnerability Checker Chrome Extension

A powerful Chrome extension that helps identify common web security vulnerabilities including CORS misconfigurations, server version disclosure, and DNS misconfigurations.

## 🚀 Features

- **CORS Vulnerability Detection**: Checks for Cross-Origin Resource Sharing misconfigurations
- **Server Version Disclosure**: Identifies if servers are exposing version information
- **DNS Misconfiguration**: Tests for DNS-related security issues
- **User-Friendly Interface**: Clean and intuitive popup interface
- **Real-time Results**: Instant vulnerability scanning and reporting
- **Non-intrusive**: Safe checks that don't harm the target systems

## 📋 Prerequisites

- Google Chrome Browser
- Developer Mode enabled in Chrome Extensions

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/d4ruvil/vulnerability-checker.git
```

2. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked"
   - Select the cloned repository folder

## 🔧 Usage

1. Click on the extension icon in your Chrome toolbar
2. Select one of the following checks:
   - Check CORS
   - Check Server Version
   - Check DNS Misconfiguration
3. View the results in the popup window

## 🔒 Security Features

The extension performs three main security checks:
- **CORS Check**: Tests for misconfigured CORS policies that could allow unauthorized cross-origin requests
- **Server Version Check**: Identifies if the server is disclosing version information in headers
- **DNS Misconfiguration**: Checks for DNS configuration issues that could lead to security vulnerabilities

## 📁 Project Structure

```
vulnerability-checker/
├── manifest.json        # Extension configuration
├── background.js       # Background scripts for CORS checks
├── popup.html         # Extension popup interface
├── popup.js          # Popup functionality
├── styles.css        # UI styling
└── icon.png         # Extension icon
```

## 🔍 Technical Details

- **Manifest Version**: 3
- **Permissions Required**:
  - activeTab
  - tabs
  - scripting
- **API Usage**:
  - Chrome Extensions API
  - Fetch API
  - XMLHttpRequest

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This tool is for educational and security research purposes only. Always ensure you have permission to test for vulnerabilities on any target system.

## 👥 Authors

- Your Name - Initial work

## 🔄 Version History

- 1.0.0
  - Initial release
  - Basic vulnerability checking functionality

## 📞 Support

For support, please:
- Open an issue in the GitHub repository
- Check existing documentation
- Review closed issues for similar problems

---
⭐ If you find this extension helpful, please consider giving it a star! 
