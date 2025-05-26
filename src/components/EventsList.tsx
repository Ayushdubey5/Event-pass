import React from 'react';
import { Calendar } from 'lucide-react';
import { Event } from '../types';

interface EventsListProps {
  events: Event[];
  onSelectEvent: (event: Event) => void;
}

const EventsList: React.FC<EventsListProps> = ({ events, onSelectEvent }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <div 
          key={event.id} 
          className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:shadow-lg hover:-translate-y-1"
        >
          <img 
            src={event.imageUrl} 
            alt={event.title} 
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">{event.title}</h2>
            <p className="text-gray-600 mb-4">{event.description}</p>
            <div className="flex items-center text-gray-500 mb-4">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{event.date}</span>
            </div>
            <button
              onClick={() => onSelectEvent(event)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Get Tickets
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventsList;