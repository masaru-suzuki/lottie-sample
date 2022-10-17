const mediaQuery = window.matchMedia('(min-width: 600px)');

/**
 * 動作確認用のサンプル
 */
const exampleFunc = () => {
  console.log('example');
};

const exampleFunc2 =()=>{
  console.log('example fn 2')
}

export const Example = () => {
  exampleFunc();
  exampleFunc2();
};
