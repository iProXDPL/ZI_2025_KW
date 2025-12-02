import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { BuildingsPage } from "./pages/BuildingsPage";
import { UsersPage } from "./pages/UsersPage";


import { LoginModal } from "./components/LoginModal";
import { RegisterModal } from "./components/RegisterModal";

export function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("Sale");

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleOpenRegister = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  const handleMenuItemClick = (item: string) => {
    setActiveMenuItem(item);
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        activeItem={activeMenuItem}
        onLoginClick={() => setShowLoginModal(true)}
        onMenuItemClick={handleMenuItemClick}
      />

      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {activeMenuItem === "Sale" && (
            <BuildingsPage />
          )}
          {activeMenuItem === "Użytkownicy" && <UsersPage />}
        </div>
      </div>


      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onRegisterClick={handleOpenRegister}
        />
      )}
      {showRegisterModal && (
        <RegisterModal onClose={() => setShowRegisterModal(false)} />
      )}
    </div>
  );
}
