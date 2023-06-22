# 静的サイト作成用のテンプレートです。

- **こちらのリポジトリをコピーして個人・企業問わず開発に使ってかまいません。あくまでも参考用のコードのため、利用による責任は追いかねます。**
- 不具合などがあれば [Twitter](https://twitter.com/masapo62106181)かプルリクエストを作成してください。

## Basic 認証を Heroku で設定する

1. heroku アプリのダッシュボードに入り `settings` から `Reveal Config Vars` をクリック
2. `KEY` に `USER` と入力
3. `VALUE` に Basic 認証で使うユーザー名を入力
4. `KEY` に `PASS` と入力
5. `VALUE` に Basic 認証で使うパスワードを入力（[このサイト](https://www.luft.co.jp/cgi/randam.php)で乱数を作ると楽)

<br>
<br>
<br>

▼▼▼▼▼▼▼▼ 以下テンプレート用 README ▼▼▼▼▼▼▼▼

<br>
<br>

# サンプルタイトル

作業前にご一読ください。

| 資料名              | URL              |
| ------------------- | ---------------- |
| Backlog :           | BACKLOG_URL      |
| 案件関連情報 Wiki : | BACKLOG_WIKI_URL |
| Notion :            | NOTION_URL       |

- [サンプルタイトル](#サンプルタイトル)
  - [対応 OS・ブラウザ](#対応-osブラウザ)
  - [ファイル構成](#ファイル構成)
  - [開発にあたっての留意点](#開発にあたっての留意点)
    - [SSI 構造](#ssi-構造)
    - [assets 系ファイル](#assets-系ファイル)
    - [scripts ディレクトリの構造](#scripts-ディレクトリの構造)
    - [CSS 設計について](#css)
    - [img タグに付与する属性](#img-タグに付与する属性)
    - [a タグに付与する属性](#a-タグに付与する属性)
  - [コミットルール](#コミットルール)
    - [ブランチの命名規則](#ブランチの命名規則)
  - [初期構築・デプロイ](#初期構築デプロイ)
    - [インストール](#インストール)
    - [開発環境実行](#開発環境実行)
    - [heroku への反映](#heroku-への反映)
    - [注意事項](#注意事項)

## 対応 OS・ブラウザ

### Mac（ver.High Sierra 以降）

- chrome（最新 ver）
- firefox（最新 ver）
- safari（最新 ver）

## Windows（ver.10 以降）

- chrome（最新 ver）
- firefox（最新 ver）
- Edge（最新 ver）

### スマホ/タブレット

- iOS（ver.15.0 以降）
- chrome（最新 ver）
- safari（最新 ver）
- Android（ver.9.0 以降）
- chrome（最新 ver）
  ※シェア率 95%以上を対象

## ファイル構成

- .vscode ... スニペット設定ファイル
- public ... 公開ファイル
- src ... ソースファイル
  - data ... JSON ファイル
    - site.json ... サイトの基本情報・サイト固定のメタ情報(pug のページ情報に記載がない場合は、site.json の記述がメタ情報になります)
    - data.json ... 記事情報など pug でループさせる情報
  - images ... 画像ファイル
  - views ... HTML ファイル（pug ファイル）
  - scripts ... JS ファイル（typescript ファイル）
  - styles ... CSS ファイル（sass ファイル）

---

## 開発にあたっての留意点

### PUG

#### views ディレクトリについて

- views 配下はディレクトリがそのまま出力されます。
- \_components ... テンプレートに関わるコンポーネント+mixin
- \_layouts ... デフォルトテンプレート
- includes ... php インクルードパーツ(pug の mixin が使えません)

#### ページャーについて

- php と MT で出力されるパターンがあるそうです。ソースは同じかと思われますが、確認が必要です。

#### mixin について

- 繰り返し使う要素については mixin にまとめています。
- 追加や調整が必要な場合はご一報ください。

#### a タグに付与する属性

- `target="\_blank"`をもつ a タグには `rel="noopener"` の付与します。
  - 現在、Chrome、FireFox および Safari では rel 属性が指定されていない場合、デフォルトで `rel="noopener"` が指定されます。ですが Edge で同様の処理がなされているか、資料が見当たりません。
  - 参考： [「target=”\_blank”」には「rel=”noopener”」を！html で外部リンクを貼る際の注意点。](https://www.1st-net.jp/blog/target-blank-noopener/#rel8221noopener8221)
  - 参考：[target="\_blank"につけるべき rel 属性【noopener / noreferrer】](https://rapicro.com/target_blank_rel_noopener-noreferrer/)
- a タグで囲まれた要素がリンク先を適切に説明していない場合、`title属性` を付与し、リンク先が何であるのかの説明を加えます。
  - 参考： `<a href="http://privacymark.jp/" target="_blank" rel="noopener" title="プライバシーマーク制度｜一般財団法人日本情報経済社会推進協会（JIPDEC）"><img src="/assets/images/badge_pmark.svg" width="54" height="45" decoding="async" alt="プライバシーマークのロゴ画像"/></a>`

#### 注意点

全体に影響がある `views/components`,`views/layouts`, `views/includes`ファイルについては、調整がある際はご連絡ください。調整する際はコミットを分けてください。

---

### CSS

#### CSS 設計について

- CSS のファイル構成は **FlOCSS** がベースです。全体の構成および役割を把握するためには `main.scss` を参照してください。(#css)
  - components[`c-`] ... コンポーネント
  - module[`m-`] ... コンポーネントが集まったパーツ。FLOCSS だと Object > Parts 要素だが、Pages レイヤーがあるため、module レイヤーとして命名している
  - foundation ... 定数・変数・mixin・ベースとなるスタイルが定義されています。
  - layouts[`l-`] ... ページ間で使いまわされる要素、かつ、ページ内で 1 つの要素。または、レイアウトを定義する要素。
  - libs ... JS の制御を伴うパーツ。`vendor`で読み込んでいる CSS を上書きするために使っている。
  - pages[`p-`] ... 各ページごとの個別スタイル。
  - utilities[`u-`] ... utility クラス。
  - vendor ... nodeModules やリセット CSS などの外部 CSS。
- 命名は [**MindBEMding**](https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) です。[こちらの記事](https://github.com/manabuyasuda/styleguide/blob/master/how-to-bem.md)を参考にしています。
- マルチクラスをつける場合、4 つ以上のプロパティがつく場合は、新しくクラスを定義してください。(アニメーションの制御を除く)
- 検索性を高めるため、`&__`で省略した書き方はしないでください。
- 詳細度が上がらないように気をつけてください。（レイアウト要素・モジュール要素は除く）
- 詳細度を上げる必要がある場合は、`:where`を使ってください。[こちらの記事](https://coliss.com/articles/build-websites/operation/css/css-new-pseudo-classes-is-and-where.html)を参考にしています。
- タグを使ったスタイリングは避けてください（CMS 出力が想定されるページを除く）。
- font-size や margin,padding などは clamp を使ってください。(大きくレイアウトが変わる要素は除く)
  - ex)font-size: clamp_rem($min: 16, $max: 20);
  - NG)font-size: clamp_rem($min: 12, $max: 40)
- BEM で block の中に block を入れないでください。
  - NG) `.p-home-featurePanel__inner__lead`
  - OK) `.p-home-featurePanelLoad__inner`
  - OK) `.p-home-featurePanel__innerLead`
- modifier はハイフン始まりのマルチクラスでつけてください。
  - ex) `-active`, `-hidden`
- JavaScript から参照される要素については `js-`始まりのクラスをつけてください。
- `js-`のクラスにスタイリングをしないでください。あくまでも js の DOM ターゲットとしてクラスをつけています。
  - ex) `.m-modal.js-modal`
  - m-modal => スタイリング用クラス
  - js-modal => js の DOM 要素としてのクラス
- @extend は使用しないでください。繰り返しの記述を省略する必要があれば、mixin に入れて使い回してください。
- `scss/pages` 以外を調整する場合はご一報ください。
- カスタムプロパティを使ってください。特に縦のラインを揃えるために width や padding-left,padding-right の値はカスタムプロパティを使ってください。
- 追加で必要なコンポーネントやカスタムプロパティがなければ、ご一報ください。

#### font について

- base は Noto Sans JP [Bold]です。
- font-weight の記述を統一するため、mixin にまとめています。
- `ff`で候補が出てくるので選択してください。

#### transition について

- サイト全体で統一するために mixin にしています。
- `tra` で候補が出てくるようにする？それとも統一？ => 杉本さんに確認

#### コンポーネントについて

- storybook にまとめています。（これからまとめていきます）↓ のコマンドで立ち上がります。

```
$ yarn storybook
$ npm run storybook
```

#### コンテンツ幅のコントロールについて

- `l-contents` がベースのコンテンツ幅になっています。~~`-narrow`, `-wide` バージョンあります。(今後必要になったら追加します)~~

#### コード整形について

- stylelint で scss の並び順を変更しています。
- prettier と stylelint プラグインのインストール推奨

---

### JavaScript

#### scripts ディレクトリの構造

JS は共通処理を除き、各ページごとに必要な処理のみが発火します。主な仕組みは `main.ts` および `appLoader.ts` に保持されています。

共通および各ページ用の処理は `apps`ディレクトリ内に格納します。ページをまたいで使用される機能や、肥大化した機能はモジュールとして切り出し、`modules `ディレクトリに格納します。

各ページごとの処理の振り分けは pug file のページルートに載せている `page.appId = 'example';` で管理しています。
`page.appId` は `src/scripts/apps/` に格納されている TS のファイル名と同じすることで、該当ページで発火するようにしています。

- 例えば、example.html 固有の JS を使いたい場合

  - apps/Example.ts を作成
  - `views/example/index.ts` で `page.appId = 'Example';`を宣言

- apps ... 共通および各ページ用ファイルの格納ディレクトリ
  - Common.ts ... 共通処理用の処理ファイル
  - [appId].ts ... 各ページ用の処理ファイル
- modules ... モジュールファイルの格納ディレクトリ
  - [moduleName].ts ... ページをまたいで使用される機能や、肥大化した機能など各モジュールの処理ファイル
- appLoader.ts ... 各ページごとに処理を発火させる処理ファイル
- main.ts ... public に出力されるメインファイル

#### 要素の取得に関して

- 要素の取得をする際は、`js-`のクラスをターゲットにしてください。(scss のスタイリングは js-では行わないでください。)

---

### Images

#### img タグに付与する属性

<!-- TODO: loading="lazy"を試す -->
<!-- scrollした際にコンテンツが読み込まれないため -->

- `decoding="async"` を付与します。
  - 参考：[decoding="async" VS loading="lazy"](https://spelldata.co.jp/blog/blog-2019-12-19.html)
  - 参考：[decoding="async"の使い方と loading="lazy"との違いのまとめ](https://zenn.dev/sugamaan/articles/9adab715122679)
- `width属性` および `height属性` を付与します。Layout Shift 対策です。設定する数値はデザインファイルにおける PC デザインのサイズを参照します。
  - 参考：[Cumulative Layout Shift を最適化する](https://web.dev/i18n/ja/optimize-cls/)
  - 参考：[source 要素に width/height 属性を指定して各画像のアスペクト比の維持と CLS の改善を図る](https://www.mitsue.co.jp/knowledge/blog/frontend/202105/31_1512.html)
- `alt属性` を付与します。指定しないほうが適正である場合は `alt=""` の形式で、空要素を設定します。
  - 原則『○○ のイメージ写真』や『○○ の背景画像』のように、ページやセクションタイトル＋画像種別の形式を用います。
  - 図版の場合は『「○○」のイメージ図』のように、セクションタイトル＋「のイメージ図」の形式を用います。
  - 同位置に複数の画像がある場合は、末尾に「その 1」「その 2」と連番の文言を付加します。
  - それ自体が装飾的な意味しかもたないアイコン類は空要素を指定します。
  - これらは厳格な指定ではなく、たたきです。基本的には上記に則って設定を行いますが、状況次第でより適切な表現がある場合には、そちらを用いて構いません。

#### 書き出しについて

- 画像書き出しは基本 2 倍書き出しでお願いします

#### 画像の保存先について

- ディレクトリ TOP は `top` のディレクトリを作ってください
- ex) 特設一覧ページ => `/src/assets/images/special/top/` に画像を入れる

#### 画像の保存名について

- 画像には接頭辞をつけてください。
  - 画像 ... `img_`
  - アイコン ... `icon_`
  - ロゴ ... `logo_`
  - 動画 ... `mov_`
- 画像の保存名はアンダーバー `_` でつないでください。
  - OK) icon_prev
  - NG) icon-prev
- PC 画像と SP 画像を分ける際は末尾に `_pc` をつけてください(モバイルファーストのため)
  - OK) SP: img_featurePanel_01.jpg
  - OK) PC: img_featurePanel_01_pc.jpg
  - NG) SP: img_featurePanel_sp_01.jpg => \_sp はつかない
  - NG) PC: img_featurePanel_pc_01.jpg => \_pc が末尾についていない

#### 画像の使用

- images ディレクトリまでのパスは通してあります
- 画像 1 ソースの場合: `img`と打つとスニペットで変換される
  ```
    +image({
      sp:{
        src: "/special/top/img_panel_01.jpg",
        width: "320",
        height: "240"
      },
      alt: "パネルその1"
    })
  ```
- 画像 2 ソースの場合: `imgpc`と打つとスニペットで変換される
  ```
    +image({
      sp:{
        src: "/special/top/img_panel_01.jpg",
        width: "320",
        height: "240"
      },
      pc:{
        src: "/special/top/img_panel_01_pc.jpg",
        width: "600",
        height: "800"
      },
      alt: "パネルその1"
    })
  ```

## コミットルール

- `接頭辞: [作業ディレクトリ] 作業内容`の形式でコミットしてください。
- 作業内容が混在する場合、比率などを判断基準に、適宜ひとつの接頭辞を選んで記入します。

```console
# sample

# /special/ディレクトリにMVを追加した場合
add: [special] MV 追加

# /special/denpon/ ディレクトリのテキストを更新した場合
update: [special_denpon] テキスト更新
```

| 接頭辞 | 作業内容                                     |
| ------ | -------------------------------------------- |
| add    | 新規追加                                     |
| mod    | 修正                                         |
| fix    | バグ修正など                                 |
| update | 更新                                         |
| clean  | ファイルやディレクトリの整理・コメントの整理 |

### ブランチの命名規則

- 原則として、ローカルにのみ存在するブランチに対して命名規則はありません。
- リモートに push するブランチの場合、 `feature/name` の形式で命名します。（例： feature/suzuki）

---

## 初期構築・デプロイ

### インストール

```console
$yarn
# もしくは npm install
```

### 開発環境実行

```console
$yarn start
# もしくは npm run start
```

### heroku への反映

```console
$yarn build
# もしくは npm run build

$git add .
$git commit -m "message"
$git push
$git push heroku main
# 簡略化のため、ブランチ切り替え等のコマンドは省略
```

---

## その他注意事項

- 本番パスと開発用パスを gulp で分岐しています。flag は`<%= path %>`。scss で url を設定する場合は flag を忘れないようにつける必要があります。
- assets 情報は相対パスでの読み込みになっています。
- markuplint のエラーを解消してからプッシュを行ってください。
- **必ず `build` を実行** してから、プッシュを行ってください。start と build では sourcemap まわりなどで処理に差異があります。
- heroku 環境ではブランチごとに確認できません。ですので、テスト環境で確認する必要がある時には main branch にマージして push してください。
