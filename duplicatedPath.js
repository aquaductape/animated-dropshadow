import { round } from "./utils/index.js";

const svg = document.querySelector(".duplicated svg");

const genPath = (id) => `<path  class="shadow"
          d="M170.909 122.331c22.51-.653 43.623 15.261 50.674 36.406 9.33 24.656 2.108 55.742-20.078 71.107-24.163 17.58-61.783 13.57-80.415-10.29-10.832-12.86-14.175-30.265-13.082-46.675.135-30.564-.293-61.158.222-91.704 1.856-9.616 17.98-10.872 20.713-1.208 1.667 7.121.476 14.53.81 21.793v39.98c9.792-12.307 25.45-19.62 41.156-19.409zm-4.262 99.147c19.244.816 35.948-15.915 37.704-34.618 2.389-17.678-7.472-37.024-24.73-43.118-17.688-6.857-39.938 2.131-47.09 19.92-8.91 19.343-1.434 46.208 18.943 54.835 4.78 2.031 9.987 3 15.173 2.981z"
           />`;

const genPaths = () => {
  return Array.from({ length: 50 }, () => genPath());
};

const strPaths = genPaths();

svg.insertAdjacentHTML("afterbegin", strPaths.join(" "));
document.body.clientWidth; // reflow()
const paths = document.querySelectorAll(".shadow");

export const animateDuplicatedPath = ({ deltaX, deltaY, el }) => {
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

  const xStarting = deltaXBigger
    ? Math.sign(deltaX)
    : Math.sign(deltaX) * round(smallerDelta / biggerDelta, 1);
  const yStarting = !deltaXBigger
    ? Math.sign(deltaY)
    : Math.sign(deltaY) * round(smallerDelta / biggerDelta, 1);

  let x = xStarting;
  let y = yStarting;

  const pathsStyle = [];

  for (let i = 1; i <= max; i++) {
    if (i <= steps) {
      x += xStarting;
      y += yStarting;
    }

    paths[i - 1].style.transform = `translate(${x}px, ${y}px)`;
    // pathsStyle.push(`translate(${x}px, ${y}px)`);
  }
  // debugger;

  // 150x 200y
  el.classList.add("active");
};
