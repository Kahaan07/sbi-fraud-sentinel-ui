import { NavLink } from "react-router-dom";
import { Upload, MapPin, Users, FileText, BarChart3, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const navItems = [
    { path: "/", label: "Dashboard", icon: BarChart3 },
    { path: "/upload", label: "Upload CSV", icon: Upload },
    { path: "/location-tracker", label: "Location Tracker", icon: MapPin },
    { path: "/social-tracker", label: "Social Tracker", icon: Users },
    { path: "/manual-entry", label: "Manual Entry", icon: FileText },
  ];

  return (
    <nav className="bg-primary shadow-medium border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-primary-foreground" />
              <div className="text-primary-foreground">
                <h1 className="font-roboto font-bold text-xl">SBI Fraud Sentinel</h1>
                <p className="text-sm text-primary-foreground/80">Financial Fraud Detection System</p>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      "hover:bg-primary-foreground/10",
                      isActive
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "text-primary-foreground/80 hover:text-primary-foreground"
                    )
                  }
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-open-sans">{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;