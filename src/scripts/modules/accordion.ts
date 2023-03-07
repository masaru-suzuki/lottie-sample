const accordionToggle = (accordion) => {
  const content = accordion.nextElementSibling;
  accordion.classList.toggle('-active');
  if (accordion.classList.contains('-active')) {
    content.style.height = content.scrollHeight + 'px';
  } else {
    content.style.height = '0';
  }
};

export const accordion = () => {
  const accordionList = Array.from(document.querySelectorAll('.js-accordion')) as HTMLElement[];

  if (accordionList == null) return;

  accordionList.forEach((accordion) => {
    accordion.addEventListener('click', () => accordionToggle(accordion));
  });
};
