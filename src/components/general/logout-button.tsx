import React from "react";
import { useStore } from "@/store/store";
import { useLogoutMutation } from "@/modules/auth/services/auth-queries";
import { Button } from "@/components/ui/button";

interface LogoutButtonProps {
  onLogoutSuccess?: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogoutSuccess }) => {
  const logout = useStore((state) => state.logout);
  const logoutMutation = useLogoutMutation();


  const handleLogout = async () => {
    try {
        logout();
        await logoutMutation.mutateAsync();
        

      if (onLogoutSuccess) {
        onLogoutSuccess();
      }

      console.log("Logged out successfully.");
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  return (
    <Button onClick={handleLogout} className="logout-button">
      Logout
    </Button>
  );
};

export default LogoutButton;
