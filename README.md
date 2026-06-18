# 茄子を占う

## ローカルで動かす

```bash
npm install
npm run dev
```

ブラウザで http://localhost:3000 を開く。

## Vercelにデプロイ

### 方法①：GitHub経由（推奨）

1. GitHubで新しいリポジトリを作成（名前は何でもOK）
2. このフォルダの中身をpush
   ```bash
   git init
   git add .
   git commit -m "init"
   git remote add origin https://github.com/あなたのユーザー名/リポジトリ名.git
   git push -u origin main
   ```
3. https://vercel.com にアクセス → GitHubアカウントでサインイン
4. 「New Project」→ リポジトリを選択 → 「Deploy」ボタンを押す
5. 1〜2分で `https://nasu-gacha-xxx.vercel.app` 形式のURLが発行される

### 方法②：Vercel CLIで直接デプロイ

```bash
npm i -g vercel
vercel
```

## URLの変更

Vercelのプロジェクト設定から「Domains」でカスタムドメインを追加できます。
デフォルトのURLでも共有は問題なく使えます。
