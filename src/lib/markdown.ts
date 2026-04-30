/**
 * Weathercord-flavored Markdown
 */

export const format = (string: string) => {
  let formatted = "";

  const paragraphFormat = (string: string) => {
    return string
      .replace("&", "&amp;")
      .replace("<", "&lt;")
      .replace(">", "&gt;")
      .replace(/@&amp;([a-fa-f0-9]*w[a-fA-f0-9]{14})/gm, "<span class=\"mention\" spellcheck=\"false\">@&amp;<code>$1</code></span>")
      .replace(/@([a-zA-Z0-9_.-]{0,19}[a-zA-Z0-9_-])/gm, "<span class=\"mention\" spellcheck=\"false\">@$1</span>");
  };

  let blockquoteDepth = false;

  for (const line of string.split("\n")) {
    const h1 = line.match(/^#\w*(\W.*?)$/);
    const h2 = line.match(/^##\w*(\W.*?)$/);
    const h3 = line.match(/^###\w*(\W.*?)$/);
    const h4 = line.match(/^####\w*(\W.*?)$/);
    const h5 = line.match(/^#####\w*(\W.*?)$/);
    const h6 = line.match(/^######\w*(\W.*?)$/);
    const blockquote = line.match(/^>\w*(\W.*?)$/);

    if (!blockquote && blockquoteDepth) {
      formatted += "</blockquote>";
    }

    if (h1) {
      formatted += "<h1>" + paragraphFormat(h1[1]) + "</h1>";
    } else if (h2) {
      formatted += "<h2>" + paragraphFormat(h2[1]) + "</h2>";
    } else if (h3) {
      formatted += "<h3>" + paragraphFormat(h3[1]) + "</h3>";
    } else if (h4) {
      formatted += "<h4>" + paragraphFormat(h4[1]) + "</h4>";
    } else if (h5) {
      formatted += "<h5>" + paragraphFormat(h5[1]) + "</h5>";
    } else if (h6) {
      formatted += "<h6>" + paragraphFormat(h6[1]) + "</h6>";
    } else if (blockquote) {
      if (!blockquoteDepth) formatted += "<blockquote>";
      formatted += paragraphFormat(blockquote[1]) + "<br />";
      blockquoteDepth = true;
    } else {
      formatted += paragraphFormat(line) + "<br />";
    }
  }

  return formatted;
};
