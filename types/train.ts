export interface Treino {
  id: string; // ← vem do Firestore
  modo: "plano" | "grupo";
  parte: string;
  exercicios: {
    nome: string;
    series: string;
    carga: string;
  }[];
  planoTitulo: string;
  planoImagem?: string; // ← já existe
  diasDaSemana: string[];
}
