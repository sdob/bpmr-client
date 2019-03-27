import React from 'react';

interface Props {
  roundedScore: number;
}

export default function ScoreDisplay({ roundedScore }: Props) {
  return (
    <div className="Result__score-display">
      <div className="Result__rounded-score">
        {roundedScore}
      </div>
      <div>
        point{roundedScore === 1 ? '' : 's'}
      </div>
    </div>
  );
}
