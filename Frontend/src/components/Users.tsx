import React, { useState } from 'react';
import { SearchIcon, MailIcon, CalendarIcon, ShieldIcon } from 'lucide-react';
interface User {
  id: number;
  name: string;
  email: string;
}
export function Users() {
  const [searchQuery, setSearchQuery] = useState('');
  const users: User[] = [{
    id: 1,
    name: 'Jan Kowalski',
    email: 'jan.kowalski@example.com'
  }, {
    id: 2,
    name: 'Anna Nowak',
    email: 'anna.nowak@example.com'
  }, {
    id: 3,
    name: 'Piotr Wiśniewski',
    email: 'piotr.wisniewski@example.com'
  }];
  const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase()));
  return <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Użytkownicy</h1>
        <p className="text-gray-600">
          Lista wszystkich użytkowników w systemie
        </p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Szukaj użytkownika..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Użytkownik
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map(user => <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900">
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MailIcon className="w-4 h-4" />
                      <span className="text-sm">{user.email}</span>
                    </div>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
        {filteredUsers.length === 0 && <div className="p-8 text-center text-gray-500">
            Nie znaleziono użytkowników
          </div>}
      </div>
    </div>;
}