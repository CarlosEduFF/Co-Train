
import { z } from 'zod';

export  const planSchema = z.object({
  parte: z.string().min(1, { message: "Informe o grupo muscular" }),
  horaTreino: z.string().optional(),
  exercicios: z.array(
    z.object({
      nome: z.string().min(1, { message: "Informe o exercício" }),
      series: z.string().min(1, { message: "Informe as séries" }),
    })
  ).min(1, { message: "Adicione pelo menos um exercício." }) // Garante que não esteja vazio
});
