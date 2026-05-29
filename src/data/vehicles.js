const base = import.meta.env.BASE_URL;
const a = (name) => `${base}assets/${name}`;

export const vehicles = [
  {
    id: 'explorer',
    name: 'Ford Explorer',
    sub: 'Police Interceptor Utility',
    year: '2024',
    available: true,
    paintOptions: [
      { id: 'white',   label: 'All White',  image: a('explorer-white.jpg'),   desc: 'Classic patrol' },
      { id: 'twotone', label: 'Two-Tone',   image: a('explorer-twotone.jpg'), desc: 'Black & white' },
      { id: 'black',   label: 'Blackout',   image: a('explorer-black.jpg'),   desc: 'Stealth / unmarked' },
    ],
  },
  {
    id: 'tahoe',
    name: 'Chevrolet Tahoe',
    sub: 'PPV Pursuit',
    year: '2024',
    available: true,
    paintOptions: [
      { id: 'white', label: 'All White', image: a('tahoe-white.jpg'), desc: 'Public safety / patrol' },
    ],
  },
  {
    id: 'durango',
    name: 'Dodge Durango',
    sub: 'Pursuit AWD',
    year: '2024',
    available: true,
    paintOptions: [
      { id: 'white', label: 'All White', image: a('durango-white.jpg'), desc: 'Public safety / patrol' },
    ],
  },
  {
    id: 'f150',
    name: 'Ford F-150',
    sub: 'Police Responder',
    year: '2024',
    available: true,
    paintOptions: [
      { id: 'white', label: 'All White', image: a('f150-white.jpg'), desc: 'Public safety / patrol' },
    ],
  },
  {
    id: 'silverado',
    name: 'Chevrolet Silverado',
    sub: 'SSV Special Service',
    year: '2024',
    available: true,
    paintOptions: [
      { id: 'white', label: 'All White', image: a('silverado-white.jpg'), desc: 'Public safety / patrol' },
    ],
  },
  {
    id: 'charger',
    name: 'Dodge Charger',
    sub: 'Pursuit (legacy)',
    year: '2023',
    available: true,
    paintOptions: [
      { id: 'white', label: 'All White', image: a('charger-white.jpg'), desc: 'Public safety / patrol' },
    ],
  },
];
