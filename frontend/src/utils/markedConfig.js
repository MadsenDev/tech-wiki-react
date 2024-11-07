import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github.css"; // Choose a theme you like

// Configure marked to use highlight.js
marked.setOptions({
  highlight: function (code, language) {
    // Validate the language
    const validLanguage = hljs.getLanguage(language) ? language : "plaintext";
    return hljs.highlight(code, { language: validLanguage }).value;
  },
  gfm: true, // Enable GitHub-flavored markdown
  breaks: true, // Convert line breaks to <br>
});

export default marked;