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
    <div className="flex bg-purple-100 p-1 rounded-xl border border-gray-200">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onChange(option.id)}
          className={`px-4 py-1.5 text-xs font-bold rounded-lg  transition-all duration-300 cursor-pointer  ${
            view === option.id
              ? "bg-purple-500 text-white shadow-sm"
              : "text-gray-700 hover:text-gray-700 hover:bg-purple-200"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
