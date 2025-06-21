import { z } from 'zod';

export const userSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  dataNascimento: z.string().min(1, "Data de nascimento obrigatória"),
  sexo: z.string().min(1, "Sexo é obrigatório"),
  altura: z.string().min(1, "Altura é obrigatória"),
  peso: z.string().min(1, "Peso é obrigatório"),
  objetivo: z.string().min(1, "Objetivo é obrigatório"),
});

export type UserFormData = z.infer<typeof userSchema>;
