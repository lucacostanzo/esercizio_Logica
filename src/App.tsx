import React, { useState } from 'react';
import './App.css';
import 'tailwindcss/tailwind.css';
import classNames from 'classnames';

interface Event {
  type: string; // LAMPADINA_SPENTA O LAMPADINA_ACCESA;
  timestamp: string;
}
const InitialEvent: Event[] = [
  {
    type: 'LAMPADINA_SPENTA',
    timestamp: 'spento',
  },
];

function App() {
  const [events, setEvents] = useState<Event[]>([InitialEvent[0]]);

  function LightON(props: Event[]) {
    console.log(events);
    return (
      <button
        className="bg-green-500 rounded ml-4 p-1"
        onClick={() =>
          setEvents([
            { ...events, timestamp: 'acceso', type: 'LAMPADINA_ACCESA' },
          ])
        }
      >
        Light ON
      </button>
    );
  }

  function LightOFF(props: Event[]) {
    console.log(events);
    return (
      <button
        className="bg-red-500 rounded ml-4 p-1"
        onClick={() =>
          setEvents([
            { ...events, timestamp: 'spento', type: 'LAMPADINA_SPENTA' },
          ])
        }
      >
        Light OFF
      </button>
    );
  }

  function Lamp(props: Event[]) {
    return (
      <div
        className={classNames({
          'bg-yellow-300 text-center p-3': props[0].type == 'LAMPADINA_ACCESA',
          'bg-gray-400 text-center p-3': props[0].type == 'LAMPADINA_SPENTA',
        })}
      >
        Lampadina
      </div>
    );
  }

  return (
    <div className="w-72 p-2 border  ">
      <Lamp {...events} />
      <div className="p-3 ml-6">
        <LightON {...events} />
        <LightOFF {...events} />
      </div>
    </div>
  );
}

export default App;
