import React, {
  useState,
  useEffect,
  useReducer,
  useCallback,
  useContext,
  Dispatch,
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

interface Context {
  state: State;
  dispatch: Dispatch<Action>;
}

const ButtonStart = () => {
  const { state, dispatch } = useContext(StateContext);
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
};

const ButtonStop = () => {
  const { state, dispatch } = useContext(StateContext);
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
};

const ButtonPause = () => {
  const { state, dispatch } = useContext(StateContext);
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
};

const ButtonReset = () => {
  const { state, dispatch } = useContext(StateContext);
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
};

const ButtonLap = () => {
  const { state, dispatch } = useContext(StateContext);
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
};

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

  return { state, dispatch };
}

const StateContext = React.createContext<Context>({
  state: { seconds: 0, laps: [], status: 'Stopped' },
  dispatch: () => null,
});

function App() {
  const { state, dispatch } = useMyCustomHook();

  return (
    <>
      <StateContext.Provider value={{ state, dispatch }}>
        <div className="p-3">
          <div className="flex">
            <ButtonStart />
            <ButtonStop />
            <ButtonPause />
            <ButtonReset />
            <ButtonLap />
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
