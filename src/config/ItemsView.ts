export interface CyborgItem {
  id: string;
  name: string;
  subsystem: 'mechanical' | 'electronics' | 'autonomous' | 'power' | 'pneumatics';
  category: string;
  quantityTotal: number;
  quantityAvailable: number;
  status: 'available' | 'in_use' | 'maintenance' | 'low_stock';
  location: string;
  specification: string;
  image?: string;
  checkedOutBy?: {
    operatorName: string;
    operatorRoll: string;
    quantity: number;
    projectPurpose: string;
    checkedOutAt: string;
    expectedReturnAt: string;
  }[];
}

export const initialCyborgItems: CyborgItem[] = [
  // ELECTRONICS
  {
    id: 'ITEM-E01',
    name: 'STM32 Nucleo H743ZI Development Board',
    subsystem: 'electronics',
    category: 'Microcontrollers',
    quantityTotal: 4,
    quantityAvailable: 2,
    status: 'in_use',
    location: 'Rack E-01 // Bin 4',
    specification: '480MHz ARM Cortex-M7, 2MB Flash, Ethernet PHY',
    checkedOutBy: [
      {
        operatorName: 'Rudra N. Anjiwadekar',
        operatorRoll: '121CR0019',
        quantity: 2,
        projectPurpose: 'CAN Bus Motor Controller Integration for Robocon 2026',
        checkedOutAt: '2026-07-25',
        expectedReturnAt: '2026-08-05'
      }
    ]
  },
  {
    id: 'ITEM-E02',
    name: 'ODrive v3.6 Dual Brushless Motor Driver',
    subsystem: 'electronics',
    category: 'Motor Drivers',
    quantityTotal: 3,
    quantityAvailable: 3,
    status: 'available',
    location: 'Rack E-02 // Bin 1',
    specification: '56V 120A Peak, Dual Axis FOC Controller with CAN',
    checkedOutBy: []
  },
  {
    id: 'ITEM-E03',
    name: 'Teensy 4.1 High-Performance MCU',
    subsystem: 'electronics',
    category: 'Microcontrollers',
    quantityTotal: 6,
    quantityAvailable: 4,
    status: 'in_use',
    location: 'Rack E-01 // Bin 2',
    specification: '600MHz ARM Cortex-M7, SD Card Slot, USB Host',
    checkedOutBy: [
      {
        operatorName: 'Priyanshi S. Mohanty',
        operatorRoll: '122ME0188',
        quantity: 2,
        projectPurpose: 'Pneumatic Valve Array Timing Rig',
        checkedOutAt: '2026-07-27',
        expectedReturnAt: '2026-08-01'
      }
    ]
  },
  {
    id: 'ITEM-E04',
    name: 'Cytron 30A Dual Channel DC Motor Driver',
    subsystem: 'electronics',
    category: 'Motor Drivers',
    quantityTotal: 5,
    quantityAvailable: 5,
    status: 'available',
    location: 'Rack E-02 // Bin 3',
    specification: '7V - 35V, 30A Continuous per channel, PWM interface',
    checkedOutBy: []
  },

  // MECHANICAL
  {
    id: 'ITEM-M01',
    name: 'Precision Aluminum 10:1 Planetary Gearbox',
    subsystem: 'mechanical',
    category: 'Transmission',
    quantityTotal: 4,
    quantityAvailable: 1,
    status: 'in_use',
    location: 'Rack M-03 // Shelf B',
    specification: '7075-T6 Billet Aluminum, Backlash < 5 arcmin',
    checkedOutBy: [
      {
        operatorName: 'Ritik Senapati',
        operatorRoll: '122MM0201',
        quantity: 3,
        projectPurpose: '6-DOF Robotic Arm Elbow Joint Assembly',
        checkedOutAt: '2026-07-20',
        expectedReturnAt: '2026-08-10'
      }
    ]
  },
  {
    id: 'ITEM-M02',
    name: '8-Inch Heavy Duty Mecanum Wheel Set',
    subsystem: 'mechanical',
    category: 'Chassis & Wheels',
    quantityTotal: 2,
    quantityAvailable: 2,
    status: 'available',
    location: 'Storage Locker 02',
    specification: 'Polyurethane Rollers, Aluminum Core, 100kg Load Cap',
    checkedOutBy: []
  },
  {
    id: 'ITEM-M03',
    name: 'NEMA 23 High-Torque Stepper Motor (3.0 Nm)',
    subsystem: 'mechanical',
    category: 'Actuators',
    quantityTotal: 8,
    quantityAvailable: 6,
    status: 'in_use',
    location: 'Rack M-01 // Bin 8',
    specification: '4.2A, 1.8 Deg, Dual Shaft, Bipolar Winding',
    checkedOutBy: [
      {
        operatorName: 'Tanmay K. Biswal',
        operatorRoll: '123EC0089',
        quantity: 2,
        projectPurpose: 'Gantry Calibration Rig',
        checkedOutAt: '2026-07-26',
        expectedReturnAt: '2026-08-02'
      }
    ]
  },
  {
    id: 'ITEM-M04',
    name: 'CNC Machined Carbon Fiber Arm Plates',
    subsystem: 'mechanical',
    category: 'Structural',
    quantityTotal: 12,
    quantityAvailable: 12,
    status: 'available',
    location: 'Rack M-02 // Bin 5',
    specification: '3mm 3K Twill Matte Carbon Fiber Sheet, Pre-drilled',
    checkedOutBy: []
  },

  // AUTONOMOUS & SENSORS
  {
    id: 'ITEM-A01',
    name: 'NVIDIA Jetson Orin Nano 8GB Developer Kit',
    subsystem: 'autonomous',
    category: 'Edge AI Compute',
    quantityTotal: 3,
    quantityAvailable: 1,
    status: 'in_use',
    location: 'Lab Bench 1 // Secure Safe',
    specification: '40 TOPS AI Compute, 1024-core Ampere GPU, 6-core ARM',
    checkedOutBy: [
      {
        operatorName: 'Advait Sidana',
        operatorRoll: '121CS0091',
        quantity: 2,
        projectPurpose: 'YOLOv8 Edge Vision Pipeline for Autonomous Navigation',
        checkedOutAt: '2026-07-22',
        expectedReturnAt: '2026-08-15'
      }
    ]
  },
  {
    id: 'ITEM-A02',
    name: 'RPLiDAR A3 360-Degree Laser Scanner',
    subsystem: 'autonomous',
    category: 'LiDAR Sensors',
    quantityTotal: 2,
    quantityAvailable: 2,
    status: 'available',
    location: 'Lab Bench 1 // Optics Box',
    specification: '25m Range, 16000 Samples/sec, ROS2 Driver Support',
    checkedOutBy: []
  },
  {
    id: 'ITEM-A03',
    name: 'Intel RealSense D435i Stereo Depth Camera',
    subsystem: 'autonomous',
    category: 'Vision Sensors',
    quantityTotal: 3,
    quantityAvailable: 1,
    status: 'in_use',
    location: 'Lab Bench 1 // Optics Box',
    specification: 'RGB-D, Global Shutter, Integrated IMU, USB 3.1',
    checkedOutBy: [
      {
        operatorName: 'Advait Sidana',
        operatorRoll: '121CS0091',
        quantity: 2,
        projectPurpose: 'Pointcloud SLAM Visual Odometry Test',
        checkedOutAt: '2026-07-24',
        expectedReturnAt: '2026-08-08'
      }
    ]
  },

  // POWER
  {
    id: 'ITEM-P01',
    name: '6S 22.2V 5000mAh 100C LiPo Battery Pack',
    subsystem: 'power',
    category: 'Batteries',
    quantityTotal: 6,
    quantityAvailable: 3,
    status: 'in_use',
    location: 'Fireproof Battery Vault // Locker 1',
    specification: 'XT90 Connector, High-Discharge Graphite Anode',
    checkedOutBy: [
      {
        operatorName: 'Alex Mercer',
        operatorRoll: '123CS0452',
        quantity: 3,
        projectPurpose: 'High-Current Drive Endurance Test Run',
        checkedOutAt: '2026-07-28',
        expectedReturnAt: '2026-07-30'
      }
    ]
  },
  {
    id: 'ITEM-P02',
    name: 'ISDT D2 200W Dual Channel Smart Balance Charger',
    subsystem: 'power',
    category: 'Chargers',
    quantityTotal: 2,
    quantityAvailable: 2,
    status: 'available',
    location: 'Power Station Bench',
    specification: '12A Dual Output, Color LCD, Internal Resistance Check',
    checkedOutBy: []
  },

  // PNEUMATICS
  {
    id: 'ITEM-PN01',
    name: 'SMC 5-Port Solenoid Valve Manifold Assembly',
    subsystem: 'pneumatics',
    category: 'Valves',
    quantityTotal: 3,
    quantityAvailable: 1,
    status: 'in_use',
    location: 'Pneumatics Cabinet // Shelf 2',
    specification: '24V DC Coils, 0.8 MPa Working Pressure, Speed Controllers',
    checkedOutBy: [
      {
        operatorName: 'Priyanshi S. Mohanty',
        operatorRoll: '122ME0188',
        quantity: 2,
        projectPurpose: 'Fast-Acting Launcher Cylinder System',
        checkedOutAt: '2026-07-21',
        expectedReturnAt: '2026-08-03'
      }
    ]
  }
];
