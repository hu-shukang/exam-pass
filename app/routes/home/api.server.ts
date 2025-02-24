import type { Route } from './+types/route';
import { prisma } from '~/.server/utils';

async function loader({}: Route.LoaderArgs) {
  const exams = await prisma.exam.findMany({
    where: { belongs: { some: { exam_set_id: 'ES2022010900001' } } },
    select: {
      id: true,
      question: true,
      analysis: true,
      choices: { select: { tag: true, content: true, is_true_answer: true } },
    },
    orderBy: { id: 'asc' },
  });
  return {
    exams: exams,
  };
}

export const Api = {
  loader,
};
