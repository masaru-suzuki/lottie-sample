/**
 * 特定の要素からクラスを全て削除する関数
 * @module
 * @param {className} - 対象の要素の保持するクラス
 * @param {removeClass} - 削除するクラス
 * @return {void}
 */
export const resetClassName = (className: string, removeClass: string) => {
  const targetList = Array.from(document.querySelectorAll(`.${className}.${removeClass}`));

  targetList.forEach((target) => {
    target.classList.remove(removeClass);
  });
};
