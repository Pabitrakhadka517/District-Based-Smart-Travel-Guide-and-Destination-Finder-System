/* Seed data ported 1:1 from the frontend's src/data/*.ts files. */
import { img, gallery, PHOTO } from "./images";

const AV = (i: number): string => `https://i.pravatar.cc/150?img=${i}`;

export const districts = [
  // ── Koshi Province (14 districts) ────────────────────────────────────────
  {
    id: "d3", slug: "solukhumbu", name: "Solukhumbu", province: "Koshi",
    description: "The Everest district — Sherpa culture, monasteries and the trail to the roof of the world.",
    heroImage: img("1522774607452-dac2ecc66330", 1600),
    coordinates: { lat: 27.7833, lng: 86.7167 },
    cityCount: 2, destinationCount: 2, rating: 4.9,
    popularFor: ["Trekking", "Everest", "Sherpa Culture", "Adventure"],
    bestSeason: "Autumn", attractionCount: 4
  },
  {
    id: "d7", slug: "taplejung", name: "Taplejung", province: "Koshi",
    description: "The far-eastern mountain district bordering Sikkim, home to Kanchenjunga Base Camp and rich Limbu culture.",
    heroImage: img("1627119703136-3964f14b7325", 1600),
    coordinates: { lat: 27.3535, lng: 87.6697 },
    cityCount: 1, destinationCount: 0, rating: 4.3,
    popularFor: ["Trekking", "Kanchenjunga", "Limbu Culture", "Nature"]
  },
  {
    id: "d8", slug: "okhaldhunga", name: "Okhaldhunga", province: "Koshi",
    description: "A hilly mid-mountain district known for its scenic terraced farms and the Okhaldhunga bazaar perched above river gorges.",
    heroImage: img("1599751229070-854ae5c90869", 1600),
    coordinates: { lat: 27.3090, lng: 86.5015 },
    cityCount: 1, destinationCount: 0, rating: 3.7,
    popularFor: ["Nature", "Hills", "Trekking"]
  },
  {
    id: "d9", slug: "khotang", name: "Khotang", province: "Koshi",
    description: "Famous for the sacred Halesi Mahadev cave temple, one of Nepal's most important Hindu-Buddhist pilgrimage sites.",
    heroImage: img("1760366621342-5c4703099c2c", 1600),
    coordinates: { lat: 27.0237, lng: 86.8497 },
    cityCount: 1, destinationCount: 0, rating: 3.8,
    popularFor: ["Pilgrimage", "Caves", "Culture", "Trekking"]
  },
  {
    id: "d10", slug: "bhojpur", name: "Bhojpur", province: "Koshi",
    description: "Celebrated for its master khukuri smiths and panoramic Himalayan views across a ridge-top bazaar town.",
    heroImage: img(PHOTO.himalaya6, 1600),
    coordinates: { lat: 27.1744, lng: 87.0516 },
    cityCount: 1, destinationCount: 0, rating: 3.8,
    popularFor: ["Crafts", "Khukuri", "Nature", "Heritage"]
  },
  {
    id: "d11", slug: "dhankuta", name: "Dhankuta", province: "Koshi",
    description: "A prosperous hill town famed for its tree-lined main street, clean air and views stretching to the Milke Danda ridge.",
    heroImage: img(PHOTO.forest2, 1600),
    coordinates: { lat: 26.9829, lng: 87.3432 },
    cityCount: 1, destinationCount: 0, rating: 3.9,
    popularFor: ["Nature", "Hills", "Culture", "Trekking"]
  },
  {
    id: "d12", slug: "terhathum", name: "Terhathum", province: "Koshi",
    description: "A compact hill district with the Tamor River gorge and terraced village landscapes characteristic of eastern Nepal.",
    heroImage: img(PHOTO.forest1, 1600),
    coordinates: { lat: 27.1239, lng: 87.5508 },
    cityCount: 1, destinationCount: 0, rating: 3.6,
    popularFor: ["Nature", "River", "Trekking", "Hills"]
  },
  {
    id: "d13", slug: "sankhuwasabha", name: "Sankhuwasabha", province: "Koshi",
    description: "A vast mountain district containing Makalu-Barun National Park and remote trekking routes toward Nepal's fourth-highest peak.",
    heroImage: img(PHOTO.himalaya9, 1600),
    coordinates: { lat: 27.3576, lng: 87.1427 },
    cityCount: 1, destinationCount: 0, rating: 4.2,
    popularFor: ["Trekking", "Makalu", "Wildlife", "Adventure"]
  },
  {
    id: "d14", slug: "panchthar", name: "Panchthar", province: "Koshi",
    description: "Rolling tea-garden highlands on the Sikkim border, with Limbu heritage and misty forest walks.",
    heroImage: img("1758390286435-e559ab6d4596", 1600),
    coordinates: { lat: 27.1417, lng: 87.8079 },
    cityCount: 1, destinationCount: 0, rating: 3.8,
    popularFor: ["Tea Gardens", "Limbu Culture", "Nature", "Hills"]
  },
  {
    id: "d15", slug: "ilam", name: "Ilam", province: "Koshi",
    description: "Nepal's premier tea district — rolling green gardens, misty ridges and the tranquil Mai Pokhari lake.",
    heroImage: img("1742106856193-5cc3424ac450", 1600),
    coordinates: { lat: 26.9104, lng: 87.9244 },
    cityCount: 2, destinationCount: 0, rating: 4.2,
    popularFor: ["Tea Gardens", "Nature", "Trekking", "Lakes"]
  },
  {
    id: "d16", slug: "jhapa", name: "Jhapa", province: "Koshi",
    description: "The tropical eastern gateway — fertile tea estates, cardamom farms and the busy Indo-Nepal border crossing at Kakarbhitta.",
    heroImage: img(PHOTO.jungle1, 1600),
    coordinates: { lat: 26.6385, lng: 87.9055 },
    cityCount: 2, destinationCount: 0, rating: 3.8,
    popularFor: ["Tea Gardens", "Nature", "Border Trade", "Agriculture"]
  },
  {
    id: "d17", slug: "morang", name: "Morang", province: "Koshi",
    description: "Home to Biratnagar, the industrial capital of Province 1 — a thriving eastern hub with Koshi Tappu Wildlife Reserve nearby.",
    heroImage: img(PHOTO.lake2, 1600),
    coordinates: { lat: 26.4525, lng: 87.2718 },
    cityCount: 2, destinationCount: 0, rating: 3.9,
    popularFor: ["Wildlife", "Industry", "River", "Nature"]
  },
  {
    id: "d18", slug: "sunsari", name: "Sunsari", province: "Koshi",
    description: "Straddling the Terai and hills, with Dharan as its vibrant market city and the Koshi River corridor for birds and wildlife.",
    heroImage: img(PHOTO.lake1, 1600),
    coordinates: { lat: 26.6396, lng: 87.1713 },
    cityCount: 2, destinationCount: 0, rating: 3.9,
    popularFor: ["Nature", "River", "Culture", "Wildlife"]
  },
  {
    id: "d19", slug: "udayapur", name: "Udayapur", province: "Koshi",
    description: "A mid-hill district bridging the Terai plains and the higher ranges, with the Triyuga River and forested hills.",
    heroImage: img(PHOTO.forest2, 1600),
    coordinates: { lat: 26.9294, lng: 86.5160 },
    cityCount: 1, destinationCount: 0, rating: 3.6,
    popularFor: ["Nature", "Hills", "River", "Trekking"]
  },

  // ── Madhesh Province (8 districts) ───────────────────────────────────────
  {
    id: "d20", slug: "saptari", name: "Saptari", province: "Madhesh",
    description: "A Terai district on the Koshi flood plains, known for Rajbiraj bazaar and traditional Maithili art and culture.",
    heroImage: img(PHOTO.jungle1, 1600),
    coordinates: { lat: 26.5435, lng: 86.7498 },
    cityCount: 1, destinationCount: 0, rating: 3.5,
    popularFor: ["Culture", "Maithili Art", "Agriculture", "River"]
  },
  {
    id: "d21", slug: "siraha", name: "Siraha", province: "Madhesh",
    description: "Rich in Maithili culture with the Dudheswor Nath temple and fertile farmlands of the eastern Terai.",
    heroImage: img(PHOTO.jungle1, 1600),
    coordinates: { lat: 26.6543, lng: 86.2097 },
    cityCount: 1, destinationCount: 0, rating: 3.5,
    popularFor: ["Culture", "Pilgrimage", "Agriculture"]
  },
  {
    id: "d22", slug: "dhanusha", name: "Dhanusha", province: "Madhesh",
    description: "Sacred birthplace of Sita — Janakpur, the Maithili cultural capital, draws pilgrims for its ornate temples and the Vivaha Panchami festival.",
    heroImage: img("1760973179127-414475da8dcc", 1600),
    coordinates: { lat: 26.7271, lng: 85.9241 },
    cityCount: 1, destinationCount: 0, rating: 4.2,
    popularFor: ["Pilgrimage", "Janakpur", "Culture", "Heritage"]
  },
  {
    id: "d23", slug: "mahottari", name: "Mahottari", province: "Madhesh",
    description: "A central Terai district anchored by Jaleshwor town, rich in Maithili traditions and agricultural plains.",
    heroImage: img(PHOTO.jungle1, 1600),
    coordinates: { lat: 26.6500, lng: 85.7958 },
    cityCount: 1, destinationCount: 0, rating: 3.5,
    popularFor: ["Culture", "Agriculture", "Maithili Heritage"]
  },
  {
    id: "d24", slug: "sarlahi", name: "Sarlahi", province: "Madhesh",
    description: "Flat Terai plains with the Bagmati and Lalbakeya rivers, Malangwa as its administrative hub and vibrant local markets.",
    heroImage: img(PHOTO.jungle1, 1600),
    coordinates: { lat: 27.0089, lng: 85.5575 },
    cityCount: 1, destinationCount: 0, rating: 3.5,
    popularFor: ["Agriculture", "River", "Culture"]
  },
  {
    id: "d25", slug: "rautahat", name: "Rautahat", province: "Madhesh",
    description: "Bordering Bihar in India, Gaur is its headquarters and the district has important archaeological sites in its ancient floodplains.",
    heroImage: img(PHOTO.jungle1, 1600),
    coordinates: { lat: 27.0217, lng: 85.2810 },
    cityCount: 1, destinationCount: 0, rating: 3.5,
    popularFor: ["Agriculture", "Heritage", "Culture"]
  },
  {
    id: "d26", slug: "bara", name: "Bara", province: "Madhesh",
    description: "An industrial Terai district — Kalaiya is its urban centre and Simara hosts Nepal's second busiest domestic airport.",
    heroImage: img(PHOTO.jungle1, 1600),
    coordinates: { lat: 27.0378, lng: 84.9986 },
    cityCount: 1, destinationCount: 0, rating: 3.6,
    popularFor: ["Industry", "Transport", "Agriculture"]
  },
  {
    id: "d27", slug: "parsa", name: "Parsa", province: "Madhesh",
    description: "Gateway to Nepal's south with Birgunj — the busiest trade port on the Nepal-India border and Parsa Wildlife Reserve.",
    heroImage: img(PHOTO.jungle1, 1600),
    coordinates: { lat: 27.0126, lng: 84.8792 },
    cityCount: 1, destinationCount: 0, rating: 3.7,
    popularFor: ["Trade", "Wildlife", "Border Culture"]
  },

  // ── Bagmati Province (13 districts) ──────────────────────────────────────
  {
    id: "d1", slug: "kathmandu", name: "Kathmandu", province: "Bagmati",
    description: "Nepal's vibrant capital district, a living museum of temples, palaces and bustling bazaars cradled in a Himalayan valley.",
    heroImage: img("1665435246383-4103fc803522", 1600),
    coordinates: { lat: 27.7172, lng: 85.324 },
    cityCount: 2, destinationCount: 3, rating: 4.8,
    popularFor: ["Heritage", "Temples", "Nightlife", "Culture"],
    bestSeason: "Autumn", attractionCount: 10
  },
  {
    id: "d5", slug: "lalitpur", name: "Lalitpur", province: "Bagmati",
    description: "The city of artisans — Patan's exquisite Newari craftsmanship, courtyards and metalwork.",
    heroImage: img("1676299950521-638fa4f0f475", 1600),
    coordinates: { lat: 27.6588, lng: 85.3247 },
    cityCount: 1, destinationCount: 1, rating: 4.6,
    popularFor: ["Heritage", "Art", "Culture", "Crafts"],
    bestSeason: "Autumn", attractionCount: 4
  },
  {
    id: "d33", slug: "bhaktapur", name: "Bhaktapur", province: "Bagmati",
    description: "A perfectly preserved medieval city — the finest of the valley's three durbar squares, pottery traditions and the famous king curd.",
    heroImage: img("1706188047078-0ba67733fa45", 1600),
    coordinates: { lat: 27.6710, lng: 85.4298 },
    cityCount: 1, destinationCount: 1, rating: 4.9,
    popularFor: ["Heritage", "Pottery", "UNESCO", "Newari Culture"],
    bestSeason: "Autumn", attractionCount: 4
  },
  {
    id: "d4", slug: "chitwan", name: "Chitwan", province: "Bagmati",
    description: "Subtropical lowlands and Nepal's premier national park — rhinos, tigers and jungle safaris.",
    heroImage: img("1498712067384-01239c6b377c", 1600),
    coordinates: { lat: 27.5291, lng: 84.3542 },
    cityCount: 1, destinationCount: 2, rating: 4.7,
    popularFor: ["Wildlife", "Safari", "Nature", "Jungle"],
    bestSeason: "Winter", attractionCount: 4
  },
  {
    id: "d28", slug: "sindhuli", name: "Sindhuli", province: "Bagmati",
    description: "A green mid-hill district on the Mahendra Highway with the Tinpatan forest corridor and scenic Kamala River valley.",
    heroImage: img(PHOTO.forest1, 1600),
    coordinates: { lat: 27.2540, lng: 85.9717 },
    cityCount: 1, destinationCount: 0, rating: 3.7,
    popularFor: ["Nature", "Trekking", "Hills", "River"]
  },
  {
    id: "d29", slug: "ramechhap", name: "Ramechhap", province: "Bagmati",
    description: "Home to the Everest-region domestic airport at Ramechhap, with Manthali as its hub and dramatic Tamakoshi gorges.",
    heroImage: img(PHOTO.himalaya6, 1600),
    coordinates: { lat: 27.3908, lng: 86.0972 },
    cityCount: 1, destinationCount: 0, rating: 3.8,
    popularFor: ["Trekking", "River", "Nature", "Adventure"]
  },
  {
    id: "d30", slug: "dolakha", name: "Dolakha", province: "Bagmati",
    description: "An ancient trading district with Jiri as a classic trek starting point, the Bhimeshwor temple and access to the Gaurishankar range.",
    heroImage: img(PHOTO.himalaya9, 1600),
    coordinates: { lat: 27.6717, lng: 86.0829 },
    cityCount: 1, destinationCount: 0, rating: 4.0,
    popularFor: ["Trekking", "Heritage", "Adventure", "Mountains"]
  },
  {
    id: "d31", slug: "sindhupalchok", name: "Sindhupalchok", province: "Bagmati",
    description: "Spanning the Helambu and Langtang valley approaches with the ancient trade route to Tibet through Tatopani.",
    heroImage: img("1715935564077-bc4e06915d8c", 1600),
    coordinates: { lat: 27.7748, lng: 85.6837 },
    cityCount: 1, destinationCount: 0, rating: 3.9,
    popularFor: ["Trekking", "Nature", "Mountains", "Culture"]
  },
  {
    id: "d32", slug: "kavrepalanchok", name: "Kavrepalanchok", province: "Bagmati",
    description: "The scenic district east of Kathmandu with Dhulikhel's Himalayan panorama, Namobuddha monastery and the Panauti heritage town.",
    heroImage: img("1540961286473-8ad1368dc1bd", 1600),
    coordinates: { lat: 27.6244, lng: 85.5365 },
    cityCount: 1, destinationCount: 0, rating: 4.1,
    popularFor: ["Heritage", "Viewpoints", "Trekking", "Culture"]
  },
  {
    id: "d34", slug: "nuwakot", name: "Nuwakot", province: "Bagmati",
    description: "Prithvi Narayan Shah's historic fortress district with the Trishuli River valley, white-water rafting and a majestic seven-storey palace.",
    heroImage: img("1669557582081-274a568aff4d", 1600),
    coordinates: { lat: 27.9093, lng: 85.1695 },
    cityCount: 1, destinationCount: 0, rating: 3.9,
    popularFor: ["Heritage", "Rafting", "History", "Nature"]
  },
  {
    id: "d35", slug: "rasuwa", name: "Rasuwa", province: "Bagmati",
    description: "The gateway to Langtang National Park and the Rasuwagadhi border crossing to Tibet — glaciers, yak pastures and Tamang villages.",
    heroImage: img("1715935257216-fdba0eadd42a", 1600),
    coordinates: { lat: 28.0804, lng: 85.3737 },
    cityCount: 1, destinationCount: 0, rating: 4.3,
    popularFor: ["Trekking", "Langtang", "Mountains", "Nature"]
  },
  {
    id: "d36", slug: "dhading", name: "Dhading", province: "Bagmati",
    description: "A rugged district between Kathmandu and the Ganesh Himal range, with Prithvi Highway access and Gorkha-style hilltop villages.",
    heroImage: img(PHOTO.forest2, 1600),
    coordinates: { lat: 27.8584, lng: 84.8814 },
    cityCount: 1, destinationCount: 0, rating: 3.7,
    popularFor: ["Nature", "Trekking", "Mountains", "Hills"]
  },
  {
    id: "d37", slug: "makwanpur", name: "Makwanpur", province: "Bagmati",
    description: "A forested buffer zone south of Kathmandu with Hetauda industrial city, the Kulekhani reservoir and Chure hills.",
    heroImage: img(PHOTO.forest1, 1600),
    coordinates: { lat: 27.4232, lng: 85.0297 },
    cityCount: 1, destinationCount: 0, rating: 3.8,
    popularFor: ["Nature", "Industry", "Hills", "Wildlife"]
  },

  // ── Gandaki Province (11 districts) ──────────────────────────────────────
  {
    id: "d2", slug: "kaski", name: "Kaski", province: "Gandaki",
    description: "Home to Pokhara and the gateway to the Annapurnas — lakes, paragliding and the closest big mountains in Nepal.",
    heroImage: img("1659808909524-5fcad5cd48bf", 1600),
    coordinates: { lat: 28.2096, lng: 83.9856 },
    cityCount: 2, destinationCount: 3, rating: 4.9,
    popularFor: ["Lakes", "Adventure", "Trekking", "Nature"],
    bestSeason: "Autumn", attractionCount: 7
  },
  {
    id: "d6", slug: "mustang", name: "Mustang", province: "Gandaki",
    description: "A high-altitude desert kingdom beyond the Himalayas — Tibetan culture, caves and dramatic canyons.",
    heroImage: img("1642402734863-15ead077a324", 1600),
    coordinates: { lat: 29.1892, lng: 83.9311 },
    cityCount: 1, destinationCount: 1, rating: 4.8,
    popularFor: ["Trekking", "Tibetan Culture", "Adventure", "Nature"],
    bestSeason: "Summer", attractionCount: 1
  },
  {
    id: "d38", slug: "gorkha", name: "Gorkha", province: "Gandaki",
    description: "The ancestral homeland of Nepal's unifiers — the hilltop Gorkha Durbar palace and the trail to Manaslu Base Camp.",
    heroImage: img("1610912335893-b996d1743610", 1600),
    coordinates: { lat: 28.0000, lng: 84.6333 },
    cityCount: 1, destinationCount: 0, rating: 4.1,
    popularFor: ["Heritage", "Manaslu Trek", "History", "Mountains"]
  },
  {
    id: "d39", slug: "lamjung", name: "Lamjung", province: "Gandaki",
    description: "The classic Annapurna Circuit starting point, with Besisahar as its hub and the dramatic Marsyangdi River gorge.",
    heroImage: img("1653043506251-05cecdfe9cfd", 1600),
    coordinates: { lat: 28.2333, lng: 84.3833 },
    cityCount: 1, destinationCount: 0, rating: 4.0,
    popularFor: ["Trekking", "Annapurna Circuit", "Mountains", "Nature"]
  },
  {
    id: "d40", slug: "tanahun", name: "Tanahun", province: "Gandaki",
    description: "A verdant hill district with Damauli at the Seti-Madi confluence and the Seti Gandaki river ideal for kayaking.",
    heroImage: img("1731339987698-a9ddbd4be744", 1600),
    coordinates: { lat: 27.9213, lng: 84.2433 },
    cityCount: 1, destinationCount: 0, rating: 3.8,
    popularFor: ["Nature", "River", "Kayaking", "Hills"]
  },
  {
    id: "d41", slug: "syangja", name: "Syangja", province: "Gandaki",
    description: "Green terraced hills between Pokhara and Butwal, with apple orchards, Waling bazaar and views to the Annapurna range.",
    heroImage: img(PHOTO.forest1, 1600),
    coordinates: { lat: 28.0836, lng: 83.8764 },
    cityCount: 1, destinationCount: 0, rating: 3.8,
    popularFor: ["Nature", "Orchards", "Hills", "Culture"]
  },
  {
    id: "d42", slug: "manang", name: "Manang", province: "Gandaki",
    description: "A remote high-altitude district in the Annapurna rain shadow — Tibetan-influenced villages, the Thorong La pass and crystal-clear skies.",
    heroImage: img(PHOTO.himalaya4, 1600),
    coordinates: { lat: 28.6333, lng: 84.2333 },
    cityCount: 1, destinationCount: 0, rating: 4.4,
    popularFor: ["Trekking", "High Altitude", "Tibetan Culture", "Adventure"]
  },
  {
    id: "d43", slug: "myagdi", name: "Myagdi", province: "Gandaki",
    description: "Beneath the colossal Dhaulagiri massif — Beni is the gateway to the Annapurna Circuit and the remote Dolpa trail.",
    heroImage: img(PHOTO.himalaya5, 1600),
    coordinates: { lat: 28.3500, lng: 83.5667 },
    cityCount: 1, destinationCount: 0, rating: 4.2,
    popularFor: ["Trekking", "Dhaulagiri", "Adventure", "Mountains"]
  },
  {
    id: "d44", slug: "baglung", name: "Baglung", province: "Gandaki",
    description: "A district of rushing rivers, suspension bridges and the road to Dolpa — Baglung town sits above the Kali Gandaki gorge.",
    heroImage: img(PHOTO.forest2, 1600),
    coordinates: { lat: 28.2709, lng: 83.5870 },
    cityCount: 1, destinationCount: 0, rating: 3.8,
    popularFor: ["Nature", "Trekking", "River", "Adventure"]
  },
  {
    id: "d45", slug: "parbat", name: "Parbat", province: "Gandaki",
    description: "A compact hill district with Kushma's thrilling bungee bridge over the Kali Gandaki gorge and rhododendron-covered ridges.",
    heroImage: img(PHOTO.himalaya7, 1600),
    coordinates: { lat: 28.2333, lng: 83.7000 },
    cityCount: 1, destinationCount: 0, rating: 3.9,
    popularFor: ["Adventure", "Bungee", "Nature", "Hills"]
  },
  {
    id: "d46", slug: "nawalpur", name: "Nawalpur", province: "Gandaki",
    description: "The easternmost Gandaki district in the inner Terai, with the Devghat pilgrimage confluence and rice fields at the foot of the Chure hills.",
    heroImage: img(PHOTO.lake1, 1600),
    coordinates: { lat: 27.7500, lng: 84.1333 },
    cityCount: 1, destinationCount: 0, rating: 3.7,
    popularFor: ["Pilgrimage", "Nature", "Agriculture", "Culture"]
  },

  // ── Lumbini Province (12 districts) ──────────────────────────────────────
  {
    id: "d47", slug: "gulmi", name: "Gulmi", province: "Lumbini",
    description: "Dramatic mid-hills with Tamghas bazaar, the Resunga hill forest reserve and mountain views including Dhaulagiri.",
    heroImage: img(PHOTO.forest1, 1600),
    coordinates: { lat: 28.0669, lng: 83.2638 },
    cityCount: 1, destinationCount: 0, rating: 3.8,
    popularFor: ["Nature", "Trekking", "Hills", "Culture"]
  },
  {
    id: "d48", slug: "palpa", name: "Palpa", province: "Lumbini",
    description: "The hilltop town of Tansen is a treasure of Newari architecture, Palpa silk and panoramic views — a hidden gem of western Nepal.",
    heroImage: img("1529733905113-027ed85d7e33", 1600),
    coordinates: { lat: 27.8671, lng: 83.5454 },
    cityCount: 1, destinationCount: 0, rating: 4.1,
    popularFor: ["Heritage", "Silk", "Culture", "Viewpoints"]
  },
  {
    id: "d49", slug: "arghakhanchi", name: "Arghakhanchi", province: "Lumbini",
    description: "A serene mid-hill district with the ancient Rani Mahal palace ruin on the Palpa border and quiet village trekking.",
    heroImage: img(PHOTO.forest2, 1600),
    coordinates: { lat: 27.9500, lng: 83.1333 },
    cityCount: 1, destinationCount: 0, rating: 3.6,
    popularFor: ["Heritage", "Nature", "Trekking", "Hills"]
  },
  {
    id: "d50", slug: "kapilvastu", name: "Kapilvastu", province: "Lumbini",
    description: "The ancient Shakya kingdom of Prince Siddhartha — archaeological sites of Tilaurakot and Kudan mark the Buddha's early life.",
    heroImage: img(PHOTO.stupa2, 1600),
    coordinates: { lat: 27.5704, lng: 83.0547 },
    cityCount: 1, destinationCount: 0, rating: 4.0,
    popularFor: ["Pilgrimage", "Buddhist Heritage", "Archaeology", "Culture"]
  },
  {
    id: "d51", slug: "rupandehi", name: "Rupandehi", province: "Lumbini",
    description: "The birthplace of Gautama Buddha — Lumbini's sacred garden and monasteries draw pilgrims worldwide; Bhairahawa connects to India.",
    heroImage: img(PHOTO.stupa1, 1600),
    coordinates: { lat: 27.5036, lng: 83.4494 },
    cityCount: 2, destinationCount: 0, rating: 4.4,
    popularFor: ["Lumbini", "Buddhism", "Pilgrimage", "Heritage"]
  },
  {
    id: "d52", slug: "nawalparasi", name: "Nawalparasi", province: "Lumbini",
    description: "The western Nawalparasi district along the Terai, with Parasi as its hub and the Chitwan-bordering Mahabharat forest foothills.",
    heroImage: img(PHOTO.jungle1, 1600),
    coordinates: { lat: 27.5500, lng: 84.0167 },
    cityCount: 1, destinationCount: 0, rating: 3.6,
    popularFor: ["Nature", "Wildlife", "Agriculture", "Culture"]
  },
  {
    id: "d53", slug: "dang", name: "Dang", province: "Lumbini",
    description: "A broad fertile inner-Terai valley flanked by forested Chure and Mahabharat hills — Ghorahi and Tulsipur are its twin cities.",
    heroImage: img(PHOTO.lake1, 1600),
    coordinates: { lat: 28.0250, lng: 82.4708 },
    cityCount: 2, destinationCount: 0, rating: 3.8,
    popularFor: ["Nature", "Valley", "Wildlife", "Agriculture"]
  },
  {
    id: "d54", slug: "pyuthan", name: "Pyuthan", province: "Lumbini",
    description: "A mid-hill district with the Swargadwari temple pilgrimage site and views toward the Dhaulagiri group.",
    heroImage: img("1760366621342-5c4703099c2c", 1600),
    coordinates: { lat: 28.1000, lng: 82.8667 },
    cityCount: 1, destinationCount: 0, rating: 3.7,
    popularFor: ["Pilgrimage", "Nature", "Trekking", "Hills"]
  },
  {
    id: "d55", slug: "rolpa", name: "Rolpa", province: "Lumbini",
    description: "Remote mid-western hills with rhododendron forests and the Dhorpatan Hunting Reserve — gateway to Magar highland culture.",
    heroImage: img(PHOTO.himalaya6, 1600),
    coordinates: { lat: 28.2333, lng: 82.6667 },
    cityCount: 1, destinationCount: 0, rating: 3.8,
    popularFor: ["Trekking", "Nature", "Magar Culture", "Wildlife"]
  },
  {
    id: "d56", slug: "rukum-west", name: "Rukum West", province: "Lumbini",
    description: "The western half of the former Rukum district with Musikot as its hub, offering authentic village trekking in Karnali-adjacent hills.",
    heroImage: img(PHOTO.himalaya9, 1600),
    coordinates: { lat: 28.5500, lng: 82.3667 },
    cityCount: 1, destinationCount: 0, rating: 3.7,
    popularFor: ["Trekking", "Nature", "Hills", "Culture"]
  },
  {
    id: "d57", slug: "banke", name: "Banke", province: "Lumbini",
    description: "Home to Nepalgunj, the main city of mid-western Nepal and gateway to Bardia, Jumla and Humla with a busy airport.",
    heroImage: img(PHOTO.jungle1, 1600),
    coordinates: { lat: 28.0500, lng: 81.6167 },
    cityCount: 1, destinationCount: 0, rating: 3.9,
    popularFor: ["Gateway", "Culture", "Trade", "Nature"]
  },
  {
    id: "d58", slug: "bardiya", name: "Bardiya", province: "Lumbini",
    description: "Nepal's best-kept wildlife secret — Bardia National Park offers tiger safaris with far fewer crowds than Chitwan.",
    heroImage: img("1714318808656-1aa1639eae15", 1600),
    coordinates: { lat: 28.3333, lng: 81.3333 },
    cityCount: 1, destinationCount: 0, rating: 4.5,
    popularFor: ["Wildlife", "Safari", "Tiger", "Nature"]
  },

  // ── Karnali Province (10 districts) ──────────────────────────────────────
  {
    id: "d59", slug: "dolpa", name: "Dolpa", province: "Karnali",
    description: "Nepal's largest and most remote district — the high-altitude Phoksundo Lake, the hidden Bon kingdom of Shey and ancient salt-trade trails.",
    heroImage: img(PHOTO.himalaya2, 1600),
    coordinates: { lat: 29.0000, lng: 82.9667 },
    cityCount: 1, destinationCount: 0, rating: 4.6,
    popularFor: ["Trekking", "Phoksundo Lake", "Remote", "Tibetan Culture"]
  },
  {
    id: "d60", slug: "mugu", name: "Mugu", province: "Karnali",
    description: "One of Nepal's most isolated districts, accessible mainly by air to Talcha airport — pristine Himalayan wilderness and Rara Lake.",
    heroImage: img("1715935257216-fdba0eadd42a", 1600),
    coordinates: { lat: 29.5167, lng: 82.3833 },
    cityCount: 1, destinationCount: 0, rating: 4.2,
    popularFor: ["Remote", "Rara Lake", "Trekking", "Nature"]
  },
  {
    id: "d61", slug: "humla", name: "Humla", province: "Karnali",
    description: "Nepal's most northwestern and highest district, bordering Tibet — the ancient route to Mount Kailash passes through Simikot.",
    heroImage: img(PHOTO.himalaya8, 1600),
    coordinates: { lat: 29.9700, lng: 81.8167 },
    cityCount: 1, destinationCount: 0, rating: 4.4,
    popularFor: ["Kailash Route", "Remote", "Adventure", "Trekking"]
  },
  {
    id: "d62", slug: "jumla", name: "Jumla", province: "Karnali",
    description: "The apple-growing highland of Karnali — Jumla is a historic trade hub with the jumbo apple orchards and Rara Lake trekking access.",
    heroImage: img(PHOTO.himalaya5, 1600),
    coordinates: { lat: 29.2750, lng: 82.1833 },
    cityCount: 1, destinationCount: 0, rating: 4.1,
    popularFor: ["Rara Lake", "Apples", "Trekking", "Nature"]
  },
  {
    id: "d63", slug: "kalikot", name: "Kalikot", province: "Karnali",
    description: "A remote Karnali district with the Tila River valley, traditional Kalikot fort and ancient trade routes through high passes.",
    heroImage: img(PHOTO.himalaya6, 1600),
    coordinates: { lat: 29.1417, lng: 81.6500 },
    cityCount: 1, destinationCount: 0, rating: 3.8,
    popularFor: ["Trekking", "Remote", "Heritage", "Mountains"]
  },
  {
    id: "d64", slug: "dailekh", name: "Dailekh", province: "Karnali",
    description: "A hill district in Karnali known for the Dailekh Durbar ruins and the forested Chure hills bordering Surkhet.",
    heroImage: img(PHOTO.forest1, 1600),
    coordinates: { lat: 28.8417, lng: 81.7167 },
    cityCount: 1, destinationCount: 0, rating: 3.6,
    popularFor: ["Heritage", "Nature", "Trekking", "Hills"]
  },
  {
    id: "d65", slug: "jajarkot", name: "Jajarkot", province: "Karnali",
    description: "A rugged district with Khalanga on a hill above the Bheri River and the Chure to Mahabharat terrain ideal for off-track trekking.",
    heroImage: img(PHOTO.forest2, 1600),
    coordinates: { lat: 28.7000, lng: 82.1500 },
    cityCount: 1, destinationCount: 0, rating: 3.6,
    popularFor: ["Trekking", "Nature", "River", "Hills"]
  },
  {
    id: "d66", slug: "rukum-east", name: "Rukum East", province: "Karnali",
    description: "The eastern half of the former Rukum district with Rukumkot and access to the Dhorpatan Hunting Reserve.",
    heroImage: img(PHOTO.himalaya9, 1600),
    coordinates: { lat: 28.5667, lng: 82.8167 },
    cityCount: 1, destinationCount: 0, rating: 3.7,
    popularFor: ["Trekking", "Nature", "Wildlife", "Hills"]
  },
  {
    id: "d67", slug: "salyan", name: "Salyan", province: "Karnali",
    description: "Commanding hill views from Shreenagar with the Karnali Highway linking the district to Surkhet and the Terai.",
    heroImage: img(PHOTO.forest1, 1600),
    coordinates: { lat: 28.3500, lng: 82.1667 },
    cityCount: 1, destinationCount: 0, rating: 3.6,
    popularFor: ["Nature", "Trekking", "Hills", "Culture"]
  },
  {
    id: "d68", slug: "surkhet", name: "Surkhet", province: "Karnali",
    description: "The provincial capital of Karnali — Birendranagar is a fast-growing city with the Bulbule Lake, Kakrebihar temple and Karnali Highway.",
    heroImage: img(PHOTO.lake1, 1600),
    coordinates: { lat: 28.6000, lng: 81.6167 },
    cityCount: 1, destinationCount: 0, rating: 4.0,
    popularFor: ["Nature", "Lakes", "Culture", "Gateway"]
  },

  // ── Sudurpashchim Province (9 districts) ─────────────────────────────────
  {
    id: "d69", slug: "bajura", name: "Bajura", province: "Sudurpashchim",
    description: "A remote high-mountain district on the Api Nampa ridge, known for the Badimalika temple pilgrimage above the treeline.",
    heroImage: img(PHOTO.himalaya8, 1600),
    coordinates: { lat: 29.5167, lng: 81.5667 },
    cityCount: 1, destinationCount: 0, rating: 3.8,
    popularFor: ["Pilgrimage", "Trekking", "Remote", "Mountains"]
  },
  {
    id: "d70", slug: "bajhang", name: "Bajhang", province: "Sudurpashchim",
    description: "A wide high-valley district bordering China with the Saipal Himal range and the ancient Surnaya hot springs.",
    heroImage: img(PHOTO.himalaya9, 1600),
    coordinates: { lat: 29.6000, lng: 81.2167 },
    cityCount: 1, destinationCount: 0, rating: 3.9,
    popularFor: ["Trekking", "Remote", "Hot Springs", "Mountains"]
  },
  {
    id: "d71", slug: "achham", name: "Achham", province: "Sudurpashchim",
    description: "The birthplace of Nepal's national hero Prithvi Narayan Shah's ancestors, with Mangalsen hill views and the Ramaroshan lake complex.",
    heroImage: img(PHOTO.forest2, 1600),
    coordinates: { lat: 28.9500, lng: 81.2167 },
    cityCount: 1, destinationCount: 0, rating: 3.7,
    popularFor: ["Heritage", "Lakes", "Nature", "Culture"]
  },
  {
    id: "d72", slug: "doti", name: "Doti", province: "Sudurpashchim",
    description: "An ancient kingdom with Dipayal as modern HQ, the Shaileshwari temple and the forested Seti River valley.",
    heroImage: img(PHOTO.forest1, 1600),
    coordinates: { lat: 29.2500, lng: 80.9333 },
    cityCount: 1, destinationCount: 0, rating: 3.7,
    popularFor: ["Heritage", "Pilgrimage", "Nature", "Hills"]
  },
  {
    id: "d73", slug: "kailali", name: "Kailali", province: "Sudurpashchim",
    description: "The far-western Terai heartland — Dhangadhi is the provincial capital and Shuklaphanta National Park protects one of the last great Terai grasslands.",
    heroImage: img(PHOTO.jungle1, 1600),
    coordinates: { lat: 28.6990, lng: 80.5996 },
    cityCount: 2, destinationCount: 0, rating: 4.1,
    popularFor: ["Wildlife", "Shuklaphanta", "Terai", "Nature"]
  },
  {
    id: "d74", slug: "kanchanpur", name: "Kanchanpur", province: "Sudurpashchim",
    description: "Nepal's far-western corner with Mahendranagar on the Sharda River, Shuklaphanta adjacency and the Tribhumi pilgrimage.",
    heroImage: img(PHOTO.jungle1, 1600),
    coordinates: { lat: 28.9663, lng: 80.1732 },
    cityCount: 1, destinationCount: 0, rating: 3.9,
    popularFor: ["Nature", "Wildlife", "Pilgrimage", "Trade"]
  },
  {
    id: "d75", slug: "dadeldhura", name: "Dadeldhura", province: "Sudurpashchim",
    description: "A compact hill district with the Ugratara temple, oak forests and cool climate making it a pleasant hill retreat.",
    heroImage: img(PHOTO.forest2, 1600),
    coordinates: { lat: 29.3000, lng: 80.5833 },
    cityCount: 1, destinationCount: 0, rating: 3.7,
    popularFor: ["Pilgrimage", "Nature", "Hills", "Culture"]
  },
  {
    id: "d76", slug: "baitadi", name: "Baitadi", province: "Sudurpashchim",
    description: "A hill district with Mahakali River gorges, the Pancheshwar confluence pilgrimage and the Tribhuvan stone inscription.",
    heroImage: img(PHOTO.himalaya6, 1600),
    coordinates: { lat: 29.5333, lng: 80.4333 },
    cityCount: 1, destinationCount: 0, rating: 3.8,
    popularFor: ["Pilgrimage", "River", "Heritage", "Hills"]
  },
  {
    id: "d77", slug: "darchula", name: "Darchula", province: "Sudurpashchim",
    description: "Nepal's tri-border corner where the Kali River meets India and China — the Api Himal and the Adi Kailash route draw adventurers.",
    heroImage: img(PHOTO.himalaya9, 1600),
    coordinates: { lat: 29.8500, lng: 80.5500 },
    cityCount: 1, destinationCount: 0, rating: 4.0,
    popularFor: ["Adventure", "Trekking", "Mountains", "Remote"]
  }
];

export const cities = [
  // ── Existing cities (Koshi) ───────────────────────────────────────────────
  { id: "c6", slug: "namche-bazaar", districtId: "d3", name: "Namche Bazaar", description: "The Sherpa trading hub and acclimatisation stop on the way to Everest Base Camp.", image: img(PHOTO.himalaya4, 1000), coordinates: { lat: 27.8056, lng: 86.714 }, categories: ["Trekking", "Cultural"], rating: 4.8, destinationCount: 1, altitude: 3440 },
  { id: "c7", slug: "lukla", districtId: "d3", name: "Lukla", description: "Gateway town to the Khumbu, home to the world's most thrilling mountain airstrip.", image: img(PHOTO.himalaya5, 1000), coordinates: { lat: 27.6869, lng: 86.7314 }, categories: ["Trekking", "Adventure"], rating: 4.5, destinationCount: 1, altitude: 2860 },
  { id: "c11", slug: "taplejung", districtId: "d7", name: "Taplejung", description: "The main bazaar town of the far-eastern hills, base for Kanchenjunga trekking.", image: img(PHOTO.himalaya8, 1000), coordinates: { lat: 27.3535, lng: 87.6697 }, categories: ["Trekking", "Cultural"], rating: 4.0, destinationCount: 0, altitude: 1820 },
  { id: "c12", slug: "okhaldhunga", districtId: "d8", name: "Okhaldhunga", description: "A district headquarters perched on a ridge with valley views and traditional Rai culture.", image: img(PHOTO.forest1, 1000), coordinates: { lat: 27.3090, lng: 86.5015 }, categories: ["Cultural", "Nature"], rating: 3.6, destinationCount: 0, altitude: 1720 },
  { id: "c13", slug: "diktel", districtId: "d9", name: "Diktel", description: "Headquarters of Khotang and gateway to the sacred Halesi Mahadev cave complex.", image: img(PHOTO.forest2, 1000), coordinates: { lat: 27.2160, lng: 86.7993 }, categories: ["Pilgrimage", "Cultural"], rating: 3.7, destinationCount: 0, altitude: 1620 },
  { id: "c14", slug: "bhojpur", districtId: "d10", name: "Bhojpur", description: "A ridge-top bazaar famous for hand-forged khukuri knives and eastern mountain views.", image: img(PHOTO.himalaya6, 1000), coordinates: { lat: 27.1744, lng: 87.0516 }, categories: ["Crafts", "Cultural"], rating: 3.7, destinationCount: 0, altitude: 1480 },
  { id: "c15", slug: "dhankuta", districtId: "d11", name: "Dhankuta", description: "One of Nepal's most scenic hill towns, with a famous flower-lined main street and clean air.", image: img(PHOTO.forest1, 1000), coordinates: { lat: 26.9829, lng: 87.3432 }, categories: ["Nature", "Cultural"], rating: 3.8, destinationCount: 0, altitude: 1150 },
  { id: "c16", slug: "myanglung", districtId: "d12", name: "Myanglung", description: "The headquarters of Terhathum set above the Tamor River gorge with views to the peaks.", image: img(PHOTO.forest2, 1000), coordinates: { lat: 27.1239, lng: 87.5508 }, categories: ["Nature", "Cultural"], rating: 3.5, destinationCount: 0, altitude: 1100 },
  { id: "c17", slug: "khandbari", districtId: "d13", name: "Khandbari", description: "Gateway to Makalu-Barun National Park and the rugged upper Arun valley.", image: img(PHOTO.himalaya9, 1000), coordinates: { lat: 27.3576, lng: 87.1427 }, categories: ["Trekking", "Nature"], rating: 4.0, destinationCount: 0, altitude: 1060 },
  { id: "c18", slug: "phidim", districtId: "d14", name: "Phidim", description: "A quiet Panchthar hill town amid tea estates and rhododendron ridges near the Sikkim border.", image: img(PHOTO.forest1, 1000), coordinates: { lat: 27.1417, lng: 87.8079 }, categories: ["Nature", "Cultural"], rating: 3.6, destinationCount: 0, altitude: 1245 },
  { id: "c19", slug: "ilam", districtId: "d15", name: "Ilam", description: "The charming tea-garden town at the heart of Nepal's finest orthodox tea country.", image: img(PHOTO.forest2, 1000), coordinates: { lat: 26.9104, lng: 87.9244 }, categories: ["Tea", "Nature", "Cultural"], rating: 4.1, destinationCount: 0, altitude: 1200 },
  { id: "c20", slug: "mai-pokhari", districtId: "d15", name: "Mai Pokhari", description: "A sacred alpine lake surrounded by rhododendron forest — a serene pilgrimage and nature spot.", image: img(PHOTO.lake2, 1000), coordinates: { lat: 26.9950, lng: 87.8640 }, categories: ["Nature", "Pilgrimage", "Lake"], rating: 4.3, destinationCount: 0, altitude: 2100 },
  { id: "c21", slug: "chandragadhi", districtId: "d16", name: "Chandragadhi", description: "The administrative hub of Jhapa and site of Bhadrapur Airport, the eastern border gateway.", image: img(PHOTO.jungle1, 1000), coordinates: { lat: 26.5400, lng: 88.0900 }, categories: ["Trade", "Cultural"], rating: 3.5, destinationCount: 0, altitude: 90 },
  { id: "c22", slug: "birtamod", districtId: "d16", name: "Birtamod", description: "Jhapa's commercial centre in the heart of the cardamom and tea trading belt.", image: img(PHOTO.jungle1, 1000), coordinates: { lat: 26.6413, lng: 87.9881 }, categories: ["Trade", "Nature"], rating: 3.5, destinationCount: 0, altitude: 95 },
  { id: "c23", slug: "biratnagar", districtId: "d17", name: "Biratnagar", description: "The industrial capital of Province 1 — Nepal's second-largest city with a busy airport and vibrant markets.", image: img(PHOTO.lake2, 1000), coordinates: { lat: 26.4525, lng: 87.2718 }, categories: ["City", "Industry", "Trade"], rating: 3.8, destinationCount: 0, altitude: 72 },
  { id: "c24", slug: "urlabari", districtId: "d17", name: "Urlabari", description: "A growing Morang town on the East-West Highway with jute mills and sugar factories.", image: img(PHOTO.jungle1, 1000), coordinates: { lat: 26.6167, lng: 87.4333 }, categories: ["Trade", "Industry"], rating: 3.4, destinationCount: 0, altitude: 100 },
  { id: "c25", slug: "inaruwa", districtId: "d18", name: "Inaruwa", description: "Administrative headquarters of Sunsari and a busy transit point on the East-West Highway.", image: img(PHOTO.lake1, 1000), coordinates: { lat: 26.6396, lng: 87.1713 }, categories: ["Trade", "Cultural"], rating: 3.5, destinationCount: 0, altitude: 90 },
  { id: "c26", slug: "dharan", districtId: "d18", name: "Dharan", description: "A vibrant hill-base town famed as a Gurkha recruitment city, with a university, B.P. Koirala Institute and a cool climate.", image: img(PHOTO.forest1, 1000), coordinates: { lat: 26.8122, lng: 87.2839 }, categories: ["Culture", "Education", "Nature"], rating: 4.0, destinationCount: 0, altitude: 364 },
  { id: "c27", slug: "gaighat", districtId: "d19", name: "Gaighat", description: "The Udayapur district headquarters on the Triyuga River, growing as a mid-hill service centre.", image: img(PHOTO.forest2, 1000), coordinates: { lat: 26.9294, lng: 86.5160 }, categories: ["Cultural", "Nature"], rating: 3.5, destinationCount: 0, altitude: 610 },

  // ── Madhesh Province ──────────────────────────────────────────────────────
  { id: "c28", slug: "rajbiraj", districtId: "d20", name: "Rajbiraj", description: "The bustling headquarters of Saptari, a commercial centre in the eastern Terai plains.", image: img(PHOTO.jungle1, 1000), coordinates: { lat: 26.5435, lng: 86.7498 }, categories: ["Trade", "Cultural"], rating: 3.4, destinationCount: 0, altitude: 79 },
  { id: "c29", slug: "siraha", districtId: "d21", name: "Siraha", description: "The district hub of Siraha with Maithili cultural traditions and fertile farmlands.", image: img(PHOTO.jungle1, 1000), coordinates: { lat: 26.6543, lng: 86.2097 }, categories: ["Cultural", "Agriculture"], rating: 3.4, destinationCount: 0, altitude: 82 },
  { id: "c30", slug: "janakpur", districtId: "d22", name: "Janakpur", description: "The holy city of Sita — ornate temples, sacred ponds and the living Maithili art tradition of Mithila paintings.", image: img(PHOTO.stupa1, 1000), coordinates: { lat: 26.7271, lng: 85.9241 }, categories: ["Pilgrimage", "Heritage", "Cultural"], rating: 4.2, destinationCount: 0, altitude: 70 },
  { id: "c31", slug: "jaleshwor", districtId: "d23", name: "Jaleshwor", description: "Headquarters of Mahottari, a growing Terai town on the Kamala River with traditional Maithili culture.", image: img(PHOTO.jungle1, 1000), coordinates: { lat: 26.6500, lng: 85.7958 }, categories: ["Cultural", "Agriculture"], rating: 3.4, destinationCount: 0, altitude: 75 },
  { id: "c32", slug: "malangwa", districtId: "d24", name: "Malangwa", description: "The administrative centre of Sarlahi district, situated on the Bagmati River plain.", image: img(PHOTO.jungle1, 1000), coordinates: { lat: 27.0089, lng: 85.5575 }, categories: ["Cultural", "Agriculture"], rating: 3.4, destinationCount: 0, altitude: 110 },
  { id: "c33", slug: "gaur", districtId: "d25", name: "Gaur", description: "Headquarters of Rautahat with an important sugar mill and historical connections to the Madhesh movement.", image: img(PHOTO.jungle1, 1000), coordinates: { lat: 27.0217, lng: 85.2810 }, categories: ["Cultural", "Industry"], rating: 3.4, destinationCount: 0, altitude: 120 },
  { id: "c34", slug: "kalaiya", districtId: "d26", name: "Kalaiya", description: "The commercial hub of Bara district, a gateway to Simara airport and a growing industrial zone.", image: img(PHOTO.jungle1, 1000), coordinates: { lat: 27.0378, lng: 84.9986 }, categories: ["Trade", "Industry"], rating: 3.5, destinationCount: 0, altitude: 130 },
  { id: "c35", slug: "birgunj", districtId: "d27", name: "Birgunj", description: "Nepal's most active trade corridor — a bustling border city where the majority of Nepal's imports enter from India.", image: img(PHOTO.jungle1, 1000), coordinates: { lat: 27.0126, lng: 84.8792 }, categories: ["Trade", "Industry", "Border"], rating: 3.6, destinationCount: 0, altitude: 115 },

  // ── Bagmati Province ──────────────────────────────────────────────────────
  { id: "c1", slug: "kathmandu", districtId: "d1", name: "Kathmandu", description: "The historic heart of Nepal, packed with World Heritage temples and a thriving creative scene.", image: img(PHOTO.square1, 1000), coordinates: { lat: 27.7172, lng: 85.324 }, categories: ["Heritage", "Cultural", "City"], rating: 4.8, destinationCount: 2, altitude: 1400 },
  { id: "c3", slug: "boudha", districtId: "d1", name: "Boudha", description: "Centred on one of the world's largest stupas and a hub of Tibetan Buddhism.", image: img(PHOTO.stupa1, 1000), coordinates: { lat: 27.7215, lng: 85.362 }, categories: ["Religious", "Cultural"], rating: 4.7, destinationCount: 1, altitude: 1400 },
  { id: "c9", slug: "patan", districtId: "d5", name: "Patan", description: "The artisan city of Lalitpur, renowned for Newari architecture and metal craft.", image: img(PHOTO.stupa2, 1000), coordinates: { lat: 27.6766, lng: 85.325 }, categories: ["Heritage", "Cultural"], rating: 4.7, destinationCount: 1, altitude: 1350 },
  { id: "c2", slug: "bhaktapur", districtId: "d33", name: "Bhaktapur", description: "A perfectly preserved medieval city of pottery squares and pagoda temples.", image: img(PHOTO.square1, 1000), coordinates: { lat: 27.671, lng: 85.4298 }, categories: ["Heritage", "Cultural"], rating: 4.9, destinationCount: 1, altitude: 1401 },
  { id: "c8", slug: "sauraha", districtId: "d4", name: "Sauraha", description: "The lively gateway to Chitwan National Park and its jungle safaris.", image: img(PHOTO.jungle1, 1000), coordinates: { lat: 27.58, lng: 84.498 }, categories: ["Wildlife", "Nature"], rating: 4.7, destinationCount: 2, altitude: 150 },
  { id: "c36", slug: "sindhulimadi", districtId: "d28", name: "Sindhulimadi", description: "The Sindhuli district headquarters, a transit town on the Mahendra Highway.", image: img(PHOTO.forest1, 1000), coordinates: { lat: 27.2540, lng: 85.9717 }, categories: ["Nature", "Cultural"], rating: 3.5, destinationCount: 0, altitude: 1250 },
  { id: "c37", slug: "manthali", districtId: "d29", name: "Manthali", description: "Headquarters of Ramechhap and the location of the Everest-region Manthali Airport.", image: img(PHOTO.himalaya6, 1000), coordinates: { lat: 27.3908, lng: 86.0972 }, categories: ["Transport", "Nature"], rating: 3.6, destinationCount: 0, altitude: 830 },
  { id: "c38", slug: "charikot", districtId: "d30", name: "Charikot", description: "The Dolakha district hub above the Tamakoshi gorge with views to the Gaurishankar range.", image: img(PHOTO.himalaya9, 1000), coordinates: { lat: 27.6717, lng: 86.0829 }, categories: ["Nature", "Trekking"], rating: 3.8, destinationCount: 0, altitude: 2010 },
  { id: "c39", slug: "chautara", districtId: "d31", name: "Chautara", description: "Headquarters of Sindhupalchok, a ridge town with Helambu trekking trails nearby.", image: img(PHOTO.himalaya8, 1000), coordinates: { lat: 27.7748, lng: 85.6837 }, categories: ["Trekking", "Nature"], rating: 3.7, destinationCount: 0, altitude: 1490 },
  { id: "c40", slug: "dhulikhel", districtId: "d32", name: "Dhulikhel", description: "A historic Newari trading town with sweeping Himalayan panoramas and the Namobuddha trek nearby.", image: img(PHOTO.forest1, 1000), coordinates: { lat: 27.6244, lng: 85.5365 }, categories: ["Heritage", "Viewpoint", "Trekking"], rating: 4.1, destinationCount: 0, altitude: 1550 },
  { id: "c41", slug: "bidur", districtId: "d34", name: "Bidur", description: "The Nuwakot district headquarters on the Trishuli River, near the historic seven-storey Nuwakot palace.", image: img(PHOTO.square1, 1000), coordinates: { lat: 27.9093, lng: 85.1695 }, categories: ["Heritage", "Nature", "Rafting"], rating: 3.8, destinationCount: 0, altitude: 610 },
  { id: "c42", slug: "dhunche", districtId: "d35", name: "Dhunche", description: "The starting point for the Langtang Valley trek and gateway to Gosaikunda lake.", image: img(PHOTO.himalaya6, 1000), coordinates: { lat: 28.0804, lng: 85.3737 }, categories: ["Trekking", "Nature"], rating: 4.1, destinationCount: 0, altitude: 1950 },
  { id: "c43", slug: "dhading-besi", districtId: "d36", name: "Dhading Besi", description: "The Dhading district headquarters on the Trishuli River corridor below the Ganesh Himal.", image: img(PHOTO.forest2, 1000), coordinates: { lat: 27.8584, lng: 84.8814 }, categories: ["Nature", "Cultural"], rating: 3.5, destinationCount: 0, altitude: 480 },
  { id: "c44", slug: "hetauda", districtId: "d37", name: "Hetauda", description: "An industrial city in the inner Terai, headquarters of Makwanpur and key transit point between Kathmandu and the plains.", image: img(PHOTO.forest1, 1000), coordinates: { lat: 27.4232, lng: 85.0297 }, categories: ["Industry", "Nature", "Trade"], rating: 3.7, destinationCount: 0, altitude: 472 },

  // ── Gandaki Province ──────────────────────────────────────────────────────
  { id: "c4", slug: "pokhara", districtId: "d2", name: "Pokhara", description: "Nepal's adventure capital on the shores of Phewa Lake under the Annapurna range.", image: img(PHOTO.lake1, 1000), coordinates: { lat: 28.2096, lng: 83.9856 }, categories: ["Lake", "Adventure", "Nature"], rating: 4.9, destinationCount: 2, altitude: 822 },
  { id: "c5", slug: "sarangkot", districtId: "d2", name: "Sarangkot", description: "A hilltop village famed for sunrise mountain views and paragliding launches.", image: img(PHOTO.himalaya3, 1000), coordinates: { lat: 28.244, lng: 83.949 }, categories: ["Adventure", "Nature"], rating: 4.6, destinationCount: 1, altitude: 1600 },
  { id: "c10", slug: "lo-manthang", districtId: "d6", name: "Lo Manthang", description: "The walled capital of Upper Mustang, a fragment of old Tibet in Nepal.", image: img(PHOTO.himalaya2, 1000), coordinates: { lat: 29.183, lng: 83.958 }, categories: ["Cultural", "Trekking"], rating: 4.8, destinationCount: 1, altitude: 3840 },
  { id: "c45", slug: "gorkha", districtId: "d38", name: "Gorkha", description: "The ancestral seat of the Shah dynasty — the hilltop Gorkha Durbar palace commands views over the Himalayan horizon.", image: img(PHOTO.himalaya3, 1000), coordinates: { lat: 28.0000, lng: 84.6333 }, categories: ["Heritage", "Trekking", "History"], rating: 4.0, destinationCount: 0, altitude: 1150 },
  { id: "c46", slug: "besisahar", districtId: "d39", name: "Besisahar", description: "The classic starting town for the Annapurna Circuit, at the confluence of the Marsyangdi and Khudi rivers.", image: img(PHOTO.himalaya7, 1000), coordinates: { lat: 28.2333, lng: 84.3833 }, categories: ["Trekking", "Nature"], rating: 3.9, destinationCount: 0, altitude: 760 },
  { id: "c47", slug: "damauli", districtId: "d40", name: "Damauli", description: "The Tanahun headquarters at the Seti-Madi confluence, a busy junction town on the Prithvi Highway.", image: img(PHOTO.forest2, 1000), coordinates: { lat: 27.9213, lng: 84.2433 }, categories: ["Nature", "River", "Trade"], rating: 3.6, destinationCount: 0, altitude: 400 },
  { id: "c48", slug: "waling", districtId: "d41", name: "Waling", description: "A thriving bazaar town in Syangja's apple country, sitting between Pokhara and Butwal.", image: img(PHOTO.forest1, 1000), coordinates: { lat: 28.0836, lng: 83.8764 }, categories: ["Trade", "Nature", "Cultural"], rating: 3.6, destinationCount: 0, altitude: 550 },
  { id: "c49", slug: "chame", districtId: "d42", name: "Chame", description: "The Manang district headquarters on the Annapurna Circuit, with hot springs and the first views of Annapurna II.", image: img(PHOTO.himalaya4, 1000), coordinates: { lat: 28.5583, lng: 84.2319 }, categories: ["Trekking", "Adventure", "Nature"], rating: 4.2, destinationCount: 0, altitude: 2670 },
  { id: "c50", slug: "beni", districtId: "d43", name: "Beni", description: "The Myagdi district hub at the Myagdi-Kali Gandaki confluence, gateway to Dhaulagiri trekking routes.", image: img(PHOTO.himalaya5, 1000), coordinates: { lat: 28.3500, lng: 83.5667 }, categories: ["Trekking", "Nature", "Adventure"], rating: 4.0, destinationCount: 0, altitude: 830 },
  { id: "c51", slug: "baglung", districtId: "d44", name: "Baglung", description: "A steep-sided district town above the Kali Gandaki with a famous suspension footbridge.", image: img(PHOTO.forest2, 1000), coordinates: { lat: 28.2709, lng: 83.5870 }, categories: ["Nature", "Trekking", "Cultural"], rating: 3.7, destinationCount: 0, altitude: 900 },
  { id: "c52", slug: "kushma", districtId: "d45", name: "Kushma", description: "Home to Nepal's highest bungee jump over the Kali Gandaki gorge and Nepal's longest suspension bridge.", image: img(PHOTO.himalaya7, 1000), coordinates: { lat: 28.2333, lng: 83.7000 }, categories: ["Adventure", "Nature", "Viewpoint"], rating: 4.0, destinationCount: 0, altitude: 890 },
  { id: "c53", slug: "kawasoti", districtId: "d46", name: "Kawasoti", description: "The Nawalpur district headquarters in the inner Terai, with Devghat sacred confluence nearby.", image: img(PHOTO.lake1, 1000), coordinates: { lat: 27.7500, lng: 84.1333 }, categories: ["Pilgrimage", "Nature", "Cultural"], rating: 3.6, destinationCount: 0, altitude: 230 },

  // ── Lumbini Province ──────────────────────────────────────────────────────
  { id: "c54", slug: "tamghas", districtId: "d47", name: "Tamghas", description: "The Gulmi district headquarters with Resunga temple hill and sweeping views to Dhaulagiri.", image: img(PHOTO.forest1, 1000), coordinates: { lat: 28.0669, lng: 83.2638 }, categories: ["Pilgrimage", "Nature", "Hills"], rating: 3.7, destinationCount: 0, altitude: 1320 },
  { id: "c55", slug: "tansen", districtId: "d48", name: "Tansen", description: "A gem of Newari heritage in western Nepal — Palpa silk, metalwork and cobbled streets with mountain views.", image: img(PHOTO.square1, 1000), coordinates: { lat: 27.8671, lng: 83.5454 }, categories: ["Heritage", "Cultural", "Crafts"], rating: 4.0, destinationCount: 0, altitude: 1370 },
  { id: "c56", slug: "sandhikharka", districtId: "d49", name: "Sandhikharka", description: "The quiet headquarters of Arghakhanchi with the Rani Mahal ruins and traditional hill bazaar.", image: img(PHOTO.forest2, 1000), coordinates: { lat: 27.9500, lng: 83.1333 }, categories: ["Heritage", "Nature", "Hills"], rating: 3.5, destinationCount: 0, altitude: 1100 },
  { id: "c57", slug: "taulihawa", districtId: "d50", name: "Taulihawa", description: "The gateway to the ancient Shakya kingdom — Kapilvastu's district hub near Tilaurakot archaeological park.", image: img(PHOTO.stupa2, 1000), coordinates: { lat: 27.5704, lng: 83.0547 }, categories: ["Heritage", "Pilgrimage", "Buddhism"], rating: 3.9, destinationCount: 0, altitude: 100 },
  { id: "c58", slug: "bhairahawa", districtId: "d51", name: "Bhairahawa", description: "The international airport city closest to Lumbini, a key crossing point with India and gateway to the Buddha's birthplace.", image: img(PHOTO.stupa1, 1000), coordinates: { lat: 27.5036, lng: 83.4494 }, categories: ["Pilgrimage", "Transport", "Trade"], rating: 4.0, destinationCount: 0, altitude: 93 },
  { id: "c59", slug: "butwal", districtId: "d51", name: "Butwal", description: "A fast-growing Terai city at the foot of the Palpa hills — Nepal's mid-western commercial powerhouse.", image: img(PHOTO.jungle1, 1000), coordinates: { lat: 27.7006, lng: 83.4532 }, categories: ["City", "Trade", "Industry"], rating: 3.8, destinationCount: 0, altitude: 134 },
  { id: "c60", slug: "parasi", districtId: "d52", name: "Parasi", description: "The headquarters of western Nawalparasi at the edge of the Chitwan forest buffer zone.", image: img(PHOTO.jungle1, 1000), coordinates: { lat: 27.5500, lng: 84.0167 }, categories: ["Nature", "Cultural", "Agriculture"], rating: 3.5, destinationCount: 0, altitude: 170 },
  { id: "c61", slug: "ghorahi", districtId: "d53", name: "Ghorahi", description: "One of Dang Valley's twin cities — a busy commercial town surrounded by inner Terai forests.", image: img(PHOTO.lake1, 1000), coordinates: { lat: 28.0250, lng: 82.4708 }, categories: ["Trade", "Nature", "Cultural"], rating: 3.7, destinationCount: 0, altitude: 650 },
  { id: "c62", slug: "tulsipur", districtId: "d53", name: "Tulsipur", description: "Dang's second major city with important religious temples and the Rapti River nearby.", image: img(PHOTO.forest1, 1000), coordinates: { lat: 28.1333, lng: 82.2833 }, categories: ["Cultural", "Pilgrimage", "Nature"], rating: 3.6, destinationCount: 0, altitude: 700 },
  { id: "c63", slug: "pyuthan-bazar", districtId: "d54", name: "Pyuthan", description: "The Pyuthan district hub with access to the Swargadwari temple pilgrimage in the hills.", image: img(PHOTO.forest2, 1000), coordinates: { lat: 28.1000, lng: 82.8667 }, categories: ["Pilgrimage", "Nature", "Hills"], rating: 3.6, destinationCount: 0, altitude: 1100 },
  { id: "c64", slug: "liwang", districtId: "d55", name: "Liwang", description: "The Rolpa district headquarters set in remote mid-western hills with traditional Magar culture.", image: img(PHOTO.himalaya6, 1000), coordinates: { lat: 28.2333, lng: 82.6667 }, categories: ["Cultural", "Trekking", "Nature"], rating: 3.6, destinationCount: 0, altitude: 1500 },
  { id: "c65", slug: "musikot", districtId: "d56", name: "Musikot", description: "The western Rukum headquarters above the Bheri-Madi corridor, serving remote mountain communities.", image: img(PHOTO.himalaya9, 1000), coordinates: { lat: 28.5500, lng: 82.3667 }, categories: ["Cultural", "Trekking", "Nature"], rating: 3.5, destinationCount: 0, altitude: 1700 },
  { id: "c66", slug: "nepalgunj", districtId: "d57", name: "Nepalgunj", description: "The mid-western hub with an international airport, the largest city of far/mid-western Nepal.", image: img(PHOTO.jungle1, 1000), coordinates: { lat: 28.0500, lng: 81.6167 }, categories: ["City", "Trade", "Gateway"], rating: 3.8, destinationCount: 0, altitude: 165 },
  { id: "c67", slug: "gulariya", districtId: "d58", name: "Gulariya", description: "The headquarters of Bardiya district and the entry point for Bardia National Park's pristine jungle.", image: img(PHOTO.jungle1, 1000), coordinates: { lat: 28.3333, lng: 81.3333 }, categories: ["Wildlife", "Nature", "Safari"], rating: 4.2, destinationCount: 0, altitude: 180 },

  // ── Karnali Province ──────────────────────────────────────────────────────
  { id: "c68", slug: "dunai", districtId: "d59", name: "Dunai", description: "The remote headquarters of Dolpa, accessible by small aircraft, a launch pad for Phoksundo Lake and the Upper Dolpa circuit.", image: img(PHOTO.himalaya2, 1000), coordinates: { lat: 28.9806, lng: 82.8944 }, categories: ["Trekking", "Remote", "Nature"], rating: 4.3, destinationCount: 0, altitude: 2100 },
  { id: "c69", slug: "gamgadhi", districtId: "d60", name: "Gamgadhi", description: "The isolated headquarters of Mugu, a few days' walk from the turquoise Rara Lake.", image: img(PHOTO.himalaya9, 1000), coordinates: { lat: 29.5167, lng: 82.3833 }, categories: ["Trekking", "Remote", "Nature"], rating: 3.9, destinationCount: 0, altitude: 2300 },
  { id: "c70", slug: "simikot", districtId: "d61", name: "Simikot", description: "The high-altitude headquarters of Humla and the principal departure point for the sacred Kailash route via Nepal.", image: img(PHOTO.himalaya8, 1000), coordinates: { lat: 29.9700, lng: 81.8167 }, categories: ["Trekking", "Pilgrimage", "Remote"], rating: 4.3, destinationCount: 0, altitude: 2900 },
  { id: "c71", slug: "khalanga-jumla", districtId: "d62", name: "Khalanga", description: "The Jumla headquarters — a high-altitude apple-growing town and the start of the Rara Lake trek.", image: img(PHOTO.himalaya5, 1000), coordinates: { lat: 29.2750, lng: 82.1833 }, categories: ["Trekking", "Nature", "Agriculture"], rating: 4.0, destinationCount: 0, altitude: 2395 },
  { id: "c72", slug: "manma", districtId: "d63", name: "Manma", description: "The Kalikot district hub on a ridge above the Tila River with ancient Khasiya heritage.", image: img(PHOTO.himalaya6, 1000), coordinates: { lat: 29.1417, lng: 81.6500 }, categories: ["Heritage", "Cultural", "Nature"], rating: 3.6, destinationCount: 0, altitude: 1740 },
  { id: "c73", slug: "narayan-dailekh", districtId: "d64", name: "Narayan", description: "The Dailekh district headquarters with the Dailekh Durbar ruins and forested Chure foothills.", image: img(PHOTO.forest1, 1000), coordinates: { lat: 28.8417, lng: 81.7167 }, categories: ["Heritage", "Nature", "Cultural"], rating: 3.5, destinationCount: 0, altitude: 1060 },
  { id: "c74", slug: "khalanga-jajarkot", districtId: "d65", name: "Khalanga", description: "The Jajarkot district headquarters above the Bheri River gorge, a mid-western hill trade centre.", image: img(PHOTO.forest2, 1000), coordinates: { lat: 28.7000, lng: 82.1500 }, categories: ["Cultural", "Nature", "Hills"], rating: 3.5, destinationCount: 0, altitude: 1310 },
  { id: "c75", slug: "rukumkot", districtId: "d66", name: "Rukumkot", description: "The eastern Rukum headquarters in a remote valley, gateway to Dhorpatan Hunting Reserve.", image: img(PHOTO.himalaya9, 1000), coordinates: { lat: 28.5667, lng: 82.8167 }, categories: ["Wildlife", "Trekking", "Nature"], rating: 3.6, destinationCount: 0, altitude: 1550 },
  { id: "c76", slug: "shreenagar-salyan", districtId: "d67", name: "Shreenagar", description: "The Salyan district headquarters on a ridge with views across the mid-western hills.", image: img(PHOTO.forest1, 1000), coordinates: { lat: 28.3500, lng: 82.1667 }, categories: ["Nature", "Cultural", "Hills"], rating: 3.5, destinationCount: 0, altitude: 1220 },
  { id: "c77", slug: "birendranagar", districtId: "d68", name: "Birendranagar", description: "The fast-growing provincial capital of Karnali with Bulbule Lake, Kakrebihar temple and the Karnali Highway node.", image: img(PHOTO.lake1, 1000), coordinates: { lat: 28.6000, lng: 81.6167 }, categories: ["City", "Nature", "Cultural"], rating: 3.9, destinationCount: 0, altitude: 720 },

  // ── Sudurpashchim Province ────────────────────────────────────────────────
  { id: "c78", slug: "martadi", districtId: "d69", name: "Martadi", description: "The remote headquarters of Bajura and base for the Badimalika temple trek in the Api Nampa range.", image: img(PHOTO.himalaya8, 1000), coordinates: { lat: 29.5167, lng: 81.5667 }, categories: ["Pilgrimage", "Trekking", "Remote"], rating: 3.7, destinationCount: 0, altitude: 1500 },
  { id: "c79", slug: "chainpur-bajhang", districtId: "d70", name: "Chainpur", description: "The Bajhang headquarters in the high Seti valley with ancient temple complexes and mountain wilderness.", image: img(PHOTO.himalaya9, 1000), coordinates: { lat: 29.5500, lng: 81.1833 }, categories: ["Heritage", "Trekking", "Mountains"], rating: 3.7, destinationCount: 0, altitude: 1500 },
  { id: "c80", slug: "mangalsen", districtId: "d71", name: "Mangalsen", description: "The Achham district headquarters with the Ramaroshan holy lakes and views toward the Saipal massif.", image: img(PHOTO.forest2, 1000), coordinates: { lat: 28.9500, lng: 81.2167 }, categories: ["Pilgrimage", "Nature", "Hills"], rating: 3.6, destinationCount: 0, altitude: 1380 },
  { id: "c81", slug: "dipayal", districtId: "d72", name: "Dipayal", description: "Also known as Silgadhi — the Doti headquarters with the Shaileshwari temple overlooking the Seti River.", image: img(PHOTO.forest1, 1000), coordinates: { lat: 29.2500, lng: 80.9333 }, categories: ["Heritage", "Pilgrimage", "Nature"], rating: 3.7, destinationCount: 0, altitude: 1070 },
  { id: "c82", slug: "dhangadhi", districtId: "d73", name: "Dhangadhi", description: "The provincial capital of Sudurpashchim — a growing Terai city with an airport and the closest urban base to Shuklaphanta.", image: img(PHOTO.jungle1, 1000), coordinates: { lat: 28.6990, lng: 80.5996 }, categories: ["City", "Wildlife", "Trade"], rating: 3.9, destinationCount: 0, altitude: 178 },
  { id: "c83", slug: "attariya", districtId: "d73", name: "Attariya", description: "A busy highway junction in Kailali on the East-West Highway, major transit point for far-western traffic.", image: img(PHOTO.jungle1, 1000), coordinates: { lat: 28.7667, lng: 80.7167 }, categories: ["Trade", "Transport"], rating: 3.4, destinationCount: 0, altitude: 180 },
  { id: "c84", slug: "mahendranagar", districtId: "d74", name: "Mahendranagar", description: "Nepal's westernmost major city on the Sharda River, a border town and base for Shuklaphanta National Park.", image: img(PHOTO.jungle1, 1000), coordinates: { lat: 28.9663, lng: 80.1732 }, categories: ["Wildlife", "Trade", "Border"], rating: 3.8, destinationCount: 0, altitude: 205 },
  { id: "c85", slug: "dadeldhura", districtId: "d75", name: "Dadeldhura", description: "A pleasant hill headquarters with the Ugratara temple and cool oak forests above the Mahakali corridor.", image: img(PHOTO.forest2, 1000), coordinates: { lat: 29.3000, lng: 80.5833 }, categories: ["Pilgrimage", "Nature", "Hills"], rating: 3.6, destinationCount: 0, altitude: 1220 },
  { id: "c86", slug: "dashrathchand", districtId: "d76", name: "Dashrathchand", description: "The Baitadi headquarters above the Mahakali gorge, named after the patriot-martyr Dasharath Chand.", image: img(PHOTO.himalaya6, 1000), coordinates: { lat: 29.5333, lng: 80.4333 }, categories: ["Heritage", "Nature", "Cultural"], rating: 3.6, destinationCount: 0, altitude: 1520 },
  { id: "c87", slug: "darchula", districtId: "d77", name: "Darchula", description: "Nepal's tri-border town at the meeting of the Kali and Chameliya rivers, base for the Adi Kailash route.", image: img(PHOTO.himalaya9, 1000), coordinates: { lat: 29.8500, lng: 80.5500 }, categories: ["Adventure", "Trekking", "Border"], rating: 3.9, destinationCount: 0, altitude: 900 }
];

export const destinations = [
  {
    id: "p1", slug: "swayambhunath", cityId: "c1", districtId: "d1",
    name: "Swayambhunath", tagline: "The Monkey Temple watching over the valley",
    description: "Perched on a hilltop west of Kathmandu, the Swayambhunath stupa is one of the oldest religious sites in Nepal. Its all-seeing Buddha eyes, fluttering prayer flags and resident monkeys make it an unmissable introduction to the valley's spiritual life.",
    category: "Religious", tags: ["Stupa", "Viewpoint", "UNESCO", "Buddhist"],
    heroImage: img(PHOTO.swayambhu, 1600),
    gallery: gallery(PHOTO.swayambhu, PHOTO.stupa1, PHOTO.square1, PHOTO.himalaya3),
    coordinates: { lat: 27.7149, lng: 85.2904 }, rating: 4.8, reviewCount: 1284,
    bestTimeToVisit: ["Autumn", "Spring"],
    budget: { budget: 15, midRange: 45, luxury: 120, currency: "USD" },
    attractions: [
      { name: "Main Stupa", description: "The iconic white dome crowned with golden Buddha eyes." },
      { name: "Harati Temple", description: "Shrine to the goddess of smallpox, blending Hindu and Buddhist worship." },
      { name: "Valley Viewpoint", description: "Panoramic outlook over the entire Kathmandu valley." }
    ],
    activities: ["Sunrise photography", "Spinning prayer wheels", "Guided heritage walk", "Meditation"],
    restaurants: [
      { name: "Cafe de Patan", cuisine: "Nepali / Continental", priceRange: "$$" },
      { name: "Stupa View Restaurant", cuisine: "Tibetan", priceRange: "$$" }
    ],
    localFoods: ["Momo", "Sel roti", "Yomari", "Butter tea"],
    travelTips: ["Visit at dawn to beat crowds and heat.", "Watch your belongings around the monkeys.", "Climb the 365 stone steps slowly to acclimatise."],
    pros: ["Spectacular city views", "Rich spiritual atmosphere", "Easy half-day trip"],
    cons: ["Steep climb", "Can get crowded midday", "Aggressive monkeys"],
    nearby: ["p2"], featured: true, trending: true
  },
  {
    id: "p2", slug: "kathmandu-durbar-square", cityId: "c1", districtId: "d1",
    name: "Kathmandu Durbar Square", tagline: "Royal palaces at the city's beating heart",
    description: "A UNESCO World Heritage complex of palaces, courtyards and temples that was the seat of the Malla and Shah kings. Home to the living goddess Kumari and some of the finest Newari woodcarving in the country.",
    category: "Heritage", tags: ["UNESCO", "Palace", "Architecture", "History"],
    heroImage: img(PHOTO.square1, 1600),
    gallery: gallery(PHOTO.square1, PHOTO.stupa1, PHOTO.stupa2, PHOTO.himalaya6),
    coordinates: { lat: 27.7045, lng: 85.3076 }, rating: 4.7, reviewCount: 980,
    bestTimeToVisit: ["Autumn", "Winter"],
    budget: { budget: 20, midRange: 50, luxury: 130, currency: "USD" },
    attractions: [
      { name: "Kumari Ghar", description: "Residence of Kathmandu's living goddess." },
      { name: "Hanuman Dhoka", description: "The old royal palace complex." },
      { name: "Taleju Temple", description: "Towering three-tiered temple of the royal deity." }
    ],
    activities: ["Heritage walking tour", "Festival watching", "Photography", "Souvenir shopping"],
    restaurants: [{ name: "Honacha", cuisine: "Newari", priceRange: "$" }, { name: "Cafe Layku", cuisine: "Nepali", priceRange: "$$" }],
    localFoods: ["Bara", "Chatamari", "Juju dhau", "Samay baji"],
    travelTips: ["Buy the combined heritage ticket.", "Hire a licensed guide for context.", "Respect photography rules at the Kumari house."],
    pros: ["Dense with monuments", "Central location", "Great people-watching"],
    cons: ["Some 2015 quake damage remains", "Busy traffic nearby"],
    nearby: ["p1"], featured: true, trending: false
  },
  {
    id: "p3", slug: "bhaktapur-durbar-square", cityId: "c2", districtId: "d33",
    name: "Bhaktapur Durbar Square", tagline: "A medieval city frozen in time",
    description: "The best-preserved of the valley's three durbar squares, Bhaktapur is a car-free maze of pottery squares, pagodas and the famous 55-Window Palace.",
    category: "Heritage", tags: ["UNESCO", "Pottery", "Architecture", "Newari"],
    heroImage: img(PHOTO.square1, 1600),
    gallery: gallery(PHOTO.square1, PHOTO.stupa2, PHOTO.stupa1, PHOTO.forest1),
    coordinates: { lat: 27.6722, lng: 85.428 }, rating: 4.9, reviewCount: 1102,
    bestTimeToVisit: ["Autumn", "Spring"],
    budget: { budget: 18, midRange: 48, luxury: 110, currency: "USD" },
    attractions: [
      { name: "55-Window Palace", description: "Masterpiece of Newari woodcarving." },
      { name: "Nyatapola Temple", description: "Nepal's tallest five-storey pagoda." },
      { name: "Pottery Square", description: "Watch potters spin clay the traditional way." }
    ],
    activities: ["Pottery workshop", "Photography", "Tasting juju dhau", "Heritage tour"],
    restaurants: [{ name: "Cafe Nyatapola", cuisine: "Continental", priceRange: "$$" }, { name: "Peacock Restaurant", cuisine: "Newari", priceRange: "$$" }],
    localFoods: ["Juju dhau (king curd)", "Bara", "Chatamari", "Yomari"],
    travelTips: ["Stay overnight to enjoy the empty morning squares.", "Try the famous king curd.", "Wear comfortable shoes for cobblestones."],
    pros: ["Wonderfully preserved", "Car-free core", "Authentic crafts"],
    cons: ["Higher entry fee for foreigners", "30–60 min from central Kathmandu"],
    nearby: ["p1", "p2"], featured: true, trending: true
  },
  {
    id: "p4", slug: "boudhanath-stupa", cityId: "c3", districtId: "d1",
    name: "Boudhanath Stupa", tagline: "The serene mandala of Tibetan Kathmandu",
    description: "One of the largest stupas in the world and the spiritual centre of Nepal's Tibetan community. Walk the kora clockwise at dusk amid butter lamps and murmured mantras.",
    category: "Religious", tags: ["UNESCO", "Stupa", "Buddhist", "Tibetan"],
    heroImage: img(PHOTO.stupa1, 1600),
    gallery: gallery(PHOTO.stupa1, PHOTO.stupa2, PHOTO.square1, PHOTO.himalaya3),
    coordinates: { lat: 27.7215, lng: 85.362 }, rating: 4.8, reviewCount: 1456,
    bestTimeToVisit: ["Autumn", "Winter"],
    budget: { budget: 12, midRange: 40, luxury: 100, currency: "USD" },
    attractions: [
      { name: "Great Stupa", description: "Massive mandala-shaped stupa with watchful Buddha eyes." },
      { name: "Rooftop Cafes", description: "Sweeping views over the dome and prayer flags." },
      { name: "Monasteries", description: "Dozens of active gompas ring the stupa." }
    ],
    activities: ["Evening kora walk", "Butter-lamp offering", "Rooftop coffee", "Monastery visit"],
    restaurants: [{ name: "Garden Kitchen", cuisine: "Tibetan", priceRange: "$$" }, { name: "Flavors Cafe", cuisine: "Continental", priceRange: "$$" }],
    localFoods: ["Thukpa", "Tibetan bread", "Momo", "Butter tea"],
    travelTips: ["Walk clockwise around the stupa.", "Sunset is the most atmospheric time.", "Support local Tibetan handicraft shops."],
    pros: ["Peaceful atmosphere", "Great cafes", "Living spiritual culture"],
    cons: ["Entry fee for foreigners", "Busy on festival days"],
    nearby: ["p1"], featured: false, trending: true
  },
  {
    id: "p5", slug: "phewa-lake", cityId: "c4", districtId: "d2",
    name: "Phewa Lake", tagline: "Annapurna reflections and lakeside calm",
    description: "Pokhara's shimmering centrepiece, where wooden doongas glide past the Tal Barahi temple and the Annapurnas mirror in still morning water.",
    category: "Lake", tags: ["Boating", "Sunrise", "Nature", "Relax"],
    heroImage: img(PHOTO.lake1, 1600),
    gallery: gallery(PHOTO.lake1, PHOTO.lake2, PHOTO.himalaya7, PHOTO.himalaya3),
    coordinates: { lat: 28.2096, lng: 83.9485 }, rating: 4.9, reviewCount: 1678,
    bestTimeToVisit: ["Autumn", "Spring"],
    budget: { budget: 25, midRange: 60, luxury: 160, currency: "USD" },
    attractions: [
      { name: "Tal Barahi Temple", description: "Island shrine in the middle of the lake." },
      { name: "World Peace Pagoda", description: "Hilltop stupa with lake and mountain views." },
      { name: "Lakeside", description: "Buzzing strip of cafes, bars and shops." }
    ],
    activities: ["Boating", "Paragliding", "Kayaking", "Lakeside dining"],
    restaurants: [{ name: "Caffe Concerto", cuisine: "Italian", priceRange: "$$$" }, { name: "Moondance", cuisine: "Continental", priceRange: "$$" }],
    localFoods: ["Fresh lake fish", "Dal bhat", "Momo", "Lassi"],
    travelTips: ["Rent a boat at sunrise for the best reflections.", "Combine with a paragliding flight from Sarangkot.", "Walk to the Peace Pagoda for sunset."],
    pros: ["Stunning mountain views", "Lots of activities", "Relaxed vibe"],
    cons: ["Can be touristy", "Monsoon clouds hide peaks"],
    nearby: ["p6"], featured: true, trending: true
  },
  {
    id: "p6", slug: "sarangkot-sunrise", cityId: "c5", districtId: "d2",
    name: "Sarangkot Sunrise", tagline: "First light on the Annapurnas",
    description: "A short drive above Pokhara, Sarangkot is the classic spot to watch dawn ignite Machhapuchhre and the Annapurna range — and the launch pad for tandem paragliding.",
    category: "Adventure", tags: ["Sunrise", "Paragliding", "Viewpoint", "Hiking"],
    heroImage: img(PHOTO.himalaya3, 1600),
    gallery: gallery(PHOTO.himalaya3, PHOTO.himalaya5, PHOTO.lake1, PHOTO.himalaya7),
    coordinates: { lat: 28.244, lng: 83.949 }, rating: 4.7, reviewCount: 642,
    bestTimeToVisit: ["Autumn", "Winter", "Spring"],
    budget: { budget: 30, midRange: 70, luxury: 180, currency: "USD" },
    attractions: [
      { name: "Sunrise Viewpoint", description: "Tower platform facing the Himalayas." },
      { name: "Paragliding launch", description: "One of the world's best tandem flying sites." }
    ],
    activities: ["Sunrise viewing", "Paragliding", "Mountain biking", "Hiking"],
    restaurants: [{ name: "Sunrise Cafe", cuisine: "Nepali", priceRange: "$" }],
    localFoods: ["Tea & pakoda", "Dal bhat", "Roasted corn"],
    travelTips: ["Leave Pokhara by 4:30am for sunrise.", "Bring a warm layer — mornings are cold.", "Book paragliding a day ahead in peak season."],
    pros: ["Epic mountain panorama", "Adventure on tap", "Close to Pokhara"],
    cons: ["Very early start", "Clear weather not guaranteed"],
    nearby: ["p5"], featured: false, trending: true
  },
  {
    id: "p7", slug: "everest-base-camp-trek", cityId: "c6", districtId: "d3",
    name: "Everest Base Camp Trek", tagline: "The pilgrimage to the foot of the world's highest peak",
    description: "The legendary trek through Sherpa villages, swinging bridges and high glacial valleys to the base of Mount Everest at 5,364m.",
    category: "Trekking", tags: ["Everest", "High Altitude", "Bucket List", "Sherpa"],
    heroImage: img(PHOTO.himalaya1, 1600),
    gallery: gallery(PHOTO.himalaya1, PHOTO.himalaya4, PHOTO.himalaya8, PHOTO.himalaya9),
    coordinates: { lat: 27.9881, lng: 86.925 }, rating: 5.0, reviewCount: 893,
    bestTimeToVisit: ["Autumn", "Spring"],
    budget: { budget: 900, midRange: 1600, luxury: 4500, currency: "USD" },
    attractions: [
      { name: "Kala Patthar", description: "5,545m viewpoint for the classic Everest panorama." },
      { name: "Tengboche Monastery", description: "Famous monastery framed by Ama Dablam." },
      { name: "Khumbu Glacier", description: "The icy approach to base camp itself." }
    ],
    activities: ["Multi-day trekking", "Acclimatisation hikes", "Monastery visits", "Photography"],
    restaurants: [{ name: "Teahouse lodges", cuisine: "Nepali / Sherpa", priceRange: "$$" }],
    localFoods: ["Dal bhat", "Sherpa stew", "Tsampa", "Yak cheese"],
    travelTips: ["Allow rest days to acclimatise.", "Carry cash — no ATMs past Namche.", "Travel insurance with heli-evac is essential."],
    pros: ["Once-in-a-lifetime scenery", "Rich Sherpa culture", "Well-supported trail"],
    cons: ["Altitude sickness risk", "Physically demanding", "Weather-dependent flights"],
    nearby: [], featured: true, trending: true
  },
  {
    id: "p8", slug: "chitwan-national-park", cityId: "c8", districtId: "d4",
    name: "Chitwan National Park", tagline: "Rhinos, tigers and tropical jungle",
    description: "Nepal's first national park and a UNESCO site, Chitwan protects one-horned rhinos, Bengal tigers, gharials and a riot of birdlife across riverine grasslands and sal forest.",
    category: "Wildlife", tags: ["UNESCO", "Safari", "Rhino", "Jungle"],
    heroImage: img(PHOTO.jungle1, 1600),
    gallery: gallery(PHOTO.jungle1, PHOTO.forest1, PHOTO.forest2, PHOTO.himalaya6),
    coordinates: { lat: 27.5291, lng: 84.3542 }, rating: 4.7, reviewCount: 1205,
    bestTimeToVisit: ["Autumn", "Winter", "Spring"],
    budget: { budget: 120, midRange: 280, luxury: 700, currency: "USD" },
    attractions: [
      { name: "Jeep Safari", description: "Search for rhino and tiger in the core zone." },
      { name: "Canoe ride", description: "Drift past gharial crocodiles on the Rapti river." },
      { name: "Tharu Village", description: "Experience indigenous Tharu culture and dance." }
    ],
    activities: ["Jeep safari", "Canoeing", "Bird watching", "Jungle walk", "Elephant breeding centre"],
    restaurants: [{ name: "Jungle Lodge Dining", cuisine: "Nepali / Tharu", priceRange: "$$" }],
    localFoods: ["Tharu thali", "Fish curry", "Dhikri", "Ghonghi"],
    travelTips: ["Book a licensed guide for safaris.", "Dawn and dusk give the best wildlife sightings.", "Wear neutral colours."],
    pros: ["Excellent wildlife", "Unique Tharu culture", "Great value safaris"],
    cons: ["Hot and humid", "Sightings not guaranteed"],
    nearby: [], featured: true, trending: false
  },
  {
    id: "p9", slug: "patan-durbar-square", cityId: "c9", districtId: "d5",
    name: "Patan Durbar Square", tagline: "The artisan's masterpiece",
    description: "The most refined of the valley's durbar squares, Patan dazzles with stone and metal craftsmanship, the Krishna Mandir and an excellent museum.",
    category: "Heritage", tags: ["UNESCO", "Art", "Newari", "Museum"],
    heroImage: img(PHOTO.square1, 1600),
    gallery: gallery(PHOTO.square1, PHOTO.stupa2, PHOTO.stupa1, PHOTO.himalaya6),
    coordinates: { lat: 27.6727, lng: 85.3252 }, rating: 4.7, reviewCount: 712,
    bestTimeToVisit: ["Autumn", "Spring"],
    budget: { budget: 16, midRange: 45, luxury: 110, currency: "USD" },
    attractions: [
      { name: "Krishna Mandir", description: "Exquisite stone shikhara temple." },
      { name: "Patan Museum", description: "One of South Asia's finest museums." },
      { name: "Golden Temple", description: "Ornate Buddhist monastery nearby." }
    ],
    activities: ["Museum visit", "Heritage walk", "Metal-craft shopping", "Photography"],
    restaurants: [{ name: "Cafe du Temple", cuisine: "Continental", priceRange: "$$" }, { name: "The Old House", cuisine: "French", priceRange: "$$$" }],
    localFoods: ["Newari khaja set", "Bara", "Wo", "Aila"],
    travelTips: ["Don't miss the Patan Museum.", "Browse the metal workshops in the back lanes.", "Combine with central Kathmandu in one day."],
    pros: ["Finest craftsmanship", "Superb museum", "Less crowded"],
    cons: ["Entry fee", "Limited parking"],
    nearby: ["p1", "p2"], featured: false, trending: false
  },
  {
    id: "p10", slug: "upper-mustang-trek", cityId: "c10", districtId: "d6",
    name: "Upper Mustang Trek", tagline: "The forbidden kingdom beyond the Himalayas",
    description: "A restricted-area trek into a high desert of ochre cliffs, sky caves and the walled city of Lo Manthang — the closest thing to old Tibet you can still visit.",
    category: "Trekking", tags: ["Restricted Area", "Tibetan", "Desert", "Remote"],
    heroImage: img(PHOTO.himalaya2, 1600),
    gallery: gallery(PHOTO.himalaya2, PHOTO.himalaya5, PHOTO.himalaya9, PHOTO.himalaya3),
    coordinates: { lat: 29.183, lng: 83.958 }, rating: 4.9, reviewCount: 318,
    bestTimeToVisit: ["Summer", "Autumn", "Spring"],
    budget: { budget: 1200, midRange: 2200, luxury: 5000, currency: "USD" },
    attractions: [
      { name: "Lo Manthang", description: "The medieval walled capital of Mustang." },
      { name: "Sky Caves", description: "Thousands of cliff-cut caves of unknown origin." },
      { name: "Tiji Festival", description: "Vivid three-day monastic festival." }
    ],
    activities: ["Trekking", "Monastery visits", "Festival viewing", "Cultural immersion"],
    restaurants: [{ name: "Teahouse lodges", cuisine: "Tibetan / Nepali", priceRange: "$$" }],
    localFoods: ["Tsampa", "Thukpa", "Yak meat", "Seabuckthorn juice"],
    travelTips: ["A special restricted-area permit is required.", "Trek in monsoon — Mustang lies in a rain shadow.", "Go for the Tiji festival in spring."],
    pros: ["Unique Tibetan culture", "Trekkable in monsoon", "Otherworldly scenery"],
    cons: ["Expensive permit", "Remote and rugged", "Long approach"],
    nearby: [], featured: true, trending: false
  }
];

export const reviews = [
  { id: "r1", destinationId: "p1", author: "Anisha Gurung", avatar: AV(1), rating: 5, title: "Magical at sunrise", body: "We climbed up before dawn and watched the valley wake up. The Buddha eyes glowing in first light is something I'll never forget.", date: "2026-03-12", helpful: 42, status: "approved" },
  { id: "r2", destinationId: "p1", author: "Tom Becker", avatar: AV(12), rating: 4, title: "Beautiful but busy", body: "Stunning views and atmosphere, though it got crowded by mid-morning. Watch out for the monkeys grabbing food!", date: "2026-02-28", helpful: 18, status: "approved" },
  { id: "r3", destinationId: "p5", author: "Priya Sharma", avatar: AV(5), rating: 5, title: "Paradise on water", body: "Boating on Phewa with the Annapurnas reflecting in the lake was the highlight of our Nepal trip. Lakeside has great food too.", date: "2026-04-02", helpful: 67, status: "approved" },
  { id: "r4", destinationId: "p7", author: "Marco Rossi", avatar: AV(15), rating: 5, title: "Trip of a lifetime", body: "Hard work and the altitude is real, but standing at base camp with Everest above you is worth every step. Take it slow.", date: "2026-01-18", helpful: 124, status: "approved" },
  { id: "r5", destinationId: "p8", author: "Sita Thapa", avatar: AV(9), rating: 4, title: "Saw three rhinos!", body: "The jeep safari delivered — three rhinos and tons of birds. Hot and humid so go in winter. Tharu dance show was fun.", date: "2026-03-30", helpful: 33, status: "approved" },
  { id: "r6", destinationId: "p3", author: "Liam O'Connor", avatar: AV(33), rating: 5, title: "Like stepping back in time", body: "Bhaktapur is the most atmospheric of the squares. Stay overnight and have the place to yourself in the morning. The king curd is amazing.", date: "2026-04-15", helpful: 51, status: "approved" },
  { id: "r7", destinationId: "p4", author: "Yuki Tanaka", avatar: AV(20), rating: 5, title: "So peaceful at dusk", body: "Joining the evening kora around Boudha with all the locals was deeply moving. The rooftop cafes are perfect for watching it all.", date: "2026-02-10", helpful: 29, status: "approved" },
  { id: "r8", destinationId: "p6", author: "Emma Wilson", avatar: AV(25), rating: 4, title: "Worth the early alarm", body: "Sunrise over the mountains was incredible. Then we paraglided down to the lake — terrifying and amazing in equal measure.", date: "2026-03-05", helpful: 22, status: "approved" },
  { id: "r9", destinationId: "p2", author: "Raj Maharjan", avatar: AV(11), rating: 4, title: "History everywhere", body: "Packed with monuments and the living goddess is fascinating. A guide really helps make sense of it all.", date: "2026-01-29", helpful: 15, status: "pending" },
  { id: "r10", destinationId: "p10", author: "Hannah Schmidt", avatar: AV(31), rating: 5, title: "Otherworldly", body: "Mustang feels like another planet. The Tiji festival was a riot of colour. Expensive permit but absolutely unique.", date: "2026-05-20", helpful: 40, status: "approved" }
];

export const treks = [
  {
    id: "tk1", slug: "everest-base-camp", name: "Everest Base Camp Trek", region: "Solukhumbu (Khumbu)",
    tagline: "Walk to the foot of the world's highest mountain",
    description: "The most iconic trek on earth. Fly into Lukla and follow the Dudh Koshi through Sherpa villages, swinging bridges and rhododendron forest to the glacial amphitheatre of Everest Base Camp, with a dawn climb of Kala Patthar for the classic panorama.",
    heroImage: img(PHOTO.himalaya1, 1600), gallery: gallery(PHOTO.himalaya1, PHOTO.himalaya4, PHOTO.himalaya8, PHOTO.himalaya9),
    difficulty: "Challenging", durationDays: 14, maxAltitude: 5545, distanceKm: 130,
    bestSeasons: ["Autumn", "Spring"], permits: ["Sagarmatha National Park Permit", "Khumbu Pasang Lhamu Rural Municipality Permit"],
    highlights: ["Kala Patthar sunrise (5,545m)", "Tengboche Monastery", "Namche Bazaar", "Khumbu Glacier"],
    itinerary: [
      { day: 1, title: "Fly Lukla, trek to Phakding", detail: "Thrilling mountain flight, gentle walk along the river.", altitude: 2610, hours: "3–4h" },
      { day: 2, title: "Trek to Namche Bazaar", detail: "Cross suspension bridges and climb to the Sherpa capital.", altitude: 3440, hours: "6h" },
      { day: 3, title: "Acclimatisation day", detail: "Hike to Everest View Hotel; rest to adjust to altitude.", altitude: 3440, hours: "3h" },
      { day: 4, title: "Trek to Tengboche", detail: "Visit the famous monastery beneath Ama Dablam.", altitude: 3860, hours: "5h" },
      { day: 5, title: "Trek to Dingboche", detail: "Enter the high alpine zone above the treeline.", altitude: 4410, hours: "5h" },
      { day: 6, title: "Gorak Shep & Base Camp", detail: "Reach Everest Base Camp, then return to Gorak Shep.", altitude: 5364, hours: "7h" },
      { day: 7, title: "Kala Patthar & descend", detail: "Dawn climb for the Everest panorama, begin the return.", altitude: 5545, hours: "7h" }
    ],
    rating: 5.0, priceFrom: 1400, featured: true
  },
  {
    id: "tk2", slug: "annapurna-circuit", name: "Annapurna Circuit", region: "Manang & Mustang",
    tagline: "Cross the legendary Thorong La between two valleys",
    description: "A classic circuit that traverses dramatic climate zones — from subtropical valleys to the high desert of Manang — crossing the 5,416m Thorong La pass before descending to the pilgrimage town of Muktinath.",
    heroImage: img(PHOTO.himalaya2, 1600), gallery: gallery(PHOTO.himalaya2, PHOTO.himalaya5, PHOTO.himalaya3, PHOTO.himalaya7),
    difficulty: "Challenging", durationDays: 12, maxAltitude: 5416, distanceKm: 160,
    bestSeasons: ["Autumn", "Spring"], permits: ["ACAP Permit", "TIMS Card"],
    highlights: ["Thorong La Pass (5,416m)", "Muktinath Temple", "Manang Valley", "Diverse landscapes"],
    itinerary: [
      { day: 1, title: "Drive to Chame", detail: "Scenic road into the Marsyangdi valley.", altitude: 2710, hours: "Drive" },
      { day: 2, title: "Trek to Pisang", detail: "Pine forest with first Annapurna II views.", altitude: 3300, hours: "5h" },
      { day: 3, title: "Trek to Manang", detail: "Enter the dry, Tibetan-influenced upper valley.", altitude: 3540, hours: "6h" },
      { day: 4, title: "Acclimatisation in Manang", detail: "Day hike to Ice Lake or Gangapurna.", altitude: 3540, hours: "4h" },
      { day: 5, title: "Trek to Thorong Phedi", detail: "Approach the base of the pass.", altitude: 4525, hours: "5h" },
      { day: 6, title: "Cross Thorong La to Muktinath", detail: "Pre-dawn ascent over the high pass.", altitude: 5416, hours: "8h" }
    ],
    rating: 4.9, priceFrom: 1100, featured: true
  },
  {
    id: "tk3", slug: "annapurna-base-camp", name: "Annapurna Base Camp", region: "Kaski (Gandaki)",
    tagline: "Into the heart of the Annapurna Sanctuary",
    description: "A shorter, immensely rewarding trek through Gurung villages and bamboo forest into a glacial sanctuary ringed by 7,000m peaks — perfect for a first Himalayan trek.",
    heroImage: img(PHOTO.himalaya3, 1600), gallery: gallery(PHOTO.himalaya3, PHOTO.himalaya7, PHOTO.forest1, PHOTO.himalaya5),
    difficulty: "Moderate", durationDays: 7, maxAltitude: 4130, distanceKm: 70,
    bestSeasons: ["Autumn", "Spring", "Winter"], permits: ["ACAP Permit", "TIMS Card"],
    highlights: ["Annapurna Sanctuary", "Machhapuchhre views", "Gurung culture", "Jhinu hot springs"],
    itinerary: [
      { day: 1, title: "Drive & trek to Chhomrong", detail: "Start from Pokhara into Gurung country.", altitude: 2170, hours: "5h" },
      { day: 2, title: "Trek to Bamboo", detail: "Descend and climb through lush forest.", altitude: 2310, hours: "5h" },
      { day: 3, title: "Trek to Deurali", detail: "Follow the Modi Khola gorge upward.", altitude: 3200, hours: "5h" },
      { day: 4, title: "Reach Annapurna Base Camp", detail: "Enter the sanctuary surrounded by giants.", altitude: 4130, hours: "5h" },
      { day: 5, title: "Descend to Bamboo", detail: "Sunrise at ABC, then long descent.", altitude: 2310, hours: "6h" }
    ],
    rating: 4.8, priceFrom: 750, featured: true
  },
  {
    id: "tk4", slug: "langtang-valley", name: "Langtang Valley Trek", region: "Rasuwa (Bagmati)",
    tagline: "The valley of glaciers, close to Kathmandu",
    description: "A quieter, accessible trek into a beautiful glacial valley rebuilt with resilience after 2015. Tamang culture, yak pastures and the climb to Kyanjin Ri make it a gem.",
    heroImage: img(PHOTO.himalaya6, 1600), gallery: gallery(PHOTO.himalaya6, PHOTO.forest1, PHOTO.himalaya3, PHOTO.himalaya9),
    difficulty: "Moderate", durationDays: 7, maxAltitude: 4773, distanceKm: 65,
    bestSeasons: ["Autumn", "Spring"], permits: ["Langtang National Park Permit", "TIMS Card"],
    highlights: ["Kyanjin Gompa", "Kyanjin Ri viewpoint", "Tamang heritage", "Yak cheese factory"],
    itinerary: [
      { day: 1, title: "Drive to Syabrubesi", detail: "Mountain road north from Kathmandu.", altitude: 1550, hours: "Drive" },
      { day: 2, title: "Trek to Lama Hotel", detail: "Riverside forest trail.", altitude: 2470, hours: "6h" },
      { day: 3, title: "Trek to Langtang Village", detail: "Open valley with mountain views.", altitude: 3430, hours: "6h" },
      { day: 4, title: "Trek to Kyanjin Gompa", detail: "Reach the monastery settlement.", altitude: 3870, hours: "3h" },
      { day: 5, title: "Climb Kyanjin Ri", detail: "Panoramic high point above the valley.", altitude: 4773, hours: "4h" }
    ],
    rating: 4.7, priceFrom: 650, featured: false
  },
  {
    id: "tk5", slug: "poon-hill", name: "Ghorepani Poon Hill", region: "Kaski (Gandaki)",
    tagline: "The classic short trek for sunrise over the Annapurnas",
    description: "A gentle, scenic loop through rhododendron forest and terraced villages to the famous Poon Hill viewpoint — ideal for families and first-timers seeking big views on a short timeline.",
    heroImage: img(PHOTO.himalaya7, 1600), gallery: gallery(PHOTO.himalaya7, PHOTO.forest1, PHOTO.himalaya3, PHOTO.lake1),
    difficulty: "Easy", durationDays: 4, maxAltitude: 3210, distanceKm: 45,
    bestSeasons: ["Autumn", "Spring", "Winter"], permits: ["ACAP Permit", "TIMS Card"],
    highlights: ["Poon Hill sunrise", "Rhododendron forests", "Ghandruk village", "Easy & family-friendly"],
    itinerary: [
      { day: 1, title: "Drive & trek to Ulleri", detail: "Stone-stair climb through villages.", altitude: 1960, hours: "4h" },
      { day: 2, title: "Trek to Ghorepani", detail: "Forest trail to the ridge village.", altitude: 2870, hours: "5h" },
      { day: 3, title: "Poon Hill & Tadapani", detail: "Sunrise viewpoint, then onward.", altitude: 3210, hours: "6h" },
      { day: 4, title: "Descend to Ghandruk", detail: "Beautiful Gurung village finish.", altitude: 1940, hours: "4h" }
    ],
    rating: 4.7, priceFrom: 420, featured: false
  },
  {
    id: "tk6", slug: "upper-mustang", name: "Upper Mustang Trek", region: "Mustang (Gandaki)",
    tagline: "The forbidden kingdom in the Himalayan rain shadow",
    description: "A restricted-area trek into a high desert of ochre cliffs and sky caves to the walled city of Lo Manthang — trekkable even in monsoon, and culturally the closest thing to old Tibet.",
    heroImage: img(PHOTO.himalaya2, 1600), gallery: gallery(PHOTO.himalaya2, PHOTO.himalaya5, PHOTO.himalaya9, PHOTO.himalaya3),
    difficulty: "Moderate", durationDays: 10, maxAltitude: 3840, distanceKm: 110,
    bestSeasons: ["Summer", "Autumn", "Spring"], permits: ["Upper Mustang Restricted Area Permit", "ACAP Permit"],
    highlights: ["Lo Manthang walled city", "Ancient sky caves", "Tiji Festival", "Monsoon-friendly"],
    itinerary: [
      { day: 1, title: "Fly to Jomsom, trek to Kagbeni", detail: "Enter the restricted zone gateway.", altitude: 2810, hours: "4h" },
      { day: 2, title: "Trek to Chele", detail: "Dramatic canyon country begins.", altitude: 3050, hours: "6h" },
      { day: 3, title: "Trek to Syangboche", detail: "High passes and red cliffs.", altitude: 3475, hours: "6h" },
      { day: 4, title: "Trek to Lo Manthang", detail: "Reach the medieval walled capital.", altitude: 3840, hours: "5h" },
      { day: 5, title: "Explore Lo Manthang", detail: "Palaces, monasteries and cave gompas.", altitude: 3840, hours: "Full day" }
    ],
    rating: 4.9, priceFrom: 1800, featured: false
  }
];

export const festivals = [
  { id: "f1", slug: "dashain", name: "Dashain", month: "Sep–Oct", season: "Autumn", type: "Religious", description: "Nepal's longest and most important festival, celebrating the victory of good over evil. Families reunite, elders bless the young with tika, and the whole country slows down for fifteen days of feasting and kite-flying.", image: img(PHOTO.square1, 1000), where: "Nationwide", duration: "15 days" },
  { id: "f2", slug: "tihar", name: "Tihar (Deepawali)", month: "Oct–Nov", season: "Autumn", type: "Religious", description: "The festival of lights, honouring animals, the goddess Laxmi and the bond between siblings. Homes glow with oil lamps and marigold garlands, and crows, dogs and cows are each celebrated on their own day.", image: img(PHOTO.stupa1, 1000), where: "Nationwide", duration: "5 days" },
  { id: "f3", slug: "holi", name: "Holi", month: "Mar", season: "Spring", type: "Cultural", description: "The exuberant festival of colours marking the arrival of spring. Streets fill with coloured powder, water and music as people of all ages celebrate together.", image: img(PHOTO.square1, 1000), where: "Kathmandu, Terai", duration: "1–2 days" },
  { id: "f4", slug: "indra-jatra", name: "Indra Jatra", month: "Sep", season: "Autumn", type: "Cultural", description: "Kathmandu's spectacular street festival honouring Indra, the god of rain. Masked dances, chariot processions and the appearance of the living goddess Kumari fill Durbar Square.", image: img(PHOTO.stupa2, 1000), where: "Kathmandu Durbar Square", duration: "8 days" },
  { id: "f5", slug: "tiji", name: "Tiji Festival", month: "May", season: "Spring", type: "Religious", description: "A vivid three-day monastic festival in the walled city of Lo Manthang, Upper Mustang, dramatising the triumph of compassion over demons through masked Cham dances.", image: img(PHOTO.himalaya2, 1000), where: "Lo Manthang, Mustang", duration: "3 days" },
  { id: "f6", slug: "buddha-jayanti", name: "Buddha Jayanti", month: "Apr–May", season: "Spring", type: "Religious", description: "Marking the birth, enlightenment and death of the Buddha. Boudhanath and Lumbini come alive with butter lamps, prayer and processions.", image: img(PHOTO.stupa1, 1000), where: "Boudhanath, Lumbini", duration: "1 day" },
  { id: "f7", slug: "losar", name: "Losar", month: "Feb–Mar", season: "Winter", type: "Cultural", description: "Tibetan and Sherpa New Year, celebrated in the high mountains and Tibetan communities with monastery dances, family feasts and colourful traditional dress.", image: img(PHOTO.himalaya4, 1000), where: "Khumbu, Boudha, Mustang", duration: "3 days" },
  { id: "f8", slug: "bisket-jatra", name: "Bisket Jatra", month: "Apr", season: "Spring", type: "National", description: "Bhaktapur's thunderous New Year chariot festival, where huge wooden chariots are pulled through the medieval streets in a centuries-old tug-of-war.", image: img(PHOTO.square1, 1000), where: "Bhaktapur", duration: "9 days" }
];

export const guides = [
  {
    id: "g1", slug: "first-time-nepal-itinerary", title: "The Perfect 10-Day First-Timer's Itinerary for Nepal",
    excerpt: "Kathmandu heritage, Pokhara lakes and a taste of the mountains — the ideal loop for a first visit, with no rushing.",
    category: "Itineraries", cover: img(PHOTO.lake1, 1200), author: "Sita Thapa", authorAvatar: AV(9),
    date: "2026-05-02", readMinutes: 8, tags: ["Itinerary", "Beginner", "Kathmandu", "Pokhara"], featured: true,
    body: [
      "Nepal packs an extraordinary amount into a small country, and ten days is enough to sample its three great experiences — heritage cities, the lakeside calm of Pokhara, and a first encounter with the Himalaya.",
      "Days 1–3: Base yourself in Kathmandu and work through the valley's UNESCO sites — Swayambhunath at dawn, Durbar Square, Patan's museum and Boudhanath at dusk. Build in a free afternoon for jet lag.",
      "Days 4–7: Fly or drive to Pokhara. Boat on Phewa Lake, catch sunrise from Sarangkot, and consider a short two-day Poon Hill add-on if you want a mountain taste without committing to a long trek.",
      "Days 8–10: Return via Chitwan for a jungle safari, or add a scenic mountain flight from Kathmandu. Leave the final day as a buffer — domestic flights are weather-dependent."
    ]
  },
  {
    id: "g2", slug: "altitude-sickness-guide", title: "Altitude Sickness: How to Trek High and Stay Safe",
    excerpt: "What AMS actually is, the golden rules of acclimatisation, and when to turn around. Essential reading before any high trek.",
    category: "Trekking", cover: img(PHOTO.himalaya8, 1200), author: "Dr. Marco Rossi", authorAvatar: AV(15),
    date: "2026-04-18", readMinutes: 6, tags: ["Safety", "Trekking", "Health"], featured: true,
    body: [
      "Acute Mountain Sickness (AMS) can affect anyone above roughly 2,500m, regardless of fitness. The cause is simple — less oxygen — but the consequences of ignoring it can be serious.",
      "The golden rule is to climb high, sleep low, and not increase your sleeping altitude by more than 300–500m per day above 3,000m. Build in rest days, as the Everest and Annapurna itineraries do at Namche and Manang.",
      "Mild symptoms — headache, fatigue, poor sleep — are common and manageable with rest and hydration. But worsening symptoms, breathlessness at rest or loss of coordination mean you must descend immediately.",
      "Carry travel insurance that explicitly covers helicopter evacuation, and never trek solo at altitude. When in doubt, go down — the mountain will still be there next year."
    ]
  },
  {
    id: "g3", slug: "nepali-food-to-try", title: "12 Nepali Dishes You Have to Try (Beyond Momos)",
    excerpt: "From Newari samay baji to Thakali dal bhat, a hungry traveller's guide to eating your way across Nepal.",
    category: "Food", cover: img(PHOTO.square1, 1200), author: "Priya Sharma", authorAvatar: AV(5),
    date: "2026-03-22", readMinutes: 7, tags: ["Food", "Culture", "Newari"], featured: false,
    body: [
      "Everyone knows momos, but Nepal's food culture runs far deeper. Start with dal bhat — the lentil-and-rice staple that powers every trekker — and seek out the Thakali version for the best balance of flavours.",
      "In the Kathmandu Valley, dive into Newari cuisine: samay baji (a ceremonial platter), bara (lentil pancakes), chatamari (the 'Newari pizza') and the legendary juju dhau, Bhaktapur's king curd.",
      "Don't miss sel roti (a sweet rice ring), gundruk (fermented greens), and in the mountains, hearty Sherpa stew and yak cheese. Wash it all down with masala tea or, if you're brave, local raksi."
    ]
  },
  {
    id: "g4", slug: "best-time-to-visit-nepal", title: "When to Visit Nepal: A Season-by-Season Breakdown",
    excerpt: "Autumn clarity, spring blooms, monsoon rain shadows and winter wildlife — how to time your trip for what you want to do.",
    category: "Tips", cover: img(PHOTO.himalaya3, 1200), author: "Aarav Shrestha", authorAvatar: AV(68),
    date: "2026-02-14", readMinutes: 5, tags: ["Planning", "Weather", "Seasons"], featured: false,
    body: [
      "Autumn (September–November) is peak season for good reason: stable weather, crystal-clear mountain views and a calendar full of festivals. Trails are busier, but the conditions are unbeatable.",
      "Spring (March–May) is the second-best window, with warm days, blooming rhododendrons and great visibility — ideal for both trekking and culture.",
      "Monsoon (June–August) brings rain to most of the country, but the rain-shadow regions of Upper Mustang and Dolpo stay dry and become the perfect time to visit.",
      "Winter (December–February) is cold at altitude but rewarding lower down — superb for Chitwan wildlife, valley culture and quieter short treks like Poon Hill."
    ]
  },
  {
    id: "g5", slug: "responsible-trekking", title: "How to Trek Responsibly in Nepal",
    excerpt: "Support local communities, minimise your footprint and travel in a way that keeps the mountains beautiful.",
    category: "Culture", cover: img(PHOTO.himalaya6, 1200), author: "Hannah Schmidt", authorAvatar: AV(31),
    date: "2026-01-30", readMinutes: 6, tags: ["Sustainability", "Culture", "Trekking"], featured: false,
    body: [
      "Tourism is a lifeline for mountain communities, and how you travel makes a real difference. Hire local guides and porters, pay fair wages, and ensure porters carry safe loads and have proper gear.",
      "Cut waste at the source: carry a reusable water bottle with purification, refuse single-use plastics, and pack out what you pack in. Many trails now have refill stations.",
      "Respect local customs — walk clockwise around stupas and mani walls, ask before photographing people, and dress modestly at religious sites. A little cultural awareness goes a long way."
    ]
  }
];

// Demo accounts. Passwords are plain here and hashed by the seed script.
export const users = [
  { id: "u1", name: "Aarav Shrestha", email: "aarav@example.com", password: "password123", avatar: AV(68), role: "user", joinedAt: "2025-09-01" },
  { id: "u2", name: "NepalYatra Admin", email: "admin@nepayatra.com", password: "admin12345", avatar: AV(50), role: "admin", joinedAt: "2025-01-01" }
];

export const trips = [
  { id: "t1", userId: "u1", title: "Kathmandu Heritage Weekend", destinationIds: ["p1", "p2", "p3"], startDate: "2026-07-04", endDate: "2026-07-06", budget: 450, status: "planned", notes: "Focus on UNESCO sites. Hire a guide for day 1." },
  { id: "t2", userId: "u1", title: "Annapurna Escape", destinationIds: ["p5", "p6"], startDate: "2026-06-20", endDate: "2026-06-24", budget: 620, status: "ongoing", notes: "Paragliding booked for day 2." },
  { id: "t3", userId: "u1", title: "Everest Base Camp", destinationIds: ["p7"], startDate: "2025-11-02", endDate: "2025-11-16", budget: 1700, status: "completed", notes: "Incredible. Kala Patthar at sunrise was the highlight." }
];

// ── Tourist Attractions ───────────────────────────────────────────────────────
export const attractions = [
  // ── Kathmandu (d1) — 10 attractions ────────────────────────────────────────
  {
    id: "a1", slug: "pashupatinath-temple", districtId: "d1",
    name: "Pashupatinath Temple", category: "Religious Sites",
    tagline: "Nepal's holiest Hindu shrine on the banks of the Bagmati",
    description: "Pashupatinath is one of the most sacred Hindu temples in Asia, dedicated to Lord Shiva. The main pagoda-style temple rises above the Bagmati river ghats, where cremation ceremonies have taken place for centuries in open air. Non-Hindus may not enter the inner sanctum but can observe from across the river.",
    history: "The temple complex dates back at least to the 5th century AD, with inscriptions referencing it as early as the 7th century. It has been patronised by successive dynasties and survived the 2015 earthquake largely intact, becoming a symbol of Nepali resilience.",
    heroImage: img(PHOTO.stupa1, 1600),
    gallery: gallery(PHOTO.stupa1, PHOTO.stupa2, PHOTO.square1),
    coordinates: { lat: 27.7109, lng: 85.3487 },
    rating: 4.9, reviewCount: 2341,
    openingHours: "4:00 AM – 9:00 PM",
    entryFee: { nepali: 0, saarc: 250, foreigner: 1000, currency: "NPR" },
    bestTimeToVisit: ["Autumn", "Winter", "Spring"],
    activities: ["Temple worship", "Aarti ceremony at dusk", "Cremation ceremony observation", "Photography from the eastern bank", "Maha Shivaratri festival"],
    localFoods: ["Sel roti", "Yomari", "Juju dhau"],
    travelTips: ["Non-Hindus cannot enter the main temple — observe respectfully from across the river.", "Visit at dusk for the aarti ceremony.", "Dress modestly and remove shoes at designated points."],
    nearbyAttractions: ["a2", "a4"],
    nearbyHotels: [{ name: "Hyatt Regency Kathmandu", stars: 5, priceRange: "$$$" }, { name: "Hotel Yak & Yeti", stars: 5, priceRange: "$$$" }],
    nearbyRestaurants: [{ name: "Krishnarpan", cuisine: "Nepali", priceRange: "$$$" }, { name: "Rum Doodle", cuisine: "Continental", priceRange: "$$" }],
    featured: true, trending: true
  },
  {
    id: "a2", slug: "boudhanath-stupa", districtId: "d1",
    name: "Boudhanath Stupa", category: "Religious Sites",
    tagline: "One of the largest stupas in the world — a living Buddhist hub",
    description: "Boudhanath is a massive mandala-shaped stupa rising 36 metres above the surrounding neighbourhood. Tibetan refugees have settled around it, filling the area with monasteries, thangka shops and incense smoke. Locals and pilgrims complete a clockwise kora (circumambulation) each evening.",
    history: "Legend dates the stupa to the 5th century, though it was substantially rebuilt after Mughal raids in medieval times. After Tibet came under Chinese control in 1959, Tibetan refugees made Boudha their cultural heart, and it was inscribed as a UNESCO World Heritage Site in 1979.",
    heroImage: img(PHOTO.stupa2, 1600),
    gallery: gallery(PHOTO.stupa2, PHOTO.stupa1, PHOTO.square1),
    coordinates: { lat: 27.7215, lng: 85.3620 },
    rating: 4.8, reviewCount: 1987,
    openingHours: "Sunrise to Sunset (outer kora 24/7)",
    entryFee: { nepali: 0, saarc: 0, foreigner: 400, currency: "NPR" },
    bestTimeToVisit: ["Autumn", "Winter", "Spring"],
    activities: ["Evening kora walk", "Monastery visits", "Thangka shopping", "Rooftop café views", "Losar festival"],
    localFoods: ["Thenthuk", "Butter tea", "Momo", "Tibetan bread"],
    travelTips: ["Join the evening kora from 5 PM for the most atmospheric experience.", "Rooftop cafes around the stupa offer excellent views.", "Visit on a full moon — the place comes alive with butter lamps."],
    nearbyAttractions: ["a1", "a3"],
    nearbyHotels: [{ name: "Hotel Tibet", stars: 4, priceRange: "$$" }, { name: "Hyatt Regency Kathmandu", stars: 5, priceRange: "$$$" }],
    nearbyRestaurants: [{ name: "Stupa View Restaurant", cuisine: "Tibetan / Nepali", priceRange: "$$" }, { name: "La Dolce Vita", cuisine: "Italian", priceRange: "$$" }],
    featured: true, trending: true
  },
  {
    id: "a3", slug: "swayambhunath", districtId: "d1",
    name: "Swayambhunath (Monkey Temple)", category: "Religious Sites",
    tagline: "Ancient hilltop stupa with panoramic views over Kathmandu Valley",
    description: "Swayambhunath perches atop a wooded hill 77 metres above the valley floor, offering a 360-degree panorama of Kathmandu. The all-seeing eyes of the Buddha are painted on all four sides of the golden spire. The resident macaque monkey population adds a lively, if mischievous, atmosphere.",
    history: "The hilltop has been a sacred site for at least 2,500 years, with some traditions claiming it arose from a lotus blossom when the valley was a lake. The current stupa was built in the 5th century and has been continuously embellished since.",
    heroImage: img(PHOTO.stupa1, 1600),
    gallery: gallery(PHOTO.stupa1, PHOTO.stupa2, PHOTO.himalaya3),
    coordinates: { lat: 27.7149, lng: 85.2904 },
    rating: 4.8, reviewCount: 1654,
    openingHours: "5:00 AM – 8:00 PM",
    entryFee: { nepali: 0, saarc: 0, foreigner: 200, currency: "NPR" },
    bestTimeToVisit: ["Autumn", "Winter", "Spring"],
    activities: ["Climbing the 365 stone steps", "Panoramic valley photography", "Watching the evening prayer ceremony", "Monkey watching"],
    localFoods: ["Sel roti", "Momo", "Chiura & beaten rice dishes"],
    travelTips: ["Arrive early morning for sunrise and fewer crowds.", "Keep food out of reach — the monkeys will snatch it.", "The eastern staircase has the most impressive approach with carved statues."],
    nearbyAttractions: ["a2", "a4"],
    nearbyHotels: [{ name: "Hotel Shanker", stars: 5, priceRange: "$$$" }, { name: "Kantipur Temple House", stars: 4, priceRange: "$$" }],
    nearbyRestaurants: [{ name: "Himalayan Java", cuisine: "Café", priceRange: "$" }, { name: "Bhojan Griha", cuisine: "Nepali", priceRange: "$$" }],
    featured: true, trending: false
  },
  {
    id: "a4", slug: "kathmandu-durbar-square", districtId: "d1",
    name: "Kathmandu Durbar Square", category: "Historical Sites",
    tagline: "The ancient royal square at the heart of old Kathmandu",
    description: "Kathmandu Durbar Square is a sprawling complex of palaces, courtyards and temples built by the Malla and Shah dynasty kings. The home of the Kumari Ghar — residence of the Living Goddess — sits alongside the spectacular 17th-century towers of Taleju Temple. Despite earthquake damage in 2015, ongoing restoration keeps the spirit of the square alive.",
    history: "The square has been Kathmandu's political and ceremonial hub since the 12th century. The Malla kings who ruled until the 18th century constructed most of the existing monuments. After Shah Prithvi Narayan unified Nepal, the palace shifted to Narayanhiti but the square retained its cultural significance.",
    heroImage: img(PHOTO.square1, 1600),
    gallery: gallery(PHOTO.square1, PHOTO.stupa2, PHOTO.stupa1),
    coordinates: { lat: 27.7045, lng: 85.3076 },
    rating: 4.7, reviewCount: 1432,
    openingHours: "9:00 AM – 5:00 PM",
    entryFee: { nepali: 0, saarc: 150, foreigner: 1000, currency: "NPR" },
    bestTimeToVisit: ["Autumn", "Spring"],
    activities: ["Heritage walking tour", "Kumari spotting at her window", "Kasthamandap temple visit", "Photography", "Shopping for handicrafts"],
    localFoods: ["Newari khaja set", "Yomari", "Chatamari"],
    travelTips: ["A licensed guide brings the history to life — hire one at the entrance.", "The Kumari appears briefly at her window at set times.", "Combine with a walk through Indra Chowk and Asan Bazaar."],
    nearbyAttractions: ["a3", "a5"],
    nearbyHotels: [{ name: "Dwarika's Hotel", stars: 5, priceRange: "$$$" }, { name: "Thamel Eco Resort", stars: 3, priceRange: "$$" }],
    nearbyRestaurants: [{ name: "Bhojan Griha", cuisine: "Newari", priceRange: "$$" }, { name: "Freak Street Café", cuisine: "Nepali / Café", priceRange: "$" }],
    featured: true, trending: false
  },
  {
    id: "a5", slug: "garden-of-dreams", districtId: "d1",
    name: "Garden of Dreams", category: "Cultural Heritage Sites",
    tagline: "A neoclassical oasis of calm in the heart of Kathmandu",
    description: "This beautifully restored Edwardian garden was built in 1920 by Field Marshal Kaiser Shumsher Rana as his private retreat. Fountains, pergolas and pavilions surround manicured lawns and flowering trees, making it the most peaceful escape in central Kathmandu. The onsite café is perfect for an afternoon break.",
    history: "Kaiser Shumsher Jung Bahadur Rana commissioned the garden in the 1920s as a personal pleasure ground inspired by European Edwardian design. Neglected for decades after the fall of the Rana oligarchy, it was restored through Austrian development aid and reopened in 2006.",
    heroImage: img(PHOTO.forest1, 1600),
    gallery: gallery(PHOTO.forest1, PHOTO.forest2, PHOTO.square1),
    coordinates: { lat: 27.7144, lng: 85.3146 },
    rating: 4.4, reviewCount: 632,
    openingHours: "9:00 AM – 10:00 PM",
    entryFee: { nepali: 200, saarc: 200, foreigner: 400, currency: "NPR" },
    bestTimeToVisit: ["Spring", "Autumn"],
    activities: ["Garden stroll", "Café lunch", "Reading", "Photography", "Picnic on lawns"],
    localFoods: ["Garden Café set lunch", "Afternoon tea", "Fresh juice"],
    travelTips: ["Combine with a visit to Thamel — the garden is just a few minutes' walk.", "The café prices are higher than street food but worth it for the ambiance.", "Best visited midweek to avoid weekend crowds."],
    nearbyAttractions: ["a4", "a8"],
    nearbyHotels: [{ name: "Hotel Shanker", stars: 5, priceRange: "$$$" }, { name: "Kantipur Temple House", stars: 4, priceRange: "$$" }],
    nearbyRestaurants: [{ name: "Kaiser Café (onsite)", cuisine: "Continental / Café", priceRange: "$$" }, { name: "OR2K", cuisine: "Middle Eastern / Vegetarian", priceRange: "$$" }],
    featured: false, trending: false
  },
  {
    id: "a6", slug: "narayanhiti-palace-museum", districtId: "d1",
    name: "Narayanhiti Palace Museum", category: "Historical Sites",
    tagline: "Inside Nepal's former royal palace — scene of the 2001 massacre",
    description: "Narayanhiti Palace served as the official residence of Nepal's royal family until the monarchy was abolished in 2008. Now a museum, visitors can tour the opulent state rooms, throne hall and the infamous billiards room where the 2001 royal massacre took place. The architecture blends Nepali pagoda style with modern elements.",
    history: "The current palace was built in 1970 during the reign of King Mahendra, replacing an older structure on the same site. It witnessed Nepal's most traumatic modern event — the June 2001 massacre in which Crown Prince Dipendra killed most of the royal family before shooting himself. It became a museum in 2009.",
    heroImage: img(PHOTO.square1, 1600),
    gallery: gallery(PHOTO.square1, PHOTO.stupa2, PHOTO.forest1),
    coordinates: { lat: 27.7151, lng: 85.3191 },
    rating: 4.5, reviewCount: 743,
    openingHours: "11:00 AM – 4:00 PM (Closed Tuesday)",
    entryFee: { nepali: 100, saarc: 250, foreigner: 500, currency: "NPR" },
    bestTimeToVisit: ["Autumn", "Spring", "Winter"],
    activities: ["Guided palace tour", "State room viewing", "Royal artefact exhibits", "Photography in permitted areas"],
    localFoods: ["Nearby Thamel restaurants", "Himalayan Java café"],
    travelTips: ["Cameras are restricted inside — check the policy at entry.", "A guide is highly recommended for historical context.", "Allow 2 hours for a thorough visit."],
    nearbyAttractions: ["a5", "a4"],
    nearbyHotels: [{ name: "Hotel Shanker", stars: 5, priceRange: "$$$" }, { name: "Radisson Hotel Kathmandu", stars: 5, priceRange: "$$$" }],
    nearbyRestaurants: [{ name: "Thamel House Restaurant", cuisine: "Newari", priceRange: "$$" }, { name: "Roadhouse Café", cuisine: "Continental", priceRange: "$$" }],
    featured: false, trending: false
  },
  {
    id: "a7", slug: "shivapuri-nagarjun-national-park", districtId: "d1",
    name: "Shivapuri Nagarjun National Park", category: "National Parks & Wildlife",
    tagline: "Forested hills and crystal springs on Kathmandu's northern edge",
    description: "This national park forms a green wall along Kathmandu's northern rim, protecting the watershed that supplies the city with fresh water. Leopards, Himalayan black bears, red pandas and over 318 bird species inhabit its oak and rhododendron forests. Day hikes to Shivapuri Peak (2,732 m) reward with valley panoramas.",
    history: "The area has been a protected forest since the Rana era. It was gazetted as a national park in 2002, merging the Shivapuri Watershed and Wildlife Reserve with Nagarjun Forest. The Nagi Gompa monastery within the park has been a Buddhist retreat since the 1970s.",
    heroImage: img(PHOTO.forest2, 1600),
    gallery: gallery(PHOTO.forest2, PHOTO.forest1, PHOTO.himalaya3),
    coordinates: { lat: 27.8150, lng: 85.3610 },
    rating: 4.6, reviewCount: 521,
    openingHours: "7:00 AM – 5:00 PM",
    entryFee: { nepali: 100, saarc: 500, foreigner: 1000, currency: "NPR" },
    bestTimeToVisit: ["Autumn", "Winter", "Spring"],
    activities: ["Day hiking", "Bird watching", "Monastery visit (Nagi Gompa)", "Mountain biking on designated trails", "Photography"],
    localFoods: ["Pack your own — teahouses at park entry sell basic snacks"],
    travelTips: ["Start early for the Shivapuri Peak hike — it's a 6-7 hour return trip.", "Carry ample water; springs inside need purification.", "A jungle guide is recommended to spot wildlife and birds."],
    nearbyAttractions: ["a3", "a8"],
    nearbyHotels: [{ name: "Hotel Shivapuri Heights", stars: 3, priceRange: "$$" }, { name: "Club Himalaya", stars: 4, priceRange: "$$" }],
    nearbyRestaurants: [{ name: "Shivapuri Heights Restaurant", cuisine: "Nepali / Continental", priceRange: "$$" }, { name: "Smoke & Mirrors", cuisine: "Continental", priceRange: "$$$" }],
    featured: true, trending: false
  },
  {
    id: "a8", slug: "thamel", districtId: "d1",
    name: "Thamel", category: "Local Experiences",
    tagline: "Kathmandu's legendary travellers' quarter — buzzing day and night",
    description: "Thamel is the beating heart of Kathmandu's tourist scene — a dense labyrinth of narrow lanes packed with trekking gear shops, rooftop restaurants, quirky cafes, live music bars and guesthouses. It's the base camp for most Nepal adventures and a cultural melting pot where backpackers, mountaineers and locals collide.",
    history: "Thamel evolved into a tourist hub from the 1970s hippie trail era, when Kathmandu became a stop on the overland route from Europe to India. Freak Street (Jhochhen Tol) was the original centre, but the scene migrated north to Thamel where infrastructure grew rapidly from the 1980s.",
    heroImage: img(PHOTO.square1, 1600),
    gallery: gallery(PHOTO.square1, PHOTO.stupa1, PHOTO.forest1),
    coordinates: { lat: 27.7155, lng: 85.3123 },
    rating: 4.3, reviewCount: 2876,
    openingHours: "Open 24/7 (shops typically 9 AM – 8 PM)",
    entryFee: { nepali: 0, saarc: 0, foreigner: 0, currency: "NPR" },
    bestTimeToVisit: ["Autumn", "Spring", "Winter"],
    activities: ["Trekking gear shopping", "Restaurant hopping", "Live music nights", "Cooking classes", "Cultural show watching"],
    localFoods: ["Momo", "Thakali set", "Dal bhat", "Butter chicken", "Masala chai"],
    travelTips: ["Bargain hard in shops — marked prices are opening offers.", "Watch out for touts offering cheap treks — book with licensed agencies.", "Walk everywhere in Thamel — taxis struggle with the narrow alleys."],
    nearbyAttractions: ["a5", "a6"],
    nearbyHotels: [{ name: "Hotel Thamel", stars: 4, priceRange: "$$" }, { name: "Kathmandu Guest House", stars: 3, priceRange: "$" }],
    nearbyRestaurants: [{ name: "Fire & Ice Pizzeria", cuisine: "Italian", priceRange: "$$" }, { name: "Thamel House Restaurant", cuisine: "Newari", priceRange: "$$" }],
    featured: false, trending: true
  },
  {
    id: "a9", slug: "chandragiri-hills", districtId: "d1",
    name: "Chandragiri Hills", category: "Viewpoints",
    tagline: "Cable car rides to Himalayan panoramas above Kathmandu",
    description: "A modern cable car whisks visitors 2,551 metres up to Chandragiri hilltop, where on clear days you can count eight Himalayan peaks including Ganesh Himal, Langtang and glimpses of the Annapurna and Dhaulagiri ranges. The summit also features a Balachhu temple and pleasant forest walks.",
    history: "Chandragiri (Moon Mountain) has long been a pilgrimage site for the hilltop Balachhu Bhagwati Temple. The cable car was installed in 2016 to make access easier, transforming the site into one of Kathmandu's most popular day trips.",
    heroImage: img(PHOTO.himalaya3, 1600),
    gallery: gallery(PHOTO.himalaya3, PHOTO.himalaya6, PHOTO.forest2),
    coordinates: { lat: 27.6675, lng: 85.2040 },
    rating: 4.5, reviewCount: 887,
    openingHours: "7:00 AM – 6:00 PM (cable car runs 7:30 AM – 5:30 PM)",
    entryFee: { nepali: 150, saarc: 150, foreigner: 300, currency: "NPR" },
    bestTimeToVisit: ["Autumn", "Winter"],
    activities: ["Cable car ride", "Himalayan viewpoint", "Temple visit", "Forest walks", "Photography"],
    localFoods: ["Onsite restaurants serve Nepali set meals and snacks"],
    travelTips: ["Go early morning (7–9 AM) for the clearest mountain views.", "Autumn (Oct–Nov) gives the best visibility.", "Combine with Kirtipur town visit on the same day."],
    nearbyAttractions: ["a10", "a3"],
    nearbyHotels: [{ name: "Hotel Himalayan Heritage", stars: 3, priceRange: "$$" }, { name: "Dwarika's Hotel", stars: 5, priceRange: "$$$" }],
    nearbyRestaurants: [{ name: "Chandragiri Summit Restaurant", cuisine: "Nepali", priceRange: "$$" }, { name: "Thamel Kitchen", cuisine: "Nepali / Continental", priceRange: "$" }],
    featured: false, trending: true
  },
  {
    id: "a10", slug: "taudaha-lake", districtId: "d1",
    name: "Taudaha Lake", category: "Lakes & Rivers",
    tagline: "A serene birdwatcher's lake on Kathmandu's southern edge",
    description: "Taudaha is a small but ecologically rich lake at 1,340 metres elevation, surrounded by farmland and forest just 5 km south of central Kathmandu. It is a vital wintering ground for migratory waterfowl, with flocks of pochards, pintails and teals arriving from November to March. Legends say a serpent king lives in its depths.",
    history: "Taudaha means 'big lake' in Newari. According to the Swayambhu Purana, when the sage Manjushri drained the ancient Kathmandu lake with his sword, he left Taudaha intentionally as a home for the serpent king Karkotak, protecting the valley's waterways.",
    heroImage: img(PHOTO.lake1, 1600),
    gallery: gallery(PHOTO.lake1, PHOTO.lake2, PHOTO.forest1),
    coordinates: { lat: 27.6758, lng: 85.2850 },
    rating: 4.2, reviewCount: 312,
    openingHours: "Open all day",
    entryFee: { nepali: 0, saarc: 0, foreigner: 0, currency: "NPR" },
    bestTimeToVisit: ["Winter", "Autumn"],
    activities: ["Bird watching", "Photography", "Peaceful lakeside walks", "Cycling day trip from Kathmandu"],
    localFoods: ["Small local teashops at the lake entrance"],
    travelTips: ["Bring binoculars — the lake is best appreciated with optics.", "A bicycle from Kathmandu makes a pleasant half-day trip.", "Visit between November and February for peak migratory bird season."],
    nearbyAttractions: ["a9", "a7"],
    nearbyHotels: [{ name: "Bagmati Resort", stars: 3, priceRange: "$$" }, { name: "Himalayan Eco Resort", stars: 3, priceRange: "$$" }],
    nearbyRestaurants: [{ name: "Taudaha Lakeside Café", cuisine: "Nepali", priceRange: "$" }, { name: "Godavari Village Resort Restaurant", cuisine: "Nepali / Continental", priceRange: "$$" }],
    featured: false, trending: false
  },

  // ── Kaski / Pokhara (d2) — 7 attractions ────────────────────────────────────
  {
    id: "a11", slug: "phewa-lake", districtId: "d2",
    name: "Phewa Lake", category: "Lakes & Rivers",
    tagline: "Pokhara's shimmering centrepiece with perfect mountain reflections",
    description: "Phewa is Nepal's second-largest lake and the soul of Pokhara, stretching 4 km across the valley floor. The snow-capped Annapurna and Machhapuchhre peaks reflect perfectly in its surface on calm mornings. Hire a wooden rowboat to the Tal Barahi temple island, or simply enjoy lakeside cafes watching the world drift by.",
    history: "The lake formed naturally in the low-lying valley and has been central to Pokhara's identity for centuries. The Tal Barahi temple on the island is an important Hindu site. Pokhara's tourism boom in the 1970s centred on Lakeside (Baidam), which grew into a lively tourist quarter along the lake's eastern shore.",
    heroImage: img(PHOTO.lake1, 1600),
    gallery: gallery(PHOTO.lake1, PHOTO.lake2, PHOTO.himalaya3),
    coordinates: { lat: 28.2096, lng: 83.9485 },
    rating: 4.9, reviewCount: 3102,
    openingHours: "Open all day (boat hire 6 AM – 6 PM)",
    entryFee: { nepali: 0, saarc: 0, foreigner: 0, currency: "NPR" },
    bestTimeToVisit: ["Autumn", "Winter", "Spring"],
    activities: ["Boating and kayaking", "Tal Barahi temple island visit", "Lakeside café hopping", "Sunrise reflection photography", "Paragliding landing zone"],
    localFoods: ["Pokhara thali", "Fish curry", "Fresh juices at lakeside cafes"],
    travelTips: ["Early morning (6–8 AM) gives the clearest Annapurna reflections before boats create ripples.", "Rowboats cost around NPR 600–800/hour — negotiate before boarding.", "The north end of Lakeside (Baidam) has the best restaurant strip."],
    nearbyAttractions: ["a12", "a13"],
    nearbyHotels: [{ name: "Fish Tail Lodge", stars: 4, priceRange: "$$$" }, { name: "Temple Tree Resort", stars: 4, priceRange: "$$" }],
    nearbyRestaurants: [{ name: "Moondance Restaurant", cuisine: "International", priceRange: "$$" }, { name: "Caffe Concerto", cuisine: "Italian / Café", priceRange: "$$" }],
    featured: true, trending: true
  },
  {
    id: "a12", slug: "sarangkot-viewpoint", districtId: "d2",
    name: "Sarangkot Viewpoint", category: "Viewpoints",
    tagline: "Nepal's finest Himalayan sunrise — Annapurna in full alpenglow",
    description: "Perched at 1,592 metres above Phewa Lake, Sarangkot is the definitive sunrise viewpoint of the Annapurna region. The panorama sweeps from Dhaulagiri in the west through Annapurna I, II, III, IV, Machhapuchhre (Fishtail) and Lamjung Himal. It's also the launch point for Nepal's most popular paragliding flights.",
    history: "Sarangkot (Sarangkwot) was historically a military fort guarding the approach to Pokhara. The old fortifications are largely gone but the name — meaning 'fort of the Sarong tribe' — persists. It gained international fame as a sunrise viewpoint in the 1990s as Pokhara tourism expanded.",
    heroImage: img(PHOTO.himalaya3, 1600),
    gallery: gallery(PHOTO.himalaya3, PHOTO.himalaya6, PHOTO.lake1),
    coordinates: { lat: 28.2440, lng: 83.9490 },
    rating: 4.7, reviewCount: 2543,
    openingHours: "Open all day (sunrise access from 5 AM)",
    entryFee: { nepali: 0, saarc: 0, foreigner: 0, currency: "NPR" },
    bestTimeToVisit: ["Autumn", "Winter"],
    activities: ["Sunrise viewing", "Paragliding launch", "Annapurna photography", "Hiking up from Pokhara", "Sunset viewpoint"],
    localFoods: ["Summit teahouses serve tea, coffee and basic meals"],
    travelTips: ["Leave Lakeside by 4:30 AM by taxi or hike — arrive before sunrise.", "Book paragliding at least a day ahead in peak season.", "Autumn (Oct–Nov) gives the clearest mountain views."],
    nearbyAttractions: ["a11", "a13"],
    nearbyHotels: [{ name: "Sarangkot View Lodge", stars: 2, priceRange: "$" }, { name: "Temple Tree Resort", stars: 4, priceRange: "$$" }],
    nearbyRestaurants: [{ name: "Sarangkot Hilltop Restaurant", cuisine: "Nepali", priceRange: "$" }, { name: "Moondance Restaurant", cuisine: "International", priceRange: "$$" }],
    featured: true, trending: true
  },
  {
    id: "a13", slug: "world-peace-pagoda-pokhara", districtId: "d2",
    name: "World Peace Pagoda", category: "Religious Sites",
    tagline: "Gleaming white stupa on a hilltop overlooking Phewa Lake",
    description: "Built by Japanese Buddhist monks and inaugurated in 1996, this brilliant white pagoda stands on a ridge above the southern shore of Phewa Lake. The four golden Buddha statues facing the cardinal directions and the panoramic lake-and-mountain view make it one of Pokhara's most photogenic sights. A short boat-and-hike combination makes for a memorable morning excursion.",
    history: "The pagoda is one of 80 World Peace Pagodas built worldwide by Nipponzan Myōhōji Buddhist monks as a post-World War II peace initiative. The Pokhara pagoda was completed in 1996 and is maintained by the Japanese monks who reside at the adjacent monastery.",
    heroImage: img(PHOTO.stupa1, 1600),
    gallery: gallery(PHOTO.stupa1, PHOTO.lake1, PHOTO.himalaya3),
    coordinates: { lat: 28.1963, lng: 83.9420 },
    rating: 4.6, reviewCount: 1123,
    openingHours: "5:00 AM – 7:00 PM",
    entryFee: { nepali: 0, saarc: 0, foreigner: 0, currency: "NPR" },
    bestTimeToVisit: ["Autumn", "Winter", "Spring"],
    activities: ["Stupa visit", "Lake panorama photography", "Boat-and-hike combination", "Meditation", "Sunset viewing"],
    localFoods: ["Small teashops near the pagoda entrance"],
    travelTips: ["Combine a boat ride across Phewa (south end) with a 45-minute uphill hike to the pagoda.", "The south-facing view at sunset is magical.", "Carry water — there are no shops on the hill."],
    nearbyAttractions: ["a11", "a14"],
    nearbyHotels: [{ name: "Fish Tail Lodge", stars: 4, priceRange: "$$$" }, { name: "Pokhara Grande", stars: 5, priceRange: "$$$" }],
    nearbyRestaurants: [{ name: "Gurung Cottage Restaurant", cuisine: "Nepali", priceRange: "$" }, { name: "Caffe Concerto", cuisine: "Italian", priceRange: "$$" }],
    featured: false, trending: false
  },
  {
    id: "a14", slug: "davis-falls", districtId: "d2",
    name: "Davis Falls", category: "Natural Attractions",
    tagline: "A waterfall that vanishes underground into a limestone gorge",
    description: "Davis Falls (Patale Chhango — 'hell's gorge') is a unique waterfall that plunges into a deep limestone tunnel and disappears underground, re-emerging several hundred metres away. The tunnel's origin is traced to 1961 when a Swiss tourist named David accidentally drowned here — giving the site its anglicised name.",
    history: "The falls are a product of glacially-carved limestone topography. The cave system beneath was formed over millennia by the Seti River's underground tributaries. The curious name comes from an unfortunate incident in 1961 when a tourist named Davi (or David) fell into the tunnel; the Nepali misheard 'Davis' and the name stuck.",
    heroImage: img(PHOTO.forest1, 1600),
    gallery: gallery(PHOTO.forest1, PHOTO.lake1, PHOTO.forest2),
    coordinates: { lat: 28.1981, lng: 83.9598 },
    rating: 4.3, reviewCount: 876,
    openingHours: "8:00 AM – 6:00 PM",
    entryFee: { nepali: 50, saarc: 50, foreigner: 100, currency: "NPR" },
    bestTimeToVisit: ["Monsoon", "Spring", "Autumn"],
    activities: ["Waterfall viewing", "Photography", "Gupteshwor Cave visit (directly opposite)"],
    localFoods: ["Street snacks at the entrance"],
    travelTips: ["The falls are most spectacular during and after monsoon (July–September).", "Pair with Gupteshwor Cave directly across the road — one ticket often covers both.", "Keep children away from the edge — the gorge is dangerously deep."],
    nearbyAttractions: ["a15", "a13"],
    nearbyHotels: [{ name: "Hotel Barahi", stars: 4, priceRange: "$$" }, { name: "Landmark Pokhara", stars: 3, priceRange: "$" }],
    nearbyRestaurants: [{ name: "Caffe Concerto", cuisine: "Italian / Café", priceRange: "$$" }, { name: "Busy Bee Café", cuisine: "International", priceRange: "$$" }],
    featured: false, trending: false
  },
  {
    id: "a15", slug: "gupteshwor-cave", districtId: "d2",
    name: "Gupteshwor Cave", category: "Natural Attractions",
    tagline: "Sacred cave with ancient Shiva shrines and underground waterfall views",
    description: "Gupteshwor Mahadev Cave is a 3 km-long limestone cave system directly opposite Davis Falls. Inside, worshippers visit ancient Shiva lingams in the caverns, and near the back there's a dramatic underground viewing platform where you can look through a natural window into Davis Falls as it thunders into the void. Both sacred and geological wonder.",
    history: "Gupteshwor means 'hidden Lord' (Shiva). The cave has been a Hindu pilgrimage site for centuries, with Shiva lingams placed throughout its chambers by devotees. It was formally opened to tourists in the 1980s and the underground walkway to the Davis Falls viewpoint was built as an attraction.",
    heroImage: img(PHOTO.forest2, 1600),
    gallery: gallery(PHOTO.forest2, PHOTO.forest1, PHOTO.stupa2),
    coordinates: { lat: 28.1974, lng: 83.9592 },
    rating: 4.2, reviewCount: 654,
    openingHours: "8:00 AM – 6:00 PM",
    entryFee: { nepali: 100, saarc: 100, foreigner: 200, currency: "NPR" },
    bestTimeToVisit: ["Monsoon", "Spring"],
    activities: ["Cave exploration", "Shiva shrine worship", "Davis Falls underground viewpoint", "Photography"],
    localFoods: ["Street food stalls at the cave entrance"],
    travelTips: ["Wear old shoes — the cave floor gets muddy.", "The underground waterfall view is best during or after monsoon.", "Combined ticket with Davis Falls is available at the entrance."],
    nearbyAttractions: ["a14", "a16"],
    nearbyHotels: [{ name: "Hotel Barahi", stars: 4, priceRange: "$$" }, { name: "Pokhara Grande", stars: 5, priceRange: "$$$" }],
    nearbyRestaurants: [{ name: "Busy Bee Café", cuisine: "International", priceRange: "$$" }, { name: "Pokhara Thakali Kitchen", cuisine: "Nepali", priceRange: "$" }],
    featured: false, trending: false
  },
  {
    id: "a16", slug: "begnas-lake", districtId: "d2",
    name: "Begnas Lake", category: "Lakes & Rivers",
    tagline: "Pokhara's tranquil sibling lake — far fewer crowds, equal beauty",
    description: "Begnas Tal lies 15 km east of Pokhara and offers everything Phewa has — mountain views, boating, waterbirds — without the tourist density. Fishermen in dugout canoes and local families picnicking along the banks make it feel authentically Nepali. A hilltop trail between Begnas and Rupa lakes passes through dense subtropical forest.",
    history: "Begnas and Rupa are the other two of Pokhara's famous three lakes, all formed in the glacially-eroded Pokhara Valley. The lakes support traditional fishing communities that have lived around their shores for generations. Begnas remained largely off the tourist trail until the late 2000s.",
    heroImage: img(PHOTO.lake2, 1600),
    gallery: gallery(PHOTO.lake2, PHOTO.lake1, PHOTO.forest1),
    coordinates: { lat: 28.1750, lng: 84.0590 },
    rating: 4.5, reviewCount: 423,
    openingHours: "Open all day",
    entryFee: { nepali: 0, saarc: 0, foreigner: 0, currency: "NPR" },
    bestTimeToVisit: ["Autumn", "Winter", "Spring"],
    activities: ["Boating", "Bird watching", "Hilltop lake trail hike", "Fishing village visit", "Photography"],
    localFoods: ["Fresh grilled fish from lakeside restaurants"],
    travelTips: ["Local buses or taxis from Prithvi Chowk Pokhara take about 30 minutes.", "The trail between Begnas and Rupa lakes takes about 2 hours and is excellent for birding.", "Hire a local boat for NPR 300–500/hour — far cheaper than at Phewa."],
    nearbyAttractions: ["a11", "a17"],
    nearbyHotels: [{ name: "Begnas Lake Resort", stars: 4, priceRange: "$$$" }, { name: "Middle Path Resort", stars: 3, priceRange: "$$" }],
    nearbyRestaurants: [{ name: "Begnas Lake View Restaurant", cuisine: "Nepali", priceRange: "$" }, { name: "Sunrise Restaurant Begnas", cuisine: "Nepali / International", priceRange: "$" }],
    featured: false, trending: false
  },
  {
    id: "a17", slug: "international-mountain-museum", districtId: "d2",
    name: "International Mountain Museum", category: "Cultural Heritage Sites",
    tagline: "The world's premier museum dedicated to the great mountain ranges",
    description: "This purpose-built museum traces the geological formation, cultural significance and climbing history of the world's great mountain ranges, with a particular focus on the Himalaya. Exhibits include summit oxygen masks, historic ice axes, giant relief maps, Sherpa cultural artefacts and a tribute hall to Nepal's greatest climbers.",
    history: "The museum was established in 2002 under Nepal's Mountain Development Fund and officially inaugurated in 2004. It was conceived as a permanent tribute to the mountaineers of all nationalities who have tackled the Himalaya, and as an education centre for Nepali youth.",
    heroImage: img(PHOTO.himalaya7, 1600),
    gallery: gallery(PHOTO.himalaya7, PHOTO.himalaya1, PHOTO.himalaya3),
    coordinates: { lat: 28.2034, lng: 83.9861 },
    rating: 4.4, reviewCount: 534,
    openingHours: "9:00 AM – 5:00 PM (Closed Monday)",
    entryFee: { nepali: 100, saarc: 300, foreigner: 500, currency: "NPR" },
    bestTimeToVisit: ["Autumn", "Spring", "Winter"],
    activities: ["Museum tour", "Mountaineering history exhibit", "Summit replica climbing wall", "Sherpa culture section", "Photography"],
    localFoods: ["Museum café serves snacks and drinks"],
    travelTips: ["Allow 2–3 hours for a thorough visit.", "The outdoor section has a life-size model of a high-altitude camp.", "Great for rainy days in Pokhara."],
    nearbyAttractions: ["a11", "a12"],
    nearbyHotels: [{ name: "Pokhara Grande", stars: 5, priceRange: "$$$" }, { name: "Hotel Middle Path", stars: 3, priceRange: "$" }],
    nearbyRestaurants: [{ name: "The Laughing Bear", cuisine: "International", priceRange: "$$" }, { name: "Pokhara Thakali Kitchen", cuisine: "Nepali", priceRange: "$" }],
    featured: false, trending: false
  },

  // ── Solukhumbu (d3) — 4 attractions ─────────────────────────────────────────
  {
    id: "a18", slug: "everest-base-camp", districtId: "d3",
    name: "Everest Base Camp", category: "Mountains & Trekking Routes",
    tagline: "The ultimate Himalayan pilgrimage — 5,364 m at the foot of the world's highest peak",
    description: "The South Base Camp of Mount Everest is reached via the iconic Everest Base Camp Trek — a 12-14 day journey through Sherpa villages, Buddhist monasteries and yak pastures at ever-increasing altitude. Standing at 5,364 metres with the Khumbu Icefall tumbling before you and Everest's pyramid filling the sky is a moment that changes people.",
    history: "The first foreigners to reach the Khumbu region were the 1921 Everest Reconnaissance Expedition. Since Sir Edmund Hillary and Tenzing Norgay's 1953 summit, the base camp has become one of the world's most visited high-altitude sites. The Nepalese government issues around 400 Everest summit permits per season.",
    heroImage: img(PHOTO.himalaya1, 1600),
    gallery: gallery(PHOTO.himalaya1, PHOTO.himalaya9, PHOTO.himalaya4),
    coordinates: { lat: 27.9881, lng: 86.9250 },
    rating: 5.0, reviewCount: 4215,
    openingHours: "Open all day (trekking route — 2-week journey)",
    entryFee: { nepali: 0, saarc: 3000, foreigner: 3000, currency: "NPR" },
    bestTimeToVisit: ["Spring", "Autumn"],
    activities: ["EBC trek (12–14 days)", "Kala Patthar sunrise viewpoint", "Khumbu Icefall viewing", "Tengboche monastery visit", "Sherpa culture immersion"],
    localFoods: ["Dal bhat", "Sherpa stew", "Tongba (millet beer)", "Tibetan bread"],
    travelTips: ["Acclimatise properly — spend extra nights at Namche and Dingboche.", "Travel insurance with helicopter evacuation is essential.", "Fly to Lukla airport, not trekking from Jiri, to save 5+ days."],
    nearbyAttractions: ["a19", "a21"],
    nearbyHotels: [{ name: "Yeti Mountain Home (Phakding)", stars: 4, priceRange: "$$$" }, { name: "Everest View Hotel", stars: 3, priceRange: "$$$" }],
    nearbyRestaurants: [{ name: "Namche Bakery", cuisine: "Café / Bakery", priceRange: "$" }, { name: "Summit Lodge Restaurant", cuisine: "Nepali / International", priceRange: "$$" }],
    featured: true, trending: true
  },
  {
    id: "a19", slug: "namche-bazaar", districtId: "d3",
    name: "Namche Bazaar", category: "Cultural Heritage Sites",
    tagline: "The Sherpa capital — a thriving mountain town at 3,440 metres",
    description: "Namche Bazaar is the gateway to the high Himalaya and the vibrant social hub of the Khumbu region. Cupped in a horseshoe-shaped valley at 3,440 metres, it offers bakeries, gear shops, Wi-Fi cafes and a famous Saturday market where Tibetan traders sell salt, dried yak meat and handicrafts. Acclimatisation hikes above town reveal a stunning Everest view.",
    history: "Namche has been a Sherpa trading post for centuries, sitting at the confluence of trade routes between Tibet and the lowlands. It grew dramatically from the 1950s as Everest expeditions required logistics support, and the 1960s saw the first lodges open for trekkers. It is now the economic and cultural capital of the Khumbu.",
    heroImage: img(PHOTO.himalaya4, 1600),
    gallery: gallery(PHOTO.himalaya4, PHOTO.himalaya1, PHOTO.stupa2),
    coordinates: { lat: 27.8056, lng: 86.7140 },
    rating: 4.8, reviewCount: 2876,
    openingHours: "Open all day (shops 8 AM – 8 PM)",
    entryFee: { nepali: 0, saarc: 0, foreigner: 0, currency: "NPR" },
    bestTimeToVisit: ["Spring", "Autumn"],
    activities: ["Saturday market", "Acclimatisation hike to Hotel Everest View", "Sherpa Culture Museum", "Gear and supply shopping", "Monastery visits"],
    localFoods: ["Sherpa stew", "Dal bhat", "Bakery pastries", "Apple pie", "Tongba"],
    travelTips: ["Spend at least 2 nights here for acclimatisation.", "The hike to the Everest View Hotel (4 hours return) is the best acclimatisation walk.", "The Saturday market starts at dawn — go early."],
    nearbyAttractions: ["a18", "a20"],
    nearbyHotels: [{ name: "Khumbu Lodge", stars: 3, priceRange: "$$" }, { name: "Namche Hotel", stars: 2, priceRange: "$" }],
    nearbyRestaurants: [{ name: "Namche Bakery", cuisine: "Café / Bakery", priceRange: "$" }, { name: "Latte da! Coffee Shop", cuisine: "Café", priceRange: "$" }],
    featured: false, trending: false
  },
  {
    id: "a20", slug: "tengboche-monastery", districtId: "d3",
    name: "Tengboche Monastery", category: "Religious Sites",
    tagline: "The most celebrated monastery in the Himalaya, set beneath Ama Dablam",
    description: "Tengboche Rinpoche Monastery sits at 3,867 metres in one of the most dramatic settings on Earth, with Ama Dablam, Everest and Nuptse framing the complex from all sides. The main gompa rebuilt after a 1989 fire — hosts the spectacular Mani Rimdu festival each November, drawing monks and trekkers from across the region.",
    history: "Tengboche Monastery (Thyangboche) was founded in 1916 by the lama Ngawang Tenzin Norbu. It was destroyed by an earthquake in 1934 and a fire in 1989, both times being faithfully rebuilt. Tenzing Norgay received blessings here before the 1953 Everest expedition, cementing its spiritual significance for Himalayan climbers.",
    heroImage: img(PHOTO.stupa2, 1600),
    gallery: gallery(PHOTO.stupa2, PHOTO.himalaya1, PHOTO.himalaya4),
    coordinates: { lat: 27.8356, lng: 86.7636 },
    rating: 4.9, reviewCount: 1987,
    openingHours: "6:00 AM – 8:00 PM (prayer times 3 AM & 3 PM)",
    entryFee: { nepali: 0, saarc: 0, foreigner: 0, currency: "NPR" },
    bestTimeToVisit: ["Autumn", "Spring"],
    activities: ["Monastery visit", "Morning/evening prayer ceremony", "Mani Rimdu festival (November)", "Ama Dablam photography", "Rhododendron forest walks"],
    localFoods: ["Basic teahouse meals — dal bhat, potato dishes, soup"],
    travelTips: ["Attend the 3 PM or morning prayer ceremony for an authentic experience.", "Request permission before photographing inside the gompa.", "Dress warmly — Tengboche is significantly colder than Namche."],
    nearbyAttractions: ["a18", "a21"],
    nearbyHotels: [{ name: "Tengboche Lodge", stars: 1, priceRange: "$" }, { name: "Himalayan Lodge Tengboche", stars: 2, priceRange: "$" }],
    nearbyRestaurants: [{ name: "Tengboche Tea House", cuisine: "Nepali", priceRange: "$" }, { name: "Himalayan Bakery Tengboche", cuisine: "Café / Bakery", priceRange: "$" }],
    featured: true, trending: false
  },
  {
    id: "a21", slug: "kala-patthar", districtId: "d3",
    name: "Kala Patthar", category: "Viewpoints",
    tagline: "The world's finest sunrise on Everest — at 5,545 metres",
    description: "Kala Patthar ('black rock') is a subsidiary peak above Gorak Shep at 5,545 metres, offering the most celebrated view of Mount Everest available without a mountaineering permit. At dawn, the sun strikes the upper pyramid of Everest while the valley below remains in darkness — a sight that reduces seasoned trekkers to tears.",
    history: "Kala Patthar has been used as an Everest viewpoint since the early trekking era of the 1970s. The name is shared with a similar viewpoint above K2 Base Camp in Pakistan. It features prominently in almost every account of the Everest Base Camp trek and has appeared in countless films and documentaries.",
    heroImage: img(PHOTO.himalaya9, 1600),
    gallery: gallery(PHOTO.himalaya9, PHOTO.himalaya1, PHOTO.himalaya3),
    coordinates: { lat: 27.9938, lng: 86.8303 },
    rating: 4.9, reviewCount: 3421,
    openingHours: "Open all day (best before 8 AM)",
    entryFee: { nepali: 0, saarc: 0, foreigner: 0, currency: "NPR" },
    bestTimeToVisit: ["Autumn", "Spring"],
    activities: ["Sunrise Everest viewpoint", "High-altitude photography", "Himalayas panorama", "EBC extension side trip"],
    localFoods: ["Gorak Shep teahouses serve basic hot food and drinks"],
    travelTips: ["Leave Gorak Shep by 4:30 AM to summit by sunrise.", "It's harder than EBC — take it even slower above 5,000 m.", "The summit view requires climbing the boulder-covered top — use hands on the final pitch."],
    nearbyAttractions: ["a18", "a20"],
    nearbyHotels: [{ name: "Gorak Shep Lodge", stars: 1, priceRange: "$" }, { name: "Everest Inn Gorak Shep", stars: 1, priceRange: "$" }],
    nearbyRestaurants: [{ name: "Gorak Shep Teahouse", cuisine: "Nepali", priceRange: "$" }, { name: "Himalayan Hotel Restaurant", cuisine: "Nepali / Tibetan", priceRange: "$" }],
    featured: true, trending: true
  },

  // ── Chitwan (d4) — 4 attractions ────────────────────────────────────────────
  {
    id: "a22", slug: "chitwan-national-park-safari", districtId: "d4",
    name: "Chitwan National Park", category: "National Parks & Wildlife",
    tagline: "One-horned rhinos and Bengal tigers in UNESCO-listed jungle",
    description: "Chitwan National Park protects 952 km² of sal forest, riverine grassland and wetland in the Terai lowlands. It is Nepal's oldest and best-managed national park and a UNESCO World Heritage Site since 1984. Wildlife includes one-horned rhinos (500+), Bengal tigers (100+), wild elephants, gharial crocodiles, sloth bears and over 680 bird species.",
    history: "The area was a royal hunting preserve for Nepal's Shah kings in the 19th century. It was gazetted as Nepal's first national park in 1973 under international pressure after rhino numbers collapsed. Community buffer-zone programs since the 1990s have dramatically restored both wildlife and local livelihoods.",
    heroImage: img(PHOTO.jungle1, 1600),
    gallery: gallery(PHOTO.jungle1, PHOTO.forest1, PHOTO.lake1),
    coordinates: { lat: 27.5291, lng: 84.3542 },
    rating: 4.7, reviewCount: 3876,
    openingHours: "6:00 AM – 6:00 PM",
    entryFee: { nepali: 500, saarc: 1500, foreigner: 2500, currency: "NPR" },
    bestTimeToVisit: ["Winter", "Autumn", "Spring"],
    activities: ["Jeep safari", "Elephant back safari (ethical — from breeding centre)", "Canoe ride on Rapti river", "Bird watching walks", "Village cultural tour"],
    localFoods: ["Tharu thali", "Fish curry", "Dhikri (rice cake)", "Ghonghi (snail curry)"],
    travelTips: ["Hire a licensed naturalist guide — they spot animals you'd miss completely.", "Dawn (6–8 AM) and dusk safaris give the best wildlife sightings.", "Stay inside the park or at buffer-zone lodges to minimise travel time."],
    nearbyAttractions: ["a23", "a24"],
    nearbyHotels: [{ name: "Barahi Jungle Lodge", stars: 4, priceRange: "$$$" }, { name: "Tiger Tops Tharu Lodge", stars: 4, priceRange: "$$$" }],
    nearbyRestaurants: [{ name: "Jungle Lodge Dining", cuisine: "Nepali / Tharu", priceRange: "$$" }, { name: "KC's Restaurant Sauraha", cuisine: "International", priceRange: "$" }],
    featured: true, trending: true
  },
  {
    id: "a23", slug: "elephant-breeding-centre-chitwan", districtId: "d4",
    name: "Elephant Breeding Centre", category: "National Parks & Wildlife",
    tagline: "Meet baby elephants at Nepal's elephant conservation sanctuary",
    description: "The Elephant Breeding Centre at Khorsor maintains a herd of domesticated Asian elephants used for park patrolling and conservation. Visitors can observe baby elephants, learn about elephant welfare and the complex human-elephant relationships in Nepal. It's particularly popular for the morning bathing session.",
    history: "The centre was established by Nepal's national parks authority to maintain healthy working elephants and eventually phase out elephant-back tourism. Breeding efforts here have been crucial to sustaining Chitwan's working elephant population while welfare standards are gradually improved.",
    heroImage: img(PHOTO.forest1, 1600),
    gallery: gallery(PHOTO.forest1, PHOTO.jungle1, PHOTO.lake1),
    coordinates: { lat: 27.5800, lng: 84.4980 },
    rating: 4.3, reviewCount: 876,
    openingHours: "7:00 AM – 5:00 PM",
    entryFee: { nepali: 100, saarc: 100, foreigner: 200, currency: "NPR" },
    bestTimeToVisit: ["Winter", "Autumn"],
    activities: ["Baby elephant viewing", "Morning elephant bath watching", "Elephant welfare education", "Photography"],
    localFoods: ["Nearby Sauraha restaurants serve Tharu and Nepali cuisine"],
    travelTips: ["Visit at 11 AM for the elephant bathing session — the most photogenic hour.", "Combine with the Rapti river sunset for an excellent half-day.", "Ethical elephant interaction only — avoid riding."],
    nearbyAttractions: ["a22", "a24"],
    nearbyHotels: [{ name: "River Side Spring Resort", stars: 3, priceRange: "$$" }, { name: "Jungle Safari Camp", stars: 3, priceRange: "$$" }],
    nearbyRestaurants: [{ name: "Tharu Cultural Restaurant", cuisine: "Tharu", priceRange: "$" }, { name: "Green Park Restaurant", cuisine: "Nepali / Continental", priceRange: "$" }],
    featured: false, trending: false
  },
  {
    id: "a24", slug: "tharu-cultural-village", districtId: "d4",
    name: "Tharu Cultural Village", category: "Local Experiences",
    tagline: "An evening of Tharu dance, crafts and traditional homestay culture",
    description: "The Tharu are the indigenous people of Chitwan, renowned for their unique stick-dance tradition, distinctive pottery and fish-and-jungle cuisine. Evening cultural programmes in Sauraha feature energetic Tharu stick dances, women's group dances and demonstrations of traditional bamboo crafts. Some villages offer immersive homestay experiences.",
    history: "The Tharu have lived in the Terai forests for centuries, developing natural immunity to malaria that allowed them to inhabit the jungle where outsiders could not. With the eradication of malaria in the 1960s, mass migration into their territory began, severely disrupting Tharu land rights and culture. Cultural tourism has become a tool of economic empowerment.",
    heroImage: img(PHOTO.forest1, 1600),
    gallery: gallery(PHOTO.forest1, PHOTO.jungle1, PHOTO.lake1),
    coordinates: { lat: 27.5750, lng: 84.5100 },
    rating: 4.5, reviewCount: 654,
    openingHours: "9:00 AM – 8:00 PM (cultural shows evenings at 7 PM)",
    entryFee: { nepali: 200, saarc: 200, foreigner: 500, currency: "NPR" },
    bestTimeToVisit: ["Winter", "Autumn", "Spring"],
    activities: ["Tharu stick dance performance", "Traditional craft demonstration", "Village walking tour", "Tharu cooking class", "Homestay"],
    localFoods: ["Tharu thali", "Dhikri", "Ghonghi (snail curry)", "Rice beer (jand)"],
    travelTips: ["Evening cultural shows (around 7 PM) are the highlight — book a front-row seat early.", "A bicycle tour through Tharu villages beyond Sauraha gives a more authentic experience.", "Respect community norms and ask before photographing people."],
    nearbyAttractions: ["a22", "a25"],
    nearbyHotels: [{ name: "Tharu Lodge", stars: 2, priceRange: "$" }, { name: "Jungle Express Camp", stars: 3, priceRange: "$$" }],
    nearbyRestaurants: [{ name: "Tharu Cultural Restaurant", cuisine: "Tharu", priceRange: "$" }, { name: "Chitwan Riverside Restaurant", cuisine: "Nepali", priceRange: "$" }],
    featured: false, trending: false
  },
  {
    id: "a25", slug: "rapti-river-sunset", districtId: "d4",
    name: "Rapti River Sunset Point", category: "Viewpoints",
    tagline: "Golden hour on the Rapti with jungle, birds and cooling air",
    description: "The banks of the Rapti River at Sauraha offer one of the Terai's most rewarding sunset experiences. As the light turns golden, gharial crocodiles bask on sandbanks, fishing eagles dive, and the jungle opposite turns a rich amber. Canoe trips at dusk are a memorable way to experience the river as it transitions from day to night.",
    history: "The Rapti River forms the northern boundary of Chitwan National Park, creating a natural barrier between the human settlement at Sauraha and the protected wildlife habitat beyond. Sunset-watching from the river bank has been a Sauraha tradition for travellers since the early eco-tourism days of the 1980s.",
    heroImage: img(PHOTO.lake1, 1600),
    gallery: gallery(PHOTO.lake1, PHOTO.jungle1, PHOTO.forest1),
    coordinates: { lat: 27.5700, lng: 84.4850 },
    rating: 4.4, reviewCount: 421,
    openingHours: "Open all day (sunset viewing 5–7 PM)",
    entryFee: { nepali: 0, saarc: 0, foreigner: 0, currency: "NPR" },
    bestTimeToVisit: ["Winter", "Autumn", "Spring"],
    activities: ["Sunset watching", "Canoe ride at dusk", "Crocodile spotting", "Bird watching", "Riverside evening stroll"],
    localFoods: ["Riverside restaurants in Sauraha serve grilled fish and Nepali food"],
    travelTips: ["Arrive 30 minutes before sunset for the best light.", "An evening canoe trip (booked in Sauraha) is the ultimate way to experience the river.", "Crocodiles are most visible between November and March on sandbanks."],
    nearbyAttractions: ["a22", "a23"],
    nearbyHotels: [{ name: "Barahi Jungle Lodge", stars: 4, priceRange: "$$$" }, { name: "River Side Spring Resort", stars: 3, priceRange: "$$" }],
    nearbyRestaurants: [{ name: "KC's Restaurant", cuisine: "International", priceRange: "$" }, { name: "Rhino Residency Restaurant", cuisine: "Nepali / Continental", priceRange: "$$" }],
    featured: false, trending: false
  },

  // ── Lalitpur (d5) — 4 attractions ───────────────────────────────────────────
  {
    id: "a26", slug: "patan-durbar-square-attraction", districtId: "d5",
    name: "Patan Durbar Square", category: "Historical Sites",
    tagline: "The finest concentration of Newari art and architecture in Nepal",
    description: "Patan's royal square surpasses even Kathmandu in the density and refinement of its temples and palaces. The Krishna Mandir in pure stone shikhara style, the gilded Hiranya Varna Mahavihar monastery and the world-class Patan Museum are packed into a compact UNESCO-listed square in the city of artisans.",
    history: "Patan (Lalitpur) has been an independent city-kingdom since at least the 12th century and was one of the three rival Malla kingdoms of the Kathmandu Valley. Its artisans were so renowned that they were invited to craft temples in Tibet and China. The square's monuments date primarily from the 15th–18th centuries.",
    heroImage: img(PHOTO.square1, 1600),
    gallery: gallery(PHOTO.square1, PHOTO.stupa2, PHOTO.stupa1),
    coordinates: { lat: 27.6727, lng: 85.3252 },
    rating: 4.7, reviewCount: 1876,
    openingHours: "9:00 AM – 5:00 PM",
    entryFee: { nepali: 0, saarc: 200, foreigner: 1000, currency: "NPR" },
    bestTimeToVisit: ["Autumn", "Spring"],
    activities: ["UNESCO heritage walk", "Patan Museum visit", "Bronze workshop tour", "Photography", "Golden Temple visit"],
    localFoods: ["Newari khaja set", "Bara (lentil patty)", "Wo (lentil pancake)", "Aila (local spirit)"],
    travelTips: ["The Patan Museum is unmissable — one of Asia's best archaeological collections.", "Hire a guide to understand the iconography of the temples.", "The back lanes behind the square contain working bronze and thangka workshops."],
    nearbyAttractions: ["a27", "a28"],
    nearbyHotels: [{ name: "Inn Patan", stars: 3, priceRange: "$$" }, { name: "Café de Patan Guesthouse", stars: 2, priceRange: "$" }],
    nearbyRestaurants: [{ name: "Café du Temple", cuisine: "Continental", priceRange: "$$" }, { name: "The Old House", cuisine: "French", priceRange: "$$$" }],
    featured: true, trending: false
  },
  {
    id: "a27", slug: "golden-temple-patan", districtId: "d5",
    name: "Hiranya Varna Mahavihar (Golden Temple)", category: "Religious Sites",
    tagline: "A glittering Buddhist monastery in the heart of old Patan",
    description: "The Golden Temple (Kwa Bahal) is a three-storey Buddhist monastery dating to the 12th century, its elaborate gilded facade, giant tortoise, chanting monks and resident mice make it one of Kathmandu Valley's most atmospheric religious sites. A different deity is worshipped here each day of the week.",
    history: "Founded by King Bhaskar Verma in the 12th century, the Golden Temple is one of the oldest and most important Buddhist bahals (monastery courtyards) in the valley. Its distinctive gilded roofs were added in later centuries and the complex has been continuously maintained by the local Buddhist Shakya community.",
    heroImage: img(PHOTO.stupa2, 1600),
    gallery: gallery(PHOTO.stupa2, PHOTO.stupa1, PHOTO.square1),
    coordinates: { lat: 27.6731, lng: 85.3230 },
    rating: 4.6, reviewCount: 876,
    openingHours: "5:00 AM – 12:00 PM, 1:30 PM – 7:00 PM",
    entryFee: { nepali: 0, saarc: 0, foreigner: 0, currency: "NPR" },
    bestTimeToVisit: ["Autumn", "Spring"],
    activities: ["Monastery courtyard visit", "Golden facade photography", "Witnessing daily puja ceremony", "Cultural immersion"],
    localFoods: ["Newari khaja set from nearby Patan Durbar Square restaurants"],
    travelTips: ["Leave shoes and leather items at the entrance — leather is prohibited inside.", "Visit in the morning for the pujas (prayer ceremonies).", "The monastery is a 2-minute walk from Patan Durbar Square."],
    nearbyAttractions: ["a26", "a28"],
    nearbyHotels: [{ name: "Inn Patan", stars: 3, priceRange: "$$" }, { name: "Patan Museum Guest House", stars: 2, priceRange: "$" }],
    nearbyRestaurants: [{ name: "Bajeko Sekuwa Patan", cuisine: "Nepali BBQ", priceRange: "$" }, { name: "Café du Temple", cuisine: "Continental", priceRange: "$$" }],
    featured: false, trending: false
  },
  {
    id: "a28", slug: "patan-museum", districtId: "d5",
    name: "Patan Museum", category: "Cultural Heritage Sites",
    tagline: "South Asia's finest collection of Himalayan religious art",
    description: "Housed in the restored western wing of the Patan Royal Palace, this museum holds an extraordinary collection of Himalayan bronze statues, stone sculptures, wood carvings and ritual objects spanning 1,500 years. Multimedia interpretations explain the iconography and production techniques that made Patan the artisan capital of the Himalayan world.",
    history: "The museum was established in the restored Mul Chowk wing of the Patan Royal Palace through a joint Nepal-Austria conservation project and opened in 1997. The palace restoration is considered one of the finest heritage conservation projects in South Asia and has set the standard for subsequent Kathmandu Valley restoration work.",
    heroImage: img(PHOTO.square1, 1600),
    gallery: gallery(PHOTO.square1, PHOTO.stupa2, PHOTO.stupa1),
    coordinates: { lat: 27.6729, lng: 85.3256 },
    rating: 4.8, reviewCount: 654,
    openingHours: "10:00 AM – 5:00 PM (Closed Tuesday)",
    entryFee: { nepali: 0, saarc: 300, foreigner: 500, currency: "NPR" },
    bestTimeToVisit: ["Any season"],
    activities: ["Collection viewing", "Bronze sculpture gallery", "Interactive iconography guide", "Photography in permitted areas", "Museum courtyard café"],
    localFoods: ["Museum café serves excellent coffee and light meals in the heritage courtyard"],
    travelTips: ["Audio guides are available and highly recommended.", "Allow 2–3 hours to appreciate the collection fully.", "The courtyard café is a beautiful place to sit after the tour."],
    nearbyAttractions: ["a26", "a27"],
    nearbyHotels: [{ name: "Inn Patan", stars: 3, priceRange: "$$" }, { name: "Hotel Cosy Corner", stars: 2, priceRange: "$" }],
    nearbyRestaurants: [{ name: "Patan Museum Café", cuisine: "Café / International", priceRange: "$$" }, { name: "The Old House", cuisine: "French", priceRange: "$$$" }],
    featured: false, trending: false
  },
  {
    id: "a29", slug: "ashoka-stupas-patan", districtId: "d5",
    name: "Ashoka Stupas", category: "Religious Sites",
    tagline: "Four ancient mounds marking the legendary boundaries of Patan",
    description: "Four brick stupas stand at the cardinal corners of ancient Patan — tradition holds they were built by the Emperor Ashoka in the 3rd century BC during his pilgrimage to Lumbini. Though historians debate their exact origin, they are among the oldest Buddhist monuments in Nepal and frame the historic city in all directions.",
    history: "The Patan Ashoka Stupas are attributed by local legend to the Maurya emperor Ashoka, who is said to have visited the valley around 250 BC and built these mounds as corner markers of a sacred city. While archaeology places their construction more broadly in the early medieval period, the connection to Ashoka has been part of Patan identity for over a millennium.",
    heroImage: img(PHOTO.stupa1, 1600),
    gallery: gallery(PHOTO.stupa1, PHOTO.stupa2, PHOTO.square1),
    coordinates: { lat: 27.6766, lng: 85.3248 },
    rating: 4.3, reviewCount: 412,
    openingHours: "Open all day",
    entryFee: { nepali: 0, saarc: 0, foreigner: 0, currency: "NPR" },
    bestTimeToVisit: ["Autumn", "Spring"],
    activities: ["Stupa visit", "Heritage walk linking all four stupas", "Photography", "Meditation"],
    localFoods: ["Street food from Patan markets"],
    travelTips: ["Map out all four stupas for a pleasant 1-hour heritage walk around the outer boundary of old Patan.", "The southern (Lagankhel) stupa is the most accessible.", "Combine with a full day exploring Patan Durbar Square."],
    nearbyAttractions: ["a26", "a27"],
    nearbyHotels: [{ name: "Inn Patan", stars: 3, priceRange: "$$" }, { name: "Summit Hotel Lalitpur", stars: 4, priceRange: "$$" }],
    nearbyRestaurants: [{ name: "Roadhouse Café Lalitpur", cuisine: "Continental", priceRange: "$$" }, { name: "Newari Kitchen Patan", cuisine: "Newari", priceRange: "$" }],
    featured: false, trending: false
  },

  // ── Bhaktapur (d33) — 4 attractions ─────────────────────────────────────────
  {
    id: "a30", slug: "bhaktapur-durbar-square", districtId: "d33",
    name: "Bhaktapur Durbar Square", category: "Historical Sites",
    tagline: "The most complete medieval city in Asia — a living museum",
    description: "Bhaktapur Durbar Square is the crown jewel of the Kathmandu Valley's UNESCO World Heritage Sites — an extraordinarily well-preserved medieval cityscape of brick-paved squares, tiered temples and ornate courtyards. The 55-Window Palace, Golden Gate and Nyatapola Temple are among Nepal's most spectacular architectural achievements.",
    history: "Bhaktapur served as the capital of the entire Kathmandu Valley from the 12th to 15th centuries under the Malla kings. The founding king Ananda Deva is credited with building the original palace in 889 AD. When the valley split into three kingdoms, Bhaktapur retained its character as the most traditional of the three Malla cities.",
    heroImage: img(PHOTO.square1, 1600),
    gallery: gallery(PHOTO.square1, PHOTO.stupa2, PHOTO.stupa1),
    coordinates: { lat: 27.6722, lng: 85.4280 },
    rating: 4.9, reviewCount: 2312,
    openingHours: "9:00 AM – 5:00 PM",
    entryFee: { nepali: 0, saarc: 300, foreigner: 1500, currency: "NPR" },
    bestTimeToVisit: ["Autumn", "Spring"],
    activities: ["Heritage walking tour", "55-Window Palace visit", "Newari wood carving workshops", "Photography", "Cultural festival viewing"],
    localFoods: ["Juju dhau (king curd)", "Samay baji set", "Bara", "Yomari (December)"],
    travelTips: ["Stay overnight and explore the squares in early morning before tour groups arrive.", "Juju dhau (king curd) from Bhaktapur is Nepal's most famous dairy product — try it fresh.", "The entry ticket is good for multiple days — keep your receipt."],
    nearbyAttractions: ["a31", "a32"],
    nearbyHotels: [{ name: "Bhaktapur Guest House", stars: 2, priceRange: "$" }, { name: "Hotel Heritage Home", stars: 3, priceRange: "$$" }],
    nearbyRestaurants: [{ name: "Peacock Restaurant", cuisine: "Nepali / Continental", priceRange: "$$" }, { name: "Sunny Restaurant Bhaktapur", cuisine: "Newari", priceRange: "$" }],
    featured: true, trending: true
  },
  {
    id: "a31", slug: "nyatapola-temple", districtId: "d33",
    name: "Nyatapola Temple", category: "Historical Sites",
    tagline: "Nepal's tallest pagoda — a five-tiered masterpiece from 1702",
    description: "The Nyatapola Temple in Taumadhi Square stands 30 metres tall on five successive terraces, each guarded by pairs of protectors of increasing supernatural strength — wrestlers, elephants, lions, griffins and Baghini and Singhini goddesses. Built in just seven months in 1702, it has stood through earthquakes and centuries without major repair.",
    history: "King Bhupatindra Malla built the Nyatapola in 1702 during his reign of Bhaktapur. The name means 'five-storey' in Newari. It is dedicated to the tantric goddess Siddhi Lakshmi, whose image is kept inside and shown to the public only on special occasions. The temple survived the 2015 earthquake with only minor damage.",
    heroImage: img(PHOTO.square1, 1600),
    gallery: gallery(PHOTO.square1, PHOTO.stupa2, PHOTO.stupa1),
    coordinates: { lat: 27.6717, lng: 85.4276 },
    rating: 4.8, reviewCount: 1543,
    openingHours: "6:00 AM – 6:00 PM",
    entryFee: { nepali: 0, saarc: 0, foreigner: 0, currency: "NPR" },
    bestTimeToVisit: ["Autumn", "Spring"],
    activities: ["Staircase ascent photography", "Architecture appreciation", "Bisket Jatra festival (April)", "Taumadhi Square exploration"],
    localFoods: ["Café Nyatapola (in an old building by the temple) serves excellent coffee"],
    travelTips: ["Photograph the full five tiers from Café Nyatapola's upper floor.", "The Bisket Jatra festival here each April is one of Nepal's most dramatic events.", "You cannot enter the temple interior but the exterior is the main attraction."],
    nearbyAttractions: ["a30", "a32"],
    nearbyHotels: [{ name: "Bhaktapur Guest House", stars: 2, priceRange: "$" }, { name: "Shiva Guest House", stars: 2, priceRange: "$" }],
    nearbyRestaurants: [{ name: "Café Nyatapola", cuisine: "Café / Nepali", priceRange: "$" }, { name: "Marco Polo Restaurant", cuisine: "Continental", priceRange: "$$" }],
    featured: false, trending: false
  },
  {
    id: "a32", slug: "pottery-square-bhaktapur", districtId: "d33",
    name: "Pottery Square", category: "Local Experiences",
    tagline: "Watch master potters shape clay at Bhaktapur's ancient craft square",
    description: "Talachi — Pottery Square — has been the centre of Bhaktapur's pottery tradition for over a thousand years. Dozens of potters work on foot-powered wheels in the open square, shaping flowerpots, rice-washing bowls, water vessels and ghee lamps. Hundreds of pots dry in the sun while the ancient craft continues as it has for generations.",
    history: "The Kumakar (potter) caste has occupied this square in Bhaktapur for centuries, holding an inherited monopoly on pottery production. Their craft supplied the ceremonial and domestic needs of the entire Malla court. The tradition is officially recognised as an Intangible Cultural Heritage and efforts are underway to train the next generation.",
    heroImage: img(PHOTO.square1, 1600),
    gallery: gallery(PHOTO.square1, PHOTO.forest1, PHOTO.stupa2),
    coordinates: { lat: 27.6725, lng: 85.4260 },
    rating: 4.6, reviewCount: 876,
    openingHours: "7:00 AM – 6:00 PM",
    entryFee: { nepali: 0, saarc: 0, foreigner: 0, currency: "NPR" },
    bestTimeToVisit: ["Autumn", "Spring", "Winter"],
    activities: ["Watching potter demonstrations", "Try-your-hand pottery workshop", "Shopping for handmade pottery", "Photography"],
    localFoods: ["Juju dhau curd shops at the square edge"],
    travelTips: ["Morning (7–10 AM) is the best time to see all the potters working before the heat of the day.", "You can buy bowls and decorative pieces directly from potters — ideal souvenirs.", "Some potters offer short paid workshops if you ask politely."],
    nearbyAttractions: ["a30", "a33"],
    nearbyHotels: [{ name: "Bhaktapur Guest House", stars: 2, priceRange: "$" }, { name: "Hotel Heritage Home", stars: 3, priceRange: "$$" }],
    nearbyRestaurants: [{ name: "Sunny Restaurant", cuisine: "Newari", priceRange: "$" }, { name: "Peacock Restaurant", cuisine: "Continental / Nepali", priceRange: "$$" }],
    featured: false, trending: true
  },
  {
    id: "a33", slug: "changu-narayan-temple", districtId: "d33",
    name: "Changu Narayan Temple", category: "Religious Sites",
    tagline: "Nepal's oldest Hindu temple — 5th century Vishnu shrine on a hilltop",
    description: "Changu Narayan sits on a narrow forested ridge 7 km north of Bhaktapur at 1,541 metres, commanding views over the valley. The two-tiered golden temple to Vishnu contains Nepal's oldest inscription (464 AD) and extraordinary stone sculptures from the Licchavi period. The surrounding courtyard is an open-air museum of 1,500 years of stone carving.",
    history: "The temple dates to at least the 5th century, when the inscription of King Mandeva was carved — making it Nepal's oldest dated inscription. The site is associated with the Licchavi period (400–750 AD), the golden age of Nepali art and architecture. It was inscribed on the UNESCO World Heritage List in 1979 as part of the Kathmandu Valley heritage zone.",
    heroImage: img(PHOTO.stupa2, 1600),
    gallery: gallery(PHOTO.stupa2, PHOTO.square1, PHOTO.stupa1),
    coordinates: { lat: 27.7131, lng: 85.4638 },
    rating: 4.7, reviewCount: 654,
    openingHours: "6:00 AM – 6:00 PM",
    entryFee: { nepali: 0, saarc: 200, foreigner: 300, currency: "NPR" },
    bestTimeToVisit: ["Autumn", "Spring"],
    activities: ["Temple complex exploration", "Licchavi stone sculpture viewing", "Valley panorama photography", "Thanka painting village nearby", "Heritage museum"],
    localFoods: ["Village teahouses near the temple serve basic Nepali food"],
    travelTips: ["Combine with Bhaktapur Durbar Square for a full Bhaktapur day.", "The walk through the Thanka painting village at the base of the hill is worth adding.", "Entry ticket to Bhaktapur covers this site too — keep your receipt."],
    nearbyAttractions: ["a30", "a31"],
    nearbyHotels: [{ name: "Changu Village Hotel", stars: 2, priceRange: "$" }, { name: "Heritage Home Bhaktapur", stars: 3, priceRange: "$$" }],
    nearbyRestaurants: [{ name: "Changu Narayan Hilltop Restaurant", cuisine: "Nepali", priceRange: "$" }, { name: "Peacock Restaurant Bhaktapur", cuisine: "Continental", priceRange: "$$" }],
    featured: false, trending: false
  },

  // ── Mustang (d6) — 1 attraction ─────────────────────────────────────────────
  {
    id: "a34", slug: "lo-manthang-walled-city", districtId: "d6",
    name: "Lo Manthang Walled City", category: "Cultural Heritage Sites",
    tagline: "The forbidden kingdom's medieval capital — unchanged for 600 years",
    description: "Lo Manthang is the walled capital of the former Kingdom of Lo, a high-desert city at 3,840 metres in the rain-shadow of the Annapurna and Dhaulagiri massifs. Its mud-brick palace, four active gompas, ochre-painted chortens and flat-roofed Tibetan-style houses have barely changed since the 15th century. Access requires a special Restricted Area Permit.",
    history: "Lo Manthang was founded around 1380 by King Ame Pal, the first king of the Mustang dynasty. It served as the seat of the Kingdom of Lo until Nepal absorbed it in 1795, though the local king retained his title until 2008. The city came to world attention through photojournalist Eric Valli's National Geographic coverage in the 1990s.",
    heroImage: img(PHOTO.himalaya2, 1600),
    gallery: gallery(PHOTO.himalaya2, PHOTO.himalaya5, PHOTO.himalaya9),
    coordinates: { lat: 29.1830, lng: 83.9580 },
    rating: 4.9, reviewCount: 543,
    openingHours: "Open all day",
    entryFee: { nepali: 0, saarc: 0, foreigner: 0, currency: "NPR" },
    bestTimeToVisit: ["Spring", "Summer"],
    activities: ["Walled city exploration", "Sky cave visits", "Tiji festival (May)", "Thubchen and Jampa Lhakhang monastery visits", "Forbidden Kingdom trekking"],
    localFoods: ["Tsampa", "Thukpa (noodle soup)", "Yak butter tea", "Seabuckthorn berry juice"],
    travelTips: ["A Restricted Area Permit (RAP) costs USD 500 for 10 days — book through a licensed trekking agency.", "The Tiji festival in May is the best time to visit for cultural immersion.", "Trek from Jomsom — the route through the Kali Gandaki gorge is one of the world's deepest."],
    nearbyAttractions: [],
    nearbyHotels: [{ name: "Lo Manthang Guesthouse", stars: 1, priceRange: "$" }, { name: "Mustang Holiday Inn", stars: 2, priceRange: "$" }],
    nearbyRestaurants: [{ name: "Royal Lo Manthang Restaurant", cuisine: "Tibetan / Nepali", priceRange: "$" }, { name: "Mustang Kitchen", cuisine: "Tibetan", priceRange: "$" }],
    featured: true, trending: false
  }
];
