import { setContent } from 'viewport-extra';

/**
 * 端末によってviewportを調整する関数
 */
export const toggleContent = () => {
  // タブレット端末かどうかを判定
  const ua = navigator.userAgent;
  const isSmartPhone = ua.indexOf('iPhone') > -1 || (ua.indexOf('Android') > -1 && ua.indexOf('Mobile') > -1);
  const isTablet = !isSmartPhone && (ua.indexOf('iPad') > -1 || (ua.indexOf('Macintosh') > -1 && 'ontouchend' in document) || ua.indexOf('Android') > -1);

  // スマホ端末でのみ最小幅を設定
  if (isSmartPhone) setContent({ minWidth: 375 });

  // タブレット端末でのみ最小幅を設定
  if (isTablet) setContent({ minWidth: 1366 });
};
