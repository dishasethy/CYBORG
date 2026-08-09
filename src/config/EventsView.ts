import { Event } from '../types';
import eventsData from '../utils/events_details.json';

export interface ArchiveEvent {
  id: string;
  label: string;
  code: string;
}

export const activeEvents: Event[] = eventsData.events.map((evt, idx) => {
  // Normalize date format from "2025-11-7" to e.g. "NOV_07"
  const dateObj = new Date(evt.date);
  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const formattedMonth = monthNames[dateObj.getMonth()] || "NOV";
  const formattedDay = String(dateObj.getDate()).padStart(2, '0');
  const formattedDate = `${formattedMonth}_${formattedDay}`;

  const tags = ["High Risk", "Technical", "Creative", "Autonomous"];
  const riskLevels = ["high", "medium", "creative", "autonomous"] as const;
  const venues = ["", "", "", ""];

  return {
    id: evt.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    title: evt.name,
    phase: `PHASE_${String(idx + 1).padStart(2, '0')}`,
    tag: tags[idx % tags.length],
    date: formattedDate,
    venue: venues[idx % venues.length],
    description: evt.body,
    image: evt.image,
    riskLevel: riskLevels[idx % riskLevels.length],
    ps: evt.ps
  };
});

export const archiveEvents: ArchiveEvent[] = [
  { id: 'arc-1', label: 'FLIPKART GRID 4.0 FINALS', code: 'Q4_2023_DATALINK' },
  { id: 'arc-2', label: 'E-YANTRA CHALLENGE', code: 'Q3_2023_DATALINK' },
  { id: 'arc-3', label: 'DRDO DRONE FEST', code: 'Q2_2023_DATALINK' },
  { id: 'arc-4', label: 'INTERNAL HACKATHON V1', code: 'Q1_2023_DATALINK' }
];
