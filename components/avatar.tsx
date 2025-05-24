interface AvatarProps {
  initials: string;
  index: number;
}

export function Avatar({ initials, index }: AvatarProps) {
  const colors = [
    "bg-[#3970ff]", // First avatar
    "bg-[#3970ff]/80", // Second avatar
    "bg-[#08272E]" // Third avatar
  ];

  return (
    <div
      className={`w-10 h-10 border border-white/20 ${colors[index]} flex items-center justify-center text-white font-semibold text-sm`}
    >
      {initials}
    </div>
  );
}
