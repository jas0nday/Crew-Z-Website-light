export const CURRENCY_RATES = { USD: 1.0, GBP: 0.79, AUD: 1.54 };
export const CURRENCY_SYMBOLS = { USD: '$', GBP: '\u00a3', AUD: 'A$' };

export const formatPrice = (priceUsd, currency = 'USD') => {
  const rate = CURRENCY_RATES[currency] || 1;
  const symbol = CURRENCY_SYMBOLS[currency] || '$';
  const converted = priceUsd * rate;
  if (converted < 1) return `${symbol}${converted.toFixed(2)}`;
  return `${symbol}${Math.round(converted)}`;
};

export const formatSubscriptionPrice = (priceUsd, currency = 'USD') => {
  const rate = CURRENCY_RATES[currency] || 1;
  const symbol = CURRENCY_SYMBOLS[currency] || '$';
  const converted = priceUsd * rate;
  return `${symbol}${converted.toFixed(2)}`;
};

export const products = [
  {
    slug: 'speed',
    name: 'CrewZ Speed',
    tagline: 'GPS rowing computer in your phone case.',
    shortDesc: 'Dedicated GPS rowing computer performance in a waterproof phone case \u2014 your phone becomes a pro-grade display.',
    description: 'CrewZ Speed transforms your smartphone into the most advanced rowing display on the water. With 25Hz multi-constellation GPS, 200Hz IMU stroke detection, and full Bluetooth connectivity, Speed delivers metrics that dedicated devices charge twice the price for \u2014 all through the phone you already own.',
    price_usd: 200,
    target: 'Scullers, sweep rowers, individual athletes',
    image: 'https://images.pexels.com/photos/1670768/pexels-photo-1670768.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    features: [
      { title: 'GPS Speed & 500m Split', desc: '25Hz multi-constellation GPS for accurate speed and split data at every stroke.', icon: 'Navigation' },
      { title: 'Stroke Rate at 200Hz', desc: 'IMU-based stroke detection \u2014 40x more accurate than traditional 5Hz systems.', icon: 'Activity' },
      { title: 'Distance & Stroke Count', desc: 'Precise GPS distance tracking with cumulative stroke count.', icon: 'MapPin' },
      { title: 'Heart Rate via BLE', desc: 'Pair any Bluetooth Low Energy heart rate belt for live data on screen.', icon: 'Heart' },
      { title: 'Waterproof IP68', desc: 'Designed for capsize survival. Rain, splash, submersion \u2014 CrewZ keeps working.', icon: 'Shield' },
      { title: 'NFC Tap-to-Pair', desc: 'Tap your phone to CrewZ. Connected in under 2 seconds.', icon: 'Zap' },
    ],
    specs: [
      { label: 'GPS Module', value: 'SAM-M10Q, 25Hz, multi-constellation' },
      { label: 'IMU', value: '200Hz stroke detection' },
      { label: 'Connectivity', value: 'Bluetooth 5.0 + NFC' },
      { label: 'Battery', value: '10Ah (12+ hours on water)' },
      { label: 'Waterproofing', value: 'IP68' },
      { label: 'Processor', value: 'nRF52840' },
      { label: 'Firmware Updates', value: 'Over-the-air via BLE' },
      { label: 'Compatibility', value: 'iOS 15+ & Android 11+' },
    ],
    faqs: [
      { q: 'Which phones does CrewZ Speed work with?', a: 'CrewZ Speed is compatible with most modern smartphones running iOS 15+ or Android 11+. The waterproof case accommodates phones up to 6.7" screen size.' },
      { q: 'How accurate is the GPS?', a: 'CrewZ uses a SAM-M10Q multi-constellation GPS receiver running at 25Hz \u2014 five times faster than traditional 5Hz rowing GPS devices.' },
      { q: 'How long does the battery last?', a: 'The 10Ah battery provides 12+ hours of continuous on-water use. Enough for multiple days of training without charging.' },
      { q: 'Is it really waterproof?', a: 'Yes. CrewZ is rated IP68 \u2014 designed to survive full submersion and capsize scenarios.' },
      { q: 'Can I use my existing heart rate belt?', a: 'Yes. CrewZ pairs with any Bluetooth Low Energy (BLE) heart rate belt.' },
    ]
  },
  {
    slug: 'cox',
    name: 'CrewZ Cox',
    tagline: 'GPS computer + amplifier in one device.',
    shortDesc: 'Everything in Speed plus an integrated audio amplifier that drives existing boat speakers directly \u2014 replaces both GPS and CoxBox.',
    description: 'CrewZ Cox is the world\'s first device that combines a GPS rowing computer and a coxswain amplifier in one waterproof unit. Plug into your existing boat speaker harness \u2014 no rewiring required \u2014 and get all the metrics of CrewZ Speed plus crystal-clear audio to drive your crew.',
    price_usd: 250,
    target: 'Coxswains in coxed fours and eights',
    image: 'https://images.pexels.com/photos/1670768/pexels-photo-1670768.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    features: [
      { title: 'All Speed Features', desc: 'Full GPS, stroke rate, heart rate, and all metrics from CrewZ Speed.', icon: 'Gauge' },
      { title: 'Integrated 2-3W Amplifier', desc: 'Drives existing boat speaker harness directly. Clear, powerful audio.', icon: 'Volume2' },
      { title: 'Plug & Play Install', desc: 'Compatible with NK-style wiring harnesses \u2014 no rewiring required.', icon: 'Plug' },
      { title: 'CoxBox Replacement', desc: 'Replaces both the GPS computer and amplifier/speaker system in one device.', icon: 'ArrowLeftRight' },
      { title: 'Waterproof IP68', desc: 'Same capsize-proof design as Speed. Built for the wet seat.', icon: 'Shield' },
      { title: 'NFC Tap-to-Pair', desc: 'Instant Bluetooth pairing via NFC tap.', icon: 'Zap' },
    ],
    specs: [
      { label: 'GPS Module', value: 'SAM-M10Q, 25Hz, multi-constellation' },
      { label: 'IMU', value: '200Hz stroke detection' },
      { label: 'Audio Amplifier', value: '2-3W integrated' },
      { label: 'Speaker Compatibility', value: 'NK-style wiring harness' },
      { label: 'Connectivity', value: 'Bluetooth 5.0 + NFC' },
      { label: 'Battery', value: '10Ah (12+ hours on water)' },
      { label: 'Waterproofing', value: 'IP68' },
      { label: 'Processor', value: 'nRF52840' },
      { label: 'Compatibility', value: 'iOS 15+ & Android 11+' },
    ],
    faqs: [
      { q: 'Will CrewZ Cox work with my boat\'s existing speakers?', a: 'Yes. CrewZ Cox is a plug-in replacement for the CoxBox. Compatible with existing NK-style wiring harnesses \u2014 no rewiring required.' },
      { q: 'How powerful is the amplifier?', a: 'The built-in 2-3W amplifier drives boat speakers directly with clear, powerful audio designed for the acoustic environment of a coxed four or eight.' },
      { q: 'Does it have all the same metrics as Speed?', a: 'Yes. CrewZ Cox includes everything in CrewZ Speed \u2014 GPS speed, 500m split, stroke rate, distance, heart rate, and more.' },
      { q: 'Can I use it without speakers?', a: 'Absolutely. Without speakers plugged in, it functions exactly like CrewZ Speed.' },
    ]
  },
  {
    slug: 'coach',
    name: 'CrewZ Coach',
    tagline: '8 boats. 8 streams. One screen.',
    shortDesc: 'Connects to up to 8 CrewZ units simultaneously. Stream every crew\'s metrics live to your tablet. From $9.99/mo.',
    description: 'CrewZ Coach turns your tablet into a real-time coaching dashboard. Connect to up to 8 CrewZ units on the water simultaneously and see every boat\'s speed, stroke rate, heart rate, and distance on one screen. Session data is logged and downloadable post-session.',
    price_usd: 9.99,
    isSubscription: true,
    subscriptionTiers: [
      { streams: 1, price: 9.99, label: '1 Athlete' },
      { streams: 2, price: 17.99, label: '2 Athletes' },
      { streams: 4, price: 29.99, label: '4 Athletes' },
      { streams: 8, price: 49.99, label: '8 Athletes' },
    ],
    target: 'Rowing coaches on the bank or in a launch',
    image: 'https://images.pexels.com/photos/1670768/pexels-photo-1670768.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    features: [
      { title: 'Multi-Boat Streaming', desc: 'Connect to up to 8 CrewZ units simultaneously via Bluetooth.', icon: 'Radio' },
      { title: 'Live Dashboard', desc: 'See speed, stroke rate, heart rate, and distance for every boat on one screen.', icon: 'LayoutDashboard' },
      { title: 'Session Logging', desc: 'All session data logged automatically and downloadable post-session.', icon: 'Database' },
      { title: 'Tablet Optimised', desc: 'Designed for tablet displays \u2014 see everything at a glance from the launch.', icon: 'Tablet' },
      { title: 'Real-time Alerts', desc: 'Set target zones and receive alerts when crews deviate.', icon: 'Bell' },
      { title: 'CSV Data Export', desc: 'Download full session data for post-session analysis.', icon: 'Download' },
    ],
    specs: [
      { label: 'Connections', value: 'Up to 8 simultaneous CrewZ units' },
      { label: 'Connectivity', value: 'Bluetooth 5.0' },
      { label: 'Live Data', value: 'Speed, stroke rate, HR, distance per boat' },
      { label: 'Session Storage', value: 'Cloud + local' },
      { label: 'Data Export', value: 'CSV download' },
      { label: 'Compatibility', value: 'iOS & Android tablets' },
    ],
    faqs: [
      { q: 'How many boats can I monitor at once?', a: 'CrewZ Coach connects to up to 8 CrewZ units simultaneously. Each unit streams real-time data to your tablet.' },
      { q: 'What Bluetooth range can I expect?', a: 'Bluetooth 5.0 provides reliable connections up to approximately 100 metres in open water conditions.' },
      { q: 'Can I download the session data?', a: 'Yes. All session data is logged and can be downloaded as CSV files for post-session analysis.' },
      { q: 'Do I need separate CrewZ units for each rower?', a: 'Yes. Each rower or cox needs their own CrewZ Speed or Cox unit. Coach connects wirelessly and streams their data to your tablet.' },
    ]
  }
];

export const getProductBySlug = (slug) => products.find(p => p.slug === slug);
