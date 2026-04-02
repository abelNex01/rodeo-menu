import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, UserX, UserCheck } from 'lucide-react';
import { userApi } from '../../services/userService';
import { useNotification } from '../../context/AppContext';

const roleColors = {
  admin: 'bg-purple-50 text-purple-700',
  manager: 'bg-blue-50 text-blue-700',
  staff: 'bg-gray-100 text-gray-600',
};

export default function Users() {
  const [users, setUsers] = useState([]);
  const { success } = useNotification();

  useEffect(() => {
    userApi.getAll().then(data => setUsers(data || []));
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    await userApi.update(userId, { role: newRole });
    setUsers(await userApi.getAll());
    success('Role updated');
  };

  const handleToggleActive = async (user) => {
    await userApi.update(user.id, { active: !user.active });
    setUsers(await userApi.getAll());
    success(`${user.name} ${user.active ? 'disabled' : 'enabled'}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Users & Staff</h1>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left">
              <th className="px-4 py-3 text-gray-500 font-medium">User</th>
              <th className="px-4 py-3 text-gray-500 font-medium">Role</th>
              <th className="px-4 py-3 text-gray-500 font-medium">Status</th>
              <th className="px-4 py-3 text-gray-500 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3">
                  <div>
                    <p className="text-gray-900 font-medium">{user.name}</p>
                    <p className="text-gray-400 text-xs">{user.email}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="bg-white border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-gray-600 focus:outline-none focus:border-brand-500 shadow-sm"
                    aria-label={`Change role for ${user.name}`}
                  >
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="staff">Staff</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${user.active ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {user.active ? 'Active' : 'Disabled'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleToggleActive(user)}
                      className={`p-2 rounded-lg transition-colors ${user.active ? 'text-gray-400 hover:text-red-500 hover:bg-red-50' : 'text-gray-400 hover:text-green-600 hover:bg-green-50'}`}
                      aria-label={user.active ? `Disable ${user.name}` : `Enable ${user.name}`}
                    >
                      {user.active ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
