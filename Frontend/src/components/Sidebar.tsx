import React from 'react';
import { CalendarIcon, UsersIcon, ChevronLeftIcon, ChevronRightIcon, LogInIcon } from 'lucide-react';
interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  activeItem: string;
  onLoginClick: () => void;
  onMenuItemClick: (item: string) => void;
}
export function Sidebar({
  isCollapsed,
  onToggleCollapse,
  activeItem,
  onLoginClick,
  onMenuItemClick
}: SidebarProps) {
  const menuItems = [{
    icon: CalendarIcon,
    label: 'Sale'
  }, {
    icon: UsersIcon,
    label: 'Użytkownicy'
  }];
  return <div className={`bg-white border-r border-gray-200 h-screen flex flex-col transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-72'}`}>
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
            <CalendarIcon className="w-6 h-6 text-white" />
          </div>
          {!isCollapsed && <span className="text-lg font-semibold">Rejestracja Sal</span>}
        </div>
      </div>
      <div className="flex-1 p-4">
        {!isCollapsed && <div className="text-sm text-gray-500 mb-4">Menu</div>}
        <nav className="space-y-1">
          {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = item.label === activeItem;
          return <button key={item.label} onClick={() => onMenuItemClick(item.label)} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive ? 'bg-black text-white' : 'hover:bg-gray-100'} ${isCollapsed ? 'justify-center' : ''}`}>
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </button>;
        })}
        </nav>
        <button onClick={onToggleCollapse} className={`mt-8 w-full flex items-center gap-2 py-2 rounded-lg hover:bg-gray-100 transition-colors ${isCollapsed ? 'justify-center' : 'justify-center'}`}>
          {isCollapsed ? <ChevronRightIcon className="w-5 h-5" /> : <ChevronLeftIcon className="w-5 h-5" />}
        </button>
      </div>
      <div className="p-4 border-t border-gray-200">
        <button onClick={onLoginClick} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 ${isCollapsed ? 'justify-center' : ''}`}>
          <LogInIcon className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span>Zaloguj się</span>}
        </button>
      </div>
    </div>;
}