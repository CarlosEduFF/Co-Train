export interface Plano {
  notify: boolean;
  id: string;
  parte: string;
  exercicios: Array<{ nome: string; series: string }>;
}