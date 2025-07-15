
import { z } from 'zod';

export const treinoSchema = z.object({
  parte: z.string().min(1, { message: "Informe o grupo muscular" }),
  exercicios: z.array(
    z.object({
      nome: z.string().min(1, { message: "Informe o exercício" }),
      series: z.string().min(1, { message: "Informe as séries" }),
      carga: z.string().min(1, { message: "Informe a carga" }), // Agora cada exercício tem sua própria carga
    })
  ).min(1, { message: "Adicione pelo menos um exercício." }),
});



export type TreinoFormData = z.infer<typeof treinoSchema>;
