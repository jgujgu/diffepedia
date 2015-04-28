//get languages url
//http://en.wikipedia.org/w/api.php?action=query&format=json&titles=Cloud&prop=langlinks&lllimit=500
//get html version of article (this is the cleanest it can get
//http://simple.wikipedia.org/w/api.php?format=json&action=query&titles=Colorado&prop=extracts

if(window.location.pathname === '/') {

  var app = angular.module('wiki-form', []);
  var defaultLang = "English";
  var LANG_REGEXP = /https:\/\/[a-zA-Z\-]{2,12}/;
  var ARTICLE_REGEXP = /wiki\/.+/;
  var WIKI_REGEXP = /https:\/\/[a-zA-Z\-]{2,12}\.wikipedia\.org\/wiki\/.+/;
  var languages = ["Chinese"]

  app.controller("LangController", function($scope, $http, $timeout) {

    $scope.userURL = {
      url: "",
    };

    $scope.lang = {
      name: defaultLang
    }

    $scope.languages = languages;

    $scope.changeLangOptions = function() {
      var langMatch = LANG_REGEXP.exec($scope.userURL.url);
      var articleMatch = ARTICLE_REGEXP.exec($scope.userURL.url);
      if (langMatch === null) {
        $scope.lang.name = defaultLang;
      } else {
        abbrLang = langMatch[0].slice(8);
        article = articleMatch[0].slice(5);
        $scope.lang.name = LANG_HASH[abbrLang];
        getArticle(abbrLang, article);
      };
    }

    function getArticle(abbrLang, article) {
      getURL = "http://" + abbrLang + ".wikipedia.org/w/api.php?action=query&format=json&titles=" + article + "&prop=langlinks&lllimit=500&callback=JSON_CALLBACK";
      $http.jsonp(getURL).success(function(data, status, headers, config) {
        unparsedLangArray = data.query.pages
        key = Object.keys(unparsedLangArray)[0]
        toMap = unparsedLangArray[key].langlinks
        mapLangs(toMap);
        $scope.languages = languages;
        console.log(toMap);
        console.log(languages);
        console.log("language changed");
      }).
        error(function(data, status, headers, config) {
      });
    }
  });

  var callbackData;
  function jsonp_callback(data) {
    unparsedLangArray = data.query.pages
    key = Object.keys(unparsedLangArray)[0]
    toMap = unparsedLangArray[key].langlinks
    mapLangs(toMap);
    callbackData = data;
  }

  function mapLangs(toMap) {
    rawAbbr = toMap.map(function(elem) {
      return elem.lang
    });

    languages = rawAbbr.map(function(elem) {
      return LANG_HASH[elem]
    })
  }

  app.directive('validateUrl', function() {

    return {
      require: 'ngModel',
      restrict: '',
      link: function(scope, elm, attrs, ctrl) {
        // only apply the validator if ngModel is present and Angular has added the email validator
        if (ctrl && ctrl.$validators.url) {

          // this will overwrite the default Angular email validator
          ctrl.$validators.url = function(modelValue) {
            return ctrl.$isEmpty(modelValue) || WIKI_REGEXP.test(modelValue);
          };
        }
      }
    };
  });

  var LANG_HASH =
    { "en":	"English",
      "sv":	"Swedish",
      "nl":	"Dutch",
      "de":	"German",
      "fr":	"French",
      "war":	"Waray-Waray",
      "ru":	"Russian",
      "ceb":	"Cebuano",
      "it":	"Italian",
      "es":	"Spanish",
      "vi":	"Vietnamese",
      "pl":	"Polish",
      "ja":	"Japanese",
      "pt":	"Portuguese",
      "zh":	"Chinese",
      "uk":	"Ukrainian",
      "ca":	"Catalan",
      "fa":	"Persian",
      "no":	"Norwegian (Bokmål)",
      "sh":	"Serbo-Croatian",
      "fi":	"Finnish",
      "id":	"Indonesian",
      "ar":	"Arabic",
      "cs":	"Czech",
      "sr":	"Serbian",
      "ko":	"Korean",
      "ro":	"Romanian",
      "hu":	"Hungarian",
      "ms":	"Malay",
      "tr":	"Turkish",
      "min":	"Minangkabau",
      "eo":	"Esperanto",
      "kk":	"Kazakh",
      "eu":	"Basque",
      "sk":	"Slovak",
      "da":	"Danish",
      "bg":	"Bulgarian",
      "lt":	"Lithuanian",
      "he":	"Hebrew",
      "hy":	"Armenian",
      "hr":	"Croatian",
      "sl":	"Slovenian",
      "et":	"Estonian",
      "uz":	"Uzbek",
      "gl":	"Galician",
      "nn":	"Norwegian (Nynorsk)",
      "vo":	"Volapük",
      "la":	"Latin",
      "simple":	"Simple English",
      "el":	"Greek",
      "hi":	"Hindi",
      "az":	"Azerbaijani",
      "th":	"Thai",
      "ka":	"Georgian",
      "oc":	"Occitan",
      "be":	"Belarusian",
      "ce":	"Chechen",
      "mk":	"Macedonian",
      "mg":	"Malagasy",
      "new":	"Newar / Nepal Bhasa",
      "ur":	"Urdu",
      "tt":	"Tatar",
      "ta":	"Tamil",
      "pms":	"Piedmontese",
      "cy":	"Welsh",
      "tl":	"Tagalog",
      "lv":	"Latvian",
      "te":	"Telugu",
      "bs":	"Bosnian",
      "be-x-old":	"Belarusian (Taraškievica)",
      "br":	"Breton",
      "ht":	"Haitian",
      "sq":	"Albanian",
      "jv":	"Javanese",
      "lb":	"Luxembourgish",
      "mr":	"Marathi",
      "is":	"Icelandic",
      "ml":	"Malayalam",
      "zh-yue":	"Cantonese",
      "bn":	"Bengali",
      "af":	"Afrikaans",
      "ba":	"Bashkir",
      "ga":	"Irish",
      "pnb":	"Western Panjabi",
      "cv":	"Chuvash",
      "lmo":	"Lombard",
      "fy":	"West Frisian",
      "tg":	"Tajik",
      "my":	"Burmese",
      "yo":	"Yoruba",
      "an":	"Aragonese",
      "sco":	"Scots",
      "sw":	"Swahili",
      "ky":	"Kirghiz",
      "io":	"Ido",
      "ne":	"Nepali",
      "gu":	"Gujarati",
      "scn":	"Sicilian",
      "bpy":	"Bishnupriya Manipuri",
      "nds":	"Low Saxon",
      "ku":	"Kurdish",
      "ast":	"Asturian",
      "qu":	"Quechua",
      "als":	"Alemannic",
      "su":	"Sundanese",
      "kn":	"Kannada",
      "pa":	"Punjabi",
      "ckb":	"Sorani",
      "ia":	"Interlingua",
      "mn":	"Mongolian",
      "nap":	"Neapolitan",
      "bug":	"Buginese",
      "bat-smg":	"Samogitian",
      "arz":	"Egyptian Arabic",
      "wa":	"Walloon",
      "zh-min-nan":	"Min Nan",
      "am":	"Amharic",
      "map-bms":	"Banyumasan",
      "gd":	"Scottish Gaelic",
      "yi":	"Yiddish",
      "mzn":	"Mazandarani",
      "si":	"Sinhalese",
      "fo":	"Faroese",
      "bar":	"Bavarian",
      "vec":	"Venetian",
      "nah":	"Nahuatl",
      "sah":	"Sakha",
      "os":	"Ossetian",
      "sa":	"Sanskrit",
      "roa-tara":	"Tarantino",
      "li":	"Limburgish",
      "hsb":	"Upper Sorbian",
      "or":	"Oriya",
      "pam":	"Kapampangan",
      "mhr":	"Meadow Mari",
      "se":	"Northern Sami",
      "mi":	"Maori",
      "mrj":	"Hill Mari",
      "ilo":	"Ilokano",
      "hif":	"Fiji Hindi",
      "bcl":	"Central Bicolano",
      "gan":	"Gan",
      "rue":	"Rusyn",
      "glk":	"Gilaki",
      "nds-nl":	"Dutch Low Saxon",
      "bo":	"Tibetan",
      "vls":	"West Flemish",
      "ps":	"Pashto",
      "diq":	"Zazaki",
      "fiu-vro":	"Võro",
      "bh":	"Bihari",
      "xmf":	"Mingrelian",
      "tk":	"Turkmen",
      "gv":	"Manx",
      "sc":	"Sardinian",
      "co":	"Corsican",
      "csb":	"Kashubian",
      "hak":	"Hakka",
      "km":	"Khmer",
      "kv":	"Komi",
      "zea":	"Zeelandic",
      "vep":	"Vepsian",
      "crh":	"Crimean Tatar",
      "cr": "Cree",
      "zh-classical":	"Classical Chinese",
      "frr":	"North Frisian",
      "eml":	"Emilian-Romagnol",
      "ay":	"Aymara",
      "stq":	"Saterland Frisian",
      "udm":	"Udmurt",
      "wuu":	"Wu",
      "nrm":	"Norman",
      "kw":	"Cornish",
      "rm":	"Romansh",
      "szl":	"Silesian",
      "so":	"Somali",
      "koi":	"Komi-Permyak",
      "as":	"Assamese",
      "lad":	"Ladino",
      "mt":	"Maltese",
      "fur":	"Friulian",
      "dv":	"Divehi",
      "gn":	"Guarani",
      "dsb":	"Lower Sorbian",
      "pcd":	"Picard",
      "ie":	"Interlingue",
      "cbk-zam":	"Zamboanga Chavacano",
      "lij":	"Ligurian",
      "cdo":	"Min Dong",
      "ksh":	"Ripuarian",
      "ext":	"Extremaduran",
      "mwl":	"Mirandese",
      "gag":	"Gagauz",
      "ang":	"Anglo-Saxon",
      "ug":	"Uyghur",
      "ace":	"Acehnese",
      "pi":	"Pali",
      "pag":	"Pangasinan",
      "nv":	"Navajo",
      "frp":	"Franco-Provençal/Arpitan",
      "sn":	"Shona",
      "kab":	"Kabyle",
      "lez":	"Lezgian",
      "sd":	"Sindhi",
      "ln":	"Lingala",
      "pfl":	"Palatinate German",
      "krc":	"Karachay-Balkar",
      "xal":	"Kalmyk",
      "haw":	"Hawaiian",
      "myv":	"Erzya",
      "rw":	"Kinyarwanda",
      "kaa":	"Karakalpak",
      "pdc":	"Pennsylvania German",
      "to":	"Tongan",
      "kl":	"Greenlandic",
      "arc":	"Aramaic",
      "nov":	"Novial",
      "kbd":	"Kabardian Circassian",
      "av":	"Avar",
      "lo":	"Lao",
      "bjn":	"Banjar",
      "bxr":	"Buryat (Russia)",
      "ha":	"Hausa",
      "tet":	"Tetum",
      "tpi":	"Tok Pisin",
      "na":	"Nauruan",
      "pap":	"Papiamentu",
      "lbe":	"Lak",
      "jbo":	"Lojban",
      "ty":	"Tahitian",
      "mdf":	"Moksha",
      "roa-rup":	"Aromanian",
      "wo":	"Wolof",
      "ig":	"Igbo",
      "tyv":	"Tuvan",
      "srn":	"Sranan",
      "nso":	"Northern Sotho",
      "kg":	"Kongo",
      "ab":	"Abkhazian",
      "ltg":	"Latgalian",
      "zu":	"Zulu",
      "om":	"Oromo",
      "chy":	"Cheyenne",
      "za":	"Zhuang",
      "cu":	"Old Church Slavonic",
      "rmy":	"Romani",
      "tw":	"Twi",
      "tn":	"Tswana",
      "chr":	"Cherokee",
      "mai":	"Maithili",
      "pih":	"Norfolk",
      "got":	"Gothic",
      "bi":	"Bislama",
      "xh":	"Xhosa",
      "sm":	"Samoan",
      "ss":	"Swati",
      "mo":	"Moldovan",
      "ki":	"Kikuyu",
      "rn":	"Kirundi",
      "pnt":	"Pontic",
      "bm":	"Bambara",
      "iu":	"Inuktitut",
      "ee":	"Ewe",
      "lg":	"Luganda",
      "ts":	"Tsonga",
      "fj":	"Fijian",
      "ak":	"Akan",
      "ik":	"Inupiak",
      "sg":	"Sango",
      "st":	"Sesotho",
      "ff":	"Fula",
      "dz":	"Dzongkha",
      "ny":	"Chichewa",
      "ch":	"Chamorro",
      "ti":	"Tigrinya",
      "ve":	"Venda",
      "ks":	"Kashmiri",
      "tum":	"Tumbuka" };
};