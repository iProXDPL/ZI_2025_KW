import { Sidebar } from "./components/Sidebar";
import { BuildingsPage } from "./pages/BuildingsPage";
import { UsersPage } from "./pages/UsersPage";
import { LoginModal } from "./components/LoginModal";
import { RegisterModal } from "./components/RegisterModal";
import { useAppState } from "./hooks/useAppState";

export function App() {
  const { state, toggleSidebar, setMenuItem, openLogin, openRegister, closeModal } = useAppState();

  const handleOpenRegister = () => {
    openRegister();
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      <Sidebar
        isCollapsed={state.isSidebarCollapsed}
        onToggleCollapse={toggleSidebar}
        activeItem={state.activeMenuItem}
        onLoginClick={openLogin}
        onMenuItemClick={setMenuItem}
      />

      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {state.activeMenuItem === "Sale" && (
            <BuildingsPage />
          )}
          {state.activeMenuItem === "Użytkownicy" && <UsersPage />}
        </div>
      </div>

      {state.activeModal === "login" && (
        <LoginModal
          onClose={closeModal}
          onRegisterClick={handleOpenRegister}
        />
      )}
      {state.activeModal === "register" && (
        <RegisterModal onClose={closeModal} />
      )}
    </div>
  );
}
