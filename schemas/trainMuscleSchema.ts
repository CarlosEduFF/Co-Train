// schema + tipo
import { z } from "zod";

export const treinoSchema = z.object({
  modo: z.enum(["plano", "grupo"]).default("grupo"),
  parte: z.string().default(""),
  exercicios: z.array(
    z.object({
      nome: z.string().min(1, "Nome obrigatório").or(z.literal("")),
      series: z.string().min(1, "Séries obrigatórias").or(z.literal("")),
      carga: z.string().min(1, "Carga obrigatória").or(z.literal("")),
    })
  ).default([{ nome: "", series: "", carga: "" }]),
  planoTitulo: z.string().default(""),
  planoImagem: z.string().default(""),
  diasDaSemana: z.array(z.string()).default([]),
});

// tipo do form (sem id)
export type TreinoFormData = z.infer<typeof treinoSchema>;

// tipo do Firestore
export interface Treino extends TreinoFormData {
  id: string; // somente no Firestore
}
