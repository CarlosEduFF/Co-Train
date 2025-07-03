// utils/mapPlanoToTreino.ts
import { Plano } from '~/types/plan';
import { Treino } from '~/constants/train';
import { ExercicieOptionsImages } from '~/constants/exerciseOptions';

export function mapPlanoToTreino(plano: Treino): Treino {
  const imagemUrl = ExercicieOptionsImages.find(opt => opt.value === plano.parte)?.image || '';
  return {
    ...plano,
    imagemUrl,
  };
}
