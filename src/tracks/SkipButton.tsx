import React from 'react';
import classnames from 'classnames';

interface Props {
  onClick: (_: any) => void;
  started: boolean;
}

export default function SkipButton({ onClick, started }: Props) {
  return (
    <div style={{ marginTop: '2rem' }}>
      <button
        className={classnames('Button', started && 'Button--disabled Button--hidden')}
        onClick={onClick}
      >
        I don't know this
      </button>
    </div>
  );
}