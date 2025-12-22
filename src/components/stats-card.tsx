import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  description?: string;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  description,
}: StatsCardProps) {
  return (
    <div
      className={`rounded-lg bg-purple-100 border border-purple-500 shadow-sm`}
    >
      <div className="p-6 flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-600">{title}</h3>
        <Icon className="h-6 w-6 text-gray-500" />
      </div>
      <div className="px-6 pb-6">
        <div className="text-4xl font-bold text-gray-900">{value}</div>
        {description && (
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        )}
      </div>
    </div>
  );
}
