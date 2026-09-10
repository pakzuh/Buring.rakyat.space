// Database Merchant & Kuliner Warga Buring (buring.rakyat.space)
window.BURING_MERCHANTS = [
  {
    id: "warung-mbak-ita",
    name: 'Warung "Mbak Ita"',
    owner: "Mbak Ita",
    tagline: "Spesialis Tahu Telor, Tahu Lontong & Rujak Cingur khas Jawa Timur",
    category: "Makanan Siap Santap",
    phone: "6283835758048",
    status: "open",
    schedule: "Buka Pagi s/d Malam (21.00 WIB) | Siap Antar ke Rumah",
    avatar: "🥘",
    badgeColor: "bg-amber-500",
    products: [
      {
        id: "ita-1",
        name: "Tahu Telor Lontong",
        price: 15000,
        category: "Menu Utama",
        description: "Tahu telor dadar renyah disiram bumbu petis kacang medok gurih legit + lontong & tauge",
        hasLevel: true // Cabai 0 - 5
      },
      {
        id: "ita-2",
        name: "Nasi Tahu Telor",
        price: 17000,
        category: "Menu Utama",
        description: "Tahu telor bumbu petis kacang mantap disajikan dengan nasi putih pulen hangat",
        hasLevel: true
      },
      {
        id: "ita-3",
        name: "Tahu Lontong",
        price: 15000,
        category: "Menu Utama",
        description: "Tahu goreng potong dengan lontong dan siraman bumbu petis kacang khas Jawa Timur",
        hasLevel: true
      },
      {
        id: "ita-4",
        name: "Rujak Cingur Asli",
        price: 15000,
        category: "Menu Khas",
        description: "Rujak cingur bumbu petis ulek mantap, sayuran segar, lontong, tempe, tahu & cingur sapi empuk",
        hasLevel: true
      },
      {
        id: "ita-5",
        name: "Nasi Putih Tambahan",
        price: 5000,
        category: "Pelengkap",
        description: "1 porsi nasi putih pulen hangat",
        hasLevel: false
      }
    ]
  },
  {
    id: "warung-mak-jum",
    name: "Warung Mak Jum",
    owner: "Mak Jum",
    tagline: "Aneka Sayur Matang Pagi, Gorengan Hangat & Lalapan Sambal Mantap",
    category: "Lauk Pagi & Lalapan",
    phone: "6287840748117",
    status: "open",
    schedule: "Lauk Pagi (start 06.00 WIB) | Lalapan Siang & Malam (Min Order 20k)",
    avatar: "🍲",
    badgeColor: "bg-emerald-600",
    products: [
      {
        id: "jum-1",
        name: "Mangut Nila / Nila Goreng",
        price: 10000,
        category: "Lauk Pagi",
        description: "Ikan nila bumbu kuah mangut pedas gurih atau nila goreng renyah",
        options: [
          { name: "Pilihan Masakan", choices: ["Mangut Kuah Pedas", "Goreng Renyah"] }
        ]
      },
      {
        id: "jum-2",
        name: "Mangut Lele / Lele Goreng (Isi 2 Ekor)",
        price: 15000,
        category: "Lauk Pagi",
        description: "2 ekor lele bumbu mangut santan pedas atau lele goreng bumbu ketumbar",
        options: [
          { name: "Pilihan Masakan", choices: ["Mangut Santan Pedas", "Lele Goreng Garing"] }
        ]
      },
      {
        id: "jum-3",
        name: "Balado Terong Tongkol",
        price: 10000,
        category: "Lauk Pagi",
        description: "Terong ungu lembut dan suwiran tongkol bumbu balado cabai merah",
        hasLevel: false
      },
      {
        id: "jum-4",
        name: "Sayur Sop Ayam Segar",
        price: 10000,
        category: "Lauk Pagi",
        description: "Sayur sop bening kaya wortel, kol, buncis dan suwiran ayam gurih berkaldu",
        hasLevel: false
      },
      {
        id: "jum-5",
        name: "Sambal Goreng Cecek / Kentang",
        price: 10000,
        category: "Lauk Pagi",
        description: "Tumis sambal goreng bumbu merah pedas gurih",
        options: [
          { name: "Pilihan", choices: ["Samgor Cecek Sapi", "Samgor Kentang"] }
        ]
      },
      {
        id: "jum-6",
        name: "Sayur Lodeh Khas Rumahan",
        price: 10000,
        category: "Sayur Matang",
        description: "Kuah lodeh santan gurih sedap berempah",
        options: [
          { name: "Jenis Sayur", choices: ["Lodeh Tewel Koro Ose", "Lodeh Godong So Terong Tempe"] }
        ]
      },
      {
        id: "jum-7",
        name: "Urap-Urap Sayur + Mendol",
        price: 10000,
        category: "Lauk Pagi",
        description: "Sayuran rebus segar kelapa parut berbumbu kencur + mendol tempe khas Malang",
        hasLevel: false
      },
      {
        id: "jum-8",
        name: "Nasi Pecel / Nasi Campur",
        price: 10000,
        category: "Sarapan Pagi",
        description: "Nasi bungkus praktis sarapan lengkap",
        options: [
          { name: "Menu", choices: ["Nasi Pecel Komplit", "Nasi Campur Mak Jum"] }
        ]
      },
      {
        id: "jum-9",
        name: "Aneka Gorengan Hangat (6 Biji)",
        price: 10000,
        category: "Gorengan",
        description: "Paket 6 biji gorengan hangat ready mulai jam 7 pagi (Bisa campur)",
        options: [
          { name: "Pilihan Favorit", choices: ["Campur Rata", "Dadar Jagung", "Weci / Bakwan", "Tahu Isi", "Mendoan / Tempe Kacang", "Menjes / Tape"] }
        ]
      },
      {
        id: "jum-10",
        name: "Lalapan Ayam + Nasi",
        price: 17000,
        category: "Lalapan & Sambal",
        description: "Ayam goreng gurih + nasi + tempe goreng + lalapan segar + sambal ulek pedas",
        options: [
          { name: "Pilihan Porsi", choices: ["Komplit Nasi (17K)", "Lauk Saja Tanpa Nasi (13K)"], priceDiff: [0, -4000] }
        ]
      },
      {
        id: "jum-11",
        name: "Lalapan Nila / Lele + Nasi",
        price: 17000,
        category: "Lalapan & Sambal",
        description: "Ikan goreng renyah disajikan dengan tempe, lalapan dan sambal tomat/terasi",
        options: [
          { name: "Pilihan Ikan", choices: ["Nila Goreng + Nasi (17K)", "Lele Goreng + Nasi (14K)"], priceDiff: [0, -3000] }
        ]
      },
      {
        id: "jum-12",
        name: "Lalapan Wader / Jamur Crispy + Nasi",
        price: 14000,
        category: "Lalapan & Sambal",
        description: "Wader goreng renyah kriuk atau jamur crispy + nasi + sambal lalapan",
        options: [
          { name: "Pilihan", choices: ["Lalapan Wader + Nasi (14K)", "Lalapan Jamur Crispy + Nasi (14K)"] }
        ]
      }
    ]
  },
  {
    id: "dapur-macin",
    name: "Dapur Macin",
    owner: "Bunda Macin",
    tagline: "Masakan Rumahan Fresh Harian — Higienis, Bersih & Penuh Rasa",
    category: "Lauk Rumahan Pagi",
    phone: "6282245308289",
    status: "open",
    schedule: "Pengiriman mulai jam 07.00 WIB sesuai rute Buring",
    avatar: "🥘",
    badgeColor: "bg-rose-500",
    products: [
      {
        id: "macin-1",
        name: "Kotokan Iwak Pe (Ikan Pari Asap)",
        price: 15000,
        category: "Spesial",
        description: "Ikan pari asap (iwak pe) aroma smoky gurih dimasak santan kuah pedas kental",
        hasLevel: false
      },
      {
        id: "macin-2",
        name: "Bali Ayam Tahu",
        price: 15000,
        category: "Lauk Utama",
        description: "Ayam empuk dan tahu sutra berbalut bumbu bali merah gurih manis berempah",
        hasLevel: false
      },
      {
        id: "macin-3",
        name: "Balado Tahu Telor",
        price: 15000,
        category: "Lauk Utama",
        description: "Tahu dan telur rebus berbalut sambal balado merah nikmat",
        hasLevel: false
      },
      {
        id: "macin-4",
        name: "Sayur Lodeh Rebung",
        price: 10000,
        category: "Sayur Kuah",
        description: "Rebung muda empuk tidak bau dimasak sayur lodeh santan gurih sedap",
        hasLevel: false
      },
      {
        id: "macin-5",
        name: "Sayur Bening Daun Kelor",
        price: 10000,
        category: "Sayur Bening",
        description: "Sayur bening daun kelor segar bernutrisi tinggi, ringan dan sehat untuk keluarga",
        hasLevel: false
      },
      {
        id: "macin-6",
        name: "Tumis Buncis Wortel Bakso",
        price: 10000,
        category: "Tumisan",
        description: "Buncis renyah, wortel manis dan irisan bakso sapi ditumis bumbu gurih",
        hasLevel: false
      },
      {
        id: "macin-7",
        name: "Oseng Pare Teri / Kates Pete",
        price: 10000,
        category: "Tumisan",
        description: "Tumis sayur tradisional pedas mantap",
        options: [
          { name: "Pilihan", choices: ["Oseng Pare Teri (Tidak Pahit)", "Oseng Kates Pete Pedas"] }
        ]
      }
    ]
  },
  {
    id: "mie-ayung",
    name: "Mie Ayam Bangka Ayung",
    owner: "Cak Ayung",
    tagline: "Mie Ayam Bangka asli kenyal gurih, Kwetiau & Nasi Tim — Buka 24 Jam",
    category: "Mie & Chinese Food",
    phone: "6281234567890", // Sesuai data project
    status: "open",
    schedule: "Buka 24 Jam Non-Stop | Siap Antar Buring & Sekitarnya",
    avatar: "🍜",
    badgeColor: "bg-red-600",
    products: [
      {
        id: "ayung-1",
        name: "Mie Ayam Bangka Komplit",
        price: 15000,
        category: "Mie Ayam",
        description: "Mie keriting kenyal khas Bangka dengan topping ayam cincang gurih, sawi, tauge & pangsit",
        options: [
          { name: "Varian", choices: ["Mie Ayam Biasa (15K)", "Mie Ayam Pangsit / Bakso (18K)"], priceDiff: [0, 3000] }
        ]
      },
      {
        id: "ayung-2",
        name: "Kwetiau / Bihun Ayam",
        price: 15000,
        category: "Mie & Kwetiau",
        description: "Kwetiau beras lembut atau bihun halus bumbu ayam cincang gurih lezat",
        options: [
          { name: "Pilihan", choices: ["Kwetiau Ayam", "Bihun Ayam"] }
        ]
      },
      {
        id: "ayung-3",
        name: "Nasi Tim Ayam Jamur",
        price: 18000,
        category: "Nasi Tim",
        description: "Nasi tim lembut aroma minyak wijen dengan ayam cincang dan jamur manis gurih",
        hasLevel: false
      },
      {
        id: "ayung-4",
        name: "Nasi Goreng / Mie Goreng Spesial",
        price: 16000,
        category: "Nasi Goreng",
        description: "Nasi goreng aroma wok sedap khas chinese food dengan irisan bakso dan telur",
        options: [
          { name: "Tingkat Pedas", choices: ["Tidak Pedas", "Sedang", "Pedas Mantap"] }
        ]
      }
    ]
  },
  {
    id: "ayam-laos",
    name: "Nasi Lalapan Ayam Laos & Nasi Kuning",
    owner: "Ibu Nur",
    tagline: "Ayam goreng taburan kremes laos melimpah & Nasi Kuning komplit pagi",
    category: "Lalapan & Sarapan",
    phone: "6285655866113",
    status: "open",
    schedule: "Ready Pagi jam 06.00 & Siang | Nasi Kuning Khusus Minggu Pagi",
    avatar: "🍗",
    badgeColor: "bg-yellow-600",
    products: [
      {
        id: "laos-1",
        name: "Paket Nasi Lalapan Ayam Laos",
        price: 16000,
        category: "Lalapan",
        description: "Nasi putih + ayam goreng berempah dengan serundeng laos gurih wangi + sambal pedas & lalap",
        options: [
          { name: "Potongan", choices: ["Paha Bawah", "Paha Atas", "Dada"] }
        ]
      },
      {
        id: "laos-2",
        name: "Nasi Kuning Campur Komplit (Khusus Minggu)",
        price: 12000,
        category: "Sarapan Pagi",
        description: "Nasi kuning harum santan kunyit, orek tempe, bihun, telur suwir, sambal & kerupuk",
        hasLevel: false
      }
    ]
  },
  {
    id: "sate-madura",
    name: "Sate Madura Asli Buring",
    owner: "Cak Mat",
    tagline: "Sate Ayam & Sate Kambing daging empuk bumbu kacang gurih medok",
    category: "Sate & Bakaran",
    phone: "6281805789084",
    status: "open",
    schedule: "Ready Siang s/d Malam (16.00–21.00 WIB)",
    avatar: "🍢",
    badgeColor: "bg-stone-700",
    products: [
      {
        id: "sate-1",
        name: "Sate Ayam Madura (10 Tusuk + Lontong)",
        price: 18000,
        category: "Sate Ayam",
        description: "10 tusuk sate daging ayam bakar bumbu kacang lembut manis gurih + lontong & irisan bawang cabai",
        hasLevel: false
      },
      {
        id: "sate-2",
        name: "Sate Kambing Muda (10 Tusuk)",
        price: 28000,
        category: "Sate Kambing",
        description: "10 tusuk sate kambing muda empuk tidak prengus bumbu kecap pedas atau bumbu kacang",
        options: [
          { name: "Bumbu", choices: ["Bumbu Kacang", "Bumbu Kecap Cabai Rawit"] }
        ]
      }
    ]
  },
  {
    id: "frozen-dimsum",
    name: "Frozen Food & Dimsum Buring",
    owner: "Ibu Diana",
    tagline: "Tahu Walik krispi, Dimsum Shumai ayam udang & Dimsum goreng keju lumer",
    category: "Frozen Food & Cemilan",
    phone: "6285649997471",
    status: "open",
    schedule: "Pengiriman sore hari (di atas pukul 15.00 WIB)",
    avatar: "🥟",
    badgeColor: "bg-indigo-600",
    products: [
      {
        id: "froz-1",
        name: "Tahu Walik Ayam Crispy (Isi 10 Pcs)",
        price: 15000,
        category: "Tahu Walik",
        description: "Tahu walik isi adonan ayam padat renyah garing gurih lengkap dengan cabai rawit hijau",
        hasLevel: false
      },
      {
        id: "froz-2",
        name: "Dimsum Shumai Ayam (Isi 6 Pcs)",
        price: 18000,
        category: "Dimsum",
        description: "Dimsum kukus lembut daging ayam gurih lengkap dengan saus cocolan asam manis pedas",
        hasLevel: false
      },
      {
        id: "froz-3",
        name: "Dimsum Goreng Keju Lumer (Isi 6 Pcs)",
        price: 20000,
        category: "Dimsum",
        description: "Dimsum goreng krispi dengan isian keju lumer meleleh di lidah",
        hasLevel: false
      }
    ]
  },
  {
    id: "tahu-gurih",
    name: "Tahu Gurih Siap Goreng",
    owner: "Pak Yanto",
    tagline: "Tahu bumbu gurih siap goreng — bersih, tanpa pengawet & renyah",
    category: "Kebutuhan Dapur",
    phone: "6281945788700",
    status: "open",
    schedule: "Pesan Pagi Langsung Diantar ke Rumah",
    avatar: "🧈",
    badgeColor: "bg-teal-600",
    products: [
      {
        id: "tahu-pkg1",
        name: "Paket Hemat 3 Bungkus",
        price: 10000,
        category: "Paket Hemat",
        description: "Tahu putih berbumbu rempah gurih asin, tinggal goreng garing untuk lauk keluarga",
        hasLevel: false
      },
      {
        id: "tahu-pkg2",
        name: "Paket Jumbo 5 Bungkus",
        price: 15000,
        category: "Paket Keluarga",
        description: "Lebih hemat 5 bungkus tahu gurih siap goreng untuk stok makan beberapa hari",
        hasLevel: false
      }
    ]
  },
  {
    id: "kue-mie-pedas",
    name: "Bolu & Mie Pedas Nyemek",
    owner: "Mbak Rini",
    tagline: "Bolu fresh oven aneka rasa & Mie pedas nyemek level bikin melek",
    category: "Kue & Mie",
    phone: "6287832272063",
    status: "open",
    schedule: "Buka Siang s/d Malam | Order Kapan Saja",
    avatar: "🍰",
    badgeColor: "bg-pink-600",
    products: [
      {
        id: "kue-1",
        name: "Bolu Panggang Lembut (Loyang)",
        price: 25000,
        category: "Bolu & Cake",
        description: "Bolu panggang empuk wangi butter cocok untuk teman ngeteh/ngopi keluarga",
        options: [
          { name: "Varian Rasa", choices: ["Pandan Wangi", "Blackforest Coklat", "Matcha Green Tea", "Red Velvet"] }
        ]
      },
      {
        id: "kue-2",
        name: "Mie Pedas Nyemek Gurih",
        price: 10000,
        category: "Mie Pedas",
        description: "Mie kuah nyemek bumbu pedas gurih taburan pangsit dan daun bawang",
        hasLevel: true // Cabai 0 - 5
      }
    ]
  },
  {
    id: "ayam-krispy-kacang",
    name: "Ayam Krispy & Sari Kacang Hijau",
    owner: "Mbak Sri",
    tagline: "Paket kenyang hemat anak kos & keluarga cuma 10 ribuan",
    category: "Menu Hemat",
    phone: "628885889710",
    status: "open",
    schedule: "Ready Pagi s/d Siang",
    avatar: "🍗",
    badgeColor: "bg-amber-600",
    products: [
      {
        id: "krispy-1",
        name: "Nasi Ayam Krispy + Sari Kacang Hijau",
        price: 10000,
        category: "Paket Kombo",
        description: "Nasi + ayam goreng krispy saus sambal + 1 gelas sari kacang hijau manis segar bernutrisi",
        hasLevel: false
      }
    ]
  },
  {
    id: "mlijo-buring",
    name: "Mlijo Keliling & Dapur Buring",
    owner: "Mlijo Warga",
    tagline: "Sayur mayur petik segar, bumbu dapur ulek & lauk harian antar ke depan pintu",
    category: "Sayur Mayur & Dapur",
    phone: "6281234567890",
    status: "open",
    schedule: "Keliling jam 06.00–09.00 WIB | Order Malam Ready Pagi",
    avatar: "🥬",
    badgeColor: "bg-green-600",
    products: [
      {
        id: "mlijo-1",
        name: "Paket Sayur Asem Komplit",
        price: 6000,
        category: "Paket Sayur",
        description: "Jagung manis, labu siam, kacang panjang, melinjo, daun so & bumbu asem siap masak",
        hasLevel: false
      },
      {
        id: "mlijo-2",
        name: "Paket Sayur Sop Sehat",
        price: 6000,
        category: "Paket Sayur",
        description: "Wortel, buncis, kentang, kubis, seledri & daun bawang segar",
        hasLevel: false
      },
      {
        id: "mlijo-3",
        name: "Bayam / Kangkung Segar (2 Ikat)",
        price: 5000,
        category: "Sayuran Daun",
        description: "Sayur bayam hijau segar atau kangkung hidroponik petik pagi",
        options: [
          { name: "Pilihan", choices: ["2 Ikat Bayam Segar", "2 Ikat Kangkung", "1 Bayam + 1 Kangkung"] }
        ]
      },
      {
        id: "mlijo-4",
        name: "Tempe Daun & Tahu Putih",
        price: 5000,
        category: "Lauk Mentah",
        description: "Tempe kedelai bungkus daun wangi tradisional + 1 papan tahu sutra putih",
        hasLevel: false
      }
    ]
  }
];
var BURING_MERCHANTS = window.BURING_MERCHANTS;
