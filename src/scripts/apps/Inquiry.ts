/**
 * Reference:
 * formエリア
 * デフォルトのチェックボックスを非表示にして、カスタマイズした枠をチェックボックスに見立てて表示している
 * カスタマイズしたチェックボックスにデフォルトと同じ挙動を取らせる(tabでfocus,checkを可能にする)
 * .checkboxのマルチクラスとして、js-checkboxをつける
 */

export const toggleCustomCheckBox = () => {
  const checkBoxList = document.querySelectorAll('.js-checkbox');
  if (!checkBoxList.length) return;
  checkBoxList.forEach((checkBox) => {
    const input = checkBox.querySelector('input');
    const targetCheckBox = checkBox.querySelector('span');

    if (!input || !targetCheckBox) return;

    targetCheckBox.addEventListener('click', () => {
      input.checked = !input.checked;
    });
  });
};

export const Inquiry = () => {
  toggleCustomCheckBox();
};
