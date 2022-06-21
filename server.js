import { serve } from "https://deno.land/std@0.138.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.138.0/http/file_server.ts";

let previousWord = randomWord();

console.log("Listening onn http://localhost:8000");
serve(async (req) => {
  const pathname = new URL(req.url).pathname;
  console.log(pathname);

  if (req.method === "GET" && pathname === "/shiritori") {
    return new Response(previousWord);
  }

  if (req.method === "POST" && pathname === "/shiritori") {
    const requestJson = await req.json();
    const nextWord = requestJson.nextWord;

    //入力チェック
    if (
      nextWord.length > 0 &&
      previousWord.charAt(previousWord.length - 1) !== nextWord.charAt(0)
    ) {
      return new Response("前の単語に続いていません。", {
        status: 400,
      });
    }

    //ひらがなチェック
    if (!hiraganaValidate(nextWord)) {
      return new Response("ひらがなのみで入力してください", {
        status: 400,
      });
    }

    //「ん」が終わったらゲームを終了する
    if (nextWord.charAt(nextWord.length - 1) == "ん") {
      previousWord = randomWord();
      return new Response(previousWord);
    }

    previousWord = nextWord;
    return new Response(previousWord);
  }

  return serveDir(req, {
    fsRoot: "public",
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
  });
});

function randomWord() {
  const wordBank = [
    "むずかし",
    "かさ",
    "さくら",
    "たべもの",
    "くうこう",
    "りえき",
    "にほんご",
    "いか",
    "さかな",
    "なす",
    "うんどう",
    "しごと",
    "べんきょう",
    "すき",
    "おす",
    "すし",
  ];
  let result = "";
  result = wordBank[Math.floor(Math.random() * wordBank.length)];
  console.log(result);
  return result;
}

function hiraganaValidate(str) {
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    console.log();
    //ユニコード表（10進表示）参考：
    // http://www.tamasoft.co.jp/ja/general-info/unicode-decimal.html
    if (char < 12353 || char > 12438) {
      return false;
    }
  }
  return true;
}
