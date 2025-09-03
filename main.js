import { animate, utils, onScroll } from "animejs";

const zero = document.querySelector(".zero");
const first = document.querySelector(".first");
const second = document.querySelector(".second");
const third = document.querySelector(".third");
const fourth = document.querySelector(".fourth");

const stars = utils.$(".bg-animation");
const logo = utils.$(".logo");
const learnmore = utils.$(".learnmore");

const syncTime = true;

animate(logo, {
  scale: [1, 1.5],
  opacity: [1, 0],
  filter: ["blur(0px)", "blur(8px)"],
  easing: "linear",
  autoplay: onScroll({
    target: logo,
    enter: "50vh-=4vw",
    leave: "50vh-=9vw",
    sync: syncTime,
    debug: false,
  }),
});

animate(stars, {
  opacity: [0.5, 0],
  easing: "linear",
  autoplay: onScroll({
    target: logo,
    enter: "50vh-=4vw",
    leave: "50vh-=9vw bottom+=10em",
    sync: syncTime,
    debug: false,
  }),
});

animate(learnmore, {
  opacity: [0.5, 0],
  easing: "linear",
  autoplay: onScroll({
    target: learnmore,
    enter: "50vh-=3vw top-=5em",
    leave: "50vh-=9vw bottom+=5em",
    sync: syncTime,
    debug: false,
  }),
});

const glow = utils.$(".glow");
const experience = utils.$(".experience");

animate(glow, {
  filter: ["blur(20px)", "blur(0px)"],
  opacity: [0, 1],
  easing: "linear",
  autoplay: onScroll({
    target: glow,
    enter: "50vh-=3vw top-=50em",
    leave: "50vh-=9vw bottom",
    sync: syncTime,
    debug: false,
  }),
});

animate(experience, {
  opacity: [0, 1],
  easing: "linear",
  autoplay: onScroll({
    target: experience,
    enter: "50vh-=3vw top-=10em",
    leave: "50vh-=9vw bottom",
    sync: syncTime,
    debug: false,
  }),
});

const sas = document.querySelector(".sas");
const mdg = document.querySelector(".mdg");

for (let i = 1; i <= 16; i++) {
  const game = document.querySelector(`.item${i}`);
  if (!game) continue;

  if (i % 2 === 0) {
    game.appendChild(sas.content.cloneNode(true));
  } else {
    game.appendChild(mdg.content.cloneNode(true));
  }
}
const wrapper = utils.$(".wrapper");

animate(wrapper, {
  opacity: [0, 1],
  easing: "linear",
  autoplay: onScroll({
    target: wrapper,
    enter: "50vh-=3vw top-=30em",
    leave: "50vh-=9vw bottom",
    sync: syncTime,
    debug: false,
  }),
});

// Terminal

const time = 0.5;
const Terminal = document.getElementById("Terminal");
const Input = document.getElementById("Input");
let UserName = "";

function TypeLine(text, callback) {
  let i = 0;
  const interval = setInterval(() => {
    if (i < text.length) {
      Terminal.textContent += text[i++];
    } else {
      clearInterval(interval);
      Terminal.textContent += "\n";
      if (callback) callback();
    }
  }, time);
}

Input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    UserName = Input.value.trim() || "Guest";
    Input.style.display = "none";
    Terminal.textContent = "";
    TypeLine(`Portfolio.Initialize("${UserName}")`, () => {
      setTimeout(() => {
        Terminal.textContent = "";
        TypeLine("Access Granted", () => {
          setTimeout(() => {
            zero.style.display = "none";
            first.style.display = "flex";
            second.style.display = "flex";
            third.style.display = "flex";
            fourth.style.display = "flex";
          }, time * 10);
        });
      }, time * 10);
    });
  }
});

Terminal.textContent = "Enter Username: ";
Input.focus();
