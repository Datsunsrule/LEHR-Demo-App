import { Lightbulb, Radio, Shield, Camera, Zap, Volume2, Monitor, Package, Bell } from 'lucide-react';

export const equipment = [
  // ──────── LIGHTING ────────
  { id: 'whelen_liberty',       label: 'Whelen Liberty II Lightbar',                    icon: Lightbulb, price: 2450, category: 'Lighting',               overlay: { left: 36, top: 4,  width: 30,  height: 5,   label: 'Lightbar' } },
  { id: 'whelen_legacy',        label: 'Whelen Legacy WeCanX Lightbar',                 icon: Lightbulb, price: 3180, category: 'Lighting',               overlay: { left: 36, top: 4,  width: 30,  height: 5,   label: 'Lightbar' } },
  { id: 'code3_defender',       label: 'Code 3 Defender Lightbar',                      icon: Lightbulb, price: 2280, category: 'Lighting',               overlay: { left: 36, top: 4,  width: 30,  height: 5,   label: 'Lightbar' } },
  { id: 'fedsig_valor',         label: 'Federal Signal Valor Lightbar',                 icon: Lightbulb, price: 2640, category: 'Lighting',               overlay: { left: 36, top: 4,  width: 30,  height: 5,   label: 'Lightbar' } },
  { id: 'soundoff_nforce',      label: 'SoundOff nForce Mini Lightbar',                 icon: Lightbulb, price: 720,  category: 'Lighting',               overlay: { left: 40, top: 5,  width: 20,  height: 4,   label: 'Mini Bar' } },
  { id: 'whelen_inner_edge',    label: 'Whelen Inner Edge RST Front',                   icon: Zap,       price: 890,  category: 'Lighting',               overlay: { left: 33, top: 18, width: 19,  height: 4,   label: 'Inner Edge' } },
  { id: 'whelen_500_tir6',      label: 'Whelen 500 Series TIR6 Super LED (50R03ZCR)',   icon: Zap,       price: 165,  category: 'Lighting',               overlay: { left: 21, top: 50, width: 4,   height: 3,   label: 'LED Light' } },
  { id: 'whelen_900_perimeter', label: 'Whelen 900 Series Surface Mount Perimeter LED', icon: Zap,       price: 220,  category: 'Lighting',               overlay: { left: 36, top: 33, width: 5,   height: 2.5, label: 'Perimeter' } },
  { id: 'whelen_arges',         label: 'Whelen Arges Remote Spotlight (ARGES2)',        icon: Lightbulb, price: 685,  category: 'Lighting',               overlay: { left: 33, top: 25, width: 3,   height: 5,   label: 'Spotlight' } },
  { id: 'whelen_arges_fender',  label: 'Whelen Arges Fender Mount Spotlight (ARGES1)', icon: Lightbulb, price: 620,  category: 'Lighting',               overlay: { left: 33, top: 25, width: 3,   height: 5,   label: 'Spotlight' } },
  { id: 'whelen_traffic_adv',   label: 'Whelen Traffic Advisor TA8',                    icon: Lightbulb, price: 780,  category: 'Lighting',               overlay: { left: 70, top: 50, width: 18,  height: 3,   label: 'Traffic Advisor' } },
  { id: 'whelen_scene',         label: 'Whelen Pioneer Scene Light',                    icon: Lightbulb, price: 540,  category: 'Lighting',               overlay: { left: 84, top: 22, width: 5,   height: 4,   label: 'Scene Light' } },
  { id: 'whelen_beacon',        label: 'Whelen L31 Beacon',                             icon: Lightbulb, price: 240,  category: 'Lighting',               overlay: { left: 48, top: 3,  width: 5,   height: 4,   label: 'Beacon' } },
  { id: 'whelen_compartment',   label: 'Whelen 3" Round Compartment Light (3SC0CDCR)',  icon: Lightbulb, price: 85,   category: 'Lighting' },
  { id: 'whelen_interior_6',    label: 'Whelen 6" Round LED Interior Light 12V',        icon: Lightbulb, price: 110,  category: 'Lighting' },
  { id: 'whelen_interior_8',    label: 'Whelen Interior Light 8" Round (80C00EZR)',     icon: Lightbulb, price: 130,  category: 'Lighting' },
  { id: 'grote_work',           label: 'Grote Trilliant LED Work Light',                icon: Lightbulb, price: 130,  category: 'Lighting',               overlay: { left: 86, top: 24, width: 4,   height: 3,   label: 'Work Light' } },

  // ──────── SIRENS + CONTROLLERS ────────
  { id: 'whelen_cencom',        label: 'Whelen Cencom Core WCX Remote Siren (C399)',    icon: Volume2,   price: 1280, category: 'Sirens + Controllers' },
  { id: 'whelen_alpha',         label: 'Whelen Remote 200W Siren (ALPHASL)',             icon: Volume2,   price: 980,  category: 'Sirens + Controllers' },
  { id: 'whelen_howler',        label: 'Whelen Low Frequency Tone Siren (HOWLER)',       icon: Volume2,   price: 760,  category: 'Sirens + Controllers' },
  { id: 'whelen_295',           label: 'Whelen 295 Series Siren Control (295SLSA6)',     icon: Volume2,   price: 425,  category: 'Sirens + Controllers' },
  { id: 'code3_z3s',            label: 'Code 3 Z3S Matrix Siren (Z3SP-1)',              icon: Volume2,   price: 985,  category: 'Sirens + Controllers' },
  { id: 'fedsig_controller',    label: 'Federal Signal Controller (331105-SB)',          icon: Monitor,   price: 540,  category: 'Sirens + Controllers' },
  { id: 'whelen_speaker_100w',  label: 'Whelen Siren Speaker 100W (SA315P)',             icon: Volume2,   price: 220,  category: 'Sirens + Controllers', overlay: { left: 18, top: 60, width: 5,   height: 5,   label: 'Speaker' } },
  { id: 'code3_speaker',        label: 'Code 3 3900 Series Slimline Speaker (C3900U)',  icon: Volume2,   price: 195,  category: 'Sirens + Controllers', overlay: { left: 18, top: 60, width: 5,   height: 5,   label: 'Speaker' } },
  { id: 'whelen_pcc8r',         label: 'Whelen 8 Position Key Pad & Relay (PCC8R)',     icon: Monitor,   price: 480,  category: 'Sirens + Controllers' },
  { id: 'whelen_pcc10w',        label: 'Whelen Power Control Center 10-Switch (PCC10W)',icon: Monitor,   price: 520,  category: 'Sirens + Controllers' },
  { id: 'whelen_pcc4w',         label: 'Whelen Power Control Center 4-Switch (PCC4W)', icon: Monitor,   price: 310,  category: 'Sirens + Controllers' },
  { id: 'whelen_pccs9rw',       label: 'Whelen 9-Function Slide Switch Box (PCCS9RW)', icon: Monitor,   price: 395,  category: 'Sirens + Controllers' },

  // ──────── VEHICLE EQUIPMENT ────────
  { id: 'setina_partition',     label: 'Setina #10VS Polycarb Partition',               icon: Shield,    price: 1150, category: 'Vehicle Equipment',      overlay: { left: 52, top: 22, width: 1.5, height: 22, label: 'Partition' } },
  { id: 'progard_partition',    label: 'Pro-gard Space Saver Partition',                icon: Shield,    price: 1290, category: 'Vehicle Equipment',      overlay: { left: 52, top: 22, width: 1.5, height: 22, label: 'Partition' } },
  { id: 'setina_pushbar',       label: 'Setina PB400 Push Bumper',                      icon: Package,   price: 680,  category: 'Vehicle Equipment',      overlay: { left: 14, top: 52, width: 11,  height: 28, label: 'Push Bar' } },
  { id: 'gorhino_pushbar',      label: 'Go Rhino RB20 Push Bar w/ Lights',              icon: Package,   price: 1120, category: 'Vehicle Equipment',      overlay: { left: 14, top: 50, width: 11,  height: 30, label: 'Push Bar' } },
  { id: 'troy_mc18',            label: 'Troy Universal 18" Tall-Profile MC Console (CC-MC-18)',    icon: Monitor,   price: 720,  category: 'Vehicle Equipment' },
  { id: 'troy_mc22',            label: 'Troy Universal 22" Tall-Profile MC Console (CC-MC-22)',    icon: Monitor,   price: 845,  category: 'Vehicle Equipment' },
  { id: 'troy_piu20',           label: 'Troy 18" Console 2020-2025 PIU Specific (CC-UV20-L-18)',  icon: Monitor,   price: 780,  category: 'Vehicle Equipment' },
  { id: 'troy_wbos',            label: 'Troy SUV/Truck 20" Wide Body Open Storage Console',       icon: Monitor,   price: 695,  category: 'Vehicle Equipment' },
  { id: 'troy_lockbox',         label: 'Troy 11" External Lidded Lockable Storage Box (AC-FILELOCK)', icon: Package, price: 295, category: 'Vehicle Equipment' },
  { id: 'troy_electronics_tray',label: 'Troy Products Electronics Tray (AC-UV-TRAY-H)',           icon: Package,   price: 185,  category: 'Vehicle Equipment' },
  { id: 'progard_prisoner',     label: 'Pro-gard Polyethylene Prisoner Seat',           icon: Shield,    price: 1380, category: 'Vehicle Equipment' },
  { id: 'setina_window_bars',   label: 'Setina Window Barriers (rear)',                 icon: Shield,    price: 540,  category: 'Vehicle Equipment',      overlay: { left: 62, top: 22, width: 24,  height: 18, label: 'Window Bars' } },
  { id: 'weapon_rack',          label: 'Big Sky Racks Dual Weapon Mount',               icon: Shield,    price: 720,  category: 'Vehicle Equipment' },
  { id: 'setina_door_panels',   label: 'Setina Door Panels (rear pair)',                icon: Package,   price: 460,  category: 'Vehicle Equipment',      overlay: { left: 60, top: 50, width: 18,  height: 22, label: 'Door Panel' } },
  { id: 'setina_floor_pan',     label: 'Setina Rear Floor Pan / Tray',                  icon: Package,   price: 295,  category: 'Vehicle Equipment' },
  { id: 'truckvault',           label: 'TruckVault Rear Storage Drawer',                icon: Package,   price: 1850, category: 'Vehicle Equipment' },

  // ──────── TECHNOLOGY ────────
  { id: 'toughbook_55',         label: 'Panasonic Toughbook 55 Laptop',                 icon: Monitor,   price: 4280, category: 'Technology' },
  { id: 'havis_dock_tb33',      label: 'Havis Power Adapter - Toughbook 33 (LPS-103)',  icon: Monitor,   price: 255,  category: 'Technology' },
  { id: 'havis_dash_mount',     label: 'Havis Heavy Duty Dash Mount 20-24 PI SUV (C-DMM-3015)', icon: Monitor, price: 473, category: 'Technology' },
  { id: 'gj_tb_dock',           label: 'Gamber-Johnson Toughbook 30/31 Docking Station (7160-0318-06)', icon: Monitor, price: 300, category: 'Technology' },
  { id: 'gj_cf33_dock',         label: 'Gamber-Johnson TrimLine Toughbook CF-33 Dock (7300-0196-10)',   icon: Monitor, price: 1329, category: 'Technology' },
  { id: 'gj_piu_mount',         label: 'Gamber-Johnson Ford PIU On-Dash Mount (7160-0878)',             icon: Monitor, price: 367, category: 'Technology' },
  { id: 'gj_mongoose',          label: 'Gamber-Johnson MONGOOSE 9" Locking Slide Arm (7160-0928)',      icon: Monitor, price: 335, category: 'Technology' },
  { id: 'vigilant_alpr',        label: 'Vigilant Solutions L5Q ALPR Camera Kit (VSF-L5Q-S-KIT)',       icon: Camera,  price: 6000, category: 'Technology', overlay: { left: 32, top: 8,  width: 4,   height: 4,   label: 'ALPR' } },
  { id: 'sierra_antenna',       label: 'Sierra Wireless 6-in-1 Sharkfin Antenna',                      icon: Radio,   price: 436,  category: 'Technology', overlay: { left: 55, top: 6,  width: 2.5, height: 8,  label: 'Antenna' } },
  { id: 'motorola_apx',         label: 'Motorola APX 8500 Mobile Radio',                               icon: Radio,   price: 3400, category: 'Technology', overlay: { left: 62, top: 6,  width: 2,   height: 14, label: 'Antenna' } },
  { id: 'watchguard_4re',       label: 'WatchGuard 4RE In-Car Camera',                                 icon: Camera,  price: 1950, category: 'Technology', overlay: { left: 44, top: 16, width: 3,   height: 3,   label: 'Camera' } },
  { id: 'body_cam',             label: 'Motorola V300 Body Camera',                                    icon: Camera,  price: 690,  category: 'Technology' },
  { id: 'havis_multipurpose',   label: 'Havis Multipurpose Bracket - Power Supply (LPS-211)',          icon: Package, price: 38,   category: 'Technology' },

  // ──────── K9 ────────
  { id: 'ace_k9_transport',     label: 'Ace K9 Hot-N-Pop Pro Transport (HP5020)',        icon: Shield,    price: 3850, category: 'K9',                     overlay: { left: 78, top: 26, width: 14,  height: 24, label: 'K9 Insert' } },
  { id: 'ace_heat_alarm',       label: 'Ace K9 Heat Alarm Pro Temp Alert (HA-252FI20)', icon: Bell,      price: 920,  category: 'K9' },
  { id: 'ace_control_head',     label: 'ACE K9 Hot N Pop Pro Replacement Control Head (CH-5020)', icon: Monitor, price: 380, category: 'K9' },
  { id: 'rayallen_f3',          label: 'Ray Allen F3 K9 Deployment & Heat Alert w/ Pager (F3)', icon: Bell, price: 1100, category: 'K9' },
  { id: 'havis_k9_fan_10',      label: 'Havis 10" Fan K9 Transport & Window Guard (K9-A-104)', icon: Zap,  price: 480,  category: 'K9',                     overlay: { left: 82, top: 24, width: 8,   height: 5,  label: 'Window Fan' } },
  { id: 'havis_k9_fan_circ',    label: 'Havis K9 Transport Air Circulation Fan (K9-A-102)',    icon: Zap,  price: 320,  category: 'K9' },
  { id: 'havis_k9_heat_fan',    label: 'Havis K9 Fan Option for Heat Alarm Hot-N-Pop (K9-A-301)', icon: Zap, price: 395, category: 'K9' },

  // ──────── ELECTRICAL ────────
  { id: 'kussmaul_eject',       label: 'Kussmaul Super Auto Eject 20A (091-55-20-120)', icon: Zap,       price: 320,  category: 'Electrical' },
  { id: 'havis_chargeguard',    label: 'Havis ChargeGuard-Select Voltage Protection (CG-X)', icon: Zap,  price: 285,  category: 'Electrical' },
  { id: 'patrol_harness_ex',    label: 'Patrol Power Harness Front Mt. Utility 2020+ (EX0011)', icon: Package, price: 380, category: 'Electrical' },
  { id: 'patrol_harness_tahoe', label: 'Patrol Power Harness Under Hood 21+ Tahoe (TA0021)',   icon: Package, price: 380, category: 'Electrical' },
  { id: 'egis_30a_relay',       label: 'Egis PT Series 30A Time Delay Relay 12VDC (5601B)',    icon: Zap,   price: 95,   category: 'Electrical' },
  { id: 'egis_200a_relay',      label: 'Egis 200A Time Delay Relay TDR Top Hat (6001-3001B)',  icon: Zap,   price: 145,  category: 'Electrical' },
  { id: 'egis_160a_relay',      label: 'Egis 160A Time Delay Relay (7601B)',                   icon: Zap,   price: 120,  category: 'Electrical' },
  { id: 'inverter',             label: 'Xantrex 1500W Inverter',                               icon: Zap,   price: 620,  category: 'Electrical' },
  { id: 'blue_sea_fuse',        label: 'Blue Sea Systems Fuse Block',                          icon: Zap,   price: 145,  category: 'Electrical' },
  { id: 'wire_harness',         label: 'LEHR Custom Wire Harness',                             icon: Package, price: 380, category: 'Electrical' },
];

// Computed once at module load — category order follows first appearance.
export const categories = [...new Set(equipment.map((e) => e.category))];
