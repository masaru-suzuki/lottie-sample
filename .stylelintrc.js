module.exports = {
  extends: ['stylelint-config-sass-guidelines', 'stylelint-config-recess-order'],
  rules: {
    'block-no-empty': null, // 空のscssブロックを許容
    'selector-id-pattern': null, // idでkebab-case以外も許容
    'selector-class-pattern': null, // classでkebab-case以外も許容
    'keyframes-name-pattern': null, // keyframesでkebab-case以外も許容
    'scss/at-mixin-pattern': null, // mixinでkebab-case以外も許容
    'scss/at-function-pattern': null, // mixinのfunctionでkebab-case以外も許容
    'scss/dollar-variable-pattern': null, // $変数でkebab-case以外も許容
    'scss/percent-placeholder-pattern': null, // %placeholderでkebab-case以外も許容
    'scss/at-extend-no-missing-placeholder': null, // @extendで%placeholder以外も許容
    'alpha-value-notation': ['number', { severity: 'warning' }], // 0.3が30%となっていてもwarningで止める
    'order/properties-alphabetical-order': null, // アルファベット順に並ぶのを止める
    'scss/selector-no-redundant-nesting-selector': null, // :where(&) の `&` の仕様を許可
    'selector-no-qualifying-type': null, // &.-active のような `&.` の仕様を許可
    'max-nesting-depth': 3, // ネストの階層を3階層まで許可
  },
};
