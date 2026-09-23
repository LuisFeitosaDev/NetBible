/**
 * A série numerada de Doré, prancha por prancha.
 *
 * São 152 gravuras publicadas em "Doré's English Bible" (1866), e elas são o
 * que tapa o buraco entre Josué e Malaquias: a coleção Medhurst, que traz a
 * referência no nome do arquivo e por isso dá para ler por máquina, para em
 * Deuteronômio. Daí para frente, mapa na mão.
 *
 * O que fica de fora, de propósito:
 *
 *   110-113, 125, 133-135, 141-152   Tobias, Judite, Baruque, Susana, Bel e
 *                                    Macabeus. São deuterocanônicos e não
 *                                    existem na Bíblia que o app serve.
 *
 * Quando duas pranchas caem no mesmo capítulo, as duas ficam na lista: o build
 * tenta em ordem e a segunda vira reserva se a primeira falhar na porteira de
 * resolução.
 */

/** "<slug>-<capítulo>" -> pranchas, da mais representativa para a reserva. */
export const DORE = {
  // Gênesis
  "gn-1": ["001.The Creation of Light.jpg"],
  "gn-2": ["002.The Creation of Eve.jpg"],
  "gn-3": ["003.Adam and Eve Are Driven out of Eden.jpg"],
  "gn-4": ["005.Cain Slays Abel.jpg", "004.Cain and Abel Offer Their Sacrifices.jpg"],
  "gn-7": ["007.The Great Flood.jpg", "006.The World Is Destroyed by Water.jpg"],
  "gn-8": ["008.A Dove Is Sent Forth from the Ark.jpg"],
  "gn-9": ["009.Noah Curses Ham and Canaan.jpg"],
  "gn-11": ["010.The Tower of Babel.jpg"],
  "gn-12": ["011.Abraham Goes to the Land of Canaan.jpg"],
  "gn-18": ["012.Abraham and the Three Angels.jpg"],
  "gn-19": ["013.Lot Flees as Sodom and Gomorrah Burn.jpg"],
  "gn-21": [
    "015.Hagar and Ishmael in the Wilderness.jpg",
    "014.Abraham Sends Hagar and Ishmael Away.jpg",
  ],
  "gn-22": ["016.The Testing of Abraham's Faith.jpg"],
  "gn-23": ["017.The Burial of Sarah.jpg"],
  "gn-24": [
    "018.Eliezer and Rebekah at the Well.jpg",
    "019.The Meeting of Isaac and Rebekah.jpg",
  ],
  "gn-27": ["020.Isaac Blesses Jacob.jpg"],
  "gn-28": ["021.Jacob's Dream.jpg"],
  "gn-29": ["022.Jacob Tends Laban's Flocks and Meets Rachel.jpg"],
  "gn-32": ["024.Jacob Wrestles with the Angel.jpg", "023.Jacob Prays for Protection.jpg"],
  "gn-33": ["025.Jacob and Esau Meet.jpg"],
  "gn-37": ["026.Joseph Is Sold by His Brothers.jpg"],
  "gn-41": ["027.Joseph Interprets Pharaoh's Dream.jpg"],
  "gn-45": ["028.Joseph Reveals Himself to His Brothers.jpg"],
  "gn-46": ["029.Jacob Goes to Egypt.jpg"],

  // Êxodo
  "ex-2": ["031.The Finding of Moses.jpg", "030.The Child Moses on the Nile.jpg"],
  "ex-7": ["032.Moses and Aaron Appear before Pharaoh.jpg"],
  "ex-9": ["033.The Fifth Plague. Livestock Disease.jpg"],
  "ex-10": ["034.The Ninth Plague. Darkness.jpg"],
  "ex-12": [
    "035.The Firstborn of the Egyptians Are Slain.jpg",
    "036.The Egyptians Ask Moses to Depart.jpg",
  ],
  "ex-14": ["037.The Egyptians Drown in the Sea.jpg"],
  // A prancha diz Horebe, que é Êxodo 17; a água em Cades, de Números 20, é
  // outra cena e outro episódio.
  "ex-17": ["041.Moses Strikes the Rock at Horeb.jpg"],
  "ex-20": ["038.The Giving of the Law on Mount Sinai.jpg"],
  "ex-32": ["039.Moses Comes Down from Mount Sinai.jpg"],

  // Números
  "nm-13": ["041B.The Spies Return from the Promised Land.jpg"],
  "nm-16": ["040.The Death of Korah, Dathan, and Abiram.jpg"],
  "nm-21": ["042.The Bronze Serpent.jpg"],
  "nm-22": ["043.An Angel Appears to Balaam.jpg"],

  // Josué
  "js-2": ["047.Joshua Spares Rahab.jpg"],
  "js-3": ["044. The Israelites Cross the Jordan River.jpg"],
  "js-6": ["046.The Walls of Jericho Fall Down.jpg"],
  "js-7": ["048.Achan Is Stoned to Death.jpg"],
  "js-8": ["049.Joshua Burns the Town of Ai.jpg"],
  "js-10": [
    "051.Joshua Commands the Sun to Stand Still.jpg",
    "050.The Army of the Amorites Is Destroyed.jpg",
  ],

  // Juízes
  "jz-2": ["045. An Angel Appears to the Israelites.jpg"],
  "jz-4": ["052.Jael Kills Sisera.jpg"],
  "jz-7": ["054.Gideon Chooses 300 Soldiers.jpg"],
  "jz-8": ["055.The Midianites Are Routed.jpg"],
  "jz-9": ["057.The Death of Abimelech.jpg", "056.The Death of Gideon's Sons.jpg"],
  "jz-11": [
    "058.Jephthah's Daughter Comes to Meet Her Father.jpg",
    "059.Israelite Women Mourn with Jephthah's Daughter.jpg",
  ],
  "jz-14": ["060.Samson Slays a Lion.jpg"],
  "jz-15": ["061.Samson Destroys the Philistines with an Ass' Jawbone.jpg"],
  "jz-16": [
    "063.Samson and Delilah.jpg",
    "064.The Death of Samson.jpg",
    "062.Samson Carries away the Gates of Gaza.jpg",
  ],
  "jz-19": [
    "065.A Levite Finds a Woman's Corpse.jpg",
    "066.The Levite Carries the Woman's Body Away.jpg",
  ],
  "jz-21": ["067.The Benjaminites Take the Virgins of Jabesh-gilead.jpg"],

  // Rute
  "rt-1": ["068.Naomi and Her Daughters-in-Law.jpg"],
  "rt-2": ["069.Ruth and Boaz.jpg"],

  // 1 e 2 Samuel
  "1sm-6": ["070.The Ark Is Returned to Beth-shemesh.jpg"],
  "1sm-10": ["070A.Samuel Blesses Saul.jpg"],
  "1sm-15": ["071.The Death of Agag.jpg"],
  "1sm-17": ["071A.David Slays Goliath.jpg"],
  "1sm-18": ["072.Saul Attempts to Kill David.jpg"],
  "1sm-19": ["073.David Escapes through a Window.jpg"],
  "1sm-20": ["073A.David and Jonathan.jpg"],
  "1sm-24": ["074.David Shows Saul How He Spared His Life.jpg"],
  "1sm-28": ["075.Saul and the Witch of Endor.jpg"],
  "1sm-31": [
    "076.The Death of Saul.jpg",
    "077.Jabesh-Gileadites Recover the Bodies of Saul and His Sons.jpg",
  ],
  "2sm-2": ["078.Combat between Soldiers of Ish-bosheth and David.jpg"],
  "2sm-10": ["079.David Attacks the Ammonites.jpg"],
  "2sm-18": ["080.The Death of Absalom.jpg"],
  "2sm-19": ["081.David Mourns the Death of Absalom.jpg"],
  "2sm-21": ["082.Rizpah’s Kindness toward the Dead.jpg", "083.Abishai Saves David's Life.jpg"],
  "2sm-24": ["102A.The Plague of Jerusalem.jpg"],

  // 1 e 2 Reis
  "1rs-3": ["084.The Judgment of Solomon.jpg"],
  "1rs-5": ["085.Cedars Are Cut Down for the Jerusalem Temple.jpg"],
  "1rs-10": ["086.Solomon Receives the Queen of Sheba.jpg"],
  "1rs-11": ["087.King Solomon in Old Age.jpg"],
  "1rs-13": ["088.The Disobedient Prophet Is Slain by a Lion.jpg"],
  "1rs-17": ["089.Elijah Raises the Son of the Widow of Zarephath.jpg"],
  "1rs-18": ["090.The Prophets of Baal Are Slaughtered.jpg"],
  "1rs-19": ["091.Elijah Is Nourished by an Angel.jpg"],
  "1rs-20": ["092.The Israelites Slaughter the Syrians.jpg"],
  "1rs-22": ["093.The Death of Ahab.jpg"],
  "2rs-1": ["094.Elijah Destroys the Messengers of Ahaziah.jpg"],
  "2rs-2": [
    "095.Elijah Ascends to Heaven in a Chariot of Fire.jpg",
    "095.Some Children Are Destroyed by Bears.jpg",
  ],
  "2rs-6": ["096.A Famine in Samaria.jpg"],
  "2rs-9": ["097.The Death of Jezebel.jpg", "098.Jehu's Companions Find Jezebel's Remains.jpg"],
  "2rs-11": ["099.The Death of Athaliah.jpg"],
  "2rs-17": ["100.Foreign Nations Are Slain by Lions in Samaria.jpg"],
  "2rs-19": ["101.Sennacherib's Army Is Destroyed.jpg"],
  "2rs-25": ["102.Zedekiah's Sons Are Slaughtered before His Eyes.jpg"],

  // Crônicas, Esdras, Neemias
  "2cr-20": ["103.The Ammonite and Moabite Armies Are Destroyed.jpg"],
  "ed-1": ["104.Cyrus Restores the Vessels of the Temple.jpg"],
  "ed-3": ["105.The Rebuilding of the Temple Is Begun.jpg"],
  "ed-7": ["106.Artaxerxes Grants Freedom to the Jews.jpg"],
  "ed-9": ["107.Ezra Kneels in Prayer.jpg"],
  "ne-2": ["108.Nehemiah Views the Ruins of Jerusalem's Walls.jpg"],
  "ne-8": ["109.Ezra Reads the Law to the People.jpg"],

  // Ester
  "et-1": ["114.Queen Vashti Refuses to Obey Ahasuerus' Command.jpg"],
  "et-5": ["115.Esther Before the King.jpg"],
  "et-6": ["116.The Triumph of Mordecai.jpg"],
  "et-7": ["117.Esther Accuses Haman.jpg"],

  // Jó
  "job-1": ["118.Job Hears of His Misfortunes.jpg"],
  "job-2": ["119.Job Speaks with His Friends.jpg"],

  // Profetas
  "is-6": ["120.The Prophet Isaiah.jpg"],
  "is-13": ["121.Isaiah's Vision of the Destruction of Babylon.jpg"],
  "is-27": ["122.The Destruction of Leviathan.jpg"],
  "jr-1": ["123.The Prophet Jeremiah.jpg"],
  "jr-36": ["123.Baruch Writes Jeremiah's Prophecies.jpg"],
  "lm-1": ["124.People Mourn over the Destruction of Jerusalem.jpg"],
  "ez-1": ["126.The Prophet Ezekiel.jpg"],
  "dn-1": ["128.Daniel among the Exiles.jpg"],
  "dn-3": ["129.Shadrach, Meshach and Abednego in the Furnace.jpg"],
  "dn-5": ["130.Daniel Interprets the Writing on the Wall.jpg"],
  "dn-6": ["131.Daniel in the Lions' Den.jpg"],
  "dn-7": ["132.Daniel's Vision of the Four Beasts.jpg"],
  "am-1": ["136.The Prophet Amos.jpg"],
  "jn-2": ["137.Jonah Is Spewed Forth by the Whale.jpg"],
  "jn-3": ["138.Jonah Preaches to the Ninevites.jpg"],
  "mq-6": ["139.Micah Exhorts the Israelites to Repent.jpg"],
  "zc-6": ["140.Zechariah's Vision of Four Chariots.jpg"],
};
