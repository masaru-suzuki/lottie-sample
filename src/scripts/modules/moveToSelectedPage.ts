export const moveToSelectedPage = () => {
  const selectBox = document.querySelectorAll('.js-jumpPage');
  if (selectBox == null) {
    return;
  }

  const handleChange = (event: any) => {
    location.href = event.currentTarget.value;
  };

  Array.from(selectBox).forEach((box) => {
    box.addEventListener('change', handleChange);
  });
};
