/**
 * intersection observerで画面を監視し、アニメーションのタイミングをコントロールする関数
 * 監視するアニメーションの範囲 => '.js-anime-block'
 * クラスを付与するアニメーション要素 => '.js-anime'
 * アニメーションを開始するタイミング => 'data-animation-delay="{ms}"'
 * 付与するクラス => '-anime-start'
 *
 * sample(pug)
 * .js-anime-block
 *   .js-anime(data-animation-delay="0")
 *   .js-anime(data-animation-delay="400")
 *   .js-anime(data-animation-delay="600")
 */

export const animationControl = () => {
  const animationBlockList = Array.from(document.querySelectorAll('.js-anime-block')) as HTMLElement[];
  animationBlockList.forEach((animationBlock) => {
    const animationList = Array.from(animationBlock.querySelectorAll('.js-anime')) as HTMLElement[];

    // option
    const option = {
      rootMargin: '-300px',
    };

    // animationロジック
    const animation = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animationList.forEach((animation) => {
            const animationDelay = parseInt(<string>animation.dataset.animationDelay);
            setTimeout(() => {
              animation.classList.add('-anime-start');
            }, animationDelay);
          });
        }
      });
    };

    // constant
    const animationObserver = new IntersectionObserver(animation, option);

    // observer実行
    animationObserver.observe(animationBlock);
  });
};
