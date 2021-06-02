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

const createMove = (selector, cb) => {
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

  const onTouchmove = (e) => {
    const touch = e.touches[0] || e.changedTouches[0];
    const bcr = getBCR(svg);
    const midX = bcr.width / 2;
    const midY = bcr.height / 2;
    const deltaX = touch.clientX - bcr.left - midX;
    const deltaY = touch.clientY - +bcr.top - midY;

    cb({ deltaX, deltaY, el: svg });
  };

  container.addEventListener("mousemove", onMousemove);
  container.addEventListener("touchmove", onTouchmove, { passive: true });
};

createMove(".filter", animateDropShadow);
createMove(".duplicated", animateDuplicatedPath);
