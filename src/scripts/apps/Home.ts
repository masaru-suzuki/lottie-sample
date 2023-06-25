import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
// const gsapSample = () => {
//   gsap.to('.box', {
//     x: 200,
//   });
// };

const complete = () => console.log('complete');

const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

const gsapTimelineSample = () => {
  tl.add(gsap.to('.box.green.js-box-01', { x: 600, duration: 1 }));
  tl.add(gsap.to('.box.purple.js-box-01', { x: 600, duration: 0.5 }));
  tl.add(gsap.to('.box.orange.js-box-01', { x: 600, duration: 0.2 }));
};

const gsapTimelineSample2 = () => {
  gsap
    .timeline({ repeat: -1, repeatDelay: 0.5 })
    .set('.js-section02-heading', { textContent: 'Show Motion' })
    .from('.box1', { y: -32, opacity: 0, duration: 0.5 })
    .from('.box2', { y: 32, opacity: 0, duration: 0.5 }, '-=0.4')
    .from('.box3', { y: -32, opacity: 0, duration: 0.5 }, '-=0.4')
    .from('.box4', { y: 32, opacity: 0, duration: 0.5 }, '-=0.4')
    .from('.box5', { y: -32, opacity: 0, duration: 0.5 }, '-=0.4')
    .from('.box6', { y: 32, opacity: 0, duration: 0.5 }, '-=0.4')
    .set('.js-section02-heading', { textContent: 'Hide Motion' }, '+=1') // 1秒待機
    .to('.box1', { y: -32, opacity: 0, duration: 0.5 }, '+=0.5')
    .to('.box2', { y: 32, opacity: 0, duration: 0.5 }, '-=0.4') // 0.4秒開始を早める連続で動作しているように見える
    .to('.box3', { y: -32, opacity: 0, duration: 0.5 }, '-=0.4')
    .to('.box4', { y: 32, opacity: 0, duration: 0.5 }, '-=0.4')
    .to('.box5', { y: -32, opacity: 0, duration: 0.5 }, '-=0.4')
    .to('.box6', { y: 32, opacity: 0, duration: 0.5 }, '-=0.4');
};

const createChildTimeline = (element) => {
  // elementは文字と四角の親要素
  const elText = element.querySelector('.p-home-gsap-rect'); //文字の上の四角
  console.log(elText);

  const tl = gsap
    .timeline()
    .from(element, {
      y: 16,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
    })
    .set(elText, { opacity: 0 })
    .to(
      elText,
      {
        x: '102%',
        duration: 1,
        ease: 'power4.out',
      },
      '-=80%' //かぶり率
    );
  // .to(
  //   element,
  //   {
  //     color: '#ffca36',
  //     duration: 1,
  //   },
  //   '-=50%'
  // );

  return tl;
};

const gsapTimelineSample3 = () => {
  document.querySelectorAll('.p-home-gsap-word').forEach((word) => {
    tl.add(createChildTimeline(word), '-=80%');
  });
};

const gsapScrollTriggerSample = () => {
  gsap.to('.js-scrollTrigger-box-01', {
    x: 600,
    scrollTrigger: {
      trigger: '.p-home-animation-area',
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
      markers: true,
    },
  });
};

export const Home = () => {
  gsapTimelineSample();
  gsapTimelineSample2();
  gsapTimelineSample3();
  gsapScrollTriggerSample();
};
