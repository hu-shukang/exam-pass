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
    <div>
      <div>{index}</div>
      <div>{item.question}</div>
      <div>{item.analysis}</div>
      <div>
        {item.choices.map((choice) => (
          <div key={choice.tag}>
            {choice.tag}
            {choice.is_true_answer}
            {choice.content}
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
}
