import { round } from "./utils/index.js";

let prevValue = {
  biggerDelta: 0,
  smallerDelta: 0,
  stagger: 0,
};
let prevStyle = "";

/**
 * DONT use css transition on filter, its sluggy on Chrome
 */

export const animateDropShadow = ({ deltaX, deltaY, el }) => {
  const color = "#ff8080";
  const max = 50;

  deltaX = round(Math.ceil(deltaX / 8), 1);
  deltaY = round(Math.ceil(deltaY / 8), 1);

  const deltaXBigger = Math.abs(deltaX) > Math.abs(deltaY);
  let biggerDelta = Math.abs(deltaXBigger ? deltaX : deltaY);
  let smallerDelta = Math.abs(!deltaXBigger ? deltaX : deltaY);

  if (biggerDelta >= max) {
    smallerDelta = round(smallerDelta / (biggerDelta / max), 1);
    biggerDelta = max;
  }
  const steps = biggerDelta;
  const stagger = Math.ceil(biggerDelta / smallerDelta);

  if (
    prevValue.biggerDelta === biggerDelta &&
    prevValue.smallerDelta === smallerDelta &&
    prevValue.stagger === stagger
  )
    return;
  if (biggerDelta < 1) return;
  if (steps >= 200) return;

  prevValue.biggerDelta = biggerDelta;
  prevValue.smallerDelta = smallerDelta;
  prevValue.stagger = stagger;
  prevValue.biggerDelta = biggerDelta;

  const xStarting = Math.sign(deltaX);
  const yStarting = Math.sign(deltaY);
  // 10x 200y
  // 100x 200y

  let x = xStarting;
  let y = yStarting;
  let style = "";

  for (let i = 0; i <= steps; i++) {
    if (deltaXBigger) {
      if (i % stagger === 0) {
        y = yStarting;
      } else {
        y = 0;
      }
    } else {
      if (i % stagger === 0) {
        x = xStarting;
      } else {
        x = 0;
      }
    }

    style += `drop-shadow(${x}px ${y}px 0px ${color}) `;
  }
  if (prevStyle === style) return;
  prevStyle = style;
  el.style.filter = style;
};
