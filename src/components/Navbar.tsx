import React from 'react';
import { Ticket } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Ticket className="h-6 w-6 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-800">EventPass</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Events</a></li>
            <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">About</a></li>
            <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;