import React, { useState, useEffect } from 'react';
import './App.css';
import 'tailwindcss/tailwind.css';
import faker from 'faker';
import arrayMove from 'array-move';
import Functions from './Functions';

interface Item {}

function App(props: Item) {
  const [country, setCountry] = useState(
    new Array(10).fill({}).map((list) => faker.address.country()),
  );
  const handleAddClick = () => {
    const newCountry = faker.address.country();
    setCountry([...country, newCountry]);
  };
  const handleRemoveClick = (i: number) => {
    const singleCountry = country[i];
    setCountry(country.filter((list) => singleCountry != list));
  };
  const handleMoveUpClick = (i: number) => {
    const ArrayMoved = arrayMove(country, i - 1, i);
    setCountry(ArrayMoved);
  };
  const handleMoveDownClick = (i: number) => {
    const ArrayMoved = arrayMove(country, i + 1, i);
    setCountry(ArrayMoved);
  };

  return (
    <div>
      {country.map((list, index) => (
        <div className="flex py-1 border">
          <div key={index} className="flex-grow">
            {list}
          </div>
          <Functions
            text="Remove"
            onClick={() => handleRemoveClick(index)}
            style="ml-3 text-sm bg-red-600 pl-2 pr-2 rounded mr-2"
          ></Functions>
          <Functions
            text="Move Up"
            onClick={() => handleMoveUpClick(index)}
            style="ml-3 text-sm bg-gray-400 pl-2 pr-2 rounded mr-2"
          ></Functions>
          <Functions
            text="Move Down"
            onClick={() => handleMoveDownClick(index)}
            style="ml-3 text-sm bg-gray-400 pl-2 pr-2 rounded mr-2"
          ></Functions>
        </div>
      ))}
      <Functions
        text="Add"
        onClick={handleAddClick}
        style="ml-3 text-sm bg-blue-400 pl-3 pr-3 rounded my-5"
      ></Functions>
    </div>
  );
}

export default App;
