/**
 * SNSシェアボタンのリンク先を動的に設定
 */
export const snsShareLink = () => {
  const facebook = <HTMLAnchorElement>document.getElementById('js-share-facebook');
  const twitter = <HTMLAnchorElement>document.getElementById('js-share-twitter');
  const hatena = <HTMLAnchorElement>document.getElementById('js-share-hatena');
  const url = location.href;
  const title = document.title;
  const facebookBase = 'http://www.facebook.com/share.php?u=';
  const twitterBase = 'https://twitter.com/intent/tweet?url=';
  const hatenaBase = 'https://b.hatena.ne.jp/entry/panel/?mode=confirm&url=';
  facebook.setAttribute('href', facebookBase + url);
  twitter.setAttribute('href', twitterBase + url + '&text=' + title);
  hatena.setAttribute('href', hatenaBase + url + '&title=' + title);
};
