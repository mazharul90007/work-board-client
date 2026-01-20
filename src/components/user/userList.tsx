import { Mail, MoreVertical, ShieldCheck } from "lucide-react";
import { User } from "../../interfaces/user.interface";

const UserList = ({ users }: { users: User[] }) => {
  return (
    <div>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="bg-slate-50/50">
            <tr>
              <th className="py-4 px-6 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Name & Email
              </th>
              <th className="py-4 px-6 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Role
              </th>
              <th className="py-4 px-6 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Member ID
              </th>
              <th className="py-4 px-6 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Joined Date
              </th>
              <th className="py-4 px-6 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Status
              </th>
              <th className="py-4 px-6 text-right text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users?.map((user: User) => (
              <tr
                key={user.id}
                className="hover:bg-slate-50/50 transition-colors group"
              >
                {/* User Info */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-sm shadow-inner">
                      {user.name?.charAt(0) ||
                        user.email.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">
                        {user.name || "Unnamed User"}
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-1">
                        <Mail size={12} /> {user.email}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Role Badge */}
                <td className="py-4 px-6">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-tight ${
                      user.role === "ADMIN"
                        ? "bg-amber-50 text-amber-600 border border-amber-100"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {user.role === "ADMIN" && <ShieldCheck size={12} />}
                    {user.role}
                  </span>
                </td>

                <td className="py-4 px-6 text-sm text-slate-600 font-mono">
                  {user.memberId}
                </td>

                <td className="py-4 px-6 text-sm text-slate-500">
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td className="py-4 px-6 text-sm text-slate-600 font-mono">
                  {user.status}
                </td>

                <td className="py-4 px-6 text-right">
                  <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
