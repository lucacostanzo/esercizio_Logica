import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

interface ButtonProps {
  onClick: () => void;
  text: string;
  style: string;
}

function F(props: ButtonProps) {
  return (
    <div>
      <button onClick={props.onClick} className={props.style}>
        {props.text}
      </button>
    </div>
  );
}

export default F;
