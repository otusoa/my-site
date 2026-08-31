::base-container
## エンジニアリング

  :::profile-stepper{:default-value='0'}
    ::::profile-step{title="はじめてのいっぽ" year="中学2年生 HTML / CSS Webサイトを作る楽しさ"}
    中学2年生の頃、Minecraft配布マップの公式Webサイトを色々調べながら作り、達成感を覚え、Web系、特にCSS(とHTML)へ強い興味を抱き、HTML,CSSの基礎固めする。

    その頃、ブログというものに興味が湧きWordPressなるものを知る...
    ::::

    ::::profile-step{title="ステップアップ" year="中学3年生 PHP / WordPress CMS・動的サイト"}
    ![スクリーンショット-2026-08-31-121311](https://r2.eita.ptmi.jp/content/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88-2026-08-31-121311.png){.border-1.border-gray-800.border-solid height="" width=""}

    HTMLとCSSだけでは、できることに限界があったので次になぜかバックエンド系のPHPを学び始める。

    HTML、CSSのみで作った手書きサイトの保守に苦労していたところ、「 [HTMLサイトをWordPressにする本](https://www.socym.co.jp/book/1421) 」という本に出会い、共通パーツ、お知らせ管理などのCMS的機能を知り衝撃を受け、PHPを学んだこともあり、HTML, CSSで作ったサイトをWordPressに換装した。

    ある程度WordPressに慣れたら、ブログというものに関心が湧き、自分のナレッジ（知識）を発信してみたくなり、せっくなら既存テーマではなく、オリジナルテーマをPHPで作って他と差別化してみようと思いたち、いざブログを開設！。

    ### ブログ

    主にエンジニア関係の雑記記事を発信していました。去年から平均月間1000pvぐらいあり、Google Adsenseに登録してみたりしました(保護者名義)。ちなみに審査は一発で通って驚きました。

    現在はアーカイブされています。
    ::::

    ::::profile-step{title="フロントエンドへ" year="高校1年生 Vue.js / Nuxt コンポーネント指向"}
    WordPressからもっとステップアップしたいと考え、Laravelなどいじってみたがあまり肌に合わず。

    UIを作ることが好きだったので、色々なUIフレームワークがあって、面白そうなWebフロントエンド系に方向をチェンジしてみる。

    ### Vueとの出会い ―― なぜ、Reactではなく「Vue.js」？

    理由は主に2つあり、まず、コーダーライクな設計だったこと。どういうことかというと、HTML / CSSだけを書く人にとってVue構文(`template`)はかなり親しみやすく、入門しやすいです。

    逆にReactで使われる`JSX(TSX)` 構文は私にとってあまり馴染めなかったというのが1つ目の理由です。

    2つ目はVueのSingle File Component（SFC）という考え方が自分に合っていたことです。

    HTML・CSS・TypeScriptを1つのコンポーネント単位で扱えるため、それまでWebサイトを作ってきた感覚を残しつつ、保守や作りやすい思想だと思います。
    ::::

    ::::profile-step
    ---
    step: 現在
    title: 技術だけはなく、、
    year: 高校2年生 認証・認可 / UI設計 / デザインシステム
    ---
    高校2年生になると、単にWebサイトやフロントエンドを作るだけでなく、チーム開発をする機会もあり、「複数人でどう開発をするか・共通認識を持つか」といった部分に関心が広がっていきました。

    特に、UI設計やデザインシステム、認証・認可の仕組みに触れる機会が増え、見た目だけでなく、Webアプリ全体の構造を考えることが多くなりました。

    ### UI設計・デザインシステム

    実際のチームでのプロジェクト(趣味)では、フロントエンドの実装だけでなく、デザイントークンや共通コンポーネントなど、UIを一貫して設計するための仕組みづくりにも関わるようになりました。

    ### 認証・認可

    また、認証基盤の開発を通して、ログイン機能を作るだけではなく、OAuth / OIDCや権限管理など、サービスの根幹に関わる仕組みにも興味を持つようになりました。

    この頃から、「動くものを作る」だけでなく、「どう作れば保守しやすくなるか」を考えることが増えた気がします。
    ::::
  :::
::

::base-container
## 主に使う技術

- Vue.js / Nuxt
- CSS・HTML
- TypeScript
- React / Next.js (ホントニチョットデキルヨ)
- Better Auth (認証・認可フレームワーク)
- Prisma ORM
- PHP
  - WordPress

### 勉強中

- Golang
- UI設計
::

::base-container
## 制作物(Project)

これまでに制作・開発した主なプロジェクトを紹介します。

### PitaCSS ――ドキュメンテーションに特化 (2025)

```bash
pnpm add pita-css
```

ドキュメント型サイトに最適化されたClassレスベースのCSSフレームワーク。ドキュメントサイトに便利な依存関係のないJavaScript機能が付属しています。

現在は別のものの開発に夢中で、あまりメンテしていません...なので近々アーカイブしようと思います。

<https://github.com/otusoa/PitaCSS>

### PitaMaiアカウント (2026) ――構成員管理システム 兼 IdP

私が代表をしている「[ピタマイ・テクノロジー](https://ptmi.jp)」というサークル（任意団体）の、
構成員やアカウントを管理するためのシステム兼IdPです。

Nuxt 4とBetter Authを使用しており、OAuth 2.1 / OpenID Connectに対応した認証・認可基盤として開発しています。

マルチテナントシステムでの構成員管理だけでなく、RBACによる権限管理や監査ログなど、
組織でアカウント基盤を運用するために必要な機能も持っています。

技術的には、Nuxt 4 / TypeScriptを中心に、
Better Auth、Prisma、PostgreSQLなどを使用しています。

UI部分的には、Nuxt UI v4を使用し、モダンな見た目です。しかし、ただモダンなだけではなくある程度使いやすさなどを自分なりに考えて開発しました。

このプロジェクトでは、単にログイン画面を作るだけではなく、認証・認可や権限設計、組織管理といった、
Webサービスの基盤部分について考える機会がかなり増えました。

<https://github.com/PitaMai-Technology/pitamai-account>

### LismUI-Vue (2026) ―― Vue.js向けUIフレームワーク

```bash
pnpm add lism-ui-vue
pnpm add @lism-ui-vue/nuxt
```

[LismCSS](https://lism-css.com/)をベースとした、Vue.js向けのラッパー兼UIフレームワークです。

現在、alpha版では本家既存コンポーネントをカバーしているラッパーですが、LismCSSの雰囲気を崩さない範囲で、独自にUIを組み込んでみるのを検討しています。

`@lism-ui-vue/nuxt` Nuxtモジュールも公開されており、Nuxtとの統合もバッチリです。

両者とも、まだalpha版です。

<https://github.com/otusoa/lism-ui-vue>
::
