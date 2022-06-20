/**
 * [指定ページのみで発火させるスクリプトの構成](https://b.0218.jp/202003101846.html)
 */
export type Functions = {
  [key: string]: () => void;
};

const callApp = (functions: Functions, appId: string) => {
  // 指定されたページ名のイベントが存在するかチェック
  const hasFunction =
    !!functions[appId] && typeof functions[appId] === 'function';
  if (!hasFunction) {
    return;
  }

  // 一致したイベントを実行
  try {
    functions[appId]();
  } catch (e) {
    console.error(e);
  }
};

/**
 * ページ固有のJSを実行する関数
 */
export const appLoader = (functions: Functions) => {
  //サイト共通のJSを実行
  callApp(functions, 'Common');

  // App ID (body[data-app])を取得
  const appId = document.body.dataset.app;
  if (typeof appId === 'undefined') {
    return;
  }

  // ページ固有のJSを実行
  callApp(functions, appId);
};
