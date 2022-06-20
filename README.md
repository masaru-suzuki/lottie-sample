# 静的サイト作成用のテンプレートです。

- **こちらのリポジトリをコピーして個人・企業問わず開発に使ってかまいません。あくまでも参考用のコードのため、利用による責任は追いかねます。**
- 不具合などがあれば [Twitter](https://twitter.com/masapo62106181)かプルリクエストを作成してください。

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
    - [PC](#pc)
    - [スマホ/タブレット](#スマホタブレット)
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

- [PC](#pc)
- [スマホ/タブレット](#スマホタブレット)

※シェア率 95%以上を対象

### PC

- **Mac（ver.High Sierra 以降）：** chrome（最新 ver）, firefox（最新 ver）, safari（最新 ver）
- **Windows（ver.10）：** chrome（最新 ver）, firefox（最新 ver）, Edge（最新 ver）

### スマホ/タブレット

- **iOS（ver.14〜15）：** chrome（最新 ver）, safari（最新 ver）
- **Android（ver.8.0 以降）：** chrome（最新 ver）

## ファイル構成

- .vscode ... スニペット設定ファイル
- public ... 公開ファイル
- src ... ソースファイル
  - data ... JSON ファイル
    - site.json ... サイトの基本情報
    - data.json ... 記事情報など pug でループさせる情報
  - images ... 画像ファイル
  - views ... HTML ファイル（pug ファイル）
  - scripts ... JS ファイル（typescript ファイル）
  - styles ... CSS ファイル（sass ファイル）

## 開発にあたっての留意点

### SSI 構造

本件は SSI により各部の共通化が行われています。

heroku 環境で SSI が使用できるようにしています。

- includes ... SSI 関連ファイルの格納ディレクトリ

### assets 系ファイル

- **assets** ... 新デザインで仕様する assets 系ファイルの格納ディレクトリ
- css ... 旧デザインで仕様されていた CSS ファイルの格納ディレクトリ
- js ... 旧デザインで仕様されていた JS ファイルの格納ディレクトリ
- img ... 旧デザインで仕様されていた画像ファイルの格納ディレクトリ

[SSI 構造](#ssi-構造)の項と同様、コンテンツの混在を理由として、assets 系ファイルも旧デザインのものは原則として改変することなく保持し、新デザインのものは別途作成するあたらしいディレクトリに格納します。

### scripts ディレクトリの構造

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

### CSS 設計について

- CSS のファイル構成は **FlOCSS** がベースです。全体の構成および役割を把握するためには `main.scss` を参照してください。(#css)
- 命名は [**MindBEMding**](https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) です。[こちらの記事](https://github.com/manabuyasuda/styleguide/blob/master/how-to-bem.md)を参考にしています。
- &\_\_element の書き方をしないでください（検索性を高めるため）。
- 命名については [bootstrap](https://getbootstrap.jp/docs/5.0/components/accordion/)や[こちらの記事](https://qiita.com/manabuyasuda/items/dbb76ed36970bec95470)を参考にしています。
- modifier はハイフン始まりのマルチクラスでつけてください。
- 状態を表す要素については `-HogeHoge`
- JavaScript から参照される要素については `js-hogeHoge`
- @extend は使用しない
- サンプルは `/src/scss/sample.scss` を参照してください。

### img タグに付与する属性

- `decoding="async"` を付与します。
  - 参考：[decoding="async" VS loading="lazy"](https://spelldata.co.jp/blog/blog-2019-12-19.html)
  - 参考：[decoding="async"の使い方と loading="lazy"との違いのまとめ](https://zenn.dev/sugamaan/articles/9adab715122679)
- `width属性` および `height属性` を付与します。Layout Shift 対策です。設定する数値はデザインファイルにおける PC デザインのサイズを参照します。
  - 参考：[画像による Layout Shift が無くなる Web がやって来る](https://www.mizdra.net/entry/2020/05/31/192613)
  - 参考：[Cumulative Layout Shift を最適化する](https://web.dev/i18n/ja/optimize-cls/)
- picture タグ及び source タグを用い、画面幅によって異なる縦横比の画像を表示させる場合、**source タグにも** `width属性` および `height属性` を設定します。
  - 参考：[source 要素に width/height 属性を指定して各画像のアスペクト比の維持と CLS の改善を図る](https://www.mitsue.co.jp/knowledge/blog/frontend/202105/31_1512.html)
  - 参考：[Feature: Support specifying width/height on &lt;source&gt; elements for &lt;picture&gt;](https://chromestatus.com/feature/5737185317748736)
- `alt属性` を付与します。指定しないほうが適正である場合は `alt=""` の形式で、空要素を設定します。
  - 原則『○○ のイメージ写真』や『○○ の背景画像』のように、ページやセクションタイトル＋画像種別の形式を用います。
  - 図版の場合は『「○○」のイメージ図』のように、セクションタイトル＋「のイメージ図」の形式を用います。
  - 同位置に複数の画像がある場合は、末尾に「その 1」「その 2」と連番の文言を付加します。
  - それ自体が装飾的な意味しかもたないアイコン類は空要素を指定します。
  - これらは厳格な指定ではなく、たたきです。基本的には上記に則って設定を行いますが、状況次第でより適切な表現がある場合には、そちらを用いて構いません。

### a タグに付与する属性

- `target="\_blank"`をもつ a タグには `rel="noopener"` の付与します。
  - 現在、Chrome、FireFox および Safari では rel 属性が指定されていない場合、デフォルトで `rel="noopener"` が指定されます。ですが Edge で同様の処理がなされているか、資料が見当たりません。
  - 参考： [「target=”\_blank”」には「rel=”noopener”」を！html で外部リンクを貼る際の注意点。](https://www.1st-net.jp/blog/target-blank-noopener/#rel8221noopener8221)
  - 参考：[target="\_blank"につけるべき rel 属性【noopener / noreferrer】](https://rapicro.com/target_blank_rel_noopener-noreferrer/)
- a タグで囲まれた要素がリンク先を適切に説明していない場合、`title属性` を付与し、リンク先が何であるのかの説明を加えます。
  - 参考： `<a href="http://privacymark.jp/" target="_blank" rel="noopener" title="プライバシーマーク制度｜一般財団法人日本情報経済社会推進協会（JIPDEC）"><img src="/assets/images/badge_pmark.svg" width="54" height="45" decoding="async" alt="プライバシーマークのロゴ画像"/></a>`

## コミットルール

接頭辞+': 'を冒頭に置き、作業内容を説明するコメントを続けます。
作業内容が混在する場合、比率などを判断基準に、適宜ひとつの接頭辞を選んで記入します。

```console
# sample
add: heroku 基本ファイル
```

| 接頭辞  | 作業内容                     |
| ------- | ---------------------------- |
| add :   | 新規追加                     |
| fix :   | 修正                         |
| docs :  | テキスト修正                 |
| clean : | ファイルやディレクトリの整理 |

### ブランチの命名規則

- 原則として、ローカルにのみ存在するブランチに対して命名規則はありません。
- リモートに push するブランチの場合、 `feature/BACKLOG_TASK_NAME` の形式で命名します。（例： feature/RI_CORP-28）
  - Backlog 課題に基づかない作業の場合、 `feature/***` の形式を保ち、\*\*\*部分は任意に命名します。Backlog 課題と差別化するため、小文字のみの使用とします。（例：feature/mod_home）

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
$git commit -m "iikanji no comment"
$git push
$git push heroku main
# 簡略化のため、ブランチ切り替え等のコマンドは省略
```

### 注意事項

- **必ず `build` を実行** してから、コミットやプッシュを行ってください。dev と build では sourcemap まわりなどで処理に差異があります。
- ~~デプロイは github と連携しています。`git push heroku` は **絶対に叩かないで** ください。~~
  - ~~[Heroku の OAuth トークン流出の件](https://zenn.dev/hiroga/articles/heroku-incident-2413-checklist) により、github との連携ができなくなりました。
  - ~~当面の間、デプロイは heroku git と連携します。push は [heroku への反映](#heroku-への反映) で示しているとおり、github（origin）と heroku（heroku）それぞれに対して行ってください。これは今後 github との連携が復活した際、大量の commit が一気に push される事態を避けるためです。~~
