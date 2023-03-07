// https://markuplint.dev/rules/

module.exports = {
  parser: {
    '.php$': '@markuplint/php-parser',
  },
  excludeFiles: ['./node_modules/**/*', './vendor/**/*'],
  nodeRules: [
    {
      selector: 'meta',
      rules: {
        'invalid-attr': false,
        'required-attr': false,
      },
    },
    {
      selector: 'iframe',
      rules: {
        'invalid-attr': false,
        'required-attr': false,
        'no-boolean-attr-value': false,
        'deprecated-attr': false,
      },
    },
    {
      selector: 'script',
      rules: {
        'invalid-attr': false,
        'required-attr': false,
        'no-boolean-attr-value': false,
        'deprecated-attr': false,
        'character-reference': false,
      },
    },
    {
      selector: 'input',
      rules: {
        'no-boolean-attr-value': false,
      },
    },
  ],
  rules: {
    'attr-duplication': true,
    'attr-equal-space-after': true,
    'attr-equal-space-before': true,
    'attr-spacing': false, // pugの変換側での制御ができないためfalseにしている
    'attr-value-quotes': true,
    'case-sensitive-attr-name': true,
    'case-sensitive-attr-value': true,
    'case-sensitive-tag-name': true,
    'character-reference': true,
    'class-naming': false,
    'deprecated-attr': true,
    'deprecated-element': true,
    'disallowed-element': false,
    doctype: true,
    'end-tag': true,
    'id-duplication': true,
    indentation: false,
    'ineffective-attr': true,
    'invalid-attr': true,
    'no-boolean-attr-value': true,
    'no-default-value': true,
    'no-hard-code-id': false, // 要素のIDが見えないとメンテの効率が下がるためfalseにしている
    'no-refer-to-non-existent-id': true,
    'no-use-event-handler-attr': true,
    'permitted-contents': true,
    'required-attr': true,
    'required-element': true,
    'required-h1': true,
    'use-list': false,
    'wai-aria': true,
    'landmark-roles': false,
  },
};
