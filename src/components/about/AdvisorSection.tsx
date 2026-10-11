import { ProfileAvatar } from "./ProfileAvatar";

interface AdvisorContact {
  label: string;
  value: string;
  href?: string;
}

interface AdvisorSectionProps {
  title: string;
  name: string;
  description: string;
  photo?: string;
  contacts: AdvisorContact[];
}

export function AdvisorSection({ title, name, description, photo, contacts }: AdvisorSectionProps) {
  return (
    <section aria-labelledby="advisor-title">
      <h2 id="advisor-title" className="mb-6 text-3xl font-semibold">{title}</h2>
      <div className="flex flex-col gap-6 rounded-lg border border-white/20 bg-black/50 p-6 sm:flex-row sm:p-8">
        <ProfileAvatar name={name} photo={photo} />
        <div className="min-w-0 flex-1">
          <h3 className="mb-3 text-2xl font-semibold">{name}</h3>
          <p className="mb-5 max-w-2xl leading-relaxed text-white/70">{description}</p>
          <dl className="flex flex-wrap gap-x-10 gap-y-4">
            {contacts.map((contact) => (
              <div key={contact.label} className="min-w-0">
                <dt className="mb-1 text-sm text-white/50">{contact.label}</dt>
                <dd className="break-words">
                  {contact.href ? (
                    <a href={contact.href} className="underline underline-offset-4 hover:text-[var(--amarelo-claro)]">
                      {contact.value}
                    </a>
                  ) : (
                    <span className="text-white/80">{contact.value}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
