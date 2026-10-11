import { ProfileAvatar } from "./ProfileAvatar";

export interface MemberProfile {
  id: string;
  name: string;
  role: string;
  description: string;
  photo?: string;
}

export function MemberCard({ name, role, description, photo }: MemberProfile) {
  return (
    <article className="flex h-full flex-col items-center rounded-lg border border-white/20 bg-black/50 p-6 text-center">
      <ProfileAvatar name={name} photo={photo} />
      <h3 className="mt-5 text-xl font-semibold">{name}</h3>
      <p className="mt-2 text-sm text-[var(--amarelo-claro)]">{role}</p>
      <p className="mt-4 leading-relaxed text-white/70">{description}</p>
    </article>
  );
}
