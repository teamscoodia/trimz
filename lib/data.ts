// lib/data.ts
export type EmployeeId = 'pervaiz' | 'fayyaz' | 'jessica' | 'francis';

export interface Employee {
  id: EmployeeId;
  name: string;
  role: string;
  type: 'Male' | 'Gay';
  image: string;
}

export interface Service {
  id: string;
  name: string;
  for: 'Male' | 'Gay';
  price: number;
  durationMins: number;
  description: string;
  employees: EmployeeId[];
}

export interface TimeSlot {
  id: string;
  employeeId: EmployeeId;
  start: string; // "HH:MM"
  end: string;
  booked: boolean;
  clientName?: string;
  serviceId?: string;
  amount?: number;
}

export const employees: Employee[] = [
  { id: 'pervaiz', name: 'Pervaiz', role: 'Senior Barber', type: 'Male', image: '/staff/pervaiz.jpg', },
  { id: 'fayyaz', name: 'Fayyaz', role: 'Senior Barber', type: 'Male', image: '/staff/fayyaz.jpg', },
  { id: 'jessica', name: 'Jessica', role: 'Spa & Care Expert', type: 'Gay', image: '/staff/jessica.jpg', },
  { id: 'francis', name: 'Francis', role: 'Spa & Care Expert', type: 'Gay', image: '/staff/francis.jpg',}, 
];

export const services: Service[] = [
  {
    id: 'cutting',
    name: 'Classic Hair Cutting',
    for: 'Male',
    price: 40,
    durationMins: 30,
    description: 'Precision gents haircut with clean finishing and styling.',
    employees: ['pervaiz', 'fayyaz'],
  },
  {
    id: 'shaving',
    name: 'Hot Towel Shaving',
    for: 'Male',
    price: 30,
    durationMins: 25,
    description: 'Traditional shave with hot towel and skin protection.',
    employees: ['pervaiz', 'fayyaz'],
  },
  {
    id: 'hair-color',
    name: 'Hair Color',
    for: 'Male',
    price: 90,
    durationMins: 60,
    description: 'Full hair color or touch-up with finish styling.',
    employees: ['fayyaz'],
  },
  {
    id: 'facial',
    name: 'Gents Facial (Fishal)',
    for: 'Male',
    price: 70,
    durationMins: 45,
    description: 'Deep cleansing facial to refresh and brighten skin.',
    employees: ['pervaiz', 'fayyaz'],
  },
  {
    id: 'undershave',
    name: 'Undershave',
    for: 'Gay',
    price: 50,
    durationMins: 30,
    description: 'Clean and precise undershave with skin care finish.',
    employees: ['jessica', 'francis'],
  },
  {
    id: 'massage',
    name: 'Relax Body Massage',
    for: 'Gay',
    price: 120,
    durationMins: 60,
    description: 'Full body relaxing massage to release tension.',
    employees: ['jessica', 'francis'],
  },
  {
    id: 'mani-pedi',
    name: 'Manicure & Pedicure',
    for: 'Gay',
    price: 80,
    durationMins: 60,
    description: 'Hand and foot grooming with cuticle care and polish.',
    employees: ['jessica', 'francis'],
  },
];

// Sample “today” schedule for static UI
export const todaysSlots: TimeSlot[] = [
  // Pervaiz
  {
    id: 'p-10',
    employeeId: 'pervaiz',
    start: '10:00',
    end: '10:30',
    booked: true,
    clientName: 'Ahmed',
    serviceId: 'cutting',
    amount: 40,
  },
  {
    id: 'p-1030',
    employeeId: 'pervaiz',
    start: '10:30',
    end: '11:00',
    booked: false,
  },
  {
    id: 'p-11',
    employeeId: 'pervaiz',
    start: '11:00',
    end: '11:30',
    booked: true,
    clientName: 'Bilal',
    serviceId: 'shaving',
    amount: 30,
  },
  {
    id: 'p-1130',
    employeeId: 'pervaiz',
    start: '11:30',
    end: '12:00',
    booked: false,
  },

  // Fayyaz
  {
    id: 'f-10',
    employeeId: 'fayyaz',
    start: '10:00',
    end: '11:00',
    booked: true,
    clientName: 'Omar',
    serviceId: 'hair-color',
    amount: 90,
  },
  {
    id: 'f-11',
    employeeId: 'fayyaz',
    start: '11:00',
    end: '11:30',
    booked: true,
    clientName: 'Usman',
    serviceId: 'cutting',
    amount: 40,
  },
  {
    id: 'f-1130',
    employeeId: 'fayyaz',
    start: '11:30',
    end: '12:00',
    booked: false,
  },

  // Jessica
  {
    id: 'j-10',
    employeeId: 'jessica',
    start: '10:00',
    end: '10:30',
    booked: true,
    clientName: 'Khalid',
    serviceId: 'undershave',
    amount: 50,
  },
  {
    id: 'j-1030',
    employeeId: 'jessica',
    start: '10:30',
    end: '11:30',
    booked: true,
    clientName: 'Faisal',
    serviceId: 'massage',
    amount: 120,
  },
  {
    id: 'j-1130',
    employeeId: 'jessica',
    start: '11:30',
    end: '12:00',
    booked: false,
  },

  // Francis
  {
    id: 'fr-10',
    employeeId: 'francis',
    start: '10:00',
    end: '11:00',
    booked: false,
  },
  {
    id: 'fr-11',
    employeeId: 'francis',
    start: '11:00',
    end: '12:00',
    booked: true,
    clientName: 'Saeed',
    serviceId: 'mani-pedi',
    amount: 80,
  },
];
