import { gsap } from 'gsap';

// const gsapSample = () => {
//   gsap.to('.box', {
//     x: 200,
//   });
// };

const complete = () => console.log('complete');

const gsapSample = () => {
  gsap.to('.box', { x: 200, backgroundColor: 'red', rotate: 180, duration: 1, yoyo: true, repeat: 1, onComplete: complete, ease: 'power1.inOut' });
};

const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

const gsapTimelineSample = () => {
  tl.add(gsap.to('.green', { x: 600, duration: 1 }));
  tl.add(gsap.to('.purple', { x: 600, duration: 0.5 }));
  tl.add(gsap.to('.orange', { x: 600, duration: 0.2 }));
};

const gsapTimelineSample2 = () => {
  gsap
    .timeline({ repeat: -1, repeatDelay: 0.5 })
    .set('.js-section02-heading', { textContent: 'Show Motion' })
    .from('.box1', { y: -32, opacity: 0, duration: 0.5 })
    .from('.box2', { y: 32, opacity: 0, duration: 0.5 })
    .from('.box3', { y: -32, opacity: 0, duration: 0.5 })
    .from('.box4', { y: 32, opacity: 0, duration: 0.5 })
    .from('.box5', { y: -32, opacity: 0, duration: 0.5 })
    .from('.box6', { y: 32, opacity: 0, duration: 0.5 })
    .set('.js-section02-heading', { textContent: 'Hide Motion' }, '+=1') // 1秒待機
    .to('.box1', { y: -32, opacity: 0, duration: 0.5 }, '+=0.5')
    .to('.box2', { y: 32, opacity: 0, duration: 0.5 }, '-=0.4') // 0.4秒開始を早める
    .to('.box3', { y: -32, opacity: 0, duration: 0.5 }, '-=0.4')
    .to('.box4', { y: 32, opacity: 0, duration: 0.5 }, '-=0.4')
    .to('.box5', { y: -32, opacity: 0, duration: 0.5 }, '-=0.4')
    .to('.box6', { y: 32, opacity: 0, duration: 0.5 }, '-=0.4');
};

export const Home = () => {
  gsapTimelineSample();
  gsapTimelineSample2();
};
