import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import DOMPurify from "dompurify";
import katex from "katex";

export const handleDraftToHtml = (postJson) => {
  let options = {
    inlineStyles: {
      LATEX: { attributes: { class: "latex" } },
      HASHTAG: { attributes: { class: "hashtag" } },
    },
    // blockRenderers: {
    //   atomic: (block) => {
    //     let data = block.getData();
    //     // if (data.get("foo") === "bar") {
    //     //   return "<div>" + block.getText() + "</div>";
    //     // }
    //   },
    // },
    // entityStyleFn: (entity) => {
    //   const entityType = entity.get("type").toLowerCase();
    //   if (entityType === "link") {
    //     const data = entity.getData();
    //     console.log("link", data, entity);
    //     return {
    //       element: "a",
    //       attributes: {
    //         href: data?.url,
    //         alt: "mension",
    //         rel: data?.rel,
    //         class: data?.className,
    //         target: data?.target,
    //       },
    //       // style: {
    //       //   // Put styles here...
    //       // },
    //     };
    //   }
    //   // return <a>{}</a>;
    // },

    blockRenderers: {
      atomic: (block) => {
        // const contentState = editorState.getCurrentContent();
        const entityKey = block.getEntityAt(0);

        if (entityKey) {
          const entity = contentState.getEntity(entityKey);
          const { src } = entity.getData();

          if (entity.getType() === "IFRAME") {
            // Render the iframe HTML tag

            return `<div class="iframe-container" style="position: relative; padding-bottom: 56.25%; height: 0;">
                      <iframe
                        src="${src}"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
                      ></iframe>
                    </div>`;
          }
          if (entity.getType() === "IMAGE") {
            return `<img src="${src}" alt="embeded image" />`;
          }
          if (entity.getType() === "AUDIO") {
            return `<audio controls>
              <source src="${src}" />
            </audio>`;
          }
        }

        return ""; // Return empty for other atomic blocks
      },
    },
  };
  const domParser = new DOMParser();
  if (!postJson) return;
  const contentState = convertFromRaw(JSON.parse(postJson));

  // const stateList = [
  //   `{"blocks":[{"key":"1u3nj","text":"#महादेव ","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"bh07o","text":"","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"12kaf","text":"भूत प्रेत नी करे चाकरी सबका यही गुजारा बम बम भोलानाथ हैं हमारा तुम्हारा हमारा तुम्हारा ","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
  // ];
  // stateList.forEach((item, index) => {
  //   const contentState = convertFromRaw(JSON.parse(item));
  //   console.log(`text${index}`, contentState.getPlainText());
  // });

  let html = stateToHTML(contentState, options);
  // console.log({ html });
  html = html
    .replace(/<figure>/g, "")
    .replace(/<\/figure>/g, "")
    .replace(/<.*>(.*#.*)?<\/.*>/g, (match) => {
      match = match.trim().replace(/#\S+/g, "<span class='hashtag'>$&</span>");
      // .replace(/<p>/g, "")
      // .replace(/<\/p>/g, "");
      return match;
    });

  let htmlDocs = html.replace(
    /(<pre><code>.*?<\/code><\/pre>\s*){1,}/g,
    (match) => {
      match = match.trim();
      match = match
        .replace(/<pre><code>/g, "<code>")
        .replace(/<\/code><\/pre>/g, "</code>");

      return `<div class="code">${match}</div>`;
    }
  );

  htmlDocs = htmlDocs.replace(
    /<span class="latex">(.*?)<\/span>/g,
    (match, p1) => {
      const doc = domParser.parseFromString(match, "text/html");
      let latex = doc.querySelector("span.latex")?.textContent?.trim();
      latex = latex;
      // .replace(/&/g, "\\&")
      // .replace(/%/g, "\\%");
      // .replace(/\$/g, "\\$")
      // .replace(/#/g, "\\#");
      // .replace(/_/g, "\\_");
      // .replace(/{/g, "\\{")
      // .replace(/}/g, "\\}");
      // .replace(/~/g, "\\textasciitilde{}")
      // .replace(/\^/g, "\\^{}")
      // .replace(/\\/g, "\\textbackslash{}");
      return katex.renderToString(latex, {
        // throwOnError: false,
        displayMode: true,
        strict: "ignore",
      });
    }
  );

  const purifyConfig = {
    ADD_ATTR: [
      "target",
      "allow",
      "allowfullscreen",
      "frameborder",
      "scrolling",
      "src",
      "width",
      "height",
    ],
    ADD_TAGS: ["iframe"],
    FORBID_TAGS: ["script"],
    ALLOW_ARIA_ATTR: true,
    FORBID_ATTR: ["onload", "onclick"], // Disallow inline event handlers
    ALLOWED_URI_REGEXP:
      /^(?:(?:(?:https?|mailto|ftp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))|data:image\/)/i, // Ensure safe URIs
  };
  htmlDocs = DOMPurify.sanitize(htmlDocs, purifyConfig);
  return htmlDocs;
};

export const handleDraftToText = (postJson, textOnly = false) => {
  if (!postJson) return null;

  const contentState = convertFromRaw(JSON.parse(postJson));
  let text = contentState.getPlainText();

  if (textOnly) {
    return text?.slice(0, 200);
  }

  if (text.length <= 200 && text.match(/[\r\n]+/g) <= 2) {
    return { right: true };
  }
  if (text.match(/[\r\n]+/g)?.length >= 2) {
    text = text.replace(/[\r\n]+/g, " ");
  }
  text = text.slice(0, 200) + " ...";

  return {
    right: false,
    text,
  };
};

export const textUpperCase = (text) => {
  if (text) {
    return text
      ?.split(" ")
      ?.map((item, index) => item?.charAt(0).toUpperCase() + item?.slice(1))
      ?.join(" ");
  }
  return text;
};

export const decorateUsername = (username) => {
  let name = username?.split(" ");
  name = name?.join("-");
  return name;
};

export const decorateQuestion = (question) => {
  return decorateUsername(question);
};

export const dateDecorator = (date) => {
  return new Date(date).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
};

export function formatText(
  var1,
  var2,
  joiner,
  position = "between",
  explicitly = false
) {
  let text = "";
  if (position === "before") {
    // Joiner appears before var2
    if (var1 && var2) {
      text = `${var1} ${joiner} ${var2}`;
    } else if (var1) {
      if (explicitly) {
        text = `${joiner} ${var1}`;
      } else {
        text = var1;
      }
    } else if (var2) {
      if (explicitly) {
        text = `${joiner} ${var2}`;
      } else {
        text = `${var2}`;
      }
    }
  } else {
    // Default: Joiner appears between var1 and var2
    if (var1 && var2) {
      text = `${var1} ${joiner} ${var2}`;
    } else if (var1) {
      text = var1;
    } else if (var2) {
      text = var2;
    }
  }

  return text?.trim();
}
export const getCredential = (credentials, credentialType) => {
  const credential = credentials?.[credentialType];
  switch (credentialType) {
    case "employment": {
      return formatText(credential?.position, credential?.company, " at ");
      // return `${credential?.position} at ${credential?.company}`;
    }
    case "education": {
      return formatText(
        formatText(
          formatText(credential?.degree, credential?.primaryMajor, " in "),
          credential?.secondaryMajor,
          " & "
        ),
        credential?.school,
        ", "
      );
    }
    case "location": {
      return formatText(credential?.address, undefined, "Lived in");
      return `Lived in ${credential?.address}`;
    }
    default:
      return;
  }
};

// Main function to get lighter and darker colors
const getHexColor = (colorName) => {
  const tempElement = document.createElement("div");
  tempElement.style.color = colorName;
  document.body.appendChild(tempElement);
  const computedColor = getComputedStyle(tempElement).color;
  document.body.removeChild(tempElement);
  // Convert RGB to Hex
  const rgb = computedColor.match(/\d+/g); // Extract RGB values
  if (rgb) {
    return `#${(
      (1 << 24) +
      (parseInt(rgb[0]) << 16) +
      (parseInt(rgb[1]) << 8) +
      parseInt(rgb[2])
    )
      .toString(16)

      .slice(1)
      .toUpperCase()}`;
  }
  return null; // Invalid color name
};

const adjustColor = (hex, adjustment) => {
  // Convert Hex to RGB
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  // Adjust RGB values
  const newR = Math.min(Math.max(r + adjustment, 0), 255);
  const newG = Math.min(Math.max(g + adjustment, 0), 255);
  const newB = Math.min(Math.max(b + adjustment, 0), 255);

  // Convert back to Hex
  return `#${((1 << 24) + (newR << 16) + (newG << 8) + newB)
    .toString(16)
    .slice(1)
    .toUpperCase()}`;
};

// Main function to get lighter and darker colors
export const generateColorVariations = (colorName) => {
  const originalHex = getHexColor(colorName);
  if (!originalHex) {
    console.error("Invalid color name");
    return null;
  }

  const lighterColor = adjustColor(originalHex, 230); // Slightly lighter
  const darkerColor = adjustColor(originalHex, -10); // Slightly darker

  return {
    original: originalHex,
    lighter: lighterColor,
    darker: darkerColor,
  };
};

export function handleFollowNumAnimation(ref, isFollowing) {
  const spans = ref?.children;

  if (!isFollowing && spans?.length > 0) {
    spans[0].style.top = "0";
    spans[1].style.top = "16px";
  }

  if (isFollowing && spans?.length > 0) {
    spans[0].style.top = "-16px";
    spans[1].style.top = "0";
  }
}
