

export type DayKey = 'segunda' | 'terca' | 'quarta' | 'quinta' | 'sexta' | 'sabado' | 'domingo';

export const DIAS_SEMANA: { key: DayKey; label: string }[] = [
  
  { key: 'segunda', label: "days.monday" },
  { key: 'terca', label:   "days.tuesday" },
  { key: 'quarta', label:  "days.wednesday"},
  { key: 'quinta', label:  "days.thursday" },
  { key: 'sexta', label:   "days.friday" },
  { key: 'sabado', label:  "days.saturday" },
  { key: 'domingo', label: "days.sunday" },
];