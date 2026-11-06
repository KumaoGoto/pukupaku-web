// ホーム画面に置ける形（PWA）のための手元の置き場（Service Worker）。初めて開いたときに遊ぶのに要るファイルを手元に置き、次からは通信がなくても遊べる。
// VERSION と PRECACHE（ファイルの名前 → 中身の印）は tools/web/make_sw.py が build/web/sw.js に書く（ここはひな形）。中身が変わると VERSION が変わり、
// 新しい置き場を作って古い置き場を捨てる。中身の変わっていないファイルは古い置き場から移す（更新のたびに全部を取り直さない）。
// 公開の形（tools/web/stage.py）では、プログラムは版ごとの箱 v/<VERSION>/ に入り、PRECACHE もその場所に書き換わる。

const VERSION = '117961900a9b';
const PRECACHE = {
  'assets/AssetManifest.bin': 'fd44d9b28f78a972',
  'assets/AssetManifest.bin.json': '8f58d220e1f1632f',
  'assets/FontManifest.json': '2dd9ea2e9cda622c',
  'assets/assets/audio/bgm.m4a': '0fdd2bdbc9fb228d',
  'assets/assets/audio/blast.wav': '995f399df746cb82',
  'assets/assets/audio/blast_big.wav': '03e0cf994502107d',
  'assets/assets/audio/button.wav': '71662224447c3695',
  'assets/assets/audio/combo_0.wav': 'f8fcd53e5d23a763',
  'assets/assets/audio/combo_1.wav': 'e9bc3c0090f398ff',
  'assets/assets/audio/combo_2.wav': '9872d630b7e54257',
  'assets/assets/audio/gameover.wav': '60d2e1582441e3a7',
  'assets/assets/audio/go.wav': '7ec2b742723e7676',
  'assets/assets/audio/land.wav': '5b1a481c32bd3e39',
  'assets/assets/audio/merge_00.wav': '754090b1123d64df',
  'assets/assets/audio/merge_01.wav': '460515daaa079216',
  'assets/assets/audio/merge_02.wav': '953048237a5739c3',
  'assets/assets/audio/merge_03.wav': '3d3de106ef7b6b55',
  'assets/assets/audio/merge_04.wav': '59cd995e8143b48c',
  'assets/assets/audio/merge_05.wav': '7621049acd0f179e',
  'assets/assets/audio/merge_06.wav': '887d6149991e94f1',
  'assets/assets/audio/merge_07.wav': 'bca843f7ad0ad1b0',
  'assets/assets/audio/merge_08.wav': 'd4b5d65ec4ba116f',
  'assets/assets/audio/merge_09.wav': '1873948b1469edfb',
  'assets/assets/audio/puff_0.wav': '829ae8407d30cbb4',
  'assets/assets/audio/puff_1.wav': 'cd963091c8bf6ef8',
  'assets/assets/audio/puff_2.wav': '473f04257745284e',
  'assets/assets/audio/ready.wav': '5f16edb0fcf7a8be',
  'assets/assets/audio/record.wav': 'd286f02a22c02ed2',
  'assets/assets/audio/swallow.wav': '78ad51eb77c65860',
  'assets/assets/audio/whale.wav': 'f4d8806cf0c16c0f',
  'assets/assets/fonts/MPLUSRounded1c-Black.ttf': 'd12747d1040d9280',
  'assets/assets/fonts/MPLUSRounded1c-Bold.ttf': '5ab16b977f42bedf',
  'assets/assets/fonts/MPLUSRounded1c-Regular.ttf': '8140fdb7fa5e6c0b',
  'assets/assets/images/bg_tank.png': '96b90c6e981cf5ea',
  'assets/assets/images/fish/fugu.png': 'd862c7d4a5e94f61',
  'assets/assets/images/fish/fugu_puffed.png': '1b7dbeca864ff9d3',
  'assets/assets/images/fish/harisen.png': '55957e9ede9dcd6a',
  'assets/assets/images/fish/harisen_puffed.png': '7c25e2a3f09809b0',
  'assets/assets/images/fish/iruka.png': '5b3fc98b42608d39',
  'assets/assets/images/fish/iruka_puffed.png': '172001ec2cb28571',
  'assets/assets/images/fish/jinbee.png': '0f5a0aedfcb28f5e',
  'assets/assets/images/fish/jinbee_puffed.png': '6c93590c2e1bc7e6',
  'assets/assets/images/fish/kame.png': '054a5dfc06508486',
  'assets/assets/images/fish/kame_puffed.png': '3bf44ac1aca81803',
  'assets/assets/images/fish/kujira.png': '63d58f60de04a196',
  'assets/assets/images/fish/kujira_puffed.png': '0f3b4bde48011d3c',
  'assets/assets/images/fish/kujira_spout.png': '649daadfb860b64b',
  'assets/assets/images/fish/manbou.png': '64a911cd6733bb72',
  'assets/assets/images/fish/manbou_puffed.png': '07f80685c03c6f9c',
  'assets/assets/images/fish/shachi.png': '44c5b662b7849218',
  'assets/assets/images/fish/shachi_puffed.png': '67b519b0a09d2298',
  'assets/assets/images/fish/tai.png': '0696aee884f59b02',
  'assets/assets/images/fish/tai_puffed.png': '36274bcc1f9c485e',
  'assets/assets/images/fish/tako.png': '786ede784b48dbbb',
  'assets/assets/images/fish/tako_puffed.png': '887a99272612eef5',
  'assets/assets/images/fish/urchin.png': '69adc05ae79b3981',
  'assets/assets/images/food/flake_0.png': '082a1af3cd56019d',
  'assets/assets/images/food/flake_1.png': '2a1521d5ff03db45',
  'assets/assets/images/food/flake_2.png': '33e46336315163c9',
  'assets/assets/images/food/flake_3.png': 'dbb53e903f53580c',
  'assets/assets/images/food/flake_4.png': '90ec551cc6ea0e2f',
  'assets/assets/images/food/flake_5.png': '54618075e09e1d50',
  'assets/assets/images/frame.png': '5447a43cc9243aca',
  'assets/assets/images/gameover.png': 'a01cd91e0e147f9b',
  'assets/assets/images/logo_en.png': '2b98c7b34d43404b',
  'assets/assets/images/logo_jp.png': '39a9f923652a5675',
  'assets/assets/images/pipe_left.png': '6c44622d2be64303',
  'assets/assets/images/text/combo.png': '252a14866d43a7be',
  'assets/assets/images/text/digit_0.png': '929a1b46af7cdb20',
  'assets/assets/images/text/digit_1.png': '6fcd20769c013746',
  'assets/assets/images/text/digit_2.png': '3d795756fa1c9651',
  'assets/assets/images/text/digit_3.png': '322781c805812c75',
  'assets/assets/images/text/digit_4.png': '6dc5fed4be64443f',
  'assets/assets/images/text/digit_5.png': 'b96020ef624e4d77',
  'assets/assets/images/text/digit_6.png': '2c5b0a096c0798c1',
  'assets/assets/images/text/digit_7.png': '4cd42fc07b282dd2',
  'assets/assets/images/text/digit_8.png': 'b7f1c129dd672aa0',
  'assets/assets/images/text/digit_9.png': '076f764362143bbe',
  'assets/assets/images/text/dokan_en.png': '56553a64efdc5a35',
  'assets/assets/images/text/dokan_ja.png': 'aa306920da25404c',
  'assets/assets/images/text/double_dokan_en.png': 'df2fb049e927058c',
  'assets/assets/images/text/double_dokan_ja.png': '18f5e50c0c01d09a',
  'assets/assets/images/text/go.png': 'a27833d9bc03c54d',
  'assets/assets/images/text/paku_en.png': '023521cefb5f4649',
  'assets/assets/images/text/paku_ja.png': 'a62ef7630eafb58b',
  'assets/assets/images/text/panpan_en.png': 'da7e1f4eed0db695',
  'assets/assets/images/text/panpan_ja.png': '10db97e7611f837c',
  'assets/assets/images/text/puku_en.png': 'b0996dd7979bbc86',
  'assets/assets/images/text/puku_ja.png': 'a7c70888daf31a09',
  'assets/assets/images/text/ready.png': 'de55b851a219f6c9',
  'assets/assets/images/text/uni_en.png': '61b961ac9bf24281',
  'assets/assets/images/text/uni_ja.png': 'fdcb03a22d57628f',
  'assets/assets/images/text/whale_feast_en.png': 'ce19fc8a2a35a227',
  'assets/assets/images/text/whale_feast_ja.png': 'e736fc4217e6d2d7',
  'assets/assets/images/text/whale_merge_en.png': 'ae483c627c50358d',
  'assets/assets/images/text/whale_merge_ja.png': '57860d417d2410fc',
  'assets/fonts/MaterialIcons-Regular.otf': '5a577e1ab8c3f73d',
  'assets/packages/cupertino_icons/assets/CupertinoIcons.ttf': '3d90c370aa4cf00d',
  'v/117961900a9b/assets/packages/forge2d/lib/src/backend/wasm/box2d.wasm': '33cfc1f30ef9aa3e',
  'assets/shaders/ink_sparkle.frag': '2dca5ab93d4ec29e',
  'assets/shaders/stretch_effect.frag': 'ab412f07a5b9b50b',
  'v/117961900a9b/canvaskit/canvaskit.js': '7361b744487f9826',
  'v/117961900a9b/canvaskit/canvaskit.wasm': '6bdfaa51c76845c0',
  'v/117961900a9b/flutter_bootstrap.js': '0bd0bacd841a01b5',
  'icons/apple-touch-icon.png': '60710a0b27426736',
  'icons/favicon-32.png': 'c30c51ba578d2fb7',
  'icons/icon-192.png': '8ac21a49f7e7440e',
  'icons/icon-512.png': 'd51d9dd23e2aec0b',
  'icons/icon-maskable-512.png': '8f25add9d77ff8d9',
  'index.html': '117961900a9b',
  'v/117961900a9b/main.dart.js': '0a6860c02ab7479c',
  'manifest.webmanifest': '27a49eb362c2df58',
};
// @@PRECACHE_END

const CACHE = `pukupaku-${VERSION}`;

self.addEventListener('install', (e) => {
  e.waitUntil(fill().then(() => self.skipWaiting()));
});

async function fill() {
  const cache = await caches.open(CACHE);
  const missing = await moveUnchanged(cache);
  // 残りは、ブラウザの HTTP の置き場（GitHub Pages は 10 分置かせる）を通さず、いまサイトにある物を取りに行って置く
  // （通すと、新しい版の名前の置き場に古いファイルを入れてしまい、次の版まで新旧が混ざって動く）。
  // 版の箱 v/<VERSION>/ の中だけは名前が版ごとに違って混ざらないので HTTP の置き場を使う（初めての人が CanvasKit とプログラムを 2 回落とさない）
  await cache.addAll(missing.map((u) => new Request(u, { cache: u.startsWith('v/') ? 'default' : 'reload' })));
}

/** 版の箱を除いた名前（版が変わっても同じファイルを見つける） */
const withoutBox = (name) => name.replace(/^v\/[0-9a-f]+\//, '');

/** 中身の印（tools/web/make_sw.py と同じ。SHA-256 の頭 16 けた） */
async function mark(bytes) {
  const hash = new Uint8Array(await crypto.subtle.digest('SHA-256', bytes));
  return [...hash].map((b) => b.toString(16).padStart(2, '0')).join('').slice(0, 16);
}

/** 古い置き場から、中身の印が同じファイルを移す。移せなかったファイルの名前を返す */
async function moveUnchanged(cache) {
  const scope = new URL(self.registration.scope).pathname;
  const old = new Map();
  for (const name of await caches.keys()) {
    if (name === CACHE || !name.startsWith('pukupaku-')) continue;
    const c = await caches.open(name);
    for (const req of await c.keys()) {
      old.set(withoutBox(new URL(req.url).pathname.slice(scope.length)), [c, req]);
    }
  }
  const missing = [];
  for (const [name, expected] of Object.entries(PRECACHE)) {
    const found = old.get(withoutBox(name));
    const res = found && (await found[0].match(found[1]));
    const bytes = res && (await res.arrayBuffer());
    if (bytes && (await mark(bytes)) === expected) {
      await cache.put(name, new Response(bytes, { headers: { 'content-type': res.headers.get('content-type') ?? 'application/octet-stream' } }));
    } else {
      missing.push(name);
    }
  }
  return missing;
}

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('pukupaku-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

/** ゲームのページ（置き場の頭か index.html）を開く要求か。ほかのページはそのページのまま返す */
function isGamePage(req, url) {
  if (req.mode !== 'navigate') return false;
  const scope = new URL(self.registration.scope).pathname;
  return url.pathname === scope || url.pathname === `${scope}index.html`;
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);
  // ランキング（別の場所の API）・足りない字（Google のフォント配信）と POST は手元に置かない
  if (req.method !== 'GET' || url.origin !== location.origin) return;
  const game = isGamePage(req, url);
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    // ゲームのページは手元の index.html を先に（通信がなくても開ける。?fps などの後ろは見ない）
    const hit = await cache.match(game ? 'index.html' : req, { ignoreSearch: game });
    if (hit) return hit;
    const res = await fetch(req);
    // 初めて読んだものも置いておく（次は通信なしで使える）。置き終わるまで Service Worker を止めさせない
    if (res.ok && res.type === 'basic') e.waitUntil(cache.put(req, res.clone()));
    return res;
  })());
});
