import type { Route } from './+types/route';
import { Api } from './api.server';
import ExamItem from './components/ExamItem';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'New React Router App' }, { name: 'description', content: 'Welcome to React Router!' }];
}

export const loader = Api.loader;

export default function Home({ loaderData }: Route.ComponentProps) {
  const exams = loaderData.exams;
  return (
    <div className="p-4">
      {exams.map((exam, index) => (
        <ExamItem key={exam.id} index={index + 1} item={exam} />
      ))}
    </div>
  );
}
