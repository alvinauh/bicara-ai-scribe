
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  User, 
  LogOut, 
  FileText, 
  Home, 
  Settings, 
  Users, 
  CreditCard,
  BookOpen
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div 
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={() => navigate("/")}
          >
            <div className="bg-bicaraBlue-600 text-white p-2 rounded-md">
              <FileText size={24} />
            </div>
            <h1 className="text-xl font-bold text-bicaraBlue-800">Bicara AI Scribe</h1>
          </div>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center">
                <span className="text-sm text-gray-600 mr-2">
                  {user.name}
                </span>
                {user.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt={user.name} 
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-bicaraBlue-100 flex items-center justify-center">
                    <User size={14} className="text-bicaraBlue-500" />
                  </div>
                )}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => logout()}
              >
                <LogOut size={16} className="mr-2" />
                <span className="hidden md:inline">Logout</span>
              </Button>
            </div>
          ) : (
            <Button onClick={() => navigate("/login")}>
              Sign In
            </Button>
          )}
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex">
        {user && (
          <aside className="w-16 md:w-64 bg-sidebar border-r border-gray-200 h-[calc(100vh-65px)] sticky top-[65px]">
            <nav className="p-4 h-full flex flex-col">
              <div className="space-y-2 flex-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => navigate("/dashboard")}
                >
                  <Home size={20} className="mr-0 md:mr-2" />
                  <span className="hidden md:inline">Dashboard</span>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => navigate("/notes")}
                >
                  <FileText size={20} className="mr-0 md:mr-2" />
                  <span className="hidden md:inline">Notes</span>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => navigate("/practice")}
                >
                  <BookOpen size={20} className="mr-0 md:mr-2" />
                  <span className="hidden md:inline">Practice</span>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => navigate("/pricing")}
                >
                  <CreditCard size={20} className="mr-0 md:mr-2" />
                  <span className="hidden md:inline">Pricing</span>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => navigate("/crm")}
                >
                  <Users size={20} className="mr-0 md:mr-2" />
                  <span className="hidden md:inline">Students</span>
                </Button>
              </div>
              <div>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => navigate("/settings")}
                >
                  <Settings size={20} className="mr-0 md:mr-2" />
                  <span className="hidden md:inline">Settings</span>
                </Button>
              </div>
            </nav>
          </aside>
        )}
        
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
