export type PlanoInput = {
  parte: string;
  exercicios: { nome: string; series: string }[];
  horaTreino?: string;
};