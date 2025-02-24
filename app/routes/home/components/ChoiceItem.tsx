type Props = {
  tag: string;
  content: string;
  is_true_answer: boolean;
};

export default function ChoiceItem({ tag, content, is_true_answer }: Props) {
  return (
    <div className="flex gap-1 text-gray-800 mb-2">
      <div>{tag}:</div>
      <div>{content}</div>
    </div>
  );
}
