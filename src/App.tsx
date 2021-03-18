import React, {
  useState,
  useEffect,
  useReducer,
  useCallback,
  useContext,
} from 'react';
import './App.css';
import 'tailwindcss/tailwind.css';

interface State {
  seconds: number;
  laps: number[];
  status: 'Started' | 'Stopped' | 'Paused';
}

interface Action {
  type: 'Start' | 'Stop' | 'Pause' | 'Reset' | 'Lap' | 'Interval';
  payload?: {};
}

function useMyCustomHook() {
  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case 'Start':
        return {
          ...state,
          status: 'Started',
        };
      case 'Stop':
        return {
          ...state,
          status: 'Stopped',
          seconds: 0,
        };
      case 'Pause':
        return {
          ...state,
          status: 'Paused',
        };
      case 'Reset':
        return {
          seconds: 0,
          laps: [],
          status: 'Stopped',
        };
      case 'Lap':
        return {
          ...state,
          laps: [...state.laps, state.seconds],
          seconds: 0,
        };
      case 'Interval':
        return { ...state, seconds: state.seconds + 1 };
    }
  }

  const InitalState: State = {
    seconds: 0,
    laps: [],
    status: 'Stopped',
  };

  const [state, dispatch] = useReducer(reducer, InitalState);

  const Start = useCallback(() => {
    const startContext = useContext(StateContext);
    return (
      <button
        className="bg-green-500 rounded mr-3 px-3 py-1"
        onClick={() => {
          dispatch({ type: 'Start' });
        }}
      >
        Start
      </button>
    );
  }, []);

  const Stop = useCallback(() => {
    const stopContext = useContext(StateContext);
    return (
      <button
        className="bg-red-500 rounded mr-3 px-3 py-1 "
        onClick={() => {
          dispatch({ type: 'Pause' });
          dispatch({ type: 'Stop' });
        }}
      >
        Stop
      </button>
    );
  }, []);

  const Pause = useCallback(() => {
    const pauseContext = useContext(StateContext);
    return (
      <button
        className="bg-gray-500 rounded mr-3 px-3 py-1 "
        onClick={() => {
          dispatch({ type: 'Pause' });
        }}
      >
        Pause
      </button>
    );
  }, []);

  const Reset = useCallback(() => {
    const resetContext = useContext(StateContext);
    return (
      <button
        className="bg-blue-500 rounded mr-3 px-3 py-1 "
        onClick={() => {
          dispatch({ type: 'Reset' });
        }}
      >
        Reset
      </button>
    );
  }, []);

  const Lap = useCallback(() => {
    const lapContext = useContext(StateContext);
    return (
      <button
        className="bg-pink-500 rounded mr-3 px-3 py-1 "
        onClick={() => {
          let time = state.seconds;
          const newLap = [...state.laps, time];
          dispatch({ type: 'Lap' });
        }}
      >
        Set Lap
      </button>
    );
  }, []);

  useEffect(() => {
    if (state.status == 'Paused') {
      return;
    }

    if (state.status == 'Stopped') {
      return;
    }

    const interval = setInterval(() => {
      console.log(dispatch);
      dispatch({ type: 'Interval' });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [state.status]);

  return { Start, Stop, Pause, Reset, Lap, state };
}
const StateContext = React.createContext<State>({
  seconds: 0,
  laps: [],
  status: 'Stopped',
});

function App() {
  const { Start, Stop, Pause, Reset, Lap, state } = useMyCustomHook();

  return (
    <>
      <StateContext.Provider value={state}>
        <div className="p-3">
          <div className="flex">
            <Start />
            <Stop />
            <Pause />
            <Reset />
            <Lap />
          </div>
          <div>Timer: {state.seconds} secondi</div>
          <div>
            {state.laps.map((lap, index) => (
              <div key={index}>Lap: {lap}</div>
            ))}
          </div>
        </div>
      </StateContext.Provider>
    </>
  );
}

export default App;
