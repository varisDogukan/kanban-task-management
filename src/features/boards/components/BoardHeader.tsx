type BoardHeaderProps = {
  title: string;
};

export default function BoardHeader({ title }: BoardHeaderProps) {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
}
