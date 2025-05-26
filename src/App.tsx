import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EventsList from './components/EventsList';
import AuthModal from './components/AuthModal';
import { Event } from './types';

function App() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Dummy events list - replace with your actual fetched event list
  const events: Event[] = [
    {
      id: 1,
      title: 'Tech Conference 2025',
      description: 'Join industry leaders for a day of innovation and networking',
      date: 'May 15, 2025',
      ticketUrl: 'https://example.com/tickets/1',
      imageUrl: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 2,
      title: 'Music Festival',
      description: 'Experience the best local and international artists',
      date: 'June 22, 2025',
      ticketUrl: 'https://example.com/tickets/2',
      imageUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 3,
      title: 'Design Workshop',
      description: 'Learn the latest design techniques and tools',
      date: 'July 8, 2025',
      ticketUrl: 'https://example.com/tickets/3',
      imageUrl: 'https://images.pexels.com/photos/7256897/pexels-photo-7256897.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Toaster position="top-right" />
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Upcoming Events</h1>
        <EventsList 
          events={events} 
          onSelectEvent={setSelectedEvent} 
        />
      </main>

      <Footer />
      
      {selectedEvent && (
        <AuthModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}
    </div>
  );
}

export default App;