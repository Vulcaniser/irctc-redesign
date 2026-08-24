/* ==========================================================================
   train-data.js
   Curated timetable snapshot researched from public timetable pages in
   August 2026. This is NOT live IRCTC/PRS availability.

   Class codes are the classes offered by the researched service. No seat
   counts or confirmation probabilities are fabricated here.
   ========================================================================== */
window.TRAIN_DATA = {
  "JP-NDLS": [
    {number:"12957",name:"Swarna Jayanti Rajdhani Express",fromCode:"JP",fromName:"Jaipur",fromTime:"02:50",toCode:"NDLS",toName:"New Delhi",toTime:"07:30",duration:"4h 40m",days:["Daily"],classes:["1A","2A","3A"]},
    {number:"22491",name:"Mandore Express",fromCode:"JP",fromName:"Jaipur",fromTime:"01:15",toCode:"DLI",toName:"Delhi",toTime:"06:45",duration:"5h 30m",days:["Daily"],classes:["1A","2A","3A","SL","3E"]},
    {number:"12250",name:"Swarn Nagari Express",fromCode:"JP",fromName:"Jaipur",fromTime:"03:30",toCode:"SSB",toName:"Shakurbasti",toTime:"09:30",duration:"6h 00m",days:["Daily"],classes:["1A","2A","3A","SL"]},
    {number:"12915",name:"Ashram Express",fromCode:"JP",fromName:"Jaipur",fromTime:"04:30",toCode:"DLI",toName:"Delhi",toTime:"10:00",duration:"5h 30m",days:["Daily"],classes:["1A","2A","3A","SL","3E"]},
    {number:"12985",name:"Double Decker Express",fromCode:"JP",fromName:"Jaipur",fromTime:"05:45",toCode:"DEE",toName:"Delhi Sarai Rohilla",toTime:"10:25",duration:"4h 40m",days:["Daily"],classes:["CC","EC"]}
  ],
  "NDLS-JP": [
    {number:"12015",name:"Ajmer Shatabdi",fromCode:"NDLS",fromName:"New Delhi",fromTime:"06:10",toCode:"JP",toName:"Jaipur",toTime:"10:35",duration:"4h 25m",days:["Daily"],classes:["CC","EC"]},
    {number:"12414",name:"Galtadham Pooja",fromCode:"DLI",fromName:"Delhi",fromTime:"04:15",toCode:"JP",toName:"Jaipur",toTime:"09:30",duration:"5h 15m",days:["Daily"],classes:["1A","2A","3A","SL","3E"]},
    {number:"15014",name:"Ranikhet Express",fromCode:"DLI",fromName:"Delhi",fromTime:"04:30",toCode:"JP",toName:"Jaipur",toTime:"10:00",duration:"5h 30m",days:["Daily"],classes:["1A","2A","3A","SL"]},
    {number:"20940",name:"SLN SBIB SF Express",fromCode:"DLI",fromName:"Delhi",fromTime:"06:20",toCode:"JP",toName:"Jaipur",toTime:"11:00",duration:"4h 40m",days:["Weekly"],classes:["2A","3A","SL"]},
    {number:"12916",name:"Ashram Express",fromCode:"DLI",fromName:"Delhi",fromTime:"14:55",toCode:"JP",toName:"Jaipur",toTime:"20:15",duration:"5h 20m",days:["Daily"],classes:["1A","2A","3A","SL","3E"]}
  ],

  "JP-LKO": [
    {number:"15270",name:"SBIB-MFP Jansadharan Express",fromCode:"JP",fromName:"Jaipur",fromTime:"04:10",toCode:"LKO",toName:"Lucknow",toTime:"15:35",duration:"11h 25m",days:["Weekly"],classes:[]},
    {number:"19201",name:"BVC AYC Express",fromCode:"JP",fromName:"Jaipur",fromTime:"04:10",toCode:"LKO",toName:"Lucknow",toTime:"15:35",duration:"11h 25m",days:["Weekly"],classes:["2A","3A","SL","3E"]},
    {number:"19601",name:"UDZ NJP Express",fromCode:"JP",fromName:"Jaipur",fromTime:"09:10",toCode:"LKO",toName:"Lucknow",toTime:"23:35",duration:"14h 25m",days:["Weekly"],classes:["2A","3A","SL","3E"]},
    {number:"14866",name:"Marudhar Express",fromCode:"JP",fromName:"Jaipur",fromTime:"13:45",toCode:"LKO",toName:"Lucknow",toTime:"01:20",duration:"11h 35m",days:["Weekly"],classes:["2A","3A","SL","3E"]},
    {number:"15716",name:"Garib Nawaz Express",fromCode:"JP",fromName:"Jaipur",fromTime:"14:10",toCode:"LKO",toName:"Lucknow",toTime:"05:15",duration:"15h 05m",days:["Weekly"],classes:["1A","2A","3A","SL","3E"]}
  ],
  "LKO-JP": [
    {number:"14853",name:"Marudhar Express",fromCode:"LKO",fromName:"Lucknow",fromTime:"00:15",toCode:"JP",toName:"Jaipur",toTime:"12:05",duration:"11h 50m",days:["Weekly"],classes:["2A","3A","SL","3E"]},
    {number:"19202",name:"AYC BVC Express",fromCode:"LKO",fromName:"Lucknow",fromTime:"01:40",toCode:"JP",toName:"Jaipur",toTime:"13:10",duration:"11h 30m",days:["Weekly"],classes:["2A","3A","SL","3E"]},
    {number:"19616",name:"Kavi Guru Express",fromCode:"LKO",fromName:"Lucknow",fromTime:"02:20",toCode:"JP",toName:"Jaipur",toTime:"15:55",duration:"13h 35m",days:["Weekly"],classes:["2A","3A","SL","3E"]},
    {number:"19270",name:"PBR Express",fromCode:"LKO",fromName:"Lucknow",fromTime:"04:25",toCode:"JP",toName:"Jaipur",toTime:"18:15",duration:"13h 50m",days:["Weekly"],classes:["1A","2A","3A","SL"]},
    {number:"15715",name:"Garib Nawaz Express",fromCode:"LKO",fromName:"Lucknow",fromTime:"04:40",toCode:"JP",toName:"Jaipur",toTime:"18:30",duration:"13h 50m",days:["Weekly"],classes:["1A","2A","3A","SL","3E"]}
  ],

  "JP-NGP": [
    {number:"20844",name:"BGKT BSP SF Express",fromCode:"JP",fromName:"Jaipur",fromTime:"07:20",toCode:"NGP",toName:"Nagpur",toTime:"02:35",duration:"19h 15m",days:["Weekly"],classes:["1A","2A","3A","SL","3E"]},
    {number:"20846",name:"BKN BSP SF Express",fromCode:"JP",fromName:"Jaipur",fromTime:"07:20",toCode:"NGP",toName:"Nagpur",toTime:"02:35",duration:"19h 15m",days:["Weekly"],classes:["1A","2A","3A","SL","3E"]},
    {number:"20498",name:"RMM Humsafar SF",fromCode:"JP",fromName:"Jaipur",fromTime:"17:30",toCode:"NGP",toName:"Nagpur",toTime:"16:30",duration:"23h 00m",days:["Weekly"],classes:["3A","SL"]},
    {number:"22176",name:"JP NGP SF Express",fromCode:"JP",fromName:"Jaipur",fromTime:"17:40",toCode:"NGP",toName:"Nagpur",toTime:"16:50",duration:"23h 10m",days:["Weekly"],classes:["2A","3A","SL"]},
    {number:"12968",name:"JP Chennai SF",fromCode:"JP",fromName:"Jaipur",fromTime:"19:35",toCode:"NGP",toName:"Nagpur",toTime:"14:10",duration:"18h 35m",days:["Daily"],classes:["1A","2A","3A","SL","3E"]}
  ],
  "NGP-JP": [
    {number:"20845",name:"BSP BKN SF Express",fromCode:"NGP",fromName:"Nagpur",fromTime:"01:30",toCode:"JP",toName:"Jaipur",toTime:"20:55",duration:"19h 25m",days:["Weekly"],classes:["1A","2A","3A","SL","3E"]},
    {number:"20843",name:"BSP BGKT SF Express",fromCode:"NGP",fromName:"Nagpur",fromTime:"01:30",toCode:"JP",toName:"Jaipur",toTime:"20:55",duration:"19h 25m",days:["Weekly"],classes:["1A","2A","3A","SL","3E"]},
    {number:"20497",name:"FZR SF Humsafar",fromCode:"NGP",fromName:"Nagpur",fromTime:"06:30",toCode:"JP",toName:"Jaipur",toTime:"05:00",duration:"22h 30m",days:["Weekly"],classes:["3A","SL"]},
    {number:"12967",name:"MAS JP SF Express",fromCode:"NGP",fromName:"Nagpur",fromTime:"15:55",toCode:"JP",toName:"Jaipur",toTime:"06:45",duration:"14h 50m",days:["Weekly"],classes:["1A","2A","3A","SL","3E"]},
    {number:"22674",name:"MQ JU SF Express",fromCode:"NGP",fromName:"Nagpur",fromTime:"16:25",toCode:"JP",toName:"Jaipur",toTime:"09:05",duration:"16h 40m",days:["Weekly"],classes:["2A","3A","SL"]}
  ],

  "JP-ADI": [
    {number:"19410",name:"GKP ADI Express",fromCode:"JP",fromName:"Jaipur",fromTime:"00:45",toCode:"SBIB",toName:"Sabarmati Bg",toTime:"09:55",duration:"9h 10m",days:["Weekly"],classes:["2A","3A","SL"]},
    {number:"12547",name:"AGC SBIB SF Express",fromCode:"JP",fromName:"Jaipur",fromTime:"02:00",toCode:"SBIB",toName:"Sabarmati Bg",toTime:"11:45",duration:"9h 45m",days:["Weekly"],classes:["2A","3A","SL","3E"]},
    {number:"19032",name:"Yoga Express",fromCode:"JP",fromName:"Jaipur",fromTime:"03:35",toCode:"SBIB",toName:"Sabarmati Bg",toTime:"15:20",duration:"11h 45m",days:["Daily"],classes:["1A","2A","3A","SL","3E"]},
    {number:"14701",name:"Aravali Express",fromCode:"JP",fromName:"Jaipur",fromTime:"09:25",toCode:"ADI",toName:"Ahmedabad Jn",toTime:"21:40",duration:"12h 15m",days:["Daily"],classes:["2A","3A","SL","3E"]},
    {number:"12958",name:"Swarna Jayanti Rajdhani Express",fromCode:"JP",fromName:"Jaipur",fromTime:"23:55",toCode:"ADI",toName:"Ahmedabad Jn",toTime:"08:05",duration:"8h 10m",days:["Daily"],classes:["1A","2A","3A"]}
  ],
  "ADI-JP": [
    {number:"14702",name:"Aravali Express",fromCode:"ADI",fromName:"Ahmedabad Jn",fromTime:"04:35",toCode:"JP",toName:"Jaipur",toTime:"17:45",duration:"13h 10m",days:["Daily"],classes:["2A","3A","SL","3E"]},
    {number:"19411",name:"GNC DLPC Express",fromCode:"GNC",fromName:"Gandhinagar Capital",fromTime:"10:00",toCode:"JP",toName:"Jaipur",toTime:"20:10",duration:"10h 10m",days:["Daily"],classes:["2A","3A","SL"]},
    {number:"19031",name:"Yoga Express",fromCode:"GNC",fromName:"Gandhinagar Capital",fromTime:"11:55",toCode:"JP",toName:"Jaipur",toTime:"22:40",duration:"10h 45m",days:["Daily"],classes:["1A","2A","3A","SL","3E"]},
    {number:"12957",name:"Swarna Jayanti Rajdhani Express",fromCode:"SBIB",fromName:"Sabarmati Bg",fromTime:"19:20",toCode:"JP",toName:"Jaipur",toTime:"02:40",duration:"7h 20m",days:["Daily"],classes:["1A","2A","3A"]},
    {number:"12915",name:"Ashram Express",fromCode:"SBIB",fromName:"Sabarmati Bg",fromTime:"19:45",toCode:"JP",toName:"Jaipur",toTime:"04:20",duration:"8h 35m",days:["Daily"],classes:["1A","2A","3A","SL","3E"]}
  ],

  "JP-BCT": [
    {number:"14701",name:"Aravali Express",fromCode:"JP",fromName:"Jaipur",fromTime:"09:25",toCode:"BDTS",toName:"Bandra Terminus",toTime:"06:15",duration:"20h 50m",days:["Daily"],classes:["2A","3A","SL","3E"]},
    {number:"12215",name:"BDTS Garib Rath",fromCode:"JP",fromName:"Jaipur",fromTime:"13:35",toCode:"BDTS",toName:"Bandra Terminus",toTime:"07:35",duration:"18h 00m",days:["Daily"],classes:["3A"]},
    {number:"12956",name:"JP MMCT SF Express",fromCode:"JP",fromName:"Jaipur",fromTime:"14:00",toCode:"MMCT",toName:"Mumbai Central",toTime:"06:55",duration:"16h 55m",days:["Daily"],classes:["1A","2A","3A","SL"]},
    {number:"12240",name:"MMCT Duronto Express",fromCode:"JP",fromName:"Jaipur",fromTime:"16:35",toCode:"MMCT",toName:"Mumbai Central",toTime:"08:20",duration:"15h 45m",days:["Daily"],classes:["2S","3E","3A","2A","1A"]},
    {number:"12980",name:"JP BDTS Express",fromCode:"JP",fromName:"Jaipur",fromTime:"20:20",toCode:"BDTS",toName:"Bandra Terminus",toTime:"13:15",duration:"16h 55m",days:["Daily"],classes:["1A","2A","3A","SL","3E"]}
  ],

  "JP-MAS":[
    {number:"12970",name:"Jaipur CBE Express",fromCode:"JP",fromName:"Jaipur",fromTime:"19:35",toCode:"MAS",toName:"Chennai Central",toTime:"08:15",duration:"36h 40m",days:["Daily"],classes:["1A","2A","3A","SL","3E"]}
  ],
  "MAS-JP":[
    {number:"12967",name:"MAS JP SF Express",fromCode:"MAS",fromName:"Chennai Central",fromTime:"17:40",toCode:"JP",toName:"Jaipur",toTime:"06:45",duration:"37h 05m",days:["Daily"],classes:["1A","2A","3A","SL","3E"]}
  ],

  "JP-HWH":[
    {number:"12308",name:"JU HWH SF Express",fromCode:"JP",fromName:"Jaipur",fromTime:"04:40",toCode:"HWH",toName:"Howrah Jn",toTime:"04:55",duration:"24h 15m",days:["Weekly"],classes:["1A","2A","3A","SL"]},
    {number:"22308",name:"BKN HWH SF Express",fromCode:"JP",fromName:"Jaipur",fromTime:"04:40",toCode:"HWH",toName:"Howrah Jn",toTime:"04:55",duration:"24h 15m",days:["Weekly"],classes:["1A","2A","3A","SL"]},
    {number:"12316",name:"Ananya Express",fromCode:"JP",fromName:"Jaipur",fromTime:"08:40",toCode:"KOAA",toName:"Kolkata",toTime:"14:50",duration:"30h 10m",days:["Weekly"],classes:["1A","2A","3A","SL","3E"]},
    {number:"12495",name:"Pratap Express",fromCode:"JP",fromName:"Jaipur",fromTime:"11:35",toCode:"KOAA",toName:"Kolkata",toTime:"13:05",duration:"25h 30m",days:["Weekly"],classes:["2A","3A","SL","3E"]},
    {number:"12988",name:"AII SDAH SF Express",fromCode:"JP",fromName:"Jaipur",fromTime:"14:40",toCode:"SDAH",toName:"Sealdah",toTime:"15:50",duration:"25h 10m",days:["Daily"],classes:["1A","2A","3A","SL","3E"]}
  ],
  "HWH-JP":[
    {number:"12315",name:"Ananya Express",fromCode:"KOAA",fromName:"Kolkata",fromTime:"13:10",toCode:"JP",toName:"Jaipur",toTime:"15:55",duration:"26h 45m",days:["Weekly"],classes:["1A","2A","3A","SL","3E"]},
    {number:"12496",name:"Pratap Express",fromCode:"KOAA",fromName:"Kolkata",fromTime:"22:45",toCode:"JP",toName:"Jaipur",toTime:"22:55",duration:"24h 10m",days:["Weekly"],classes:["2A","3A","SL","3E"]},
    {number:"12987",name:"SDAH AII SF Express",fromCode:"SDAH",fromName:"Sealdah",fromTime:"22:55",toCode:"JP",toName:"Jaipur",toTime:"23:15",duration:"24h 20m",days:["Daily"],classes:["1A","2A","3A","SL","3E"]},
    {number:"12307",name:"HWH JU Express",fromCode:"HWH",fromName:"Howrah Jn",fromTime:"23:30",toCode:"JP",toName:"Jaipur",toTime:"23:35",duration:"24h 05m",days:["Weekly"],classes:["1A","2A","3A","SL"]},
    {number:"22307",name:"HWH BKN Express",fromCode:"HWH",fromName:"Howrah Jn",fromTime:"23:30",toCode:"JP",toName:"Jaipur",toTime:"23:35",duration:"24h 05m",days:["Weekly"],classes:["1A","2A","3A","SL"]}
  ],

  "NDLS-MAS":[
    {number:"12616",name:"Grand Trunk Express",fromCode:"NDLS",fromName:"New Delhi",fromTime:"16:10",toCode:"MAS",toName:"Chennai Central",toTime:"04:40",duration:"36h 30m",days:["Daily"],classes:["1A","2A","3A","SL"]},
    {number:"12622",name:"Tamil Nadu SF Express",fromCode:"NDLS",fromName:"New Delhi",fromTime:"21:05",toCode:"MAS",toName:"Chennai Central",toTime:"06:35",duration:"33h 30m",days:["Daily"],classes:["1A","2A","3A","SL"]},
    {number:"12270",name:"MAS Duronto Express",fromCode:"NZM",fromName:"Hazrat Nizamuddin",fromTime:"15:55",toCode:"MAS",toName:"Chennai Central",toTime:"20:50",duration:"28h 55m",days:["Daily"],classes:["1A","2A","3A","SL","2S"]},
    {number:"12612",name:"MAS Garib Rath",fromCode:"NZM",fromName:"Hazrat Nizamuddin",fromTime:"15:35",toCode:"MAS",toName:"Chennai Central",toTime:"21:00",duration:"29h 25m",days:["Daily"],classes:["3A"]},
    {number:"12652",name:"Tirukkural Express",fromCode:"NZM",fromName:"Hazrat Nizamuddin",fromTime:"05:20",toCode:"TBM",toName:"Tambaram",toTime:"16:35",duration:"35h 15m",days:["Daily"],classes:["2A","3A","SL"]}
  ],

  "NDLS-GHY":[
    {number:"12424",name:"Rajdhani Express",fromCode:"NDLS",fromName:"New Delhi",fromTime:"16:20",toCode:"GHY",toName:"Guwahati",toTime:"19:10",duration:"26h 50m",days:["Daily"],classes:["1A","2A","3A"]},
    {number:"20504",name:"DBRG Rajdhani",fromCode:"NDLS",fromName:"New Delhi",fromTime:"11:25",toCode:"GHY",toName:"Guwahati",toTime:"18:15",duration:"30h 50m",days:["Weekly"],classes:["1A","2A","3A"]},
    {number:"15910",name:"Avadh Assam Express",fromCode:"DLI",fromName:"Delhi",fromTime:"07:22",toCode:"GHY",toName:"Guwahati",toTime:"00:55",duration:"41h 33m",days:["Daily"],classes:["1A","2A","3A","SL"]},
    {number:"12506",name:"North East Express",fromCode:"ANVT",fromName:"Anand Vihar Terminal",fromTime:"07:40",toCode:"KYQ",toName:"Kamakhya",toTime:"16:25",duration:"32h 45m",days:["Daily"],classes:["1A","2A","3A","SL"]},
    {number:"15657",name:"Brahmaputra Mail",fromCode:"DLI",fromName:"Delhi",fromTime:"23:40",toCode:"KYQ",toName:"Kamakhya",toTime:"13:25",duration:"37h 45m",days:["Daily"],classes:["1A","2A","3A","SL"]}
  ],
  "GHY-NDLS":[
    {number:"12423",name:"Rajdhani Express",fromCode:"GHY",fromName:"Guwahati",fromTime:"06:35",toCode:"NDLS",toName:"New Delhi",toTime:"10:30",duration:"27h 55m",days:["Daily"],classes:["1A","2A","3A"]},
    {number:"20503",name:"Rajdhani Express",fromCode:"GHY",fromName:"Guwahati",fromTime:"05:30",toCode:"NDLS",toName:"New Delhi",toTime:"13:38",duration:"32h 08m",days:["Weekly"],classes:["1A","2A","3A"]},
    {number:"14037",name:"Porvotr Sampark Kranti",fromCode:"GHY",fromName:"Guwahati",fromTime:"06:00",toCode:"NDLS",toName:"New Delhi",toTime:"12:50",duration:"30h 50m",days:["Weekly"],classes:["1A","2A","3A","SL","3E"]},
    {number:"15909",name:"Avadh Assam Express",fromCode:"GHY",fromName:"Guwahati",fromTime:"21:50",toCode:"DLI",toName:"Delhi",toTime:"15:55",duration:"42h 05m",days:["Daily"],classes:["1A","2A","3A","SL"]},
    {number:"15658",name:"Brahmaputra Express",fromCode:"KYQ",fromName:"Kamakhya",fromTime:"16:55",toCode:"DLI",toName:"Delhi",toTime:"04:50",duration:"35h 55m",days:["Daily"],classes:["1A","2A","3A","SL"]}
  ],

  "LKO-NGP":[
    {number:"12511",name:"Raptisagar Express",fromCode:"ASH",fromName:"Aishbagh",fromTime:"11:45",toCode:"NGP",toName:"Nagpur",toTime:"03:55",duration:"16h 10m",days:["Weekly"],classes:["1A","2A","3A","SL"]},
    {number:"12521",name:"Rapti Sagar Express",fromCode:"ASH",fromName:"Aishbagh",fromTime:"11:45",toCode:"NGP",toName:"Nagpur",toTime:"03:55",duration:"16h 10m",days:["Weekly"],classes:["1A","2A","3A","SL","3E"]},
    {number:"12589",name:"GKP CHZ Express",fromCode:"ASH",fromName:"Aishbagh",fromTime:"11:45",toCode:"NGP",toName:"Nagpur",toTime:"03:55",duration:"16h 10m",days:["Weekly"],classes:["1A","2A","3A","SL"]},
    {number:"12591",name:"GKP YPR Express",fromCode:"ASH",fromName:"Aishbagh",fromTime:"11:45",toCode:"NGP",toName:"Nagpur",toTime:"03:55",duration:"16h 10m",days:["Weekly"],classes:["1A","2A","3A","SL"]},
    {number:"12540",name:"LKO YPR Express",fromCode:"LKO",fromName:"Lucknow",fromTime:"20:25",toCode:"NGP",toName:"Nagpur",toTime:"15:20",duration:"18h 55m",days:["Weekly"],classes:["2A","3A","SL"]}
  ],
  "NGP-LKO":[
    {number:"16093",name:"MAS LJN Express",fromCode:"NGP",fromName:"Nagpur",fromTime:"02:15",toCode:"LJN",toName:"Lucknow Ne",toTime:"20:20",duration:"18h 05m",days:["Weekly"],classes:["2A","3A","SL"]},
    {number:"12590",name:"CHZ GKP SF Express",fromCode:"NGP",fromName:"Nagpur",fromTime:"06:25",toCode:"ASH",toName:"Aishbagh",toTime:"00:48",duration:"18h 23m",days:["Weekly"],classes:["1A","2A","3A","SL"]},
    {number:"07075",name:"HYB GKP Special",fromCode:"NGP",fromName:"Nagpur",fromTime:"06:30",toCode:"ASH",toName:"Aishbagh",toTime:"00:48",duration:"18h 18m",days:["Weekly"],classes:["2A","3A","SL"]},
    {number:"22075",name:"GKP Amrit Bharat",fromCode:"NGP",fromName:"Nagpur",fromTime:"06:30",toCode:"ASH",toName:"Aishbagh",toTime:"00:48",duration:"18h 18m",days:["Weekly"],classes:["SL"]},
    {number:"12539",name:"YPR LKO Express",fromCode:"NGP",fromName:"Nagpur",fromTime:"13:10",toCode:"LKO",toName:"Lucknow",toTime:"10:55",duration:"21h 45m",days:["Weekly"],classes:["2A","3A","SL"]}
  ],
  "LKO-ADI":[
    {number:"19270",name:"PBR Express",fromCode:"LKO",fromName:"Lucknow",fromTime:"04:25",toCode:"CLDY",toName:"Chandlodiya",toTime:"04:33",duration:"24h 08m",days:["Weekly"],classes:["1A","2A","3A","SL"]},
    {number:"19402",name:"LKO ADI Express",fromCode:"LKO",fromName:"Lucknow",fromTime:"22:50",toCode:"SBIB",toName:"Sabarmati Bg",toTime:"23:05",duration:"24h 15m",days:["Weekly"],classes:["2A","3A","SL"]},
    {number:"19168",name:"Sabarmati Express",fromCode:"LKO",fromName:"Lucknow",fromTime:"23:10",toCode:"ADI",toName:"Ahmedabad",toTime:"00:55",duration:"25h 45m",days:["Weekly"],classes:["1A","2A","3A","SL","3E"]}
  ],
  "ADI-LKO":[
    {number:"15046",name:"OKHA GKP Express",fromCode:"ADI",fromName:"Ahmedabad",fromTime:"08:15",toCode:"BNZ",toName:"Badshahnagar",toTime:"14:05",duration:"29h 50m",days:["Weekly"],classes:["1A","2A","3A","SL"]},
    {number:"19401",name:"SBIB Lucknow Express",fromCode:"SBIB",fromName:"Sabarmati Bg",fromTime:"10:35",toCode:"LKO",toName:"Lucknow",toTime:"10:55",duration:"24h 20m",days:["Weekly"],classes:["2A","3A","SL"]},
    {number:"19167",name:"Sabarmati Express",fromCode:"ADI",fromName:"Ahmedabad",fromTime:"23:10",toCode:"LKO",toName:"Lucknow",toTime:"01:00",duration:"25h 50m",days:["Weekly"],classes:["1A","2A","3A","SL"]}
  ],
  "LKO-BCT":[
    {number:"20104",name:"GKP LTT SF Express",fromCode:"ASH",fromName:"Aishbagh",fromTime:"04:08",toCode:"LTT",toName:"Mumbai LTT",toTime:"04:35",duration:"24h 27m",days:["Daily"],classes:["2A","3A","SL"]},
    {number:"12174",name:"Udyog Nagri Express",fromCode:"LKO",fromName:"Lucknow",fromTime:"05:35",toCode:"LTT",toName:"Mumbai LTT",toTime:"05:30",duration:"23h 55m",days:["Daily"],classes:["2A","3A","SL"]},
    {number:"12144",name:"LTT Express",fromCode:"LKO",fromName:"Lucknow",fromTime:"06:40",toCode:"LTT",toName:"Mumbai LTT",toTime:"07:25",duration:"24h 45m",days:["Weekly"],classes:["2A","3A","SL"]},
    {number:"12533",name:"Pushpak Express",fromCode:"GTNR",fromName:"Gomtinagar",fromTime:"20:45",toCode:"CSMT",toName:"Mumbai CSMT",toTime:"22:45",duration:"26h 00m",days:["Daily"],classes:["1A","2A","3A","SL","3E"]},
    {number:"19038",name:"Avadh Express",fromCode:"GTNR",fromName:"Gomtinagar",fromTime:"23:18",toCode:"BDTS",toName:"Bandra Terminus",toTime:"04:05",duration:"28h 47m",days:["Daily"],classes:["1A","2A","3A","SL","3E"]}
  ],
  "BCT-LKO":[
    {number:"12143",name:"LTT Express",fromCode:"LTT",fromName:"Mumbai LTT",fromTime:"23:55",toCode:"LKO",toName:"Lucknow",toTime:"00:40",duration:"24h 45m",days:["Weekly"],classes:["2A","3A","SL"]},
    {number:"12534",name:"Pushpak Express",fromCode:"CSMT",fromName:"Mumbai CSMT",fromTime:"08:00",toCode:"GTNR",toName:"Gomtinagar",toTime:"09:30",duration:"25h 30m",days:["Daily"],classes:["1A","2A","3A","SL","3E"]},
    {number:"19037",name:"Avadh Express",fromCode:"BDTS",fromName:"Bandra Terminus",fromTime:"23:55",toCode:"GTNR",toName:"Gomtinagar",toTime:"05:00",duration:"29h 05m",days:["Daily"],classes:["1A","2A","3A","SL","3E"]}
  ],
  "LKO-MAS":[
    {number:"12521",name:"Rapti Sagar Express",fromCode:"ASH",fromName:"Aishbagh",fromTime:"11:45",toCode:"MAS",toName:"Chennai Central",toTime:"22:40",duration:"34h 55m",days:["Weekly"],classes:["1A","2A","3A","SL","3E"]},
    {number:"16094",name:"LJN MAS Express",fromCode:"LJN",fromName:"Lucknow Ne",fromTime:"16:20",toCode:"MAS",toName:"Chennai Central",toTime:"07:00",duration:"38h 40m",days:["Weekly"],classes:["2A","3A","SL"]},
    {number:"12540",name:"LKO YPR Express",fromCode:"LKO",fromName:"Lucknow",fromTime:"20:25",toCode:"PER",toName:"Perambur",toTime:"09:05",duration:"36h 40m",days:["Weekly"],classes:["2A","3A","SL"]}
  ],
  "MAS-LKO":[
    {number:"16093",name:"MAS LJN Express",fromCode:"MAS",fromName:"Chennai Central",fromTime:"05:10",toCode:"LJN",toName:"Lucknow Ne",toTime:"20:20",duration:"39h 10m",days:["Weekly"],classes:["2A","3A","SL"]},
    {number:"12512",name:"Raptisagar SF Express",fromCode:"MAS",fromName:"Chennai Central",fromTime:"23:35",toCode:"BNZ",toName:"Badshahnagar",toTime:"10:10",duration:"34h 35m",days:["Weekly"],classes:["1A","2A","3A","SL"]}
  ],

  "NGP-ADI":[
    {number:"12656",name:"Navjeevan SF Express",fromCode:"NGP",fromName:"Nagpur",fromTime:"02:05",toCode:"ADI",toName:"Ahmedabad",toTime:"18:00",duration:"15h 55m",days:["Daily"],classes:["1A","2A","3A","SL"]},
    {number:"12994",name:"Puri GIMB SF",fromCode:"NGP",fromName:"Nagpur",fromTime:"14:50",toCode:"ADI",toName:"Ahmedabad",toTime:"06:10",duration:"15h 20m",days:["Weekly"],classes:["2A","3A","SL"]},
    {number:"20823",name:"Puri AII SF",fromCode:"NGP",fromName:"Nagpur",fromTime:"17:45",toCode:"ADI",toName:"Ahmedabad",toTime:"09:25",duration:"15h 40m",days:["Weekly"],classes:["2A","3A","SL"]},
    {number:"12834",name:"HWH ADI SF Express",fromCode:"NGP",fromName:"Nagpur",fromTime:"19:00",toCode:"ADI",toName:"Ahmedabad",toTime:"12:15",duration:"17h 15m",days:["Daily"],classes:["2A","3A","SL"]}
  ],
  "ADI-NGP":[
    {number:"12833",name:"ADI HWH Express",fromCode:"ADI",fromName:"Ahmedabad",fromTime:"00:25",toCode:"NGP",toName:"Nagpur",toTime:"18:00",duration:"17h 35m",days:["Daily"],classes:["2A","3A","SL"]},
    {number:"22939",name:"OKHA BSP SF Express",fromCode:"ADI",fromName:"Ahmedabad",fromTime:"04:00",toCode:"NGP",toName:"Nagpur",toTime:"20:05",duration:"16h 05m",days:["Weekly"],classes:["1A","2A","3A","SL","3E"]},
    {number:"20804",name:"GIMB VSKP SF Express",fromCode:"ADI",fromName:"Ahmedabad",fromTime:"04:00",toCode:"NGP",toName:"Nagpur",toTime:"18:33",duration:"14h 33m",days:["Weekly"],classes:["1A","2A","3A","SL","3E"]},
    {number:"12655",name:"Navjeevan Express",fromCode:"ADI",fromName:"Ahmedabad",fromTime:"21:25",toCode:"NGP",toName:"Nagpur",toTime:"11:57",duration:"14h 32m",days:["Daily"],classes:["1A","2A","3A","SL"]}
  ],
  "NGP-BCT":[
    {number:"12812",name:"HTE LTT Express",fromCode:"NGP",fromName:"Nagpur",fromTime:"00:05",toCode:"LTT",toName:"Mumbai LTT",toTime:"13:00",duration:"12h 55m",days:["Daily"],classes:["1A","2A","3A","SL","3E"]},
    {number:"12860",name:"Gitanjali Express",fromCode:"NGP",fromName:"Nagpur",fromTime:"07:45",toCode:"CSMT",toName:"Mumbai CSMT",toTime:"21:20",duration:"13h 35m",days:["Daily"],classes:["2A","3A","SL","3E"]},
    {number:"12870",name:"HWH CSMT SF Express",fromCode:"NGP",fromName:"Nagpur",fromTime:"08:10",toCode:"CSMT",toName:"Mumbai CSMT",toTime:"23:45",duration:"15h 35m",days:["Daily"],classes:["1A","2A","3A","SL"]}
  ],

  /* Existing project route data + researched timetable */
  "GHY-NDLS":[
    {number:"12423",name:"Rajdhani Express",fromCode:"GHY",fromName:"Guwahati",fromTime:"06:35",toCode:"NDLS",toName:"New Delhi",toTime:"10:30",duration:"27h 55m",days:["Daily"],classes:["1A","2A","3A"]},
    {number:"20503",name:"Rajdhani Express",fromCode:"GHY",fromName:"Guwahati",fromTime:"05:30",toCode:"NDLS",toName:"New Delhi",toTime:"13:38",duration:"32h 08m",days:["Weekly"],classes:["1A","2A","3A"]},
    {number:"14037",name:"Porvotr Sampark Kranti",fromCode:"GHY",fromName:"Guwahati",fromTime:"06:00",toCode:"NDLS",toName:"New Delhi",toTime:"12:50",duration:"30h 50m",days:["Weekly"],classes:["1A","2A","3A","SL","3E"]},
    {number:"15909",name:"Avadh Assam Express",fromCode:"GHY",fromName:"Guwahati",fromTime:"21:50",toCode:"DLI",toName:"Delhi",toTime:"15:55",duration:"42h 05m",days:["Daily"],classes:["1A","2A","3A","SL"]},
    {number:"15658",name:"Brahmaputra Express",fromCode:"KYQ",fromName:"Kamakhya",fromTime:"16:55",toCode:"DLI",toName:"Delhi",toTime:"04:50",duration:"35h 55m",days:["Daily"],classes:["1A","2A","3A","SL"]}
  ],
  "NDLS-GHY":[
    {number:"12424",name:"Rajdhani Express",fromCode:"NDLS",fromName:"New Delhi",fromTime:"16:20",toCode:"GHY",toName:"Guwahati",toTime:"19:10",duration:"26h 50m",days:["Daily"],classes:["1A","2A","3A"]},
    {number:"20504",name:"DBRG Rajdhani",fromCode:"NDLS",fromName:"New Delhi",fromTime:"11:25",toCode:"GHY",toName:"Guwahati",toTime:"18:15",duration:"30h 50m",days:["Weekly"],classes:["1A","2A","3A"]},
    {number:"15910",name:"Avadh Assam Express",fromCode:"DLI",fromName:"Delhi",fromTime:"07:22",toCode:"GHY",toName:"Guwahati",toTime:"00:55",duration:"41h 33m",days:["Daily"],classes:["1A","2A","3A","SL"]},
    {number:"12506",name:"North East Express",fromCode:"ANVT",fromName:"Anand Vihar Terminal",fromTime:"07:40",toCode:"KYQ",toName:"Kamakhya",toTime:"16:25",duration:"32h 45m",days:["Daily"],classes:["1A","2A","3A","SL"]},
    {number:"15657",name:"Brahmaputra Mail",fromCode:"DLI",fromName:"Delhi",fromTime:"23:40",toCode:"KYQ",toName:"Kamakhya",toTime:"13:25",duration:"37h 45m",days:["Daily"],classes:["1A","2A","3A","SL"]}
  ],

  "NDLS-BCT":[
    {number:"12904",name:"Golden Temple Mail",fromCode:"NZM",fromName:"Hazrat Nizamuddin",fromTime:"04:00",toCode:"BDTS",toName:"Bandra Terminus",toTime:"23:55",duration:"19h 55m",days:["Daily"],classes:["1A","2A","3A","SL"]},
    {number:"12138",name:"Punjab Mail",fromCode:"NDLS",fromName:"New Delhi",fromTime:"05:10",toCode:"CSMT",toName:"Mumbai CSMT",toTime:"07:35",duration:"26h 25m",days:["Daily"],classes:["1A","2A","3A","SL"]}
  ],
  "BCT-NDLS":[
    {number:"19019",name:"BDTS HW Express",fromCode:"BDTS",fromName:"Bandra Terminus",fromTime:"00:20",toCode:"NZM",toName:"Hazrat Nizamuddin",toTime:"02:35",duration:"26h 15m",days:["Daily"],classes:["1A","2A","3A","SL","3E"]},
    {number:"12217",name:"Sampark Kranti",fromCode:"PNVL",fromName:"Panvel",fromTime:"10:35",toCode:"NDLS",toName:"New Delhi",toTime:"06:10",duration:"19h 35m",days:["Daily"],classes:["1A","2A","3A","SL","3E"]},
    {number:"12471",name:"Swaraj Express",fromCode:"BDTS",fromName:"Bandra Terminus",fromTime:"11:00",toCode:"NDLS",toName:"New Delhi",toTime:"05:25",duration:"18h 25m",days:["Daily"],classes:["1A","2A","3A","SL","3E"]}
  ],

  "MAS-SBC":[
    {number:"12027",name:"Chennai Central - Bangalore City Shatabdi",fromCode:"MAS",fromName:"Chennai Central",fromTime:"05:50",toCode:"SBC",toName:"Bangalore City Jn",toTime:"10:35",duration:"4h 45m",days:["Daily"],classes:["CC","EC"]}
  ],
  "SBC-MAS":[
    {number:"12028",name:"Bangalore City - Chennai Central Shatabdi",fromCode:"SBC",fromName:"Bangalore City Jn",fromTime:"16:25",toCode:"MAS",toName:"Chennai Central",toTime:"21:00",duration:"4h 35m",days:["Daily"],classes:["CC","EC"]}
  ],

  "ADI-BCT": [
    {number:"12268",name:"MMCT Duronto Express",fromCode:"ADI",fromName:"Ahmedabad Jn",fromTime:"01:10",toCode:"MMCT",toName:"Mumbai Central",toTime:"08:05",duration:"6h 55m",days:["Daily"],classes:["1A","2A","3A","3E","2S"]},
    {number:"12934",name:"Karnavati Express",fromCode:"ADI",fromName:"Ahmedabad Jn",fromTime:"05:00",toCode:"MMCT",toName:"Mumbai Central",toTime:"12:20",duration:"7h 20m",days:["Daily"],classes:["CC","2S"]},
    {number:"12932",name:"Ahmedabad-Mumbai Central Double Decker",fromCode:"ADI",fromName:"Ahmedabad Jn",fromTime:"05:50",toCode:"MMCT",toName:"Mumbai Central",toTime:"13:05",duration:"7h 15m",days:["Daily"],classes:["CC","EC"]},
    {number:"22962",name:"Vande Bharat Express",fromCode:"ADI",fromName:"Ahmedabad Jn",fromTime:"06:10",toCode:"MMCT",toName:"Mumbai Central",toTime:"11:35",duration:"5h 25m",days:["Daily"],classes:["CC","EC"]},
    {number:"82902",name:"IRCTC Tejas Express",fromCode:"ADI",fromName:"Ahmedabad Jn",fromTime:"06:40",toCode:"MMCT",toName:"Mumbai Central",toTime:"13:05",duration:"6h 25m",days:["Daily"],classes:["CC","EC"]}
  ],

  "BCT-ADI": [
    {number:"20901",name:"Vande Bharat Express",fromCode:"MMCT",fromName:"Mumbai Central",fromTime:"06:00",toCode:"ADI",toName:"Ahmedabad Jn",toTime:"11:35",duration:"5h 35m",days:["Daily"],classes:["CC","EC"]},
    {number:"12009",name:"ADI Shatabdi Express",fromCode:"MMCT",fromName:"Mumbai Central",fromTime:"06:20",toCode:"ADI",toName:"Ahmedabad Jn",toTime:"12:40",duration:"6h 20m",days:["Daily"],classes:["CC","EC"]},
    {number:"22953",name:"Gujarat SF Express",fromCode:"MMCT",fromName:"Mumbai Central",fromTime:"05:40",toCode:"ADI",toName:"Ahmedabad Jn",toTime:"14:30",duration:"8h 50m",days:["Daily"],classes:["CC","2S"]},
    {number:"22903",name:"Bhurj AC SF Express",fromCode:"BVI",fromName:"Borivali",fromTime:"00:15",toCode:"ADI",toName:"Ahmedabad Jn",toTime:"06:30",duration:"6h 15m",days:["Daily"],classes:["1A","2A","3A","3E"]}
  ],

  "ADI-MAS": [
    {number:"22920",name:"ADI MAS Humsafar",fromCode:"ADI",fromName:"Ahmedabad Jn",fromTime:"09:40",toCode:"MAS",toName:"MGR Chennai Central",toTime:"15:05",duration:"29h 25m",days:["Daily"],classes:["3A","SL","2S"]},
    {number:"20954",name:"ADI MAS SF Express",fromCode:"ADI",fromName:"Ahmedabad Jn",fromTime:"09:40",toCode:"MAS",toName:"MGR Chennai Central",toTime:"15:25",duration:"29h 45m",days:["Daily"],classes:["2A","3A","SL","3E"]},
    {number:"20626",name:"Bhagat Ki Kothi-MAS SF Express",fromCode:"SBIB",fromName:"Sabarmati Bg",fromTime:"13:35",toCode:"MAS",toName:"MGR Chennai Central",toTime:"23:15",duration:"33h 40m",days:["Weekly"],classes:["2A","3A","SL","3E"]},
    {number:"12655",name:"Navjeevan Express",fromCode:"ADI",fromName:"Ahmedabad Jn",fromTime:"21:25",toCode:"MAS",toName:"MGR Chennai Central",toTime:"05:10",duration:"31h 45m",days:["Daily"],classes:["1A","2A","3A","SL"]},
    {number:"22664",name:"Jodhpur-Chennai Egmore SF Express",fromCode:"ADI",fromName:"Ahmedabad Jn",fromTime:"08:00",toCode:"TBM",toName:"Tambaram",toTime:"17:10",duration:"33h 10m",days:["Weekly"],classes:["2A","3A","SL"]}
  ],

  "MAS-ADI": [
    {number:"12656",name:"Navjeevan SF Express",fromCode:"MAS",fromName:"MGR Chennai Central",fromTime:"10:10",toCode:"ADI",toName:"Ahmedabad Jn",toTime:"18:00",duration:"31h 50m",days:["Daily"],classes:["1A","2A","3A","SL"]},
    {number:"22919",name:"ADI Humsafar",fromCode:"MAS",fromName:"MGR Chennai Central",fromTime:"16:00",toCode:"ADI",toName:"Ahmedabad Jn",toTime:"21:15",duration:"29h 15m",days:["Weekly"],classes:["3A","SL","2S"]},
    {number:"20953",name:"MAS ADI SF Express",fromCode:"MAS",fromName:"MGR Chennai Central",fromTime:"22:40",toCode:"ADI",toName:"Ahmedabad Jn",toTime:"03:20",duration:"28h 40m",days:["Weekly"],classes:["2A","3A","SL","3E"]},
    {number:"20625",name:"MAS-BGKT SF Express",fromCode:"MAS",fromName:"MGR Chennai Central",fromTime:"19:35",toCode:"SBIB",toName:"Sabarmati Bg",toTime:"02:05",duration:"30h 30m",days:["Weekly"],classes:["2A","3A","SL","3E"]}
  ],

  "ADI-NDLS": [
    {number:"12957",name:"Swarna Jayanti Rajdhani Express",fromCode:"SBIB",fromName:"Sabarmati Bg",fromTime:"19:20",toCode:"NDLS",toName:"New Delhi",toTime:"07:30",duration:"12h 10m",days:["Daily"],classes:["1A","2A","3A"]},
    {number:"12917",name:"Gujarat Sampark Kranti Express",fromCode:"ADI",fromName:"Ahmedabad Jn",fromTime:"15:30",toCode:"NZM",toName:"Hazrat Nizamuddin",toTime:"05:50",duration:"14h 20m",days:["Weekly"],classes:["1A","2A","3A","SL","3E"]},
    {number:"12915",name:"Ashram Express",fromCode:"SBIB",fromName:"Sabarmati Bg",fromTime:"19:45",toCode:"DLI",toName:"Delhi",toTime:"10:00",duration:"14h 15m",days:["Daily"],classes:["1A","2A","3A","SL","3E"]},
    {number:"19031",name:"Yoga Express",fromCode:"GNC",fromName:"Gandhinagar Capital",fromTime:"11:55",toCode:"DSA",toName:"Shahdara",toTime:"05:19",duration:"17h 24m",days:["Daily"],classes:["1A","2A","3A","SL","3E"]},
    {number:"12475",name:"Sarvodaya SF Express",fromCode:"ADI",fromName:"Ahmedabad Jn",fromTime:"14:25",toCode:"NDLS",toName:"New Delhi",toTime:"05:25",duration:"15h 00m",days:["Weekly"],classes:["1A","2A","3A","SL","3E"]}
  ],

  "NDLS-ADI": [
    {number:"12958",name:"Swarna Jayanti Rajdhani Express",fromCode:"NDLS",fromName:"New Delhi",fromTime:"19:55",toCode:"SBIB",toName:"Sabarmati Bg",toTime:"08:05",duration:"12h 10m",days:["Daily"],classes:["1A","2A","3A"]},
    {number:"12916",name:"Ashram Express",fromCode:"DLI",fromName:"Delhi",fromTime:"14:55",toCode:"SBIB",toName:"Sabarmati Bg",toTime:"05:45",duration:"14h 50m",days:["Daily"],classes:["1A","2A","3A","SL","3E"]},
    {number:"12474",name:"Sarvodaya SF Express",fromCode:"NDLS",fromName:"New Delhi",fromTime:"21:40",toCode:"ADI",toName:"Ahmedabad Jn",toTime:"12:05",duration:"14h 25m",days:["Weekly"],classes:["1A","2A","3A","SL","3E"]},
    {number:"20940",name:"SLN SBIB SF Express",fromCode:"DLI",fromName:"Delhi",fromTime:"06:20",toCode:"SBIB",toName:"Sabarmati Bg",toTime:"21:20",duration:"15h 00m",days:["Weekly"],classes:["2A","3A","SL"]}
  ],

  "NDLS-LKO": [
    {number:"12004",name:"New Delhi-Lucknow Shatabdi Express",fromCode:"NDLS",fromName:"New Delhi",fromTime:"06:10",toCode:"LJN",toName:"Lucknow Ne",toTime:"13:00",duration:"6h 50m",days:["Daily"],classes:["CC","EC"]},
    {number:"22426",name:"Anand Vihar-Lucknow Vande Bharat Express",fromCode:"ANVT",fromName:"Anand Vihar Terminal",fromTime:"06:10",toCode:"LKO",toName:"Lucknow",toTime:"12:35",duration:"6h 25m",days:["Daily"],classes:["CC","EC"]},
    {number:"12430",name:"New Delhi-Lucknow AC SF Express",fromCode:"NDLS",fromName:"New Delhi",fromTime:"23:25",toCode:"LKO",toName:"Lucknow",toTime:"07:25",duration:"8h 00m",days:["Daily"],classes:["1A","2A","3A","3E"]},
    {number:"12230",name:"Lucknow Mail",fromCode:"NDLS",fromName:"New Delhi",fromTime:"22:00",toCode:"LKO",toName:"Lucknow",toTime:"06:40",duration:"8h 40m",days:["Daily"],classes:["1A","2A","3A","SL","3E"]},
    {number:"12876",name:"Neelanchal Express",fromCode:"ANVT",fromName:"Anand Vihar Terminal",fromTime:"07:30",toCode:"LKO",toName:"Lucknow",toTime:"15:00",duration:"7h 30m",days:["Weekly"],classes:["1A","2A","3A","SL","3E"]}
  ],

  "LKO-NDLS": [
    {number:"12003",name:"Lucknow-New Delhi Shatabdi Express",fromCode:"LJN",fromName:"Lucknow Ne",fromTime:"15:55",toCode:"NDLS",toName:"New Delhi",toTime:"22:45",duration:"6h 50m",days:["Daily"],classes:["CC","EC"]},
    {number:"22425",name:"Lucknow-Anand Vihar Vande Bharat Express",fromCode:"LKO",fromName:"Lucknow",fromTime:"14:35",toCode:"ANVT",toName:"Anand Vihar Terminal",toTime:"20:50",duration:"6h 15m",days:["Daily"],classes:["CC","EC"]},
    {number:"12429",name:"Lucknow-New Delhi AC SF Express",fromCode:"LKO",fromName:"Lucknow",fromTime:"23:30",toCode:"NDLS",toName:"New Delhi",toTime:"07:30",duration:"8h 00m",days:["Daily"],classes:["1A","2A","3A","3E"]},
    {number:"12229",name:"Lucknow Mail",fromCode:"LKO",fromName:"Lucknow",fromTime:"22:00",toCode:"NDLS",toName:"New Delhi",toTime:"06:45",duration:"8h 45m",days:["Daily"],classes:["1A","2A","3A","SL","3E"]}
  ],

  "NDLS-NGP": [
    {number:"12434",name:"Chennai Rajdhani Express",fromCode:"NZM",fromName:"Hazrat Nizamuddin",fromTime:"15:35",toCode:"NGP",toName:"Nagpur",toTime:"05:05",duration:"13h 30m",days:["Weekly"],classes:["1A","2A","3A"]},
    {number:"12270",name:"MGR Chennai Central Duronto Express",fromCode:"NZM",fromName:"Hazrat Nizamuddin",fromTime:"15:55",toCode:"NGP",toName:"Nagpur",toTime:"05:35",duration:"13h 40m",days:["Weekly"],classes:["1A","2A","3A","SL","2S"]},
    {number:"12724",name:"Telangana Express",fromCode:"NDLS",fromName:"New Delhi",fromTime:"16:00",toCode:"NGP",toName:"Nagpur",toTime:"07:10",duration:"15h 10m",days:["Daily"],classes:["1A","2A","3A","SL"]},
    {number:"20806",name:"AP Express",fromCode:"NDLS",fromName:"New Delhi",fromTime:"20:00",toCode:"NGP",toName:"Nagpur",toTime:"10:25",duration:"14h 25m",days:["Daily"],classes:["1A","2A","3A","SL"]},
    {number:"12622",name:"Tamil Nadu SF Express",fromCode:"NDLS",fromName:"New Delhi",fromTime:"21:05",toCode:"NGP",toName:"Nagpur",toTime:"13:05",duration:"16h 00m",days:["Daily"],classes:["1A","2A","3A","SL"]}
  ],

  "NGP-NDLS": [
    {number:"12433",name:"Chennai Rajdhani Express",fromCode:"NGP",fromName:"Nagpur",fromTime:"20:30",toCode:"NZM",toName:"Hazrat Nizamuddin",toTime:"10:30",duration:"14h 00m",days:["Weekly"],classes:["1A","2A","3A"]},
    {number:"12611",name:"NZM Garib Rath",fromCode:"NGP",fromName:"Nagpur",fromTime:"20:30",toCode:"NZM",toName:"Hazrat Nizamuddin",toTime:"10:30",duration:"14h 00m",days:["Weekly"],classes:["3A"]},
    {number:"12723",name:"Telangana SF Express",fromCode:"NGP",fromName:"Nagpur",fromTime:"15:25",toCode:"NDLS",toName:"New Delhi",toTime:"08:00",duration:"16h 35m",days:["Daily"],classes:["1A","2A","3A","SL"]},
    {number:"12649",name:"Karnataka Sampark Kranti Express",fromCode:"NGP",fromName:"Nagpur",fromTime:"17:10",toCode:"NZM",toName:"Hazrat Nizamuddin",toTime:"08:10",duration:"15h 00m",days:["Weekly"],classes:["1A","2A","3A","SL","3E"]},
    {number:"12441",name:"BSP-NDLS Rajdhani Express",fromCode:"NGP",fromName:"Nagpur",fromTime:"20:35",toCode:"NDLS",toName:"New Delhi",toTime:"10:40",duration:"14h 05m",days:["Weekly"],classes:["1A","2A","3A"]}
  ],

  "BCT-NGP": [
    {number:"12859",name:"Gitanjali Express",fromCode:"CSMT",fromName:"Mumbai CSMT",fromTime:"06:00",toCode:"NGP",toName:"Nagpur",toTime:"18:55",duration:"12h 55m",days:["Daily"],classes:["1A","2A","3A","SL"]},
    {number:"12139",name:"Sewagram SF Express",fromCode:"CSMT",fromName:"Mumbai CSMT",fromTime:"14:55",toCode:"NGP",toName:"Nagpur",toTime:"05:45",duration:"14h 50m",days:["Daily"],classes:["1A","2A","3A","SL"]},
    {number:"12105",name:"Vidarbha SF Express",fromCode:"CSMT",fromName:"Mumbai CSMT",fromTime:"19:05",toCode:"NGP",toName:"Nagpur",toTime:"08:55",duration:"13h 50m",days:["Daily"],classes:["1A","2A","3A","SL"]},
    {number:"12289",name:"Mumbai CSMT-Nagpur Duronto Express",fromCode:"CSMT",fromName:"Mumbai CSMT",fromTime:"20:15",toCode:"NGP",toName:"Nagpur",toTime:"07:20",duration:"11h 05m",days:["Daily"],classes:["1A","2A","3A","SL"]},
    {number:"12809",name:"Howrah Mail",fromCode:"CSMT",fromName:"Mumbai CSMT",fromTime:"21:10",toCode:"NGP",toName:"Nagpur",toTime:"11:20",duration:"14h 10m",days:["Daily"],classes:["1A","2A","3A","SL"]}
  ],

  "NGP-BCT": [
    {number:"12860",name:"Gitanjali Express",fromCode:"NGP",fromName:"Nagpur",fromTime:"08:05",toCode:"CSMT",toName:"Mumbai CSMT",toTime:"20:30",duration:"12h 25m",days:["Daily"],classes:["1A","2A","3A","SL"]},
    {number:"12106",name:"Vidarbha SF Express",fromCode:"NGP",fromName:"Nagpur",fromTime:"18:10",toCode:"CSMT",toName:"Mumbai CSMT",toTime:"07:20",duration:"13h 10m",days:["Daily"],classes:["1A","2A","3A","SL"]},
    {number:"12140",name:"Sewagram SF Express",fromCode:"NGP",fromName:"Nagpur",fromTime:"21:15",toCode:"CSMT",toName:"Mumbai CSMT",toTime:"12:05",duration:"14h 50m",days:["Daily"],classes:["1A","2A","3A","SL"]},
    {number:"12290",name:"Nagpur-Mumbai CSMT Duronto Express",fromCode:"NGP",fromName:"Nagpur",fromTime:"21:20",toCode:"CSMT",toName:"Mumbai CSMT",toTime:"08:30",duration:"11h 10m",days:["Daily"],classes:["1A","2A","3A","SL"]}
  ],

  "BCT-MAS": [
    {number:"22159",name:"Chennai Express",fromCode:"CSMT",fromName:"Mumbai CSMT",fromTime:"12:45",toCode:"MAS",toName:"MGR Chennai Central",toTime:"10:30",duration:"21h 45m",days:["Daily"],classes:["1A","2A","3A","SL"]},
    {number:"11041",name:"Mumbai-Chennai Express",fromCode:"CSMT",fromName:"Mumbai CSMT",fromTime:"14:00",toCode:"MAS",toName:"MGR Chennai Central",toTime:"11:30",duration:"21h 30m",days:["Daily"],classes:["2A","3A","SL"]},
    {number:"12163",name:"Chennai Superfast Express",fromCode:"LTT",fromName:"Lokmanya Tilak",fromTime:"20:50",toCode:"MAS",toName:"MGR Chennai Central",toTime:"18:45",duration:"21h 55m",days:["Daily"],classes:["1A","2A","3A","SL"]}
  ],

  "MAS-BCT": [
    {number:"22160",name:"Chennai-Mumbai Express",fromCode:"MAS",fromName:"MGR Chennai Central",fromTime:"13:30",toCode:"CSMT",toName:"Mumbai CSMT",toTime:"10:50",duration:"21h 20m",days:["Daily"],classes:["1A","2A","3A","SL"]},
    {number:"11042",name:"Chennai-Mumbai Express",fromCode:"MAS",fromName:"MGR Chennai Central",fromTime:"23:55",toCode:"CSMT",toName:"Mumbai CSMT",toTime:"20:30",duration:"20h 35m",days:["Daily"],classes:["2A","3A","SL"]}
  ],

  "BCT-JP": [
    {number:"12955",name:"Mumbai Central-Jaipur Gangaur SF Express",fromCode:"MMCT",fromName:"Mumbai Central",fromTime:"19:05",toCode:"JP",toName:"Jaipur",toTime:"12:00",duration:"16h 55m",days:["Daily"],classes:["1A","2A","3A","SL"]},
    {number:"12239",name:"Mumbai Central-Hisar AC Duronto Express",fromCode:"MMCT",fromName:"Mumbai Central",fromTime:"23:10",toCode:"JP",toName:"Jaipur",toTime:"13:40",duration:"14h 30m",days:["Daily"],classes:["1A","2A","3A","3E","2S"]},
    {number:"12979",name:"Bandra Terminus-Jaipur SF Express",fromCode:"BDTS",fromName:"Bandra Terminus",fromTime:"17:05",toCode:"JP",toName:"Jaipur",toTime:"10:05",duration:"17h 00m",days:["Daily"],classes:["1A","2A","3A","SL","3E"]},
    {number:"14702",name:"Aravali Express",fromCode:"BDTS",fromName:"Bandra Terminus",fromTime:"21:00",toCode:"JP",toName:"Jaipur",toTime:"17:45",duration:"20h 45m",days:["Daily"],classes:["2A","3A","SL","3E"]}
  ],

  "GHY-BCT": [
    {number:"15648",name:"Guwahati-LTT Express",fromCode:"GHY",fromName:"Guwahati",fromTime:"15:00",toCode:"LTT",toName:"Lokmanya Tilak",toTime:"17:50",duration:"50h 50m",days:["Weekly"],classes:["2A","3A","SL"]},
    {number:"15946",name:"Dibrugarh-LTT Express",fromCode:"GHY",fromName:"Guwahati",fromTime:"16:45",toCode:"LTT",toName:"Lokmanya Tilak",toTime:"17:50",duration:"49h 05m",days:["Weekly"],classes:["2A","3A","SL"]},
    {number:"22512",name:"Karmabhoomi Express",fromCode:"KYQ",fromName:"Kamakhya",fromTime:"18:00",toCode:"LTT",toName:"Lokmanya Tilak",toTime:"21:30",duration:"51h 30m",days:["Weekly"],classes:["1A","2A","3A","SL"]},
    {number:"15660",name:"Agartala-LTT AC Express",fromCode:"GHY",fromName:"Guwahati",fromTime:"20:50",toCode:"LTT",toName:"Lokmanya Tilak",toTime:"16:15",duration:"43h 25m",days:["Weekly"],classes:["1A","2A","3A"]}
  ],

  "BCT-GHY": [
    {number:"15647",name:"LTT-Guwahati Express",fromCode:"LTT",fromName:"Lokmanya Tilak",fromTime:"08:05",toCode:"GHY",toName:"Guwahati",toTime:"12:45",duration:"52h 40m",days:["Weekly"],classes:["2A","3A","SL"]},
    {number:"12519",name:"LTT-Agartala AC Express",fromCode:"LTT",fromName:"Lokmanya Tilak",fromTime:"07:50",toCode:"GHY",toName:"Guwahati",toTime:"03:20",duration:"43h 30m",days:["Weekly"],classes:["1A","2A","3A"]},
    {number:"15945",name:"LTT-Dibrugarh Express",fromCode:"LTT",fromName:"Lokmanya Tilak",fromTime:"08:05",toCode:"GHY",toName:"Guwahati",toTime:"07:55",duration:"47h 50m",days:["Weekly"],classes:["2A","3A","SL"]},
    {number:"22511",name:"Karmabhoomi Express",fromCode:"LTT",fromName:"Lokmanya Tilak",fromTime:"13:15",toCode:"GHY",toName:"Guwahati",toTime:"15:35",duration:"50h 20m",days:["Weekly"],classes:["1A","2A","3A","SL"]}
  ],

  "GHY-JP": [
    {number:"15632",name:"Guwahati-Barmer Express",fromCode:"GHY",fromName:"Guwahati",fromTime:"04:30",toCode:"JP",toName:"Jaipur",toTime:"19:30",duration:"39h 00m",days:["Weekly"],classes:["2A","3A","SL"]},
    {number:"15634",name:"Guwahati-Bikaner Express",fromCode:"GHY",fromName:"Guwahati",fromTime:"04:30",toCode:"JP",toName:"Jaipur",toTime:"19:40",duration:"39h 10m",days:["Weekly"],classes:["2A","3A","SL"]},
    {number:"19616",name:"Kavi Guru Express",fromCode:"KYQ",fromName:"Kamakhya",fromTime:"21:20",toCode:"JP",toName:"Jaipur",toTime:"20:40",duration:"47h 20m",days:["Weekly"],classes:["2A","3A","SL","3E"]}
  ],

  "JP-GHY": [
    {number:"15631",name:"Barmer-Guwahati Express",fromCode:"JP",fromName:"Jaipur",fromTime:"09:10",toCode:"GHY",toName:"Guwahati",toTime:"23:35",duration:"38h 25m",days:["Weekly"],classes:["2A","3A","SL"]},
    {number:"15633",name:"Bikaner-Guwahati Express",fromCode:"JP",fromName:"Jaipur",fromTime:"09:10",toCode:"GHY",toName:"Guwahati",toTime:"23:45",duration:"38h 35m",days:["Weekly"],classes:["2A","3A","SL"]},
    {number:"19615",name:"Kavi Guru Express",fromCode:"JP",fromName:"Jaipur",fromTime:"23:10",toCode:"KYQ",toName:"Kamakhya",toTime:"00:20",duration:"49h 10m",days:["Weekly"],classes:["2A","3A","SL","3E"]}
  ],

  "GHY-LKO": [
    {number:"19305",name:"DADN-KYQ Express",fromCode:"LKO",fromName:"Lucknow",fromTime:"05:35",toCode:"KYQ",toName:"Kamakhya",toTime:"12:30",duration:"30h 55m",days:["Weekly"],classes:["2A","3A","SL","3E"]},
    {number:"15934",name:"Amritsar-Naharlagun Express",fromCode:"LKO",fromName:"Lucknow",fromTime:"06:40",toCode:"GHY",toName:"Guwahati",toTime:"15:25",duration:"32h 45m",days:["Weekly"],classes:["1A","2A","3A","SL"]},
    {number:"15904",name:"CDG-DBRG Express",fromCode:"LKO",fromName:"Lucknow",fromTime:"11:10",toCode:"GHY",toName:"Guwahati",toTime:"16:50",duration:"29h 40m",days:["Weekly"],classes:["2A","3A","SL"]},
    {number:"15910",name:"Avadh Assam Express",fromCode:"LKO",fromName:"Lucknow",fromTime:"17:40",toCode:"GHY",toName:"Guwahati",toTime:"00:55",duration:"31h 15m",days:["Daily"],classes:["1A","2A","3A","SL"]},
    {number:"20504",name:"Dibrugarh Rajdhani Express",fromCode:"LKO",fromName:"Lucknow",fromTime:"18:50",toCode:"GHY",toName:"Guwahati",toTime:"18:15",duration:"23h 25m",days:["Weekly"],classes:["1A","2A","3A"]}
  ],

  "LKO-GHY": [
    {number:"15934",name:"Amritsar-Naharlagun Express",fromCode:"LKO",fromName:"Lucknow",fromTime:"06:40",toCode:"GHY",toName:"Guwahati",toTime:"15:25",duration:"32h 45m",days:["Weekly"],classes:["1A","2A","3A","SL"]},
    {number:"15904",name:"CDG-DBRG Express",fromCode:"LKO",fromName:"Lucknow",fromTime:"11:10",toCode:"GHY",toName:"Guwahati",toTime:"16:50",duration:"29h 40m",days:["Weekly"],classes:["2A","3A","SL"]},
    {number:"15910",name:"Avadh Assam Express",fromCode:"LKO",fromName:"Lucknow",fromTime:"17:40",toCode:"GHY",toName:"Guwahati",toTime:"00:55",duration:"31h 15m",days:["Daily"],classes:["1A","2A","3A","SL"]},
    {number:"20504",name:"Dibrugarh Rajdhani Express",fromCode:"LKO",fromName:"Lucknow",fromTime:"18:50",toCode:"GHY",toName:"Guwahati",toTime:"18:15",duration:"23h 25m",days:["Weekly"],classes:["1A","2A","3A"]},
    {number:"15635",name:"Guwahati Express",fromCode:"LKO",fromName:"Lucknow",fromTime:"21:00",toCode:"GHY",toName:"Guwahati",toTime:"06:10",duration:"33h 10m",days:["Weekly"],classes:["2A","3A","SL"]}
  ],

  "GHY-ADI": [
    {number:"15636",name:"Dwarka Express",fromCode:"GHY",fromName:"Guwahati",fromTime:"10:45",toCode:"ADI",toName:"Ahmedabad Jn",toTime:"03:55",duration:"41h 10m",days:["Weekly"],classes:["2A","3A","SL"]},
    {number:"15635",name:"Guwahati Express",fromCode:"GHY",fromName:"Guwahati",fromTime:"16:55",toCode:"ADI",toName:"Ahmedabad Jn",toTime:"11:40",duration:"42h 45m",days:["Weekly"],classes:["2A","3A","SL"]}
  ],

  "GHY-NGP": [
    {number:"22511",name:"Karmabhoomi Express",fromCode:"GHY",fromName:"Guwahati",fromTime:"01:25",toCode:"NGP",toName:"Nagpur",toTime:"15:35",duration:"38h 10m",days:["Weekly"],classes:["1A","2A","3A","SL"]}
  ],

  "NGP-GHY": [
    {number:"22511",name:"Karmabhoomi Express",fromCode:"NGP",fromName:"Nagpur",fromTime:"01:25",toCode:"KYQ",toName:"Kamakhya",toTime:"15:35",duration:"38h 10m",days:["Weekly"],classes:["1A","2A","3A","SL"]}
  ],

  "MAS-GHY": [
    {number:"12510",name:"Guwahati-SMVB Express",fromCode:"MAS",fromName:"MGR Chennai Central",fromTime:"06:15",toCode:"GHY",toName:"Guwahati",toTime:"03:10",duration:"44h 55m",days:["Weekly"],classes:["2A","3A","SL"]},
    {number:"12552",name:"KYQ-SMVB AC Express",fromCode:"MAS",fromName:"MGR Chennai Central",fromTime:"14:00",toCode:"GHY",toName:"Guwahati",toTime:"10:30",duration:"44h 30m",days:["Weekly"],classes:["1A","2A","3A"]},
    {number:"15630",name:"Nagaon Express",fromCode:"MS",fromName:"Chennai Egmore",fromTime:"14:55",toCode:"GHY",toName:"Guwahati",toTime:"20:40",duration:"53h 45m",days:["Weekly"],classes:["2A","3A","SL"]},
    {number:"12508",name:"SCL-TVC Express",fromCode:"GHY",fromName:"Guwahati",fromTime:"06:10",toCode:"MAS",toName:"MGR Chennai Central",toTime:"03:10",duration:"45h 00m",days:["Weekly"],classes:["2A","3A","SL"]}
  ],

  "GHY-MAS": [
    {number:"12510",name:"Guwahati-SMVB Express",fromCode:"GHY",fromName:"Guwahati",fromTime:"06:15",toCode:"PER",toName:"Perambur",toTime:"03:10",duration:"44h 55m",days:["Weekly"],classes:["2A","3A","SL"]},
    {number:"12552",name:"KYQ-SMVB AC Express",fromCode:"KYQ",fromName:"Kamakhya",fromTime:"14:00",toCode:"PER",toName:"Perambur",toTime:"10:30",duration:"44h 30m",days:["Weekly"],classes:["1A","2A","3A"]},
    {number:"12516",name:"SCL-CBE Express",fromCode:"GHY",fromName:"Guwahati",fromTime:"06:10",toCode:"PER",toName:"Perambur",toTime:"03:10",duration:"45h 00m",days:["Weekly"],classes:["2A","3A","SL"]},
    {number:"22502",name:"NTSK-SMVB Express",fromCode:"GHY",fromName:"Guwahati",fromTime:"05:15",toCode:"PER",toName:"Perambur",toTime:"03:10",duration:"45h 55m",days:["Weekly"],classes:["2A","3A","SL"]},
    {number:"15630",name:"Nagaon Express",fromCode:"GHY",fromName:"Guwahati",fromTime:"14:55",toCode:"MS",toName:"Chennai Egmore",toTime:"20:40",duration:"53h 45m",days:["Weekly"],classes:["2A","3A","SL"]}
  ],

  "MAS-NGP": [
    {number:"12611",name:"NZM Garib Rath",fromCode:"MAS",fromName:"MGR Chennai Central",fromTime:"06:00",toCode:"NGP",toName:"Nagpur",toTime:"20:25",duration:"14h 25m",days:["Weekly"],classes:["3A"]},
    {number:"12433",name:"Chennai Rajdhani Express",fromCode:"MAS",fromName:"MGR Chennai Central",fromTime:"06:05",toCode:"NGP",toName:"Nagpur",toTime:"20:25",duration:"14h 20m",days:["Weekly"],classes:["1A","2A","3A"]},
    {number:"12269",name:"MAS NZM Duronto Express",fromCode:"MAS",fromName:"MGR Chennai Central",fromTime:"06:35",toCode:"NGP",toName:"Nagpur",toTime:"20:40",duration:"14h 05m",days:["Weekly"],classes:["1A","2A","3A","SL","2S"]},
    {number:"16031",name:"Andaman Express",fromCode:"MAS",fromName:"MGR Chennai Central",fromTime:"05:10",toCode:"NGP",toName:"Nagpur",toTime:"01:40",duration:"20h 30m",days:["Weekly"],classes:["2A","3A","SL"]},
    {number:"16093",name:"MGR Chennai Central-Lucknow Express",fromCode:"MAS",fromName:"MGR Chennai Central",fromTime:"05:15",toCode:"NGP",toName:"Nagpur",toTime:"02:10",duration:"20h 55m",days:["Weekly"],classes:["2A","3A","SL"]}
  ],

  "NGP-MAS": [
    {number:"12270",name:"MAS Duronto Express",fromCode:"NGP",fromName:"Nagpur",fromTime:"05:40",toCode:"MAS",toName:"MGR Chennai Central",toTime:"20:50",duration:"15h 10m",days:["Weekly"],classes:["1A","2A","3A","SL","2S"]},
    {number:"12434",name:"Chennai Rajdhani Express",fromCode:"NGP",fromName:"Nagpur",fromTime:"05:10",toCode:"MAS",toName:"MGR Chennai Central",toTime:"20:50",duration:"15h 40m",days:["Weekly"],classes:["1A","2A","3A"]},
    {number:"12612",name:"MAS Garib Rath",fromCode:"NGP",fromName:"Nagpur",fromTime:"05:10",toCode:"MAS",toName:"MGR Chennai Central",toTime:"21:00",duration:"15h 50m",days:["Weekly"],classes:["3A"]},
    {number:"12622",name:"Tamil Nadu SF Express",fromCode:"NGP",fromName:"Nagpur",fromTime:"13:10",toCode:"MAS",toName:"MGR Chennai Central",toTime:"06:35",duration:"17h 25m",days:["Daily"],classes:["1A","2A","3A","SL"]},
    {number:"22645",name:"Ahilya Nagari SF Express",fromCode:"NGP",fromName:"Nagpur",fromTime:"04:20",toCode:"MAS",toName:"MGR Chennai Central",toTime:"22:40",duration:"18h 20m",days:["Weekly"],classes:["2A","3A","3E","SL"]}
  ],

  "MAS-NDLS": [
    {number:"12433",name:"Chennai Rajdhani Express",fromCode:"MAS",fromName:"MGR Chennai Central",fromTime:"06:05",toCode:"NDLS",toName:"New Delhi",toTime:"10:30",duration:"28h 25m",days:["Weekly"],classes:["1A","2A","3A"]},
    {number:"12611",name:"NZM Garib Rath",fromCode:"MAS",fromName:"MGR Chennai Central",fromTime:"06:00",toCode:"NZM",toName:"Hazrat Nizamuddin",toTime:"10:30",duration:"28h 30m",days:["Weekly"],classes:["3A"]},
    {number:"12269",name:"MAS NZM Duronto Express",fromCode:"MAS",fromName:"MGR Chennai Central",fromTime:"06:35",toCode:"NZM",toName:"Hazrat Nizamuddin",toTime:"10:40",duration:"28h 05m",days:["Weekly"],classes:["1A","2A","3A","SL","2S"]},
    {number:"12622",name:"Tamil Nadu SF Express",fromCode:"MAS",fromName:"MGR Chennai Central",fromTime:"22:00",toCode:"NDLS",toName:"New Delhi",toTime:"07:10",duration:"33h 10m",days:["Daily"],classes:["1A","2A","3A","SL"]}
  ],


  "ADI-GHY": [
    {number:"15635",name:"Guwahati Express",fromCode:"ADI",fromName:"Ahmedabad Jn",fromTime:"21:40",toCode:"GHY",toName:"Guwahati",toTime:"06:10",duration:"56h 30m",days:["Weekly"],classes:["2A","3A","SL"]},
    {number:"15667",name:"Kamakhya Express",fromCode:"ADI",fromName:"Ahmedabad Jn",fromTime:"21:40",toCode:"KYQ",toName:"Kamakhya",toTime:"05:20",duration:"55h 40m",days:["Weekly"],classes:["1A","2A","3A","SL"]}
  ]
};
