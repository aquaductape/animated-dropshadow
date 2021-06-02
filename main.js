import { animateDropShadow } from "./dropShadow.js";
import { animateDuplicatedPath } from "./duplicatedPath.js";

let hasCalcBCR = false;
let bcr = null;
let prevScrollY = 0;

const getBCR = (svg) => {
  if (prevScrollY !== window.scrollY) {
    bcr = svg.getBoundingClientRect();
    return bcr;
  }

  if (hasCalcBCR) return bcr;

  hasCalcBCR = true;
  bcr = svg.getBoundingClientRect();
  return bcr;
};

const createMouseMove = (selector, cb) => {
  const container = document.querySelector(selector);
  const svg = container.querySelector("svg");

  const onMousemove = (e) => {
    const bcr = getBCR(svg);
    const midX = bcr.width / 2;
    const midY = bcr.height / 2;
    const deltaX = e.clientX - bcr.left - midX;
    const deltaY = e.clientY - +bcr.top - midY;

    cb({ deltaX, deltaY, el: svg });
  };

  container.addEventListener("mousemove", onMousemove);
};

createMouseMove(".filter", animateDropShadow);
createMouseMove(".duplicated", animateDuplicatedPath);
