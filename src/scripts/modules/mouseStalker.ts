/**
 * mouse stalker
 */
export const mouseStalker = () => {
  const stalker = <HTMLElement>document.getElementById('js-mouse-stalker');
  const activateTargets = document.querySelectorAll('a:not(.-noStick_):not(.-lgStalker),button:not(.-noStick_):not(.-lgStalker)');

  // 大きめのマウスストーカー(.lgStalkerのクラスを付与する)
  const activateTargetsLarge = document.querySelectorAll('a.-lgStalker:not(.-noStick_),button.-lgStalker:not(.-noStick_)');

  // マウスストーカーをオフにする要素
  const disabledTargets = document.querySelectorAll('iframe');

  // マウスが画面上にあるときにマウスストーカーを表示する
  document.addEventListener('mouseover', () => stalker.classList.add('-visible'));
  document.addEventListener('mouseout', () => stalker.classList.remove('-visible'));

  // mouse stalker 実装
  document.addEventListener('mousemove', function (e) {
    stalker.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
  });

  // hover時に拡大
  activateTargets.forEach((target) => {
    target.addEventListener('mouseover', () => stalker.classList.add('-active'));
    target.addEventListener('mouseout', () => stalker.classList.remove('-active'));
  });

  // 大きめのマウスストーカー
  activateTargetsLarge.forEach((target) => {
    target.addEventListener('mouseover', () => stalker.classList.add('-active-large'));
    target.addEventListener('mouseout', () => stalker.classList.remove('-active-large'));
  });

  // マウスストーカーをオフにする
  disabledTargets.forEach((target) => {
    target.addEventListener('mouseover', () => stalker.classList.remove('-visible'));
    target.addEventListener('mouseout', () => stalker.classList.add('-visible'));
  });
};
