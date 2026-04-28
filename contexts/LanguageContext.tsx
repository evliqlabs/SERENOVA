'use client'
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'

export type LangCode = 'en' | 'si' | 'ta' | 'zh' | 'de' | 'fr' | 'ja' | 'ko' | 'ru'

export const LANGUAGES: { code: LangCode; label: string; native: string; flag: string }[] = [
  { code: 'en', label: 'English',  native: 'English',   flag: '🇬🇧' },
  { code: 'si', label: 'Sinhala',  native: 'සිංහල',     flag: '🇱🇰' },
  { code: 'ta', label: 'Tamil',    native: 'தமிழ்',     flag: '🇱🇰' },
  { code: 'zh', label: 'Chinese',  native: '中文',       flag: '🇨🇳' },
  { code: 'de', label: 'German',   native: 'Deutsch',    flag: '🇩🇪' },
  { code: 'fr', label: 'French',   native: 'Français',   flag: '🇫🇷' },
  { code: 'ja', label: 'Japanese', native: '日本語',     flag: '🇯🇵' },
  { code: 'ko', label: 'Korean',   native: '한국어',     flag: '🇰🇷' },
  { code: 'ru', label: 'Russian',  native: 'Русский',    flag: '🇷🇺' },
]

export type Translations = {
  nav: { rooms:string; experiences:string; gallery:string; location:string; contact:string; book:string }
  hero: { tag:string; title1:string; title2:string; subtitle:string; exploreRooms:string; experiences:string; scroll:string }
  booking: { checkin:string; checkout:string; guests:string; roomType:string; checkAvail:string; guest1:string; guest2:string; guest3:string; guest4:string; any:string; ocean:string; garden:string; beach:string }
  about: { tag:string; title1:string; title2:string; title3:string; p1:string; p2:string; years:string; rooms:string; restaurants:string; rating:string }
  rooms: { tag:string; title1:string; title2:string; title3:string; viewAll:string; perNight:string; from:string; popular:string; new:string; featured:string; suite:{name:string;type:string}; villa:{name:string;type:string}; cabana:{name:string;type:string} }
  experiences: { tag:string; title1:string; title2:string; title3:string; desc:string; items:{name:string;desc:string}[] }
  gallery: { tag:string; title1:string; title2:string; close:string }
  testimonials: { quote:string; author:string; location:string }
  location: { tag:string; title1:string; title2:string; title3:string; desc:string; place:string; coast:string; directions:string; items:{title:string;desc:string}[] }
  whatsapp: { title:string; desc:string; btn:string; number:string }
  footer: { desc:string; quickLinks:string; expTitle:string; contactTitle:string; copyright:string; links:string[]; expLinks:string[] }
  booking_modal: { title:string; name:string; email:string; phone:string; special:string; submit:string; success:string; successMsg:string; close:string; required:string }
  places: { tag:string; title:string; subtitle:string }
}

const EN: Translations = {
  nav: { rooms:'Rooms', experiences:'Experiences', gallery:'Gallery', location:'Location', contact:'Contact', book:'Book Now' },
  hero: { tag:'Bentota · Sri Lanka · Est. 2009', title1:'Where Silence', title2:'Meets the Sea', subtitle:"A sanctuary of refined solitude on Sri Lanka's golden coast. Luxury without noise — beauty without distraction.", exploreRooms:'Explore Rooms', experiences:'Our Experiences', scroll:'Scroll' },
  booking: { checkin:'Check In', checkout:'Check Out', guests:'Guests', roomType:'Room Type', checkAvail:'Check Availability', guest1:'1 Guest', guest2:'2 Guests', guest3:'3 Guests', guest4:'4+ Guests', any:'Any Room', ocean:'Ocean Suite', garden:'Garden Villa', beach:'Beachfront Cabana' },
  about: { tag:'About Serenova', title1:'A', title2:'Timeless', title3:'Retreat on the Indian Ocean', p1:"Nestled between the Indian Ocean and Bentota River, Serenova is Sri Lanka's most intimate luxury escape — where colonial grace meets contemporary stillness.", p2:'From Ayurvedic rituals to sunset river cruises, every moment here is curated to restore your sense of wonder.', years:'Years of Excellence', rooms:'Luxury Rooms', restaurants:'Restaurants', rating:'Guest Rating' },
  rooms: { tag:'Accommodations', title1:'Rooms', title2:'&', title3:'Suites', viewAll:'View All', perNight:'/ night', from:'From', popular:'Most Popular', new:'New', featured:'Featured Suite', suite:{name:'Ocean Horizon Suite',type:'Featured Suite'}, villa:{name:'Tropical Garden Villa',type:'Private Villa'}, cabana:{name:'Beachfront Cabana',type:'Beachfront'} },
  experiences: { tag:'Curated Experiences', title1:'Discover the', title2:'Soul', title3:'of Sri Lanka', desc:'Each experience is carefully crafted to connect you deeply with this extraordinary island and its ancient rhythms.', items:[{name:'Surfing & Water Sports',desc:"Ride Bentota's legendary waves with expert instructors. Jet ski, windsurf, and kayak the river estuary."},{name:'Ayurvedic Spa',desc:'Ancient Ceylon healing — herbal oils, steam baths, and full-body rejuvenation rituals by master therapists.'},{name:'Sunset River Cruise',desc:'Glide through the Bentota River at dusk — crocodiles, exotic birds, and fireflies illuminating the night.'},{name:'Cooking Class',desc:'Master hoppers, kottu roti, and coconut curries alongside our island-born chefs in an open kitchen.'}] },
  gallery: { tag:'Gallery', title1:'Life at', title2:'Serenova', close:'Close' },
  testimonials: { quote:'"Serenova is not just a hotel — it is a feeling you carry home. The staff, the food, the ocean at sunrise. Absolutely unforgettable."', author:'Priya & Rahul Mehta', location:'Mumbai, India' },
  location: { tag:'How to Find Us', title1:'The', title2:'Perfect', title3:'Location', desc:'Located 65 km south of Colombo, Bentota balances pristine beaches, river wildlife, and ancient temples in perfect harmony.', place:'Bentota, Sri Lanka', coast:'Indian Ocean Coast', directions:'Get Directions', items:[{title:'Bandaranaike International Airport',desc:'90 minutes by expressway — private transfers arranged'},{title:'Bentota Railway Station',desc:'5 minutes away — the coastal train ride is iconic'},{title:'Nearby Attractions',desc:'Galle Fort (45 min), Turtle Hatchery (15 min), Brief Garden (20 min)'}] },
  whatsapp: { title:'Ready to Arrive?', desc:'Connect with us instantly on WhatsApp — our team responds within minutes.', btn:'Chat on WhatsApp', number:'+94 75 730 3823' },
  footer: { desc:"A luxury beach resort on Sri Lanka's Bentota coast, where every sunset is a masterpiece and every morning begins with the sound of the sea.", quickLinks:'Quick Links', expTitle:'Experiences', contactTitle:'Contact', copyright:'© 2025 Serenova Resort. All rights reserved.', links:['About Us','Rooms & Suites','Dining','Spa & Wellness','Weddings'], expLinks:['Water Sports','River Cruise','Cooking Class','Cultural Tours','Ayurveda'] },
  booking_modal: { title:'Complete Your Booking', name:'Full Name', email:'Email Address', phone:'Phone Number', special:'Special Requests', submit:'Confirm Booking', success:'Booking Request Sent!', successMsg:'We will contact you within 24 hours to confirm your reservation.', close:'Close', required:'Please fill all required fields' },
  places: { tag:'Welcome to Sri Lanka', title:'Discover Sacred Places', subtitle:'From ancient fortresses to misty highlands — wonders are on your doorstep.' },
}

const SI: Translations = {
  nav: { rooms:'කාමර', experiences:'අත්දැකීම්', gallery:'ගැලරිය', location:'ස්ථානය', contact:'සම්බන්ධ වන්න', book:'දැන් වෙන් කරන්න' },
  hero: { tag:'බෙන්ටෝටා · ශ්‍රී ලංකා · ආ. 2009', title1:'නිහඬතාවය', title2:'සාගරය හමුවේ', subtitle:'ශ්‍රී ලංකාවේ රන් වෙරළේ ශ්‍රේෂ්ඨ ශාන්තතාවයේ පහස. ශබ්දයෙන් තොර සුඛෝපභෝගිත්වය.', exploreRooms:'කාමර බලන්න', experiences:'අපගේ අත්දැකීම්', scroll:'රෝල් කරන්න' },
  booking: { checkin:'පැමිණෙන දිනය', checkout:'යන දිනය', guests:'අමුත්තන්', roomType:'කාමර වර්ගය', checkAvail:'ලබා ගත හැකිදැ', guest1:'1 අමුත්තා', guest2:'2 අමුත්තන්', guest3:'3 අමුත්තන්', guest4:'4+ අමුත්තන්', any:'ඕනෑම කාමරයක්', ocean:'සාගර කාමරය', garden:'උද්‍යාන වේදිකාව', beach:'වෙරළ කුටිය' },
  about: { tag:'සෙරෙනෝවා ගැන', title1:'ඉන්දීය', title2:'සාගරයේ', title3:'කාලාතිවර්තී රිදිය', p1:'ඉන්දීය සාගරය සහ බෙන්ටෝටා ගඟ අතර, සෙරෙනෝවා ශ්‍රී ලංකාවේ ඉතාම ගෞරවනීය සුඛෝපභෝගී නිවාසයයි.', p2:'ආයුර්වේද ක්‍රියාවලිවලිත් සිට සූර්යාස්ත ගඟ සංචාරවලිත් දක්වා, සෑම මොහොතකම ඔබේ ආශ්චර්යය නැවත ලබාදේ.', years:'ශ්‍රේෂ්ඨත්වයේ වසර', rooms:'සුඛෝපභෝගී කාමර', restaurants:'ආපනශාලා', rating:'අමුත්තන් ශ්‍රේණිය' },
  rooms: { tag:'නවාතැන් පහසුකම්', title1:'කාමර', title2:'සහ', title3:'සූට්', viewAll:'සියල්ල', perNight:'/ රාත්‍රිය', from:'සිට', popular:'වඩාත් ජනප්‍රිය', new:'නව', featured:'විශේෂිත', suite:{name:'සාගර ක්ෂිතිජ සූට්',type:'විශේෂිත සූට්'}, villa:{name:'නිවර්තන උද්‍යාන වේදිකාව',type:'පෞද්ගලික වේදිකාව'}, cabana:{name:'වෙරළ කුටිය',type:'වෙරළ'} },
  experiences: { tag:'සංකල්පිත අත්දැකීම්', title1:'ශ්‍රී ලංකාවේ', title2:'ආත්මය', title3:'සොයා යන්න', desc:'සෑම අත්දැකීමක්ම ඔබව මෙම ශ්‍රේෂ්ඨ දිවයිනේ ගැඹුරු සම්බන්ධතාවයකට සම්බන්ධ කිරීමට සාවධානව සකස් කර ඇත.', items:[{name:'රළ පැදීම සහ ජල ක්‍රීඩා',desc:'විශේෂඥ උගන්වන්නන් සමඟ බෙන්ටෝටාවේ රළ තරණය කරන්න.'},{name:'ආයුර්වේද ස්පා',desc:'පුරාණ සිලෝන් සුවය — ඖෂධීය තෙල්, වාෂ්ප ස්නාන.'},{name:'සූර්යාස්ත ගඟ සංචාරය',desc:'සන්ධ්‍යාකාලයේ බෙන්ටෝටා ගඟ — කිඹුල්ලන්, දුර්ලභ පක්ෂීන්.'},{name:'ඉවුම් පිහුම් පාඩම',desc:'ශ්‍රී ලාංකික හොපර්, කොත්තු සහ පොල් කරිය ඉගෙන ගන්න.'}] },
  gallery: { tag:'ගැලරිය', title1:'සෙරෙනෝවාවේ', title2:'ජීවිතය', close:'වසන්න' },
  testimonials: { quote:'"සෙරෙනෝවා හුදෙක් හෝටලයක් නොවේ — එය ඔබ ගෙදර රැගෙන යන හැඟීමකි. නොමකා තිබෙනා."', author:'ප්‍රියා සහ රාහුල් මේතා', location:'මුම්බායි, ඉන්දියාව' },
  location: { tag:'අපව සොයා ගන්නේ කෙසේද', title1:'පරිපූර්ණ', title2:'ස්ථානය', title3:'', desc:'කොළඹ සිට 65km දකුණින් — නිර්මල වෙරළ, ගං ජලජ ජීවීන් සහ පුරාතන දේවාලවල සමතුලිතතාවය.', place:'බෙන්ටෝටා, ශ්‍රී ලංකාව', coast:'ඉන්දීය සාගර වෙරළ', directions:'මාර්ග ලබා ගන්න', items:[{title:'බණ්ඩාරනායක ජාත්‍යන්තර ගුවන්තොටුපළ',desc:'ඉක්මන් මාර්ගයෙන් විනාඩි 90 — පෞද්ගලික ගමන් ව්‍යාපාරය'},{title:'බෙන්ටෝටා දුම්රිය ස්ථානය',desc:'විනාඩි 5ක් — ජනප්‍රිය වෙරළ දුම්රිය ගමන'},{title:'අසල ආකර්ෂණ',desc:'ගාලු කොටුව (45 නි), ඇස්වල පැල (15 නි)'}] },
  whatsapp: { title:'පැමිණීමට සූදානම්ද?', desc:'WhatsApp හරහා අප සමඟ වහාම සම්බන්ධ වන්න.', btn:'WhatsApp හරහා කතා කරන්න', number:'+94 75 730 3823' },
  footer: { desc:'ශ්‍රී ලංකාවේ බෙන්ටෝටා වෙරළේ සුඛෝපභෝගී හෝටලය.', quickLinks:'ඉක්මන් සබැඳි', expTitle:'අත්දැකීම්', contactTitle:'සම්බන්ධ කිරීම', copyright:'© 2025 සෙරෙනෝවා රිසෝට්. සියලු හිමිකම් ඇවිරිණි.', links:['අප ගැන','කාමර සහ සූට්','ආහාර','ස්පා','විවාහ'], expLinks:['ජල ක්‍රීඩා','ගඟ සංචාරය','ඉවුම් පාඩම','සංස්කෘතික සංචාර','ආයුර්වේද'] },
  booking_modal: { title:'වෙන් කිරීම සම්පූර්ණ කරන්න', name:'සම්පූර්ණ නම', email:'විද්‍යුත් ලිපිනය', phone:'දුරකථන අංකය', special:'විශේෂ ඉල්ලීම්', submit:'වෙන් කිරීම තහවුරු කරන්න', success:'යවා ඇත!', successMsg:'පැය 24 ඇතුළත ඔබව සම්බන්ධ කරගන්නෙමු.', close:'වසන්න', required:'සියලු ක්ෂේත්‍ර පිරවීමයි' },
  places: { tag:'ශ්‍රී ලංකාවට සාදරයෙන් පිළිගනිමු', title:'ශ්‍රී ලංකාවේ ස්ථාන සොයා යන්න', subtitle:'පුරාතන ශිලා බලකොටු සිට මීදුම් කඳු දක්වා — ශ්‍රේෂ්ඨ ස්ථාන ඔබේ දොරකඩ.' },
}

const TA: Translations = {
  nav: { rooms:'அறைகள்', experiences:'அனுபவங்கள்', gallery:'கேலரி', location:'இடம்', contact:'தொடர்பு', book:'இப்போது முன்பதிவு' },
  hero: { tag:'பெண்டோட்டா · இலங்கை · நி. 2009', title1:'அமைதி', title2:'கடலை சந்திக்கும் இடம்', subtitle:'இலங்கையின் தங்க கரையில் ஒரு அமைதியான சரணாலயம். சத்தமற்ற சொகுசு — கவனத்தை திசை திருப்பாத அழகு.', exploreRooms:'அறைகளை ஆராயுங்கள்', experiences:'எங்கள் அனுபவங்கள்', scroll:'உருட்டுங்கள்' },
  booking: { checkin:'வருகை தேதி', checkout:'புறப்படும் தேதி', guests:'விருந்தினர்கள்', roomType:'அறை வகை', checkAvail:'கிடைக்கும் தன்மை', guest1:'1 விருந்தினர்', guest2:'2 விருந்தினர்கள்', guest3:'3 விருந்தினர்கள்', guest4:'4+ விருந்தினர்கள்', any:'எந்த அறையும்', ocean:'கடல் தொகுப்பு', garden:'தோட்ட வில்லா', beach:'கடலோர குடில்' },
  about: { tag:'செரெனோவா பற்றி', title1:'இந்திய', title2:'கடலில்', title3:'காலத்தால் அழியாத சரணாலயம்', p1:'இந்திய கடல் மற்றும் பெண்டோட்டா நதிக்கு இடையில் அமைந்த செரெனோவா, இலங்கையின் மிகவும் இனிமையான சொகுசு ரிசார்ட்.', p2:'ஆயுர்வேத சிகிச்சைகள் முதல் சூரிய அஸ்தமன நதி சுற்றுலா வரை, ஒவ்வொரு தருணமும் உங்கள் வியப்பை மீட்டெடுக்க.', years:'சிறப்பின் ஆண்டுகள்', rooms:'சொகுசு அறைகள்', restaurants:'உணவகங்கள்', rating:'விருந்தினர் மதிப்பீடு' },
  rooms: { tag:'தங்குமிட வசதிகள்', title1:'அறைகள்', title2:'மற்றும்', title3:'தொகுப்புகள்', viewAll:'அனைத்தையும்', perNight:'/ இரவு', from:'தொடக்கம்', popular:'மிகவும் பிரபலமானது', new:'புதியது', featured:'சிறப்பு தொகுப்பு', suite:{name:'கடல் அடிவானம் தொகுப்பு',type:'சிறப்பு தொகுப்பு'}, villa:{name:'வெப்பமண்டல தோட்ட வில்லா',type:'தனியார் வில்லா'}, cabana:{name:'கடலோர குடில்',type:'கடலோர'} },
  experiences: { tag:'தேர்ந்தெடுக்கப்பட்ட அனுபவங்கள்', title1:'இலங்கையின்', title2:'ஆன்மாவை', title3:'கண்டறியுங்கள்', desc:'ஒவ்வொரு அனுபவமும் இந்த அற்புதமான தீவுடன் ஆழமாக இணைக்க வடிவமைக்கப்பட்டுள்ளது.', items:[{name:'சர்ஃபிங் மற்றும் நீர் விளையாட்டுகள்',desc:'நிபுணர் பயிற்றுவிப்பாளர்களுடன் பெண்டோட்டாவின் அலைகளை வெல்லுங்கள்.'},{name:'ஆயுர்வேத ஸ்பா',desc:'பண்டைய சிலோன் குணப்படுத்தல் — மூலிகை எண்ணெய்கள், ஆவி குளியல்கள்.'},{name:'சூரிய அஸ்தமன நதி சுற்றுலா',desc:'மாலை நேரத்தில் பெண்டோட்டா நதியில் — முதலைகள், பறவைகள்.'},{name:'சமையல் வகுப்பு',desc:'ஹாப்பர்கள், கொட்டு ரொட்டி மற்றும் தேங்காய் கறிகள் கற்றுக்கொள்ளுங்கள்.'}] },
  gallery: { tag:'கேலரி', title1:'செரெனோவாவில்', title2:'வாழ்க்கை', close:'மூடு' },
  testimonials: { quote:'"செரெனோவா வெறும் ஹோட்டல் மட்டுமல்ல — இது ஒரு உணர்வு. ஊழியர்கள், உணவு, கடல் — மறக்க முடியாதது."', author:'ப்ரியா & ராஹுல் மேஹ்தா', location:'மும்பை, இந்தியா' },
  location: { tag:'எங்களை எவ்வாறு கண்டுபிடிப்பது', title1:'சரியான', title2:'இடம்', title3:'', desc:'கொழும்பிலிருந்து 65 கி.மீ தெற்கில் அமைந்த பெண்டோட்டா, தூய கடற்கரைகளும் நதி வனவிலங்குகளும் கொண்டது.', place:'பெண்டோட்டா, இலங்கை', coast:'இந்திய கடல் கரை', directions:'வழிமார்க்கம் பெறுங்கள்', items:[{title:'பண்டாரநாயக்க சர்வதேச விமான நிலையம்',desc:'90 நிமிடங்கள் — தனியார் பரிமாற்றங்கள்'},{title:'பெண்டோட்டா ரயில் நிலையம்',desc:'5 நிமிடங்கள் தொலைவில்'},{title:'அருகிலுள்ள சுற்றுலா இடங்கள்',desc:'காலே கோட்டை (45 நி), ஆமை பண்ணை (15 நி)'}] },
  whatsapp: { title:'வரத் தயாரா?', desc:'WhatsApp மூலம் உடனே எங்களை தொடர்பு கொள்ளுங்கள்.', btn:'WhatsApp-ல் பேசுங்கள்', number:'+94 75 730 3823' },
  footer: { desc:'இலங்கையின் பெண்டோட்டா கரையில் ஒரு சொகுசு கடற்கரை ரிசார்ட்.', quickLinks:'விரைவு இணைப்புகள்', expTitle:'அனுபவங்கள்', contactTitle:'தொடர்பு', copyright:'© 2025 செரெனோவா ரிசார்ட். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.', links:['எங்களைப் பற்றி','அறைகள்','உணவு','ஸ்பா','திருமணங்கள்'], expLinks:['நீர் விளையாட்டுகள்','நதி சுற்றுலா','சமையல் வகுப்பு','கலாச்சார சுற்றுலா','ஆயுர்வேதம்'] },
  booking_modal: { title:'முன்பதிவை முடிக்கவும்', name:'முழு பெயர்', email:'மின்னஞ்சல்', phone:'தொலைபேசி', special:'சிறப்பு வேண்டுகோள்கள்', submit:'முன்பதிவை உறுதிப்படுத்துங்கள்', success:'அனுப்பப்பட்டது!', successMsg:'24 மணி நேரத்திற்குள் தொடர்பு கொள்வோம்.', close:'மூடு', required:'அனைத்து புலங்களையும் நிரப்பவும்' },
  places: { tag:'இலங்கைக்கு வரவேற்கிறோம்', title:'புனித இடங்களை கண்டறியுங்கள்', subtitle:'பண்டைய கோட்டைகள் முதல் மூடுபனி மலைகள் வரை — அதிசயங்கள் உங்கள் வாசலில்.' },
}

const ZH: Translations = {
  nav: { rooms:'客房', experiences:'体验', gallery:'图库', location:'位置', contact:'联系我们', book:'立即预订' },
  hero: { tag:'本托塔 · 斯里兰卡 · 2009年成立', title1:'寂静之处', title2:'与大海相遇', subtitle:'斯里兰卡黄金海岸上的精致静谧圣地。远离喧嚣的奢华——无干扰的美丽。', exploreRooms:'探索客房', experiences:'我们的体验', scroll:'滚动' },
  booking: { checkin:'入住日期', checkout:'退房日期', guests:'宾客', roomType:'房型', checkAvail:'查询空房', guest1:'1位宾客', guest2:'2位宾客', guest3:'3位宾客', guest4:'4位以上宾客', any:'任意房型', ocean:'海景套房', garden:'花园别墅', beach:'海滨小屋' },
  about: { tag:'关于塞雷诺瓦', title1:'印度洋上', title2:'永恒的', title3:'度假胜地', p1:'塞雷诺瓦坐落于印度洋和本托塔河之间，是斯里兰卡最私密的奢华度假胜地。', p2:'从阿育吠陀养生到日落河游，每一刻都为恢复您的惊喜感而精心设计。', years:'卓越年华', rooms:'豪华客房', restaurants:'餐厅', rating:'宾客评分' },
  rooms: { tag:'住宿', title1:'客房', title2:'与', title3:'套房', viewAll:'查看全部', perNight:'/ 晚', from:'起价', popular:'最受欢迎', new:'全新', featured:'精选套房', suite:{name:'海洋地平线套房',type:'精选套房'}, villa:{name:'热带花园别墅',type:'私人别墅'}, cabana:{name:'海滨小屋',type:'海滨'} },
  experiences: { tag:'精选体验', title1:'探索', title2:'斯里兰卡的灵魂', title3:'', desc:'每种体验都精心设计，让您与这座非凡岛屿及其古老节奏深度连接。', items:[{name:'冲浪与水上运动',desc:'与专业教练一起征服本托塔的传奇浪涛，享受摩托艇和皮划艇。'},{name:'阿育吠陀水疗',desc:'古锡兰疗愈——草药精油、蒸汽浴和全身焕活仪式。'},{name:'日落河游',desc:'黄昏时分滑行于本托塔河——鳄鱼、异域鸟类和萤火虫点亮夜晚。'},{name:'烹饪课',desc:'与岛上厨师一起学习传统薄饼、炒饭和椰子咖喱。'}] },
  gallery: { tag:'图库', title1:'塞雷诺瓦的', title2:'生活', close:'关闭' },
  testimonials: { quote:'"塞雷诺瓦不仅仅是一家酒店——它是一种您带回家的感觉。员工、美食、日出时的海洋。绝对难忘。"', author:'Priya & Rahul Mehta', location:'印度孟买' },
  location: { tag:'如何找到我们', title1:'完美的', title2:'位置', title3:'', desc:'位于科伦坡以南65公里，本托塔完美融合了原始海滩、河流野生动物和古老寺庙。', place:'本托塔，斯里兰卡', coast:'印度洋海岸', directions:'获取路线', items:[{title:'班达拉奈克国际机场',desc:'高速公路90分钟 — 可安排私人接送'},{title:'本托塔火车站',desc:'距离5分钟 — 标志性海岸列车之旅'},{title:'附近景点',desc:'加勒古堡(45分钟), 海龟孵化场(15分钟)'}] },
  whatsapp: { title:'准备好到来了吗？', desc:'立即通过WhatsApp与我们联系 — 我们的团队在几分钟内回复。', btn:'WhatsApp聊天', number:'+94 75 730 3823' },
  footer: { desc:'斯里兰卡本托塔海岸的豪华海滨度假村。', quickLinks:'快速链接', expTitle:'体验', contactTitle:'联系我们', copyright:'© 2025 塞雷诺瓦度假村。版权所有。', links:['关于我们','客房与套房','餐饮','水疗','婚礼'], expLinks:['水上运动','河游','烹饪课','文化游','阿育吠陀'] },
  booking_modal: { title:'完成预订', name:'全名', email:'电子邮件地址', phone:'电话号码', special:'特殊要求', submit:'确认预订', success:'预订请求已发送！', successMsg:'我们将在24小时内与您联系确认预订。', close:'关闭', required:'请填写所有必填字段' },
  places: { tag:'欢迎来到斯里兰卡', title:'探索神圣之地', subtitle:'从古老堡垒到雾绕高地——奇迹近在咫尺。' },
}

const FR: Translations = {
  nav: { rooms:'Chambres', experiences:'Expériences', gallery:'Galerie', location:'Localisation', contact:'Contact', book:'Réserver' },
  hero: { tag:'Bentota · Sri Lanka · Fondé 2009', title1:'Où le Silence', title2:'Rencontre la Mer', subtitle:"Un sanctuaire de quiétude raffinée sur la côte dorée du Sri Lanka. Le luxe sans bruit — la beauté sans distraction.", exploreRooms:'Explorer les Chambres', experiences:'Nos Expériences', scroll:'Défiler' },
  booking: { checkin:'Arrivée', checkout:'Départ', guests:'Hôtes', roomType:'Type de Chambre', checkAvail:'Vérifier Disponibilité', guest1:'1 Hôte', guest2:'2 Hôtes', guest3:'3 Hôtes', guest4:'4+ Hôtes', any:'Toute Chambre', ocean:'Suite Océan', garden:'Villa Jardin', beach:'Cabana Plage' },
  about: { tag:'À Propos de Serenova', title1:'Une', title2:'Retraite Intemporelle', title3:"sur l'Océan Indien", p1:"Niché entre l'Océan Indien et la rivière Bentota, Serenova est l'évasion de luxe la plus intime du Sri Lanka.", p2:'Des rituels ayurvédiques aux croisières au coucher du soleil, chaque moment est conçu pour restaurer votre émerveillement.', years:"Années d'Excellence", rooms:'Chambres de Luxe', restaurants:'Restaurants', rating:'Note des Hôtes' },
  rooms: { tag:'Hébergements', title1:'Chambres', title2:'&', title3:'Suites', viewAll:'Voir Tout', perNight:'/ nuit', from:'À partir de', popular:'Le Plus Populaire', new:'Nouveau', featured:'Suite Vedette', suite:{name:'Suite Horizon Océan',type:'Suite Vedette'}, villa:{name:'Villa Jardin Tropical',type:'Villa Privée'}, cabana:{name:'Cabana Balnéaire',type:'Bord de Mer'} },
  experiences: { tag:'Expériences Curatées', title1:"Découvrez l'Âme", title2:'du', title3:'Sri Lanka', desc:"Chaque expérience est soigneusement conçue pour vous connecter profondément à cette île extraordinaire.", items:[{name:'Surf & Sports Nautiques',desc:"Montez les vagues légendaires de Bentota avec des instructeurs experts."},{name:'Spa Ayurvédique',desc:'Guérison ceylanaise ancienne — huiles herbales, bains de vapeur, rituels de rajeunissement.'},{name:'Croisière au Coucher du Soleil',desc:'Glissez sur la rivière Bentota au crépuscule — crocodiles, oiseaux exotiques et lucioles.'},{name:'Cours de Cuisine',desc:'Maîtrisez les hoppers, kottu roti et currys de noix de coco avec nos chefs.'}] },
  gallery: { tag:'Galerie', title1:'La Vie à', title2:'Serenova', close:'Fermer' },
  testimonials: { quote:'"Serenova n\'est pas qu\'un hôtel — c\'est un sentiment que vous emportez chez vous. Le personnel, la nourriture, l\'océan au lever du soleil. Absolument inoubliable."', author:'Priya & Rahul Mehta', location:'Mumbai, Inde' },
  location: { tag:'Comment Nous Trouver', title1:'L\'Emplacement', title2:'Parfait', title3:'', desc:'À 65 km au sud de Colombo, Bentota allie plages immaculées, faune fluviale et temples anciens.', place:'Bentota, Sri Lanka', coast:"Côte de l'Océan Indien", directions:'Obtenir l\'Itinéraire', items:[{title:'Aéroport International Bandaranaike',desc:'90 minutes en voie rapide — transferts privés organisés'},{title:'Gare de Bentota',desc:'À 5 minutes — le trajet côtier en train est iconique'},{title:'Attractions à Proximité',desc:'Fort de Galle (45 min), Couvoir de Tortues (15 min)'}] },
  whatsapp: { title:'Prêt à Arriver?', desc:'Contactez-nous instantanément sur WhatsApp — notre équipe répond en quelques minutes.', btn:'Chatter sur WhatsApp', number:'+94 75 730 3823' },
  footer: { desc:"Un complexe balnéaire de luxe sur la côte de Bentota au Sri Lanka.", quickLinks:'Liens Rapides', expTitle:'Expériences', contactTitle:'Contact', copyright:'© 2025 Serenova Resort. Tous droits réservés.', links:['À Propos','Chambres & Suites','Restauration','Spa','Mariages'], expLinks:['Sports Nautiques','Croisière','Cours de Cuisine','Tours Culturels','Ayurveda'] },
  booking_modal: { title:'Finaliser la Réservation', name:'Nom Complet', email:'Adresse Email', phone:'Numéro de Téléphone', special:'Demandes Spéciales', submit:'Confirmer la Réservation', success:'Demande Envoyée!', successMsg:'Nous vous contacterons dans les 24 heures pour confirmer votre réservation.', close:'Fermer', required:'Veuillez remplir tous les champs obligatoires' },
  places: { tag:'Bienvenue au Sri Lanka', title:'Découvrez des Lieux Sacrés', subtitle:'Des forteresses anciennes aux sommets brumeux — les merveilles sont à votre porte.' },
}

const DE: Translations = {
  nav: { rooms:'Zimmer', experiences:'Erlebnisse', gallery:'Galerie', location:'Lage', contact:'Kontakt', book:'Jetzt Buchen' },
  hero: { tag:'Bentota · Sri Lanka · Gegr. 2009', title1:'Wo die Stille', title2:'das Meer Trifft', subtitle:'Ein Refugium erlesener Einsamkeit an Sri Lankas goldenem Küste. Luxus ohne Lärm — Schönheit ohne Ablenkung.', exploreRooms:'Zimmer Entdecken', experiences:'Unsere Erlebnisse', scroll:'Scrollen' },
  booking: { checkin:'Anreise', checkout:'Abreise', guests:'Gäste', roomType:'Zimmertyp', checkAvail:'Verfügbarkeit Prüfen', guest1:'1 Gast', guest2:'2 Gäste', guest3:'3 Gäste', guest4:'4+ Gäste', any:'Beliebiges Zimmer', ocean:'Ocean Suite', garden:'Gartenvilla', beach:'Strandcabana' },
  about: { tag:'Über Serenova', title1:'Ein', title2:'Zeitloses Refugium', title3:'am Indischen Ozean', p1:'Eingebettet zwischen dem Indischen Ozean und dem Bentota-Fluss ist Serenova Sri Lankas intimstes Luxusrefugium.', p2:'Von Ayurveda-Ritualen bis zu Sonnenuntergangs-Flussfahrten — jeder Moment ist darauf ausgerichtet, Ihr Staunen wiederherzustellen.', years:'Jahre Exzellenz', rooms:'Luxuszimmer', restaurants:'Restaurants', rating:'Gästebewertung' },
  rooms: { tag:'Unterkünfte', title1:'Zimmer', title2:'&', title3:'Suiten', viewAll:'Alle Anzeigen', perNight:'/ Nacht', from:'Ab', popular:'Beliebteste', new:'Neu', featured:'Featured Suite', suite:{name:'Ocean Horizon Suite',type:'Featured Suite'}, villa:{name:'Tropische Gartenvilla',type:'Privatvilla'}, cabana:{name:'Strandcabana',type:'Strandfront'} },
  experiences: { tag:'Kuratierte Erlebnisse', title1:'Entdecken Sie die', title2:'Seele', title3:'Sri Lankas', desc:'Jedes Erlebnis ist sorgfältig gestaltet, um Sie tief mit dieser außergewöhnlichen Insel zu verbinden.', items:[{name:'Surfen & Wassersport',desc:'Reiten Sie die legendären Wellen von Bentota mit Expertentrainern.'},{name:'Ayurveda-Spa',desc:'Altes ceylonesisches Heilen — Kräuteröle, Dampfbäder, Verjüngungsrituale.'},{name:'Sonnenuntergangs-Flussfahrt',desc:'Gleiten Sie in der Abenddämmerung durch den Bentota-Fluss — Krokodile und Glühwürmchen.'},{name:'Kochkurs',desc:'Meistern Sie Hoppers, Kottu Roti und Kokos-Currys mit unseren Köchen.'}] },
  gallery: { tag:'Galerie', title1:'Leben bei', title2:'Serenova', close:'Schließen' },
  testimonials: { quote:'"Serenova ist nicht nur ein Hotel — es ist ein Gefühl, das Sie nach Hause mitnehmen. Das Personal, das Essen, der Ozean bei Sonnenaufgang. Absolut unvergesslich."', author:'Priya & Rahul Mehta', location:'Mumbai, Indien' },
  location: { tag:'So Finden Sie Uns', title1:'Der Perfekte', title2:'Standort', title3:'', desc:'65 km südlich von Colombo gelegen, verbindet Bentota unberührte Strände, Flusswildleben und alte Tempel.', place:'Bentota, Sri Lanka', coast:'Indischer Ozean Küste', directions:'Route Abrufen', items:[{title:'Bandaranaike Internationaler Flughafen',desc:'90 Minuten über die Schnellstraße — private Transfers arrangiert'},{title:'Bahnhof Bentota',desc:'5 Minuten entfernt — die Küstenbahnfahrt ist ikonisch'},{title:'Nahe Attraktionen',desc:'Galle Fort (45 Min), Schildkrötenbrutanstalt (15 Min)'}] },
  whatsapp: { title:'Bereit zur Ankunft?', desc:'Kontaktieren Sie uns sofort über WhatsApp — unser Team antwortet innerhalb von Minuten.', btn:'WhatsApp-Chat', number:'+94 75 730 3823' },
  footer: { desc:'Ein Luxus-Strandresort an Sri Lankas Bentota-Küste.', quickLinks:'Schnelllinks', expTitle:'Erlebnisse', contactTitle:'Kontakt', copyright:'© 2025 Serenova Resort. Alle Rechte vorbehalten.', links:['Über Uns','Zimmer & Suiten','Gastronomie','Spa','Hochzeiten'], expLinks:['Wassersport','Flussfahrt','Kochkurs','Kulturtouren','Ayurveda'] },
  booking_modal: { title:'Buchung Abschließen', name:'Vollständiger Name', email:'E-Mail-Adresse', phone:'Telefonnummer', special:'Besondere Wünsche', submit:'Buchung Bestätigen', success:'Buchungsanfrage Gesendet!', successMsg:'Wir werden uns innerhalb von 24 Stunden bei Ihnen melden.', close:'Schließen', required:'Bitte alle Pflichtfelder ausfüllen' },
  places: { tag:'Willkommen in Sri Lanka', title:'Heilige Orte Entdecken', subtitle:'Von alten Festungen bis zu nebligen Hochländern — Wunder warten vor Ihrer Tür.' },
}

const JA: Translations = {
  nav: { rooms:'客室', experiences:'体験', gallery:'ギャラリー', location:'場所', contact:'お問い合わせ', book:'今すぐ予約' },
  hero: { tag:'ベントタ · スリランカ · 2009年創設', title1:'静寂が', title2:'海と出会う場所', subtitle:'スリランカの黄金の海岸に佇む、洗練された静寂の聖地。喧騒なき贅沢 — 散漫なき美しさ。', exploreRooms:'客室を探る', experiences:'体験を見る', scroll:'スクロール' },
  booking: { checkin:'チェックイン', checkout:'チェックアウト', guests:'ゲスト', roomType:'部屋タイプ', checkAvail:'空室確認', guest1:'1名', guest2:'2名', guest3:'3名', guest4:'4名以上', any:'全室タイプ', ocean:'オーシャンスイート', garden:'ガーデンヴィラ', beach:'ビーチカバナ' },
  about: { tag:'セレノヴァについて', title1:'インド洋の', title2:'永遠の', title3:'リトリート', p1:'インド洋とベントタ川の間に佇むセレノヴァは、スリランカ最高のプライベート高級リゾートです。', p2:'アーユルヴェーダのリチュアルから夕暮れ時の川クルーズまで、すべての瞬間が感動を取り戻すために設計されています。', years:'年の卓越性', rooms:'高級客室', restaurants:'レストラン', rating:'ゲスト評価' },
  rooms: { tag:'宿泊施設', title1:'客室', title2:'と', title3:'スイート', viewAll:'全て見る', perNight:'/ 泊', from:'から', popular:'最人気', new:'新着', featured:'おすすめスイート', suite:{name:'オーシャンホライズンスイート',type:'おすすめスイート'}, villa:{name:'トロピカルガーデンヴィラ',type:'プライベートヴィラ'}, cabana:{name:'ビーチフロントカバナ',type:'ビーチフロント'} },
  experiences: { tag:'厳選された体験', title1:'スリランカの', title2:'魂を', title3:'発見する', desc:'各体験は、この素晴らしい島とその古代のリズムと深くつながるために丁寧に作られています。', items:[{name:'サーフィンとウォータースポーツ',desc:'専門インストラクターと共にベントタの波に乗る。'},{name:'アーユルヴェーダスパ',desc:'古代セイロンの癒し — ハーブオイル、スチームバス、全身若返り。'},{name:'サンセットリバークルーズ',desc:'黄昏時にベントタ川を滑るように進む — ワニ、珍しい鳥、蛍。'},{name:'料理クラス',desc:'島生まれのシェフとホッパー、コットゥロティ、ココナッツカレーを学ぶ。'}] },
  gallery: { tag:'ギャラリー', title1:'セレノヴァでの', title2:'生活', close:'閉じる' },
  testimonials: { quote:'"セレノヴァは単なるホテルではありません — 家に持ち帰る感覚です。スタッフ、料理、日の出の海。絶対に忘れられない。"', author:'Priya & Rahul Mehta', location:'ムンバイ、インド' },
  location: { tag:'アクセス', title1:'完璧な', title2:'ロケーション', title3:'', desc:'コロンボから南65km — 原始的なビーチ、川の野生生物、古代寺院が完璧に調和。', place:'ベントタ、スリランカ', coast:'インド洋沿岸', directions:'ルートを取得', items:[{title:'バンダラナイケ国際空港',desc:'高速道路で90分 — プライベート送迎手配可能'},{title:'ベントタ駅',desc:'5分 — 海岸列車の旅は象徴的'},{title:'近隣観光地',desc:'ガレ・フォート(45分)、ウミガメ孵化場(15分)'}] },
  whatsapp: { title:'到着準備はできていますか？', desc:'WhatsAppで今すぐ私たちに連絡してください。', btn:'WhatsAppでチャット', number:'+94 75 730 3823' },
  footer: { desc:'スリランカ・ベントタ海岸の高級ビーチリゾート。', quickLinks:'クイックリンク', expTitle:'体験', contactTitle:'お問い合わせ', copyright:'© 2025 セレノヴァリゾート。無断複写・転載を禁じます。', links:['私たちについて','客室','ダイニング','スパ','ウェディング'], expLinks:['ウォータースポーツ','川クルーズ','料理クラス','文化ツアー','アーユルヴェーダ'] },
  booking_modal: { title:'予約を完了する', name:'氏名', email:'メールアドレス', phone:'電話番号', special:'特別なご要望', submit:'予約を確認する', success:'予約リクエストを送信しました！', successMsg:'24時間以内にご連絡し、ご予約を確認します。', close:'閉じる', required:'すべての必須フィールドを入力してください' },
  places: { tag:'スリランカへようこそ', title:'聖なる場所を発見する', subtitle:'古代の要塞から霧深い高地まで — 奇跡があなたのすぐそこに。' },
}

const KO: Translations = {
  nav: { rooms:'객실', experiences:'체험', gallery:'갤러리', location:'위치', contact:'연락처', book:'지금 예약' },
  hero: { tag:'벤토타 · 스리랑카 · 2009년 설립', title1:'고요함이', title2:'바다와 만나는 곳', subtitle:'스리랑카 황금 해안의 정제된 고독의 성소. 소음 없는 럭셔리 — 방해 없는 아름다움.', exploreRooms:'객실 둘러보기', experiences:'우리의 체험', scroll:'스크롤' },
  booking: { checkin:'체크인', checkout:'체크아웃', guests:'게스트', roomType:'객실 유형', checkAvail:'가용성 확인', guest1:'1명', guest2:'2명', guest3:'3명', guest4:'4명 이상', any:'모든 객실', ocean:'오션 스위트', garden:'가든 빌라', beach:'비치 카바나' },
  about: { tag:'세레노바 소개', title1:'인도양의', title2:'영원한', title3:'리트릿', p1:'인도양과 벤토타 강 사이에 자리한 세레노바는 스리랑카 최고의 프라이빗 럭셔리 리조트입니다.', p2:'아유르베다 의식부터 일몰 강 크루즈까지, 모든 순간이 경이로움을 되찾도록 설계되었습니다.', years:'년의 탁월함', rooms:'럭셔리 객실', restaurants:'레스토랑', rating:'게스트 평점' },
  rooms: { tag:'숙박 시설', title1:'객실', title2:'&', title3:'스위트', viewAll:'전체 보기', perNight:'/ 박', from:'부터', popular:'가장 인기', new:'신규', featured:'추천 스위트', suite:{name:'오션 호라이즌 스위트',type:'추천 스위트'}, villa:{name:'열대 가든 빌라',type:'프라이빗 빌라'}, cabana:{name:'비치프론트 카바나',type:'비치프론트'} },
  experiences: { tag:'엄선된 체험', title1:'스리랑카의', title2:'영혼을', title3:'발견하다', desc:'각 체험은 이 놀라운 섬과 그 고대 리듬과 깊이 연결되도록 세심하게 제작되었습니다.', items:[{name:'서핑 & 수상 스포츠',desc:'전문 강사와 함께 벤토타의 전설적인 파도를 타세요.'},{name:'아유르베다 스파',desc:'고대 실론 치유 — 약초 오일, 스팀 목욕, 전신 활력 의식.'},{name:'선셋 강 크루즈',desc:'황혼 무렵 벤토타 강을 미끄러지듯 — 악어, 이국적인 새들, 반딧불이.'},{name:'요리 클래스',desc:'원주민 셰프와 함께 호퍼, 코투 로티, 코코넛 카레를 마스터하세요.'}] },
  gallery: { tag:'갤러리', title1:'세레노바에서의', title2:'생활', close:'닫기' },
  testimonials: { quote:'"세레노바는 단순한 호텔이 아닙니다 — 집으로 가져가는 느낌입니다. 직원, 음식, 일출의 바다. 절대 잊을 수 없습니다."', author:'Priya & Rahul Mehta', location:'인도 뭄바이' },
  location: { tag:'찾아오시는 방법', title1:'완벽한', title2:'위치', title3:'', desc:'콜롬보에서 남쪽으로 65km — 원시 해변, 강 야생동물, 고대 사원이 완벽하게 조화를 이룹니다.', place:'벤토타, 스리랑카', coast:'인도양 해안', directions:'길 찾기', items:[{title:'반다라나이케 국제공항',desc:'고속도로로 90분 — 개인 교통편 주선 가능'},{title:'벤토타 기차역',desc:'5분 거리 — 해안 열차 여행은 상징적'},{title:'인근 명소',desc:'갈레 요새(45분), 거북이 부화장(15분)'}] },
  whatsapp: { title:'도착할 준비가 되셨나요?', desc:'WhatsApp으로 즉시 연락하세요 — 몇 분 안에 팀이 응답합니다.', btn:'WhatsApp으로 채팅', number:'+94 75 730 3823' },
  footer: { desc:'스리랑카 벤토타 해안의 럭셔리 해변 리조트.', quickLinks:'빠른 링크', expTitle:'체험', contactTitle:'연락처', copyright:'© 2025 세레노바 리조트. 모든 권리 보유.', links:['소개','객실 & 스위트','다이닝','스파','웨딩'], expLinks:['수상 스포츠','강 크루즈','요리 클래스','문화 투어','아유르베다'] },
  booking_modal: { title:'예약 완료하기', name:'성명', email:'이메일 주소', phone:'전화번호', special:'특별 요청', submit:'예약 확인', success:'예약 요청 전송됨!', successMsg:'24시간 이내에 예약을 확인하기 위해 연락드리겠습니다.', close:'닫기', required:'모든 필수 항목을 입력해주세요' },
  places: { tag:'스리랑카에 오신 것을 환영합니다', title:'성스러운 장소 발견하기', subtitle:'고대 요새에서 안개 낀 고지대까지 — 경이로움이 문 앞에.' },
}

const RU: Translations = {
  nav: { rooms:'Номера', experiences:'Впечатления', gallery:'Галерея', location:'Расположение', contact:'Контакты', book:'Забронировать' },
  hero: { tag:'Бентота · Шри-Ланка · Осн. 2009', title1:'Там, где Тишина', title2:'Встречает Море', subtitle:'Убежище изысканного уединения на золотом берегу Шри-Ланки. Роскошь без шума — красота без отвлечений.', exploreRooms:'Исследовать Номера', experiences:'Наши Впечатления', scroll:'Прокрутить' },
  booking: { checkin:'Заезд', checkout:'Выезд', guests:'Гости', roomType:'Тип номера', checkAvail:'Проверить наличие', guest1:'1 Гость', guest2:'2 Гостя', guest3:'3 Гостя', guest4:'4+ Гостей', any:'Любой номер', ocean:'Океанский люкс', garden:'Садовая вилла', beach:'Пляжная кабана' },
  about: { tag:'О Serenova', title1:'Вневременное', title2:'Убежище', title3:'на берегу Индийского океана', p1:'Расположенный между Индийским океаном и рекой Бентота, Serenova — самый интимный роскошный курорт Шри-Ланки.', p2:'От аюрведических ритуалов до закатных речных круизов — каждый момент призван восстановить ваше чувство удивления.', years:'Лет превосходства', rooms:'Роскошные номера', restaurants:'Ресторанов', rating:'Рейтинг гостей' },
  rooms: { tag:'Размещение', title1:'Номера', title2:'и', title3:'Люксы', viewAll:'Все номера', perNight:'/ ночь', from:'От', popular:'Самый популярный', new:'Новый', featured:'Избранный люкс', suite:{name:'Люкс Ocean Horizon',type:'Избранный люкс'}, villa:{name:'Тропическая садовая вилла',type:'Частная вилла'}, cabana:{name:'Пляжная кабана',type:'На берегу'} },
  experiences: { tag:'Избранные впечатления', title1:'Откройте для себя', title2:'душу', title3:'Шри-Ланки', desc:'Каждый опыт тщательно разработан для глубокой связи с этим удивительным островом.', items:[{name:'Сёрфинг и водный спорт',desc:'Покоряйте легендарные волны Бентоты с опытными инструкторами.'},{name:'Аюрведический спа',desc:'Древнее цейлонское исцеление — травяные масла, паровые ванны, омолаживающие ритуалы.'},{name:'Речной круиз на закате',desc:'Скользите по реке Бентота в сумерках — крокодилы, экзотические птицы и светлячки.'},{name:'Кулинарный класс',desc:'Освойте хопперы, котту роти и карри с кокосом с нашими поварами.'}] },
  gallery: { tag:'Галерея', title1:'Жизнь в', title2:'Serenova', close:'Закрыть' },
  testimonials: { quote:'"Serenova — это не просто отель, это ощущение, которое вы несёте домой. Персонал, еда, океан на рассвете. Абсолютно незабываемо."', author:'Priya & Rahul Mehta', location:'Мумбаи, Индия' },
  location: { tag:'Как нас найти', title1:'Идеальное', title2:'расположение', title3:'', desc:'В 65 км к югу от Коломбо — нетронутые пляжи, речная дикая природа и древние храмы в совершенной гармонии.', place:'Бентота, Шри-Ланка', coast:'Побережье Индийского океана', directions:'Проложить маршрут', items:[{title:'Международный аэропорт Бандаранаике',desc:'90 минут по скоростной трассе — частный трансфер'},{title:'Железнодорожная станция Бентота',desc:'5 минут — иконическая поездка вдоль побережья'},{title:'Достопримечательности поблизости',desc:'Форт Галле (45 мин), питомник черепах (15 мин)'}] },
  whatsapp: { title:'Готовы к приезду?', desc:'Свяжитесь с нами мгновенно в WhatsApp — наша команда ответит в течение нескольких минут.', btn:'Написать в WhatsApp', number:'+94 75 730 3823' },
  footer: { desc:'Роскошный пляжный курорт на побережье Бентота, Шри-Ланка.', quickLinks:'Быстрые ссылки', expTitle:'Впечатления', contactTitle:'Контакты', copyright:'© 2025 Serenova Resort. Все права защищены.', links:['О нас','Номера и люксы','Рестораны','Спа','Свадьбы'], expLinks:['Водный спорт','Речной круиз','Кулинарный класс','Культурные туры','Аюрведа'] },
  booking_modal: { title:'Завершить бронирование', name:'Полное имя', email:'Электронная почта', phone:'Номер телефона', special:'Особые пожелания', submit:'Подтвердить бронирование', success:'Запрос отправлен!', successMsg:'Мы свяжемся с вами в течение 24 часов для подтверждения.', close:'Закрыть', required:'Пожалуйста, заполните все обязательные поля' },
  places: { tag:'Добро пожаловать в Шри-Ланку', title:'Откройте для себя священные места', subtitle:'От древних крепостей до туманных горных вершин — чудеса у вашего порога.' },
}

const ALL: Record<LangCode, Translations> = { en:EN, si:SI, ta:TA, zh:ZH, de:DE, fr:FR, ja:JA, ko:KO, ru:RU }

type LanguageContextType = { lang:LangCode; setLang:(l:LangCode)=>void; t:Translations }
const LanguageContext = createContext<LanguageContextType>({ lang:'en', setLang:()=>{}, t:EN })

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>('en')
  const setLang = useCallback((code: LangCode) => {
    setLangState(code)
    document.documentElement.lang = code
  }, [])
  const t = ALL[lang] ?? EN
  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>
}

export const useLang = () => useContext(LanguageContext)
