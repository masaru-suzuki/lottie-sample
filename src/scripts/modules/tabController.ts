/**
 * Reference:
 * ARIA: tab ロール
 * https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/Roles/Tab_Role
 */

const changeTabs = (event) => {
  const target = event.currentTarget;
  const parent = target.parentNode;
  const grandparent = parent.parentNode.parentNode;

  // タブから現在すべての選択状態を取り除きます
  parent.querySelectorAll('[aria-selected="true"]').forEach((t) => t.setAttribute('aria-selected', false));

  // このタブを選択されたタブとして設定します
  target.setAttribute('aria-selected', true);

  // すべてのタブパネルを非表示にします
  grandparent.querySelectorAll('[role="tabpanel"]').forEach((p) => p.setAttribute('hidden', true));

  // 選択されたパネルを表示します
  grandparent.parentNode.querySelector(`#${target.getAttribute('aria-controls')}`).removeAttribute('hidden');
};

export const tabController = () => {
  const tabs = document.querySelectorAll('[role="tab"]');

  // 各タブに click イベントハンドラーを追加します
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => changeTabs(event));
  });
};
