import ChoiceItem from './ChoiceItem';

type Props = {
  index: number;
  item: {
    id: string;
    question: string;
    analysis: string;
    choices: {
      tag: string;
      content: string;
      is_true_answer: boolean;
    }[];
  };
};

export default function ExamItem({ index, item }: Props) {
  return (
    <div className="flex gap-1 mb-4">
      <div className="w-[20px]">{index}</div>
      <div className="flex-1">
        <div className="font-semibold mb-3">{item.question}</div>
        <div>
          {item.choices.map((choice) => (
            <ChoiceItem key={choice.tag} {...choice} />
          ))}
        </div>
        <div className="font-semibold mb-3">正解: {item.choices.filter((c) => c.is_true_answer).map((c) => c.tag)}</div>
        <div className="border rounded p-2 text-[14px]">
          <div className="mb-1 font-semibold">解析:</div>
          <div>{item.analysis}</div>
        </div>
      </div>
    </div>
  );
}
