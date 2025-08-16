import { DayKey } from './diasSemana';

export interface Treino {
  id: string;
  parte: string; // Grupo muscular
  imagemUrl: string; // URL da imagem do grupo
  exercicios: Array<{ nome: string; series: string }>;
  diasDaSemana?: DayKey[]; // <<< adiciona campo opcional
}
