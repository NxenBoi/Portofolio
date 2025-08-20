import { animate, utils, onScroll } from 'animejs';

const text = utils.$(".nxen")

animate(text, {
  filter: ['blur(0px)', 'blur(20px)'],
  scale: [1, 1.5],
  opacity: [1, 0],
  easing: 'linear',
  autoplay: onScroll({
    target: text,
    enter: '50vh-=3vw',
    leave: '50vh-=9vw',
    sync: true,
    debug: false,
  }),
});

const glow = utils.$(".glow")
const experience = utils.$(".experience")

animate(glow, {
  filter: ['blur(20px)', 'blur(0px)', 'blur(20px)'],
  opacity: [0, 1, 0],
  easing: 'linear',
  autoplay: onScroll({
    target: glow,
    enter: '50vh-=3vw top-=50em',
    leave: '50vh-=9vw bottom',
    sync: true,
    debug: false,
  }),
});

animate(experience, {
  filter: ['blur(20px)', 'blur(0px)', 'blur(20px)'],
  scale: [3, 1, 0],
  opacity: [0, 1, 0],
  easing: 'linear',
  autoplay: onScroll({
    target: experience,
    enter: '50vh-=3vw top-=20em',
    leave: '50vh-=9vw bottom',
    sync: true,
    debug: false,
  }),
});
