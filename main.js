import { createDropShadow } from "./dropShadow.js";

const svg = document.querySelector("svg");

const bcr = svg.getBoundingClientRect();
const midX = bcr.width / 2;
const midY = bcr.height / 2;

const onMousemove = (e) => {
  const deltaX = e.offsetX - midX;
  const deltaY = e.offsetY - midY;

  createDropShadow({ deltaX, deltaY, el: svg });
};
/**
 * DONT transition filter, its sluggy on Chrome
 */

document.body.addEventListener("mousemove", onMousemove);
