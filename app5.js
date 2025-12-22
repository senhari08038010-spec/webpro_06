"use strict";


const { name } = require("ejs");
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// ################################# 黄金の繭 因子個体管理 ##############################

let ougonei = [
  { id:1, code:"KaLos618", name:"アグライア", spark:"浪漫", divine:"黄金の繭――モネータ"},
  { id:2, code:"PoleMos600", name:"メデイモス/モーディス", spark:"紛争", divine:"天罰の矛――ニカドリー"},
  { id:3, code:"HapLotes405", name:"トリスビアス/トリビー、トリアン、トリノン…etc", spark:"門と道", divine:"万路の門――ヤーヌス"},
  { id:4, code:"EpieiKeia216", name:"キャストリス&ボリュシア", spark:"死", divine:"暗澹たる手――タナトス"},
  { id:5, code:"SkeMma720", name:"アナクサゴラス/アナイクス", spark:"理性", divine:"分裂する枝――サーシス"},
  { id:6, code:"EleOs252", name:"ヒアシンシア/ヒアンシー", spark:"天空", divine:"晨昏の目――エーグル"},
  { id:7, code:"OreXis945", name:"セファリア/サフェル", spark:"詭術", divine:"飛翔する幣――ザグレウス"},
  { id:8, code:"NeiKos496", name:"ファイノン,開拓者", spark:"世負い", divine:"万象の座ーーケファレ"},
  { id:9, code:"ApoRia432", name:"ヘレクトラ/セイレンス", spark:"海洋", divine:"満たされた杯ーーファジェイナ"},
  { id:10, code:"HubRis504", name:"ケリュドラ", spark:"法", divine:"公正の秤ーータレンタム"},
  { id:11, code:"なし", name:"長夜月", spark:"歳月", divine:"永夜の帳——オロニクス"},
  { id:12, code:"SkoPeo365", name:"丹恒・騰荒", spark:"大地", divine:"堅磐の脊髄——ジョーリア"},
  { id:13, code:"PhiLia093", name:"キュレネ", spark:"不明", divine:"不明"},
];
// 一覧
app.get("/gold", (req, res) => {
  res.render('gold', {data: ougonei} );
});

//create2
app.get("/gold/create", (req, res) => {
  res.render('gold_create');
});

//Delete_check
app.get("/gold_delete/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = ougonei[ number ];
  res.render('gold_delete', {id: number, data: detail} );
});

// Delete
app.get("/gold/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  ougonei.splice( req.params.number, 1 );
  // const index = Number(req.params.number);
  // ougonei.splice(index, 1);

  res.redirect('/gold' );
});

//Read
app.get("/gold/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = ougonei[ number ];
  res.render('gold_detail', {id: number, data: detail} );
});

// Create
app.post("/gold_create", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = ougonei.length + 1;
  const code = req.body.code;
  const name = req.body.name;
  const spark = req.body.spark;
  const divine = req.body.divine;
  ougonei.push( { id: id, code: code, name: name, spark: spark, divine: divine } );
  console.log( ougonei );
  res.render('gold', {data: ougonei} );
});

// Edit
app.get("/gold/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = ougonei[ number ];
  res.render('gold_edit', {id: number, data: detail} );
});

// Update
app.post("/gold/update/:number", (req, res) => {
  const number = req.params.number;   // ← これが超重要！！
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  ougonei[req.params.number].code = req.body.code;
  ougonei[req.params.number].name = req.body.name;
  ougonei[req.params.number].spark = req.body.spark;
  ougonei[req.params.number].divine = req.body.divine;
  console.log( ougonei );
  res.redirect(`/gold/${number}`);
});

// ################################# 聖遺物　効果一覧 ##############################
let relic = [
  { id:1, name:"剣闘士のフィナーレ", two_set:"攻撃力+18%", five_set:"該当聖遺物セットを装備したキャラが片手剣、両手剣、長柄武器キャラの場合、通常攻撃ダメージ+35%", chara:"神里綾人，アルレッキーノ，セノ，ノエル，クロリンデ"},
  { id:2, name:"大地を流浪する楽団", two_set:"元素熟知+80", five_set:"該当聖遺物セットを装備したキャラが法器、弓キャラの場合、キャラの重撃ダメージ+35%",chara:"甘雨，ティナリ，アンバー，煙緋" },
  { id:3, name:"雷のような怒り", two_set:"雷元素ダメージ+15%", five_set:"過負荷、感電、超電導、超開花反応によるダメージ+40%、超激化反応によるダメージアップ効果+20%、月感電反応によるダメージ+20%。上記の元素反応または原激化反応を起こすと、元素スキルのクールタイム-1秒。0.8秒毎に最大1回のみ発動可能",chara:"刻晴，セノ，リサ，クロリンデ" },
  { id:4, name:"雷を鎮める尊者", two_set:"雷元素耐性+40%", five_set:"雷元素の影響を受けた敵に対するダメージ+35%",chara:"なし" },
  { id:5, name:"愛される少女", two_set:"与える治癒効果+15%", five_set:"元素スキルまたは元素爆発を発動した後10秒間、チーム全員が受ける治癒効果+20%",chara:"回復系キャラ" },
  { id:6, name:"翠緑の影", two_set:"風元素ダメージ+15%", five_set:"拡散反応によるダメージ+60%。拡散された元素タイプを基準に、影響を受けた敵の元素耐性-40%、継続時間10秒",chara:"ウェンティ，万葉，ジン，関雲，スクロース，早柚，鹿野院平蔵，リネット，イファ，藍硯，夢瑞稀瑞稀" },
  { id:7, name:"逆飛びの流星", two_set:"シールド強化+35%", five_set:"シールド状態の時、通常攻撃と重撃ダメージ+40%",chara:"荒滝一斗，ノエル，宵宮，アルレッキーノ，放浪者，煙緋，辛炎" },
  { id:8, name:"悠久の磐岩", two_set:"岩ダメージ+15%", five_set:"結晶反応で形成された欠片を獲得すると、チーム全員の該当元素ダメージ+35%、継続時間10秒。元素ダメージ上昇は同時に1種類のみ獲得可能。",chara:"鐘離，シロネン" },
  { id:9, name:"烈火を渡る賢者", two_set:"炎元素耐性+40%", five_set:"炎元素の影響を受けた敵に対するダメージ+35%",chara:"なし" },
  { id:10, name:"燃え盛る炎の魔女", two_set:"炎元素ダメージ+15%", five_set:"過負荷、燃焼、烈開花反応によるダメージ+40%。蒸発、溶解反応による加算効果+15%。元素スキルを発動した10秒間、2セットの効果+50%、最大3重まで",chara:"ディルック，胡桃，嘉明，クレー，煙緋" },
  { id:11, name:"旧貴族のしつけ", two_set:"元素爆発のダメージ+20%", five_set:"元素爆発を発動すると、チーム全員の攻撃力+20%、継続時間12秒、重ね掛け不可",chara:"ベネット，イアンサ，シュヴルーズ，ガイア，ダリア，モナ，シャルロット，九条娑羅，ディオナ，アンバー，ロサリア，キャンディス，申鶴，重雲，アイノ" },
  { id:12, name:"血染めの騎士道", two_set:"物理ダメージ+25%", five_set:"敵を倒した10秒以内に重撃を発動するとスタミナの消耗はなく、与えるダメージ+50%",chara:"辛炎" },
  { id:13, name:"沈淪の心", two_set:"水元素ダメージ+15%", five_set:"元素スキルを発動した後の15秒間、通常攻撃と重撃のダメージ+30%",chara:"神里綾人，タルタリヤ" },
  { id:14, name:"氷風を彷徨う勇士", two_set:"氷元素ダメージ+15%", five_set:"氷元素の影響を受けている敵を攻撃した場合、会心率+20%。敵が凍結状態の場合、会心率は更に+20%。",chara:"甘雨，ガイア，ロサリア，神里綾華" },
  { id:15, name:"千岩牢固", two_set:"HP+20%", five_set:"元素スキルが敵に命中すると、周囲のチーム全員の攻撃力+20%、シールド強化+30%、持続時間3秒。この効果は0.5秒毎に1回のみ発動可能。この聖遺物セットを装備したキャラクターが待機している場合にも効果を発動できる。",chara:"鐘離，シトラリ，ディシア，珊瑚宮心海，ファルザン，レイラ，七七，フリーナ，イネファ" },
  { id:16, name:"蒼白の炎", two_set:"物理ダメージ+25%", five_set:"素スキルが敵に命中すると、攻撃力+9%。持続時間7秒、最大2重まで、0.3秒毎に1回のみ発動可能。2重まで重ねると、2セットの効果が2倍になる。",chara:"レザー，エウルア，フレミネ" },
  { id:17, name:"追憶のしめ縄", two_set:"攻撃力+18%", five_set:"元素スキルを発動した時、キャラクターの元素エネルギーが15以上の場合、元素エネルギーを15消費し、次の10秒間通常攻撃、重撃、落下攻撃ダメージ+50%",chara:"宵宮，胡桃，甘雨" },
  { id:18, name:"絶縁の旗印", two_set:"元素チャージ効率+20%", five_set:"元素チャージ効率の25%を基準に、元素爆発ダメージがアップする。この方式でアップできるダメージは最大75%まで。",chara:"雷電，九条沙羅，ガイア，北斗，行秋，香菱，夜蘭，リサ" },
  { id:19, name:"華館夢醒形骸記", two_set:"防御力+30%", five_set:"この聖遺物セットを装備したキャラクターは、以下の状況において「問答」効果を獲得する。「問答」効果：フィールドで岩元素攻撃が敵に命中すると、0.3秒毎に1層のみ獲得できる。待機中の場合、3秒毎に1層獲得する。重ね掛けできる「問答」は最大4層までとなり、1層につき防御力+6%、岩元素ダメージ+6%。6秒毎に「問答」効果を獲得していない場合は、1層失う。",chara:"ノエル，荒滝一斗，アルベド，雲菫，千織" },
  { id:20, name:"海染硨磲", two_set:"与える治癒効果+15%", five_set:"この聖遺物セットを装備したキャラクターがチーム内のキャラクターに治癒を行うと、治癒によるHP回復量(HP上限を超えた回復量も含む)を記録する海染の泡を生成する。海染の泡は3秒継続する。継続時間終了時、海染の泡は破裂し、周囲の敵に記録した回復量の90%分のダメージを与える(このダメージは感電や超伝導などの元素反応と同じように計算されるが、元素熟知、キャラクターLv、または元素反応のダメージアップ効果の影響は受けない)。海染の泡は3.5秒毎に1回のみ生成可能。海染の泡が記録できる回復量は最大30000までとなり、HP上限超過分の回復量を含む。チーム内で、海染の泡は同時に最大1つまで存在できる。この聖遺物セットを装備したキャラクターは待機中でも、この効果を発動できる。",chara:"珊瑚宮心海，バーバラ，七七，カーヴェ，白朮" },
  { id:21, name:"辰砂往生録", two_set:"攻撃力+18%", five_set:"元素爆発を発動すると、継続時間16秒の「潜光」効果が発動する。「潜光」：攻撃力+8%、キャラクターがHPを失うたびに攻撃力がさらに10%アップする。HPの損失による攻撃力アップ効果は0.8秒毎に1回のみ発動でき、最大4回重ね掛けできる。「潜光」効果はキャラクターが戦闘不能、または退場するときに解除される。「潜光」効果の継続時間中に再び元素爆発を発動すると、既存の「潜光」効果が先にクリアされる。",chara:"趙" },
  { id:22, name:"来歆の余響", two_set:"攻撃力+18%", five_set:"通常攻撃が敵に命中すると、36%の確率で「幽谷祭祀」が発動する。「幽谷祭祀」：通常攻撃のダメージが攻撃力70%分アップする。この効果は通常攻撃でダメージを与えた0.05秒後にクリアされる。通常攻撃後に「幽谷祭祀」が発動しなかった場合、次回の発動確率+20%。発動判定は0.2秒ごとに1回のみ行われる。",chara:"神里綾人" },
  { id:23, name:"砂上の楼閣の史話", two_set:"風元素ダメージ+15%", five_set:"重撃が敵に命中すると、該当キャラクターの通常攻撃の攻撃速度+10%、通常攻撃、重撃および落下攻撃ダメージ+40%、継続時間15秒。",chara:"放浪者" },
  { id:24, name:"楽園の絶花", two_set:"元素熟知+80", five_set:"開花、超開花、烈開花反応によるダメージ+40%、月開花反応によるダメージ+10%。また、装備者自身が開花、超開花、烈開花、または月開花を起こした後、上記強化効果の効果量+25%、継続時間10秒、最大4層まで重ねられ、1秒毎に最大1回のみ発動可能。装備したキャラクターが待機している場合にも効果を発動できる。",chara:"トーマ，雷電，珊瑚宮心海，バーバラ，久岐忍" },
  { id:25, name:"水仙の夢", two_set:"水元素ダメージ+15%", five_set:"通常攻撃、重撃、落下攻撃、元素スキル、または元素爆発が敵に命中すると、8秒間継続する「鏡中の水仙」効果を1層獲得する。1/2/3層以上の「鏡中の水仙」効果を持つ時、それぞれ攻撃力+7%/16%/25%、水ダメージ+4%/9%/15%。通常攻撃、重撃、落下攻撃、元素スキル、元素爆発による「鏡中の水仙」効果はそれぞれ独立してカウントされる。",chara:"タルタリヤ" },
  { id:26, name:"花海甘露の光", two_set:"HP+20%", five_set:"元素スキルと元素爆発のダメージ+10%。装備者がダメージを受けた後の5秒間、上記強化効果の効果量+80%、最大5層まで重ね掛け可能。継続時間は層ごとに独立してカウントされる。装備したキャラクターが待機している場合にも効果を発動できる。",chara:"ディシア" },
  { id:27, name:"深林の記憶", two_set:"草元素ダメージ+15%", five_set:"元素スキルまたは元素爆発が敵に命中すると、その敵の草元素耐性-30%。継続時間8秒。装備したキャラクターが待機している場合にも効果を発動できる。",chara:"ナヒーダ，白朮，ヨォーヨ，エミリエ，コレイ，トーマ，ディシア，ラウマ，久岐忍" },
  { id:28, name:"金メッキの夢", two_set:"元素熟知+80", five_set:"元素反応を起こした後の8秒間、装備キャラクターは、チーム内自身以外のキャラクターの元素タイプに応じて強化効果を獲得する。チームに装備キャラクターと同じ元素タイプのキャラクターが1名存在する毎に攻撃力+14%、異なる元素タイプのキャラクターが1名存在する毎に元素熟知+50。上記効果は、それぞれ最大でキャラクター3名までカウントされる。この効果は8秒毎に1回のみ発動可能。装備したキャラクターが待機している場合にも効果を発動できる。",chara:"八重神子，刻晴，アルハイゼン，久岐忍，セノ，雷電，ティナリ，トーマ，ドリー，珊瑚宮心海，嘉明，胡桃，煙緋" },
  { id:29, name:"ファントムハンター", two_set:"通常攻撃と重撃ダメージ+15%", five_set:"現在のHPが増える、または減る時、会心率+12%、継続時間5秒、最大3層まで重ね掛け可能",chara:"ヌヴィレット，リオセスリ，リネ，嘉明，趙，雷電，セノ，胡桃，クレー，アルハイゼン，ノエル" },
  { id:30, name:"黄金の劇団", two_set:"元素スキルのダメージ+20%", five_set:"元素スキルのダメージ+25%。また、装備者が待機中の時、元素スキルのダメージがさらに+25%。この効果は装備キャラクターが登場してから2秒後に解除される",chara:"八重神子，フィッシュル，千織，フリーナ，アルベド，ファルザン，ナヒーダ，エスコフィエ" },
  { id:31, name:"残響の森で囁かれる夜話", two_set:"攻撃力+18%", five_set:"元素スキルを発動した後の10秒間、岩元素ダメージ+20%。結晶反応で生成されたシールド状態にある時、上記強化効果の効果量+150%。追加された効果量は、結晶反応で生成されたシールド状態の効果が終了した1秒後にクリアされる。",chara:"ナヴィア，凝光" },
  { id:32, name:"在りし日の歌", two_set:"与える治療効果+15%", five_set:"装備者がチームにいるキャラクターのHPを回復した時、継続時間6秒の「渇望」効果が発動し、HP回復量（HP上限を超えた回復量も含む）を記録する。継続時間終了時、「渇望」効果は「かの時の潮」効果に変化する。「かの時の潮」効果発動中、フィールド上にいるチーム内の自身キャラクターの通常攻撃、重撃、落下攻撃、元素スキル、元素爆発が敵に命中すると、「渇望」効果で記録した回復量の8%分を基に与えるダメージをアップする。「かの時の潮」効果は、5回発動、または10秒後にクリアされる。1回の「渇望」効果が記録する回復量は最大15000ポイントまで。なお、「渇望」は同時に最大1つまで存在でき、複数の装備者の与える回復量を記録可能。装備したキャラクターが待機している場合にも効果を発動できる。",chara:"シュヴルーズ" },
  { id:33, name:"諧律奇想の断章", two_set:"攻撃力+18%", five_set:"命の契約の数値が増減する時、キャラクターの与えるダメージ+18%、継続時間6秒、最大3層まで重ね掛け可能。",chara:"クロリンデ，アルレッキーノ" },
  { id:34, name:"遂げられなかった想い", two_set:"攻撃力+18%", five_set:"戦闘状態が解除されてから3秒経過すると、与えるダメージ+50%。戦闘状態にある時、近くに燃焼状態の敵が存在しないまま6秒以上経過すると、上記強化効果の効果量は0%になるまで1秒毎に10%減少する。一方、燃焼状態の敵が存在する場合、50%になるまで1秒毎に10%増加する。この聖遺物セットを装備したキャラクターが待機している場合にも、効果を発動できる。",chara:"エミリエ" },
  { id:35, name:"黒曜の秘典", two_set:"装備者が夜魂の加護状態にあり、かつフィールド上にいる時、与えるダメージ+15%。", five_set:"装備者がフィールド上で夜魂値を1消費すると、会心率+40%、継続時間6秒。この効果は1秒毎に1回のみ発動可能。",chara:"キィニチ，ムアラニ，ヴァレサ，マーヴィカ，チャスカ" },
  { id:36, name:"灰燼の都に立つ英雄の絵巻", two_set:"付近にいるチーム内キャラクターが「夜魂バースト」を起こすと、装備者は元素エネルギーを6ポイント回復する。", five_set:"装備者が自身の元素タイプの関連元素反応を起こした後、周囲のチーム全員の、該当元素反応の関連元素タイプのダメージ+12%、継続時間15秒。この効果を発動した時に、装備者が「夜魂の加護」状態にあった場合、周囲チーム全員の前述の元素タイプのダメージがさらに+28%、継続時間20秒。装備者が待機中でも、上記効果を発動できる。同名の聖遺物セットによるダメージアップ効果は重ね掛け不可。",chara:"マーヴィカ，オロルン，イアンサ，シロネン，シトラリ，カチーナ" },
  { id:37, name:"深廊の終曲", two_set:"氷元素ダメージ+15%", five_set:"装備者の元素エネルギーが0の時、通常攻撃ダメージ+60%、元素爆発ダメージ+60%。装備者の通常攻撃がダメージを与えた後、上記元素爆発のダメージアップ効果は6秒間無効になる。装備者は元素爆発がダメージを与えた後、上記通常攻撃ダメージアップ効果は6秒間無効になる。キャラクターが待機中でも発動できる。",chara:"スカーク" },
  { id:38, name:"長き夜の誓い", two_set:"落下攻撃の与えるダメージ+25%", five_set:"装備者の落下攻撃/重撃/元素スキルが敵に命中した後、「永遠に輝く流光」効果を1/2/2層獲得する。落下攻撃、重撃、または元素スキルによるこの効果はそれぞれ1秒毎に1回のみ発動可能。「永遠に輝く流光」：落下攻撃ダメージ+15%、継続時間6秒、最大5層まで重ね掛け可能。継続時間は層ごとに独立してカウントされる。",chara:"ヴァレサ，趙，嘉明" },
  { id:39, name:"月を紡ぐ夜の歌", two_set:"元素チャージ効率+20%", five_set:"元素ダメージを与えた時、8秒間継続する「月輝明光・崇拝」効果を獲得する。「月輝明光・崇拝」：チームの月光が初照/満照の時、チーム全員の元素熟知+60/120。装備者が待機中でも、上記効果を発動できる。チーム内キャラクターの「月輝明光」効果が1種類存在するごとに、チーム内キャラクターが起こす月反応のダメージ+10%。「月輝明光」によって生じた効果は重ね掛け不可。",chara:"アイノ，イネファ，ニィロウ，久岐忍，ラウマ，ナヒーダ，珊瑚宮心海，綺良々，オロルン" },
  { id:40, name:"天穹の顕現せし夜", two_set:"元素熟知+80", five_set:"付近にいるチーム内キャラクターが月反応を起こした時に装備者がフィールドにいる場合、4秒間継続する「月輝明光・蓄念」効果を獲得する。「月輝明光・蓄念」：チームの月光が初照/満照の時、会心率+15%/30%。チーム内キャラクターの「月輝明光」効果が1種類存在するごとに、チーム内キャラクターが起こす月反応のダメージ+10%。「月輝明光」によって生じた効果は重ね掛け不可。",chara:"フリンズ，ネフェル" },
  ];

// 一覧
app.get("/holy", (req, res) => {
  res.render('holy', {data: relic} );
});

// //create
// app.get("/holy/create", (req, res) => {
//   res.redirect('/public/holy.html');
// });

//create2
app.get("/holy/create", (req, res) => {
  res.render('holy_create');
});

//Delete_check
app.get("/holy_delete/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = relic[ number ];
  res.render('holy_delete', {id: number, data: detail} );
});

// Delete
app.get("/holy/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  relic.splice( req.params.number, 1 );
  // const index = Number(req.params.number);
  // ougonei.splice(index, 1);

  res.redirect('/holy' );
});

//Read
app.get("/holy/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = relic[ number ];
  res.render('holy_detail', {id: number, data: detail} );
});

// Create
app.post("/holy_create", (req, res) => {
  const id = relic.length + 1;
  const name = req.body.name;
  const two_set = req.body.two_set;
  const five_set = req.body.five_set;
  const chara = req.body.chara;
  relic.push( { id: id, name: name, two_set: two_set, five_set: five_set, chara: chara } );
  console.log( relic );
  res.render('holy', {data: relic} );
});

// Edit
app.get("/holy/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = relic[ number ];
  res.render('holy_edit', {id: number, data: detail} );
});

// Update
app.post("/holy/update/:number", (req, res) => {
  const number = req.params.number;   // ← これが超重要！！
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  relic[req.params.number].name = req.body.name;
  relic[req.params.number].two_set = req.body.two_set;
  relic[req.params.number].five_set = req.body.five_set;
  relic[req.params.number].chara = req.body.chara;
  console.log( relic );
  res.redirect(`/holy/${number}`);
});

//################################## 鳴潮　限定星５所持キャラ育成度 ###########################
let  states = [
  {id:1, name:"カルロッタ", weapon:"ラストダンス", chain:0, sound:"フロステッド・ハート", H:19687, A:2129, B:1257, C_H:70.1, C_D:297.0, charge:116.8, effect:60.0, usual:10, skill:6, circuit:10, release:10, variation:4},
  {id:2, name:"長離", weapon:"千古の湖水", chain:0, sound:"山を轟かせる崩火", H:17051, A:2201, B:1354, C_H:81.2, C_D:195.0, charge:132.8, effect:70.0, usual:4, skill:10, circuit:10, release:8, variation:1},
  {id:3, name:"フローヴァ", weapon:"弾む輝き", chain:0, sound:"ロスト・ドリーム", H:15942, A:1742, B:1651, C_H:70.7, C_D:243.3, charge:106.8, effect:70.0, usual:10, skill:5, circuit:9, release:10, variation:1},
  {id:4, name:"ショアキーパー", weapon:"奇妙バリエーション", chain:0, sound:"喧騒に隠す回光", H:32819, A:1174, B:1394, C_H:28.1, C_D:169.8, charge:237.4, effect:48.8, usual:1, skill:5, circuit:5, release:10, variation:8},
  {id:5, name:"オーガスタ", weapon:"雷霆を統べし王剣", chain:0, sound:"グローリーフォージ・クラウン，空を切り裂く冥雷", H:17376, A:2493, B:1343, C_H:88.2, C_D:217.8, charge:100.0, effect:70.0, usual:7, skill:6, circuit:10, release:10, variation:1},
  {id:6, name:"ユーノ", weapon:"万物を書き留める月相", chain:0, sound:"グローリーフォージ・クラウン，谷を突き抜ける長風", H:15684, A:2014, B:1423, C_H:87.7, C_D:166.6, charge:120.8, effect:70.0, usual:6, skill:6, circuit:10, release:10, variation:1},
  {id:7, name:"千咲", weapon:"曇斬", chain:2, sound:"命理崩壊の弦，二度と輝かない沈日", H:17356, A:2067, B:1309, C_H:88.3, C_D:275.0, charge:100.0, effect:135.0, usual:10, skill:10, circuit:10, release:10, variation:10},
  {id:8, name:"カルテジア", weapon:"辺守迅刀・鎮護", chain:0, sound:"グロリアス・ウィンド", H:42816, A:1032, B:841, C_H:64.4, C_D:237.8, charge:100.0, effect:30.0, usual:7, skill:6, circuit:10, release:10, variation:6},
];


// 一覧
app.get("/character", (req, res) => {
  res.render('character', {data: states} );
});

//create2
app.get("/character/create", (req, res) => {
  res.render('character_create');
});

//Delete_check
app.get("/character_delete/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = states[ number ];
  res.render('character_delete', {id: number, data: detail} );
});

// Delete
app.get("/character/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  states.splice( req.params.number, 1 );
  // const index = Number(req.params.number);
  // ougonei.splice(index, 1);

  res.redirect('/character' );
});

//Read
app.get("/character/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = states[ number ];
  res.render('character_detail', {id: number, data: detail} );
});

// Create
app.post("/character_create", (req, res) => {
  const id = states.length + 1;
  const name = req.body.name;
  const weapon = req.body.weapon;
  const chain = req.body.chain;
  const sound = req.body.sound;
  const H = req.body.H;
  const A = req.body.A;
  const B = req.body.B;
  const C_H = req.body.C_H;
  const C_D = req.body.C_D;
  const charge = req.body.charge;
  const effect = req.body.effect;
  const usual = req.body.usual;
  const skill = req.body.skill;
  const circuit = req.body.circuit;
  const release = req.body.release;
  const variation = req.body.variation;
  states.push( { id: id, name: name, weapon: weapon, chain: chain, sound: sound, H: H, A: A, B: B, C_H: C_H, C_D: C_D, charge: charge, effect: effect, usual: usual, skill: skill, circuit: circuit, release: release, variation: variation } );
  console.log( states );
  res.render('character', {data: states} );
});

// Edit
app.get("/character/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = states[ number ];
  res.render('character_edit', {id: number, data: detail} );
});

// Update
app.post("/character/update/:number", (req, res) => {
  const number = req.params.number;   // ← これが超重要！！
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  states[req.params.number].name = req.body.name;
  states[req.params.number].weapon = req.body.weapon;
  states[req.params.number].chain = req.body.chain;
  states[req.params.number].sound = req.body.sound;
  states[req.params.number].H = req.body.H;
  states[req.params.number].A = req.body.A;
  states[req.params.number].B = req.body.B;
  states[req.params.number].C_H = req.body.C_H;
  states[req.params.number].C_D = req.body.C_D;
  states[req.params.number].charge = req.body.charge;
  states[req.params.number].effect = req.body.effect;
  states[req.params.number].usual = req.body.usual;
  states[req.params.number].skill = req.body.skill;
  states[req.params.number].circuit = req.body.circuit;
  states[req.params.number].release = req.body.release;
  states[req.params.number].variation = req.body.variation;
  console.log( states );
  res.redirect(`/character/${number}`);
});

// ################################# 京葉線駅データ管理 ##############################


let station2 = [
  { id:1, code:"JE01", name:"東京駅", change:"総武本線，中央線，etc", passengers:403831, distance:0 },
  { id:2, code:"JE02", name:"八丁堀駅", change:"日比谷線", passengers:31071, distance:1.2 },
  { id:3, code:"JE05", name:"新木場駅", change:"有楽町線，りんかい線", passengers:67206, distance:7.4 },
  { id:4, code:"JE07", name:"舞浜駅", change:"舞浜リゾートライン", passengers:76156,distance:12.7 },
  { id:5, code:"JE12", name:"新習志野駅", change:"", passengers:11655, distance:28.3 },
  { id:6, code:"JE17", name:"千葉みなと駅", change:"千葉都市モノレール", passengers:16602, distance:39.0 },
  { id:7, code:"JE18", name:"蘇我駅", change:"内房線，外房線", passengers:31328, distance:43.0 },
];

// 一覧
app.get("/keiyo2", (req, res) => {
  res.render('keiyo2', {data: station2} );
});

// Create
app.get("/keiyo2/create", (req, res) => {
  res.redirect('/public/keiyo2_new.html');
});

//Read
app.get("/keiyo2/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[ number ];
  res.render('keiyo2_detail', {id: number,data: detail} );
});

// Delete
app.get("/keiyo2/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  station2.splice( req.params.number, 1 );
  res.redirect('/keiyo2' );
});

// Create
app.post("/keiyo2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = station2.length + 1;
  const code = req.body.code;
  const name = req.body.name;
  const change = req.body.change;
  const passengers = req.body.passengers;
  const distance = req.body.distance;
  station2.push( { id: id, code: code, name: name, change: change, passengers: passengers, distance: distance } );
  console.log( station2 );
  res.render('keiyo2', {data: station2} );
});

// Edit
app.get("/keiyo2/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[ number ];
  res.render('keiyo2_edit', {id: number, data: detail} );
});

// Update
app.post("/keiyo2/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  station2[req.params.number].code = req.body.code;
  station2[req.params.number].name = req.body.name;
  station2[req.params.number].change = req.body.change;
  station2[req.params.number].passengers = req.body.passengers;
  station2[req.params.number].distance = req.body.distance;
  console.log( station2 );
  res.redirect('/keiyo2' );
});


app.get("/keiyo", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('db2', { data: station });
});

// app.get("/keiyo_add", (req, res) => {
//   let id = req.query.id;
//   let code = req.query.code;
//   let name = req.query.name;
//   let newdata = { id: id, code: code, name: name };
//   station.push( newdata );
//   res.redirect('/public/keiyo_add.html');
// });

app.get("/keiyo_add", (req, res) => {
  let id = req.query.id;
  let code = req.query.code;
  let name = req.query.name;
  let newdata = { id: id, code: code, name: name };
  station.push( newdata );
  res.render('db1', { data: station });
});

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/omikuji1", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.send( '今日の運勢は' + luck + 'です' );
});

app.get("/omikuji2", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.render( 'omikuji2', {result:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 以下の数行は人間の勝ちの場合の処理なので，
  // 判定に沿ってあいこと負けの処理を追加する
  judgement = '勝ち';
  win += 1;
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
