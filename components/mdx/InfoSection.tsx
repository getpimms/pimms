interface InfoSectionProps {
  type?: "info" | "warning" | "tip";
  title?: string;
  children: React.ReactNode;
}

export function InfoSection({ type = "info", title, children }: InfoSectionProps) {
  const styles = {
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      icon: "💡",
      titleColor: "text-blue-900"
    },
    warning: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      icon: "⚠️",
      titleColor: "text-yellow-900"
    },
    tip: {
      bg: "bg-green-50",
      border: "border-green-200",
      icon: "💚",
      titleColor: "text-green-900"
    }
  };

  const style = styles[type];

  return (
    <div className={`${style.bg} ${style.border} border rounded-lg p-4 sm:p-6 my-4 sm:my-6`}>
      {title && (
        <h4 className={`${style.titleColor} font-semibold text-base sm:text-lg mb-2 flex items-center gap-2`}>
          <span className="text-xl sm:text-2xl">{style.icon}</span>
          {title}
        </h4>
      )}
      <div className="text-sm sm:text-base text-gray-700">{children}</div>
    </div>
  );
}
