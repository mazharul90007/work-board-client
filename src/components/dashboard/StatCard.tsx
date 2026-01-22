import { ArrowUpRight } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  footer: string;
  color: string;
  circleColor: string;
}

const StatCard = ({
  title,
  value,
  icon,
  footer,
  color,
  circleColor,
}: StatCardProps) => {
  return (
    <div className="bg-white dark:bg-card-main p-6 rounded-2xl border border-slate-100 dark:border-slate-600 shadow-sm dark:shadow-slate-600 hover:shadow-lg dark:hover:shadow-sm transition-all duration-300 group overflow-hidden relative">
      <div
        className={`absolute -right-8 -top-8 w-24 h-24 ${circleColor} rounded-full opacity-50 group-hover:scale-[10] transition-transform duration-700`}
      />

      <div className="relative flex justify-between items-start">
        <div
          className={`${color} p-4 rounded-2xl text-white shadow-lg dark:shadow-none shadow-purple-100 group-hover:scale-105 transition-transform`}
        >
          {icon}
        </div>
        <ArrowUpRight
          className="text-slate-200 group-hover:text-purple-500 transition-colors"
          size={20}
        />
      </div>

      <div className="relative mt-8">
        <h3 className="text-4xl font-black text-slate-900 dark:text-dark-primary tracking-tighter">
          {value}
        </h3>
        <p className="text-slate-400 dark:text-dark-secondary text-[11px] font-black uppercase tracking-widest mt-1">
          {title}
        </p>

        <div className="mt-4 pt-4 border-t border-slate-50 dark:border-slate-500">
          <p className="text-[11px] font-bold text-slate-500 dark:text-dark-secondary italic">
            {footer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
