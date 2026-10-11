interface GroupIntroductionProps {
  title: string;
  description: string;
}

export function GroupIntroduction({ title, description }: GroupIntroductionProps) {
  return (
    <section aria-labelledby="about-title">
      <h1 id="about-title" className="mb-6 text-4xl font-bold">{title}</h1>
      <p className="max-w-3xl text-lg leading-relaxed text-white/80">{description}</p>
    </section>
  );
}
