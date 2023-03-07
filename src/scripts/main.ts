import { appLoader, Functions } from './appLoader';
import { Common } from './apps/Common';
import { Home } from './apps/Home';

const functions: Functions = {
  Common,
  Home,
};

const docReady = () => {
  appLoader(functions);
};

/**
 * The ready event handler and self cleanup method
 * [jquery/src/core/ready.js](https://github.com/jquery/jquery/blob/main/src/core/ready.js)
 */
// どうしてこの処理を挟むのかまだわかっていない
function completed() {
  document.removeEventListener('DOMContentLoaded', completed);
  window.removeEventListener('load', completed);
  docReady();
}

if (document.readyState !== 'loading') {
  // Handle it asynchronously to allow scripts the opportunity to delay ready
  window.setTimeout(docReady);
} else {
  // Use the handy event callback
  document.addEventListener('DOMContentLoaded', completed);

  // A fallback to window.onload, that will always work
  window.addEventListener('load', completed);
}
