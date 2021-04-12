//ref https://github.com/Treora/dom-highlight-range/blob/master/highlight-range.js

import { v4 as uuid } from 'uuid';

export const highlight = {
  makeHighlight,
  removeHighlight,
};

function makeHighlight(
  range: Range,
  tagName?: string,
  attributes?: { [key: string]: string }
): string | null {
  if (range.collapsed) return null;
  const id = uuid();
  const newAttributes = { ...attributes, highlightid: id, highlighted: '' };
  const nodesToHighlight = nodesInRange(range);

  // Highlight each node
  for (let i = 0; i < nodesToHighlight.length; i++) {
    const highlightedNode = wrapNodeInHighlight(
      nodesToHighlight[i],
      tagName,
      newAttributes
    );

    // set range start to new node
    if (i === 0) range.setStart(highlightedNode, 0);
    // set range end to new node
    if (i === nodesToHighlight.length - 1) range.setEnd(highlightedNode, 1);
  }

  return id;
}

function removeHighlight(
  highlightid: string,
  rootElement: Document | HTMLElement = document
) {
  const query = `[highlightid="${highlightid}"]`;
  const highlightedNodes = rootElement.querySelectorAll(query);

  for (let i = 0; i < highlightedNodes.length; i++) {
    const node = highlightedNodes[i];
    const parent = node.parentNode;
    if (!parent) continue;
    while (node.firstChild) parent.insertBefore(node.firstChild, node);
    parent.removeChild(node);
    if (i === 0) parent.normalize();
    if (i === highlightedNodes.length - 1) parent.normalize();
  }
}

// Return an array of the text nodes in the range. Split the start and end nodes if required.
function nodesInRange(range: Range): Node[] {
  breakTexts(range);
  const markers = getMarker(range);
  const { startContainer: sc, commonAncestorContainer: cac } = range;
  const owner = sc.ownerDocument ?? document;
  const walker = owner.createTreeWalker(cac, NodeFilter.SHOW_TEXT);
  walker.currentNode = markers.start;
  const nodes: Node[] = [];

  while (walker.nextNode()) {
    if (walker.currentNode === markers.end) break;
    const filteredNode = filterTextNodes(walker.currentNode);
    filteredNode && nodes.push(filteredNode);
  }

  markers.start.remove();
  markers.end.remove();
  return nodes;
}

// Replace [node] with <tagName ...attributes>[node]</tagName>
function wrapNodeInHighlight(
  node: Node,
  tagName: string = 'mark',
  attributes?: { [key: string]: string }
) {
  const highlightElement = document.createElement(tagName);

  if (attributes) {
    for (const key in attributes) {
      highlightElement.setAttribute(key, attributes[key]);
    }
  }

  const owner = node.ownerDocument ?? document;
  const tempRange = owner.createRange();
  tempRange.selectNode(node);
  tempRange.surroundContents(highlightElement);
  return highlightElement;
}

// mutate range
function breakTexts(range: Range) {
  let {
    startContainer: sc,
    endContainer: ec,
    startOffset: so,
    endOffset: eo,
  } = range;
  const sct = sc.nodeType === Node.TEXT_NODE; // start container is text
  const ect = ec.nodeType === Node.TEXT_NODE; // end container is text

  if (sct && so > 0 && so < (sc as Text).length) {
    const newNode = (sc as Text).splitText(so);
    if (ec === sc) range.setEnd((ec = newNode), (eo = eo - so));
    range.setStart((sc = newNode), (so = 0));
  }

  if (ect && eo > 0 && eo < (ec as Text).length) {
    (ec as Text).splitText(range.endOffset);
  }
}

function getMarker(range: Range) {
  const {
    startContainer: sc,
    endContainer: ec,
    startOffset: so,
    endOffset: eo,
  } = range;
  const sct = sc.nodeType === Node.TEXT_NODE; // start container is text
  const ect = ec.nodeType === Node.TEXT_NODE; // end container is text
  const se = sct ? sc : sc.childNodes[so]; // start element
  const ee = ect ? ec : ec.childNodes[eo]; // end element
  const sp = sct ? (sc.parentNode as Node) : sc; // start parent
  const ep = ect ? (ec.parentNode as Node) : ec; // end Parent
  const bs = so < (sct ? (sc as Text).length : sc.childNodes.length); // before start
  const ae = ect && eo > 0; // after end
  const startMaker = document.createTextNode('');
  const endMarker = document.createTextNode('');

  if (bs) sp.insertBefore(startMaker, se);
  else sp.appendChild(startMaker);
  if (ae) {
    const nextSibling = ee.nextSibling;
    if (nextSibling) ep.insertBefore(endMarker, nextSibling);
    else ep.appendChild(endMarker);
  } else ep.insertBefore(endMarker, ee);

  return { start: startMaker, end: endMarker };
}

function filterTextNodes(node: Node | null): Node | null {
  if (
    node &&
    node.nodeType === Node.TEXT_NODE &&
    node.textContent &&
    !/^(\s|\n)+$/.test(node.textContent) // filter newline
  )
    return node;
  else return null;
}
