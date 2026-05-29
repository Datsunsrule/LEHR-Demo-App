import { Lightbulb, Radio, Shield, Camera, Zap, Volume2, Monitor, Package, Bell } from 'lucide-react';

export const equipment = [
  // LIGHTING
  { id: 'whelen_liberty',    label: 'Whelen Liberty II Lightbar',               icon: Lightbulb, price: 2450, category: 'Lighting',               overlay: { left: 36, top: 4,  width: 30,  height: 5,   label: 'Lightbar' } },
  { id: 'whelen_legacy',     label: 'Whelen Legacy WeCanX Lightbar',            icon: Lightbulb, price: 3180, category: 'Lighting',               overlay: { left: 36, top: 4,  width: 30,  height: 5,   label: 'Lightbar' } },
  { id: 'code3_defender',    label: 'Code 3 Defender Lightbar',                 icon: Lightbulb, price: 2280, category: 'Lighting',               overlay: { left: 36, top: 4,  width: 30,  height: 5,   label: 'Lightbar' } },
  { id: 'fedsig_valor',      label: 'Federal Signal Valor Lightbar',            icon: Lightbulb, price: 2640, category: 'Lighting',               overlay: { left: 36, top: 4,  width: 30,  height: 5,   label: 'Lightbar' } },
  { id: 'inner_edge',        label: 'Whelen Inner Edge RST Front',              icon: Zap,       price: 890,  category: 'Lighting',               overlay: { left: 33, top: 18, width: 19,  height: 4,   label: 'Inner Edge' } },
  { id: 'ion_duo',           label: 'Whelen ION Duo Surface Mount',             icon: Zap,       price: 165,  category: 'Lighting',               overlay: { left: 21, top: 50, width: 4,   height: 3,   label: 'ION' } },
  { id: 'soundoff_mpower',   label: 'SoundOff mPower Lightheads (pair)',        icon: Zap,       price: 320,  category: 'Lighting',               overlay: { left: 36, top: 33, width: 5,   height: 2.5, label: 'Mirror Lights' } },
  { id: 'traffic_advisor',   label: 'Whelen Traffic Advisor TA8',               icon: Lightbulb, price: 780,  category: 'Lighting',               overlay: { left: 70, top: 50, width: 18,  height: 3,   label: 'Traffic Advisor' } },
  { id: 'spotlight',         label: 'GoLight Stryker LED Spotlight',            icon: Lightbulb, price: 385,  category: 'Lighting',               overlay: { left: 33, top: 25, width: 3,   height: 5,   label: 'Spotlight' } },
  { id: 'scene_light',       label: 'Whelen Pioneer Scene Light',               icon: Lightbulb, price: 540,  category: 'Lighting',               overlay: { left: 84, top: 22, width: 5,   height: 4,   label: 'Scene Light' } },
  { id: 'mini_lightbar',     label: 'SoundOff nForce Mini Lightbar',            icon: Lightbulb, price: 720,  category: 'Lighting',               overlay: { left: 40, top: 5,  width: 20,  height: 4,   label: 'Mini Bar' } },
  { id: 'beacon',            label: 'Whelen L31 Beacon',                        icon: Lightbulb, price: 240,  category: 'Lighting',               overlay: { left: 48, top: 3,  width: 5,   height: 4,   label: 'Beacon' } },
  { id: 'work_light',        label: 'Grote Trilliant LED Work Light',           icon: Lightbulb, price: 130,  category: 'Lighting',               overlay: { left: 86, top: 24, width: 4,   height: 3,   label: 'Work Light' } },
  { id: 'compartment_light', label: 'Whelen Compartment Light Strip',           icon: Lightbulb, price: 85,   category: 'Lighting' },

  // SIRENS + CONTROLLERS
  { id: 'cencom_carbide',    label: 'Whelen Cencom Carbide Siren',              icon: Volume2,   price: 1280, category: 'Sirens + Controllers' },
  { id: 'code3_z3',          label: 'Code 3 Z3 Siren / Light Control',          icon: Volume2,   price: 985,  category: 'Sirens + Controllers' },
  { id: 'fedsig_pa300',      label: 'Federal Signal PA300 Siren',               icon: Volume2,   price: 425,  category: 'Sirens + Controllers' },
  { id: 'speaker_100w',      label: 'Whelen 100W Composite Speaker',            icon: Volume2,   price: 220,  category: 'Sirens + Controllers', overlay: { left: 18, top: 60, width: 5,   height: 5,   label: 'Speaker' } },
  { id: 'k4_switches',       label: 'K4 Switches Console Switch Panel',         icon: Monitor,   price: 480,  category: 'Sirens + Controllers' },

  // VEHICLE EQUIPMENT
  { id: 'setina_partition',  label: 'Setina #10VS Polycarb Partition',          icon: Shield,    price: 1150, category: 'Vehicle Equipment',      overlay: { left: 52, top: 22, width: 1.5, height: 22, label: 'Partition' } },
  { id: 'progard_partition', label: 'Pro-gard Space Saver Partition',           icon: Shield,    price: 1290, category: 'Vehicle Equipment',      overlay: { left: 52, top: 22, width: 1.5, height: 22, label: 'Partition' } },
  { id: 'setina_pushbar',    label: 'Setina PB400 Push Bumper',                 icon: Package,   price: 680,  category: 'Vehicle Equipment',      overlay: { left: 14, top: 52, width: 11,  height: 28, label: 'Push Bar' } },
  { id: 'gorhino_pushbar',   label: 'Go Rhino RB20 Push Bar w/ Lights',         icon: Package,   price: 1120, category: 'Vehicle Equipment',      overlay: { left: 14, top: 50, width: 11,  height: 30, label: 'Push Bar' } },
  { id: 'havis_console',     label: 'Havis C-VS-1612 Vehicle Console',          icon: Monitor,   price: 720,  category: 'Vehicle Equipment' },
  { id: 'gj_console',        label: 'Gamber-Johnson Console Box',               icon: Monitor,   price: 845,  category: 'Vehicle Equipment' },
  { id: 'prisoner_seat',     label: 'Pro-gard Polyethylene Prisoner Seat',      icon: Shield,    price: 1380, category: 'Vehicle Equipment' },
  { id: 'window_bars',       label: 'Setina Window Barriers (rear)',            icon: Shield,    price: 540,  category: 'Vehicle Equipment',      overlay: { left: 62, top: 22, width: 24,  height: 18, label: 'Window Bars' } },
  { id: 'weapon_rack',       label: 'Big Sky Racks Dual Weapon Mount',          icon: Shield,    price: 720,  category: 'Vehicle Equipment' },
  { id: 'gunlock',           label: 'Santa Cruz Gunlocks Handcuff-Style Lock',  icon: Shield,    price: 340,  category: 'Vehicle Equipment' },
  { id: 'floor_pan',         label: 'Setina Rear Floor Pan / Tray',             icon: Package,   price: 295,  category: 'Vehicle Equipment' },
  { id: 'cargo_box',         label: 'TruckVault Rear Storage Drawer',           icon: Package,   price: 1850, category: 'Vehicle Equipment' },
  { id: 'door_panels',       label: 'Setina Door Panels (rear pair)',           icon: Package,   price: 460,  category: 'Vehicle Equipment',      overlay: { left: 60, top: 50, width: 18,  height: 22, label: 'Door Panel' } },

  // TECHNOLOGY
  { id: 'toughbook',         label: 'Panasonic Toughbook 55 Laptop',            icon: Monitor,   price: 4280, category: 'Technology' },
  { id: 'havis_dock',        label: 'Havis Toughbook Docking Station',          icon: Monitor,   price: 680,  category: 'Technology' },
  { id: 'gj_mount',          label: 'Gamber-Johnson Laptop Mount',              icon: Monitor,   price: 540,  category: 'Technology' },
  { id: 'watchguard_4re',    label: 'WatchGuard 4RE In-Car Camera',             icon: Camera,    price: 1950, category: 'Technology',             overlay: { left: 44, top: 16, width: 3,   height: 3,   label: 'Camera' } },
  { id: 'alpr_camera',       label: 'Motorola Vigilant ALPR Camera',            icon: Camera,    price: 7200, category: 'Technology',             overlay: { left: 32, top: 8,  width: 4,   height: 4,   label: 'ALPR' } },
  { id: 'body_cam',          label: 'Motorola V300 Body Camera',                icon: Camera,    price: 690,  category: 'Technology' },
  { id: 'motorola_apx',      label: 'Motorola APX 8500 Mobile Radio',           icon: Radio,     price: 3400, category: 'Technology',             overlay: { left: 62, top: 6,  width: 2,   height: 14, label: 'Antenna' } },
  { id: 'cradlepoint',       label: 'Cradlepoint IBR1700 Modem',                icon: Radio,     price: 1380, category: 'Technology',             overlay: { left: 55, top: 6,  width: 2.5, height: 8,  label: 'Modem Ant.' } },
  { id: 'sierra_modem',      label: 'Sierra Wireless MG90 Router',              icon: Radio,     price: 1620, category: 'Technology' },

  // K9
  { id: 'ace_k9_transport',  label: 'Ace K9 Hot-N-Pop Transport',               icon: Shield,    price: 3850, category: 'K9',                     overlay: { left: 78, top: 26, width: 14,  height: 24, label: 'K9 Insert' } },
  { id: 'ace_heat_alarm',    label: 'Ace K9 Heat Alarm System',                 icon: Bell,      price: 920,  category: 'K9' },
  { id: 'k9_door_popper',    label: 'Ace K9 Remote Door Popper',                icon: Zap,       price: 480,  category: 'K9' },
  { id: 'k9_window_fan',     label: 'K9 Window Drop & Fan System',              icon: Zap,       price: 1180, category: 'K9',                     overlay: { left: 82, top: 24, width: 8,   height: 5,  label: 'Window Fan' } },

  // ELECTRICAL
  { id: 'kussmaul_charger',  label: 'Kussmaul Auto Charge 1200 Battery Charger',icon: Zap,       price: 480,  category: 'Electrical' },
  { id: 'eject_system',      label: 'Kussmaul Super Auto Eject',                icon: Zap,       price: 320,  category: 'Electrical' },
  { id: 'solenoid',          label: 'Cole Hersee Battery Solenoid',             icon: Zap,       price: 95,   category: 'Electrical' },
  { id: 'inverter',          label: 'Xantrex 1500W Inverter',                   icon: Zap,       price: 620,  category: 'Electrical' },
  { id: 'fuse_block',        label: 'Blue Sea Systems Fuse Block',              icon: Zap,       price: 145,  category: 'Electrical' },
  { id: 'wire_harness',      label: 'LEHR Custom Wire Harness',                 icon: Package,   price: 380,  category: 'Electrical' },
];

export const getCategories = () =>
  equipment.reduce((acc, e) => {
    if (!acc.includes(e.category)) acc.push(e.category);
    return acc;
  }, []);
