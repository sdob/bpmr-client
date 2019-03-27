import React from 'react';
import { connect } from "react-redux";

interface Props {
  bpm: number;
  onStartNextTrack: (_: any) => void;
  score: number;
  trueBpm: number;
}

export function Result({ bpm, score, onStartNextTrack, trueBpm }: Props) {
  const roundedScore = Math.round(score);
  return (
    <div className="Play">
      <table>
        <tbody>
          <tr>
            <td>Your BPM</td>
            <td>
              {bpm.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td>
              True BPM
            </td>
            <td>
              {trueBpm.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="Result__score-display">
        <div className="Result__rounded-score">
          {roundedScore}
        </div>
        <div>
          point{roundedScore === 1 ? '' : 's'}
        </div>
      </div>
      <button className="Button" onClick={onStartNextTrack}>
        Next song
      </button>
    </div>
  );
}

export default connect()(Result);