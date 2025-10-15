import React, { useState } from "react";
import { Home, Layers, History, Calendar, Info, Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { name: "Home", icon: <Home size={20} />, path: "/" },
    { name: "Multiroom", icon: <Layers size={20} />, path: "/multiroom" },
    { name: "Histori Live", icon: <History size={20} />, path: "/history" },
    { name: "Jadwal", icon: <Calendar size={20} />, path: "/schedule" },
    { name: "About", icon: <Info size={20} />, path: "/about" },
  ];

  return (
    <>
      {/* Sidebar desktop */}
      <div className="hidden md:flex flex-col w-60 bg-gray-800 p-4">
        <h1 className="text-xl font-bold mb-6 text-center">Showroom Log</h1>
        <nav className="flex flex-col gap-3">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition"
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Sidebar mobile */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-gray-800 border-t border-gray-700 flex justify-around py-2 z-50">
        {menuItems.map((item) => (
          <Link key={item.name} to={item.path} className="flex flex-col items-center text-sm">
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
