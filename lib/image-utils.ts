/**
 * Utility functions for generating realistic car images
 */

// Map of car makes and models to appropriate Unsplash image URLs
const carImageMap: Record<string, string> = {
  // American brands
  ford: "https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=800&h=500",
  "ford f-150": "https://images.unsplash.com/photo-1583267746897-2cf415887172?auto=format&fit=crop&w=800&h=500",
  "ford f150": "https://images.unsplash.com/photo-1583267746897-2cf415887172?auto=format&fit=crop&w=800&h=500",
  "ford bronco": "https://images.unsplash.com/photo-1649155165249-6dba4a8a1abb?auto=format&fit=crop&w=800&h=500",
  "ford mustang": "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=800&h=500",
  "ford explorer": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&h=500",
  "ford escape": "https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&w=800&h=500",

  chevrolet: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&h=500",
  "chevrolet silverado":
    "https://images.unsplash.com/photo-1599256621730-535171e28e50?auto=format&fit=crop&w=800&h=500",
  "chevy silverado": "https://images.unsplash.com/photo-1599256621730-535171e28e50?auto=format&fit=crop&w=800&h=500",
  "chevrolet corvette": "https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?auto=format&fit=crop&w=800&h=500",
  "chevy corvette": "https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?auto=format&fit=crop&w=800&h=500",
  "chevrolet camaro": "https://images.unsplash.com/photo-1603553329474-99f95f35394f?auto=format&fit=crop&w=800&h=500",
  "chevy camaro": "https://images.unsplash.com/photo-1603553329474-99f95f35394f?auto=format&fit=crop&w=800&h=500",
  "chevrolet tahoe": "https://images.unsplash.com/photo-1612544409025-e4f5e1e4c7c4?auto=format&fit=crop&w=800&h=500",
  "chevy tahoe": "https://images.unsplash.com/photo-1612544409025-e4f5e1e4c7c4?auto=format&fit=crop&w=800&h=500",

  jeep: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&h=500",
  "jeep wrangler": "https://images.unsplash.com/photo-1596638787647-904d822d751e?auto=format&fit=crop&w=800&h=500",
  "jeep grand cherokee":
    "https://images.unsplash.com/photo-1626443252351-4f3f39eebbac?auto=format&fit=crop&w=800&h=500",
  "jeep cherokee": "https://images.unsplash.com/photo-1626443252351-4f3f39eebbac?auto=format&fit=crop&w=800&h=500",
  "jeep gladiator": "https://images.unsplash.com/photo-1626443252351-4f3f39eebbac?auto=format&fit=crop&w=800&h=500",

  ram: "https://images.unsplash.com/photo-1616788494672-ec7ca25fdda9?auto=format&fit=crop&w=800&h=500",
  "ram 1500": "https://images.unsplash.com/photo-1595758376050-3576a4a7dc3c?auto=format&fit=crop&w=800&h=500",
  "ram 2500": "https://images.unsplash.com/photo-1616788494672-ec7ca25fdda9?auto=format&fit=crop&w=800&h=500",
  "dodge ram": "https://images.unsplash.com/photo-1595758376050-3576a4a7dc3c?auto=format&fit=crop&w=800&h=500",

  tesla: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&h=500",
  "tesla model 3": "https://images.unsplash.com/photo-1561580125-028ee3bd62eb?auto=format&fit=crop&w=800&h=500",
  "tesla model s": "https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&w=800&h=500",
  "tesla model y": "https://images.unsplash.com/photo-1619317222671-d8f9ac265b7c?auto=format&fit=crop&w=800&h=500",
  "tesla model x": "https://images.unsplash.com/photo-1566055909643-a51b4271d7be?auto=format&fit=crop&w=800&h=500",

  gmc: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=800&h=500",
  "gmc sierra": "https://images.unsplash.com/photo-1609061801033-8f8a7d13332e?auto=format&fit=crop&w=800&h=500",
  "gmc yukon": "https://images.unsplash.com/photo-1625252595576-d1cf609b0b2a?auto=format&fit=crop&w=800&h=500",
  "gmc acadia": "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=800&h=500",
  "gmc terrain": "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=800&h=500",

  cadillac: "https://images.unsplash.com/photo-1543796076-c8a8d58bb4c5?auto=format&fit=crop&w=800&h=500",
  "cadillac escalade": "https://images.unsplash.com/photo-1543796076-c8a8d58bb4c5?auto=format&fit=crop&w=800&h=500",
  "cadillac cts": "https://images.unsplash.com/photo-1543796076-c8a8d58bb4c5?auto=format&fit=crop&w=800&h=500",

  // Japanese brands
  toyota: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=800&h=500",
  "toyota camry": "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=800&h=500",
  "toyota corolla": "https://images.unsplash.com/photo-1623869675781-80aa31012c78?auto=format&fit=crop&w=800&h=500",
  "toyota rav4": "https://images.unsplash.com/photo-1581540222194-0def2dda95b8?auto=format&fit=crop&w=800&h=500",
  "toyota highlander": "https://images.unsplash.com/photo-1625086798568-7be1e8d90e9e?auto=format&fit=crop&w=800&h=500",
  "toyota tundra": "https://images.unsplash.com/photo-1633118217913-a7f7a0dac6c4?auto=format&fit=crop&w=800&h=500",
  "toyota tacoma": "https://images.unsplash.com/photo-1633118217913-a7f7a0dac6c4?auto=format&fit=crop&w=800&h=500",
  "toyota 4runner": "https://images.unsplash.com/photo-1625086798568-7be1e8d90e9e?auto=format&fit=crop&w=800&h=500",
  "toyota prius": "https://images.unsplash.com/photo-1623869675781-80aa31012c78?auto=format&fit=crop&w=800&h=500",

  honda: "https://images.unsplash.com/photo-1607853554439-0069ec0f29b6?auto=format&fit=crop&w=800&h=500",
  "honda accord": "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&w=800&h=500",
  "honda civic": "https://images.unsplash.com/photo-1590510696098-73d3b67c9a8e?auto=format&fit=crop&w=800&h=500",
  "honda cr-v": "https://images.unsplash.com/photo-1605816988069-b11383b50717?auto=format&fit=crop&w=800&h=500",
  "honda crv": "https://images.unsplash.com/photo-1605816988069-b11383b50717?auto=format&fit=crop&w=800&h=500",
  "honda pilot": "https://images.unsplash.com/photo-1607853554439-0069ec0f29b6?auto=format&fit=crop&w=800&h=500",
  "honda odyssey": "https://images.unsplash.com/photo-1607853554439-0069ec0f29b6?auto=format&fit=crop&w=800&h=500",
  "honda fit": "https://images.unsplash.com/photo-1590510696098-73d3b67c9a8e?auto=format&fit=crop&w=800&h=500",

  nissan: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&h=500",
  "nissan altima": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&h=500",
  "nissan rogue": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&h=500",
  "nissan sentra": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&h=500",
  "nissan maxima": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&h=500",
  "nissan pathfinder": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&h=500",
  "nissan frontier": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&h=500",
  "nissan titan": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&h=500",
  "nissan 370z": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&h=500",
  "nissan gt-r": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&h=500",

  mazda: "https://images.unsplash.com/photo-1544558635-667480601430?auto=format&fit=crop&w=800&h=500",
  "mazda cx-5": "https://images.unsplash.com/photo-1625086798568-7be1e8d90e9e?auto=format&fit=crop&w=800&h=500",
  "mazda cx5": "https://images.unsplash.com/photo-1625086798568-7be1e8d90e9e?auto=format&fit=crop&w=800&h=500",
  "mazda cx-9": "https://images.unsplash.com/photo-1625086798568-7be1e8d90e9e?auto=format&fit=crop&w=800&h=500",
  "mazda cx9": "https://images.unsplash.com/photo-1625086798568-7be1e8d90e9e?auto=format&fit=crop&w=800&h=500",
  "mazda 3": "https://images.unsplash.com/photo-1544558635-667480601430?auto=format&fit=crop&w=800&h=500",
  "mazda 6": "https://images.unsplash.com/photo-1544558635-667480601430?auto=format&fit=crop&w=800&h=500",
  "mazda mx-5": "https://images.unsplash.com/photo-1544558635-667480601430?auto=format&fit=crop&w=800&h=500",
  "mazda miata": "https://images.unsplash.com/photo-1544558635-667480601430?auto=format&fit=crop&w=800&h=500",

  subaru: "https://images.unsplash.com/photo-1626443252351-4f3f39eebbac?auto=format&fit=crop&w=800&h=500",
  "subaru outback": "https://images.unsplash.com/photo-1626443252351-4f3f39eebbac?auto=format&fit=crop&w=800&h=500",
  "subaru forester": "https://images.unsplash.com/photo-1626443252351-4f3f39eebbac?auto=format&fit=crop&w=800&h=500",
  "subaru legacy": "https://images.unsplash.com/photo-1626443252351-4f3f39eebbac?auto=format&fit=crop&w=800&h=500",
  "subaru impreza": "https://images.unsplash.com/photo-1626443252351-4f3f39eebbac?auto=format&fit=crop&w=800&h=500",
  "subaru crosstrek": "https://images.unsplash.com/photo-1626443252351-4f3f39eebbac?auto=format&fit=crop&w=800&h=500",
  "subaru wrx": "https://images.unsplash.com/photo-1626443252351-4f3f39eebbac?auto=format&fit=crop&w=800&h=500",

  lexus: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&h=500",
  "lexus es": "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&h=500",
  "lexus es 350": "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&h=500",
  "lexus rx": "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&h=500",
  "lexus rx 350": "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&h=500",
  "lexus is": "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&h=500",
  "lexus is 350": "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&h=500",
  "lexus nx": "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&h=500",
  "lexus nx 300": "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&h=500",
  "lexus lx": "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&h=500",
  "lexus lx 570": "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&h=500",

  acura: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&w=800&h=500",
  "acura rdx": "https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&w=800&h=500",
  "acura mdx": "https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&w=800&h=500",
  "acura tlx": "https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&w=800&h=500",
  "acura ilx": "https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&w=800&h=500",
  "acura nsx": "https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&w=800&h=500",

  // European brands
  bmw: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&h=500",
  "bmw 3 series": "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=800&h=500",
  "bmw 3-series": "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=800&h=500",
  "bmw 330i": "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=800&h=500",
  "bmw 5 series": "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&h=500",
  "bmw 5-series": "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&h=500",
  "bmw 530i": "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&h=500",
  "bmw x3": "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&h=500",
  "bmw x5": "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&h=500",
  "bmw x7": "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&h=500",
  "bmw m3": "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=800&h=500",
  "bmw m5": "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&h=500",

  mercedes: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&h=500",
  "mercedes-benz": "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&h=500",
  "mercedes c-class": "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&h=500",
  "mercedes c class": "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&h=500",
  "mercedes e-class": "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&h=500",
  "mercedes e class": "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&h=500",
  "mercedes s-class": "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&h=500",
  "mercedes s class": "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&h=500",
  "mercedes gle": "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&h=500",
  "mercedes glc": "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&h=500",
  "mercedes gls": "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&h=500",
  "mercedes amg": "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&h=500",

  audi: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&h=500",
  "audi a3": "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&h=500",
  "audi a4": "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&h=500",
  "audi a5": "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&h=500",
  "audi a6": "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&h=500",
  "audi a7": "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&h=500",
  "audi a8": "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&h=500",
  "audi q3": "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&h=500",
  "audi q5": "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&h=500",
  "audi q7": "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&h=500",
  "audi q8": "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&h=500",
  "audi s4": "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&h=500",
  "audi s5": "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&h=500",
  "audi rs5": "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&h=500",
  "audi rs7": "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&h=500",

  volkswagen: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&h=500",
  vw: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&h=500",
  "volkswagen jetta": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&h=500",
  "vw jetta": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&h=500",
  "volkswagen passat": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&h=500",
  "vw passat": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&h=500",
  "volkswagen tiguan": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&h=500",
  "vw tiguan": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&h=500",
  "volkswagen atlas": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&h=500",
  "vw atlas": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&h=500",
  "volkswagen golf": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&h=500",
  "vw golf": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&h=500",
  "volkswagen gti": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&h=500",
  "vw gti": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&h=500",

  // Korean brands
  hyundai: "https://images.unsplash.com/photo-1629421889558-e2315ffc8d13?auto=format&fit=crop&w=800&h=500",
  "hyundai tucson": "https://images.unsplash.com/photo-1629421889558-e2315ffc8d13?auto=format&fit=crop&w=800&h=500",
  "hyundai santa fe": "https://images.unsplash.com/photo-1629421889558-e2315ffc8d13?auto=format&fit=crop&w=800&h=500",
  "hyundai sonata": "https://images.unsplash.com/photo-1629421889558-e2315ffc8d13?auto=format&fit=crop&w=800&h=500",
  "hyundai elantra": "https://images.unsplash.com/photo-1629421889558-e2315ffc8d13?auto=format&fit=crop&w=800&h=500",
  "hyundai palisade": "https://images.unsplash.com/photo-1629421889558-e2315ffc8d13?auto=format&fit=crop&w=800&h=500",
  "hyundai kona": "https://images.unsplash.com/photo-1629421889558-e2315ffc8d13?auto=format&fit=crop&w=800&h=500",

  kia: "https://images.unsplash.com/photo-1600661653561-629509216228?auto=format&fit=crop&w=800&h=500",
  "kia telluride": "https://images.unsplash.com/photo-1600661653561-629509216228?auto=format&fit=crop&w=800&h=500",
  "kia sportage": "https://images.unsplash.com/photo-1600661653561-629509216228?auto=format&fit=crop&w=800&h=500",
  "kia sorento": "https://images.unsplash.com/photo-1600661653561-629509216228?auto=format&fit=crop&w=800&h=500",
  "kia forte": "https://images.unsplash.com/photo-1600661653561-629509216228?auto=format&fit=crop&w=800&h=500",
  "kia optima": "https://images.unsplash.com/photo-1600661653561-629509216228?auto=format&fit=crop&w=800&h=500",
  "kia k5": "https://images.unsplash.com/photo-1600661653561-629509216228?auto=format&fit=crop&w=800&h=500",
  "kia soul": "https://images.unsplash.com/photo-1600661653561-629509216228?auto=format&fit=crop&w=800&h=500",
}

// Generic car images by type
const genericCarImages: Record<string, string> = {
  sedan: "https://images.unsplash.com/photo-1549399542-7e8ee8c3c277?auto=format&fit=crop&w=800&h=500",
  suv: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&h=500",
  truck: "https://images.unsplash.com/photo-1569285645462-a3f9c6332d56?auto=format&fit=crop&w=800&h=500",
  sports: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&h=500",
  luxury: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&h=500",
  electric: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&h=500",
  hybrid: "https://images.unsplash.com/photo-1623869675781-80aa31012c78?auto=format&fit=crop&w=800&h=500",
  convertible: "https://images.unsplash.com/photo-1544558635-667480601430?auto=format&fit=crop&w=800&h=500",
  minivan: "https://images.unsplash.com/photo-1607853554439-0069ec0f29b6?auto=format&fit=crop&w=800&h=500",
  default: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&h=500",
}

/**
 * Extract make and model from car title
 */
function extractMakeModel(title: string): { make: string; model: string | null } {
  const titleLower = title.toLowerCase()
  const yearPattern = /^(\d{4})\s+(.+)$/
  const match = titleLower.match(yearPattern)

  if (match) {
    const carName = match[2] // Remove year prefix

    // Common car makes
    const makes = [
      "toyota",
      "honda",
      "ford",
      "chevrolet",
      "chevy",
      "bmw",
      "mercedes",
      "audi",
      "lexus",
      "subaru",
      "hyundai",
      "kia",
      "mazda",
      "nissan",
      "jeep",
      "ram",
      "dodge",
      "tesla",
      "volkswagen",
      "vw",
      "acura",
      "gmc",
      "cadillac",
    ]

    // Find the make in the car name
    for (const make of makes) {
      if (carName.startsWith(make + " ")) {
        const model = carName.substring(make.length).trim()
        return { make, model }
      }
    }

    // If we can't find a specific make, try to extract the first word as make
    const parts = carName.split(" ")
    if (parts.length > 1) {
      return { make: parts[0], model: parts.slice(1).join(" ") }
    }

    return { make: carName, model: null }
  }

  return { make: "unknown", model: null }
}

/**
 * Get an appropriate image URL for a car based on its title
 */
export function getCarImageUrl(carTitle: string): string {
  if (!carTitle) return genericCarImages.default

  const title = carTitle.toLowerCase()

  // First, try to find an exact match for the car model
  for (const [key, url] of Object.entries(carImageMap)) {
    if (title === key || title.includes(key)) {
      return url
    }
  }

  // If no exact match, extract make and model and try to find a match
  const { make, model } = extractMakeModel(title)

  // Try to match make + model
  if (make && model) {
    const makeModelKey = `${make} ${model}`
    if (carImageMap[makeModelKey]) {
      return carImageMap[makeModelKey]
    }
  }

  // Try to match just the make
  if (make && carImageMap[make]) {
    return carImageMap[make]
  }

  // If no make/model match, try to determine the car type
  if (
    title.includes("suv") ||
    title.includes("explorer") ||
    title.includes("rav4") ||
    title.includes("cr-v") ||
    title.includes("crv") ||
    title.includes("x5") ||
    title.includes("tucson") ||
    title.includes("santa fe") ||
    title.includes("highlander") ||
    title.includes("pilot") ||
    title.includes("sorento") ||
    title.includes("atlas")
  ) {
    return genericCarImages.suv
  } else if (
    title.includes("truck") ||
    title.includes("f-150") ||
    title.includes("f150") ||
    title.includes("silverado") ||
    title.includes("sierra") ||
    title.includes("tundra") ||
    title.includes("ram") ||
    title.includes("titan") ||
    title.includes("frontier") ||
    title.includes("tacoma")
  ) {
    return genericCarImages.truck
  } else if (title.includes("tesla") || title.includes("electric") || title.includes("ev")) {
    return genericCarImages.electric
  } else if (
    title.includes("bmw") ||
    title.includes("mercedes") ||
    title.includes("lexus") ||
    title.includes("audi") ||
    title.includes("cadillac")
  ) {
    return genericCarImages.luxury
  } else if (
    title.includes("corvette") ||
    title.includes("mustang") ||
    title.includes("camaro") ||
    title.includes("sports") ||
    title.includes("gt-r") ||
    title.includes("gtr") ||
    title.includes("miata") ||
    title.includes("mx-5")
  ) {
    return genericCarImages.sports
  } else if (
    title.includes("sedan") ||
    title.includes("camry") ||
    title.includes("accord") ||
    title.includes("civic") ||
    title.includes("altima") ||
    title.includes("sonata") ||
    title.includes("elantra") ||
    title.includes("jetta") ||
    title.includes("passat") ||
    title.includes("maxima") ||
    title.includes("legacy")
  ) {
    return genericCarImages.sedan
  } else if (
    title.includes("convertible") ||
    title.includes("cabriolet") ||
    title.includes("roadster") ||
    title.includes("spyder")
  ) {
    return genericCarImages.convertible
  } else if (
    title.includes("minivan") ||
    title.includes("odyssey") ||
    title.includes("sienna") ||
    title.includes("pacifica") ||
    title.includes("carnival")
  ) {
    return genericCarImages.minivan
  } else if (title.includes("hybrid") || title.includes("prius")) {
    return genericCarImages.hybrid
  }

  // Default fallback
  return genericCarImages.default
}

