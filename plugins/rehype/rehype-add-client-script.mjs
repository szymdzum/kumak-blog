/**
 * Rehype plugin to add a client-side script that handles code block functionality
 */
export function rehypeAddClientScript() {
  return (tree, file) => {
    // Simple check if the file might contain code blocks
    const html = String(file.value || '');
    if (html.includes('<pre') && html.includes('<code')) {
      // Process the tree to add the script
      addScriptToTree(tree);
    }
  };
}

// Helper to add script to the head element
function addScriptToTree(tree) {
  // Find the HTML element
  const htmlNode = findNode(tree, (node) => node.type === 'element' && node.tagName === 'html');

  if (!htmlNode) return;

  // Find the head element
  const headNode = findNode(htmlNode, (node) => node.type === 'element' && node.tagName === 'head');

  if (!headNode) return;

  // Add our script element to the head
  headNode.children.push({
    type: 'element',
    tagName: 'script',
    properties: {},
    children: [{
      type: 'text',
      value: `
        document.addEventListener("DOMContentLoaded", () => {
          const copyButtons = document.querySelectorAll(".copy-button");

          copyButtons.forEach((button) => {
            button.addEventListener("click", () => {
              const code = button.getAttribute("data-code");
              if (!code) return;

              // Copy to clipboard
              navigator.clipboard
                .writeText(code)
                .then(() => {
                  const copyText = button.querySelector(".copy-text");
                  if (!copyText) return;

                  const originalText = copyText.textContent || "Copy";
                  copyText.textContent = "Copied!";

                  setTimeout(() => {
                    copyText.textContent = originalText;
                  }, 2000);
                })
                .catch((err) => {
                  console.error("Failed to copy: ", err);
                });
            });
          });

          // Highlight lines if specified
          document
            .querySelectorAll("code[data-highlight-lines]")
            .forEach((codeElement) => {
              const lines = codeElement.dataset.highlightLines;
              if (!lines || lines === "") return;

              const lineNumbers = lines.split(",").map((num) => parseInt(num, 10));
              const codeLines = codeElement.innerHTML.split("\\n");

              const highlightedLines = codeLines.map((line, index) => {
                if (lineNumbers.includes(index + 1)) {
                  return \`<span class="highlighted-line">\${line}</span>\`;
                }
                return line;
              });

              codeElement.innerHTML = highlightedLines.join("\\n");
            });
        });
      `,
    }],
  });
}

// Helper to find a node that matches a condition
function findNode(tree, predicate) {
  if (predicate(tree)) return tree;

  if (tree.children) {
    for (const child of tree.children) {
      const found = findNode(child, predicate);
      if (found) return found;
    }
  }

  return null;
}
