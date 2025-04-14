/**
 * Rehype plugin to transform code blocks into enhanced code blocks with more features
 */
export function rehypeCodeBlocks() {
  return (tree) => {
    // Simple recursive function to find and process code elements
    function visitElements(node) {
      // If this node is a pre element with a code child, enhance it
      if (
        node.type === 'element' &&
        node.tagName === 'pre' &&
        node.children?.[0]?.tagName === 'code'
      ) {
        const codeNode = node.children[0];
        const classNames = codeNode.properties?.className || [];

        // Extract language from class (e.g., "language-js" -> "js")
        let language = '';
        for (const cls of classNames) {
          if (typeof cls === 'string' && cls.startsWith('language-')) {
            language = cls.slice(9);
            break;
          }
        }

        // Get code content
        const codeContent = getNodeText(codeNode);

        // Create header element
        const header = {
          type: 'element',
          tagName: 'div',
          properties: { className: ['code-header'] },
          children: [
            language && {
              type: 'element',
              tagName: 'span',
              properties: { className: ['code-language'] },
              children: [{ type: 'text', value: language }],
            },
            {
              type: 'element',
              tagName: 'button',
              properties: {
                className: ['copy-button'],
                'aria-label': 'Copy code',
                'data-code': codeContent,
              },
              children: [
                {
                  type: 'element',
                  tagName: 'span',
                  properties: { className: ['copy-icon'] },
                  children: [{ type: 'text', value: '📋' }],
                },
                {
                  type: 'element',
                  tagName: 'span',
                  properties: { className: ['copy-text'] },
                  children: [{ type: 'text', value: 'Copy' }],
                },
              ],
            },
          ].filter(Boolean),
        };

        // Create wrapper element
        const wrapper = {
          type: 'element',
          tagName: 'div',
          properties: { className: ['code-block'] },
          children: [
            header,
            { ...node, properties: { ...node.properties, className: [...(node.properties?.className || []), 'enhanced'] } },
          ],
        };

        // Return the new wrapper to replace the original node
        return wrapper;
      }

      // Otherwise, process children recursively
      if (node.children) {
        node.children = node.children.map((child) => {
          if (child.type === 'element') {
            return visitElements(child) || child;
          }
          return child;
        });
      }

      return null;
    }

    // Process all elements in the tree
    if (tree.children) {
      tree.children = tree.children.map((node) => {
        if (node.type === 'element') {
          return visitElements(node) || node;
        }
        return node;
      });
    }
  };
}

// Helper to get text content from a node
function getNodeText(node) {
  if (node.type === 'text') return node.value || '';

  let text = '';
  if (node.children) {
    for (const child of node.children) {
      text += getNodeText(child);
    }
  }
  return text;
}
