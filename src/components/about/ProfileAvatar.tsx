import { FaUser } from "react-icons/fa";

interface ProfileAvatarProps {
  name: string;
  photo?: string;
}

export function ProfileAvatar({ name, photo }: ProfileAvatarProps) {
  return (
    <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/5">
      {photo ? (
        <img src={photo} alt={name} className="h-full w-full object-cover" />
      ) : (
        <FaUser size={36} className="text-white/50" aria-hidden="true" />
      )}
    </div>
  );
}
