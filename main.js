import { animate, utils, onScroll } from "animejs";

const stars = utils.$(".bg-animation");
const logo = utils.$(".logo");
const learnmore = utils.$(".learnmore");

window.scrollTo(0, 0);

var syncTime = 0.5;

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

const fss = utils.$("#fss");
const one = utils.$("#one");
animate(fss, {
  opacity: [0, 1],
  easing: "linear",
  autoplay: onScroll({
    target: fss,
    enter: "50vh-=3vw top-=5em",
    leave: "50vh-=9vw bottom",
    sync: syncTime,
    debug: false,
  }),
});
animate(one, {
  scaleX: [0, 1],
  easing: "linear",
  autoplay: onScroll({
    target: fss,
    enter: "50vh-=3vw top-=7em",
    leave: "50vh-=9vw bottom",
    sync: syncTime,
    debug: false,
  }),
});

const yoe = utils.$("#yoe");
const two = utils.$("#two");
animate(yoe, {
  opacity: [0, 1],
  easing: "linear",
  autoplay: onScroll({
    target: yoe,
    enter: "50vh-=3vw top-=5em",
    leave: "50vh-=9vw bottom",
    sync: syncTime,
    debug: false,
  }),
});
animate(two, {
  scaleX: [0, 1],
  easing: "linear",
  autoplay: onScroll({
    target: yoe,
    enter: "50vh-=3vw top-=7em",
    leave: "50vh-=9vw bottom",
    sync: syncTime,
    debug: false,
  }),
});

const wrs = utils.$("#wrs");
const three = utils.$("#three");
animate(wrs, {
  opacity: [0, 1],
  easing: "linear",
  autoplay: onScroll({
    target: wrs,
    enter: "50vh-=3vw top-=5em",
    leave: "50vh-=9vw bottom",
    sync: syncTime,
    debug: false,
  }),
});
animate(three, {
  scaleX: [0, 1],
  easing: "linear",
  autoplay: onScroll({
    target: wrs,
    enter: "50vh-=3vw top-=7em",
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
const contributions = utils.$(".contributions");

animate(contributions, {
  opacity: [0, 1],
  easing: "linear",
  autoplay: onScroll({
    target: contributions,
    enter: "50vh-=3vw top-=5em",
    leave: "50vh-=9vw",
    sync: syncTime,
    debug: false,
  }),
});

animate(wrapper, {
  opacity: [0, 1],
  easing: "linear",
  autoplay: onScroll({
    target: wrapper,
    enter: "50vh-=3vw top-=35em",
    leave: "50vh-=9vw bottom",
    sync: syncTime,
    debug: false,
  }),
});

const flex1 = utils.$("#flex1");
animate(flex1, {
  filter: ["blur(8px)", "blur(0px)"],
  opacity: [0, 1],
  easing: "linear",
  autoplay: onScroll({
    target: flex1,
    enter: "50vh-=3vw top-=25em",
    leave: "50vh-=9vw top-=15em",
    sync: syncTime,
    debug: false,
  }),
});

const flex2 = utils.$("#flex2");
animate(flex2, {
  filter: ["blur(8px)", "blur(0px)"],
  opacity: [0, 1],
  easing: "linear",
  autoplay: onScroll({
    target: flex2,
    enter: "50vh-=3vw top-=25em",
    leave: "50vh-=9vw top-=15em",
    sync: syncTime,
    debug: false,
  }),
});

const flex3 = utils.$("#flex3");
animate(flex3, {
  filter: ["blur(8px)", "blur(0px)"],
  opacity: [0, 1],
  easing: "linear",
  autoplay: onScroll({
    target: flex3,
    enter: "50vh-=3vw top-=25em",
    leave: "50vh-=9vw top-=15em",
    sync: syncTime,
    debug: false,
  }),
});
