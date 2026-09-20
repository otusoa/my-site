# AGENTS.md

## Project

`refactor/v2` を基準に個人サイト v2 を開発する。

日本語をメインとし、研究活動とWeb開発・エンジニアリングの両方を扱う。

デザインは以下を目指す。

- 研究者らしい読みやすさ
- エンジニアらしい現代的なUI
- 派手すぎない
- 素朴すぎない
- Editorial / Technical / Quiet Modern
- タイポグラフィ、余白、罫線、グリッドを重視する

SaaS風の大量の角丸カード、過剰なグラデーション、Glassmorphism、3D、ネオン、派手なアニメーションは避ける。

---

## Stack

以下を基本構成とする。

- Nuxt 4
- Nuxt Content
- Reka UI
- UnoCSS
- `@nuxt/fonts`
- 自作CSS

以下は使用しない。

- `@nuxt/ui`
- `pita-css`

---

## Responsibilities

責務を分ける。

- Nuxt Content: コンテンツ管理
- Reka UI: 挙動とアクセシビリティ
- UnoCSS: 汎用Utility
- 自作CSS: サイト固有デザイン

Reka UIをデザイン目的で使用しない。

単純なUIを無理にReka UI化しない。

---

## Language

UIは原則として日本語にする。

英語の一般的なポートフォリオ用語を不用意に使わない。

例:

- About → 私について
- Research → 研究
- Project → 制作物 / 開発
- History → これまでの歩み

技術名、ライブラリ名、固有名詞は英語のままでよい。

---

## Pages

以下を基本ページとする。

```text
/
├─ /about
├─ /research
├─ /engineering
└─ /contact
```

ページ名やURLは必要に応じて変更してよい。

TOPは各ページの入口・ダイジェストとして設計する。

---

## Navigation

常設ナビゲーションを作らない。

画面サイズを問わずハンバーガーメニューを使用する。

メニューの開閉にはReka UIを優先する。

メニューには基本的に以下を含める。

- TOP
- 私について
- 研究
- エンジニア
- コンタクト

---

## Footer

Footerを共通コンポーネントにする。

以下の一部を表示する。

- GitHub
- Qiita
- メール
- Copyright

ContactページとFooterで使う情報は可能な限り一元管理する。

---

## Typography

メインフォント候補として BIZ UDP明朝を使用する。

必要に応じて以下を併用する。

- 本文・見出し: BIZ UDP明朝
- コード: Monospace
- 補助UI・技術情報: Sans Serif

明朝体を単なる装飾ではなく、サイトの主要な視覚要素として扱う。

---

## Color

ブランドカラー:

```css
--color-primary: #87cc5c;
```

リンク:

```css
--link-primary: #1570d4;
--link-active: #7d7d7d96;
--link-visited: #a15ccc;
```

ブランドカラーとリンク色の役割を分ける。

`#87cc5c` は大面積に乱用せず、アクセントとして使用する。

NeutralカラーはUnoCSSのパレットから選ぶ。

本文リンクでは必要に応じて `:visited` を使う。

ナビゲーションやUI操作にはvisited色を一律適用しない。

---

## UnoCSS

UnoCSSをレイアウト専用に制限しない。

主に以下を利用する。

- flex
- grid
- gap
- padding
- margin
- sizing
- position
- alignment
- responsive

必要なら以下も利用してよい。

- color
- background
- border
- typography
- hover
- transition
- opacity

UnoCSSで簡潔に表現できる汎用スタイルはUnoCSSを優先する。

サイト固有の意味を持つデザインは自作CSSに置く。

---

## Reka UI

複雑な挙動にはReka UIを優先する。

候補:

- Dialog
- Dropdown Menu
- Popover
- Tooltip
- Stepper
- Tabs
- Accordion

「これまでの歩み」はStepperを候補とする。

ただし単純な年表で十分ならHTML + CSSで実装する。

---

## Content

Nuxt Contentで研究と制作物を管理する。

基本構成:

```text
content/
├─ research/
└─ engineering/
```

将来的に個別ページを作れる構造にする。

```text
/research/[slug]
/engineering/[slug]
```

---

## TOP

TOPは情報を詰め込みすぎない。

基本構成:

- Hero
- 私についての短い紹介
- 研究のダイジェスト
- エンジニア活動のダイジェスト
- コンタクト導線
- Footer

Heroは自作する。

タイポグラフィ、余白、罫線、`#87cc5c` のアクセントを中心にする。

典型的なSaaS風Heroにしない。

---

## About

候補:

- 自己紹介
- 興味・関心
- 研究分野
- エンジニアリング分野
- 使用技術
- これまでの歩み

---

## Research

研究ページは読みやすさを最優先する。

候補:

- 現在の研究テーマ
- 論文
- 研究ノート
- その他の文章
- 個別詳細ページ

BIZ UDP明朝を積極的に活かす。

---

## Engineering

候補:

- 主な制作物
- その他の制作物
- 過去の制作物
- 使用技術
- GitHub
- UIスクリーンショット
- 個別詳細ページ

現在の代表作と過去作品を同じ強さで表示しない。

重要度を付ける。

---

## Contact

候補:

- メール
- GitHub
- Qiita
- その他必要な外部リンク

Footerと共有できる情報は共通化する。

---

## HTML

セマンティックHTMLを優先する。

積極的に使用する。

- `header`
- `nav`
- `main`
- `article`
- `section`
- `footer`
- `ol`
- `time`

見た目のためだけの不要な `div` を増やさない。

---

## Components

過剰にコンポーネント化しない。

一度しか使わない単純な要素はページ内に置いてよい。

以下は共通化を優先する。

- Header
- Navigation
- Footer
- Container
- Contact情報
- 繰り返し利用する研究一覧
- 繰り返し利用する制作物一覧

---

## Accessibility

以下を必ず考慮する。

- キーボード操作
- Focus表示
- Menu accessibility
- Link visibility
- Color contrast
- Heading hierarchy

複雑なインタラクションを独自実装する前にReka UIで対応できないか確認する。

---

## Responsive

レスポンシブの具体仕様を先に決めすぎない。

以下は実装時に個別判断する。

- Hero
- Grid
- Navigation
- Timeline
- Research list
- Engineering list
- Typography

必要以上に勝手なレスポンシブ仕様を追加しない。

---

## Development Order

以下の順序を基本とする。

1. Nuxt UIとpita-cssを削除する
2. UnoCSSを導入する
3. Reka UIを導入する
4. BIZ UDP明朝を設定する
5. グローバルCSSとDesign Tokenを整える
6. Header / Menu / Footerを作る
7. 各ページの骨組みを作る
8. Nuxt Contentの構造を作る
9. TOPとHeroを作る
10. 私についてを作る
11. 研究ページを作る
12. エンジニアページを作る
13. コンタクトを作る
14. 最後にレスポンシブと細部を調整する

Heroから先に作り込まない。

---

## Design Decisions

迷った場合は、装飾を増やすより情報整理を優先する。

ただし、極端に素朴な研究者サイトにはしない。

研究者らしい文章の読みやすさと、エンジニアらしい現代的な構成を両立する。

「研究者だけどエンジニア」という性格が自然に伝わることを優先する。
