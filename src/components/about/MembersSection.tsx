import { MemberCard } from "./MemberCard";
import type { MemberProfile } from "./MemberCard";

interface MembersSectionProps {
  title: string;
  members: MemberProfile[];
}

export function MembersSection({ title, members }: MembersSectionProps) {
  return (
    <section aria-labelledby="members-title">
      <h2 id="members-title" className="mb-6 text-3xl font-semibold">{title}</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <MemberCard
            key={member.id}
            id={member.id}
            name={member.name}
            role={member.role}
            photo={member.photo}
            description={member.description}
          />
        ))}
      </div>
    </section>
  );
}
