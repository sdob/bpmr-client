import React from 'react';
import { connect } from "react-redux";

interface Props {
  bpm: number;
  onStartNextTrack: (_: any) => void;
  score: number;
  trueBpm: number;
}

export function Result({ bpm, score, onStartNextTrack, trueBpm }: Props) {
  return (
    <div className="Play">
      <div>
        Your BPM: {bpm.toFixed(2)}
      </div>
      <div>
        True BPM: {trueBpm.toFixed(2)}
      </div>
      <div>
        Score for this round: {Math.round(score)}
      </div>
      <button onClick={onStartNextTrack}>

      </button>
    </div>
  );
}

export default connect()(Result);