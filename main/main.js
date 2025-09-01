import { animate, utils, onScroll } from 'animejs';

const text = utils.$(".nxen")
const logo = utils.$(".logo")
const syncTime = true

animate(text, {
  filter: ['blur(0px)', 'blur(20px)'],
  scale: [1, 1.5],
  opacity: [1, 0],
  easing: 'linear',
  autoplay: onScroll({
    target: text,
    enter: '50vh-=3vw',
    leave: '50vh-=9vw',
    sync: syncTime,
    debug: false,
  }),
});

animate(logo, {
  scale: [1, 1.5],
  opacity: [0.4, 0],
  easing: 'linear',
  autoplay: onScroll({
    target: text,
    enter: '50vh-=3vw',
    leave: '50vh-=9vw',
    sync: syncTime,
    debug: false,
  }),
});

const glow = utils.$(".glow")
const experience = utils.$(".experience")

animate(glow, {
  filter: ['blur(20px)', 'blur(0px)', 'blur(0px)',  'blur(20px)'],
  opacity: [0, 1, 1, 0],
  easing: 'linear',
  autoplay: onScroll({
    target: glow,
    enter: '50vh-=3vw top-=50em',
    leave: '50vh-=9vw bottom',
    sync: syncTime,
    debug: false,
  }),
});

animate(experience, {
  opacity: [0, 1, 1, 0],
  easing: 'linear',
  autoplay: onScroll({
    target: experience,
    enter: '50vh-=3vw top-=10em',
    leave: '50vh-=9vw bottom+=10em',
    sync: true,
    debug: false,
  }),
});


