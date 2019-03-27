import React from 'react';
import { connect } from "react-redux";
import { Track } from "../types";
import SpotifyPlayWidget from "../SpotifyPlayWidget";
import BpmTable from "./BpmTable";
import ScoreDisplay from "./ScoreDisplay";

interface Props {
  bpm: number;
  onStartNextTrack: (_: any) => void;
  score: number;
  trueBpm: number;
  track: Track;
}

export function Result({ bpm, score, onStartNextTrack, track, trueBpm }: Props) {
  const roundedScore = Math.round(score);
  return (
    <div className="Play">
      <BpmTable {...{ bpm, trueBpm }} />
      <SpotifyPlayWidget track={track} />
      <ScoreDisplay roundedScore={roundedScore} />
      <button className="Button" onClick={onStartNextTrack}>
        Next song
      </button>
    </div>
  );
}

export default connect()(Result);