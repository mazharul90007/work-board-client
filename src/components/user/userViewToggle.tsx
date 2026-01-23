interface UserViewToggleProps {
  view: "all" | "admins" | "leaders" | "members";
  onChange: (view: "all" | "admins" | "leaders" | "members") => void;
}

export default function UserViewToggle({
  view,
  onChange,
}: UserViewToggleProps) {
  const options = [
    { id: "all", label: "All Members" },
    { id: "admins", label: "Admins" },
    { id: "leaders", label: "Leaders" },
    { id: "members", label: "Members" },
  ] as const;
  return (
    <div className="flex gap-2 bg-purple-100 dark:bg-purple-200/70 p-1 rounded-xl border border-slate-200 dark:border-slate-600">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onChange(option.id)}
          className={`px-4 py-1.5 text-xs font-bold rounded-lg  transition-all duration-300 cursor-pointer  ${
            view === option.id
              ? "bg-purple-500 dark:bg-purple-700 text-white dark:text-dark-primary shadow-sm"
              : "text-gray-700 dark:text-gray-800 hover:text-gray-700 hover:bg-purple-200"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
