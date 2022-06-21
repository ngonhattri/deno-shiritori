# Webアプリを作成します。フロントエンドは HTML / CSS / JavaScript、バックエンドは JavaScript を使って作成します。

##[Deno Deploy の URL](https://ngonhattri-deno-shiritori.deno.dev/)

###Step 1. Deno のインストール

[DenoのHP](https://deno.land/)

インストールが完了したら、以下のコマンドを実行してみましょう。

```powershell
deno run https://deno.land/std/examples/welcome.ts
```

以下の文字が表示されれば OK です。

```powershell
Welcome to Deno!
```

Deno をインストール済みの方は、以下のコマンドを実行して最新版に更新しておきましょう。

```powershell
deno upgrade
```
###Step 2. このリポジトリをクローンする

```powershell
$ git clone https://github.com/ngonhattri/deno-shiritori.git
```
###Step 3.実行

```powershell
deno run --allow-net --watch server.js
```

--watch のオプションを付けると、server.js ファイルの保存時に自動でプログラムを再読み込みしてくれるので、いちいちコマンドを再入力する必要がなくなり便利です。
