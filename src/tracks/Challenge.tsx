import React, { Component } from 'react';

import 'react-circular-progressbar/dist/styles.css';

import { Track } from "./types";
import { connect } from "react-redux";
import { AppState } from "../App";
import SongDetails from "./SongDetails";
import TapTarget from "./TapTarget";
import SkipButton from "./SkipButton";

const TAPS_NEEDED = 16;

interface Props {
  dispatch: Function;
  loading: boolean;
  onSkip: (e: any) => void;
  onSubmit: (values: { bpm: number }) => void;
  tracks: Track[];
}

interface State {
  bpm: number | undefined,
  finished: boolean;
  started: boolean;
  timestamps: number[];
}

export class Challenge extends Component<Props, State> {
  mounted = false

  state = {
    bpm: undefined,
    finished: false,
    started: false,
    timestamps: [],
  }

  componentDidMount = () => {
    this.mounted = true;
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount = () => {
    this.mounted = false;
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleBeat = () => {
    const { started, timestamps } = this.state;
    if (!started) {
      console.info('started!');
      this.setState({ started: true });
    }
    this.setState({ timestamps: [...timestamps, new Date().getTime()] });
    if (timestamps.length < 15) {
      return;
    }

    // OK, we're finished
    window.removeEventListener('keydown', this.handleKeyPress);
    this.setState({ finished: true }, () => {
      const { onSubmit } = this.props;
      const { timestamps } = this.state;
      const sortedTimestamps = [...timestamps.sort((a, b) => a - b)]
      this.setState({ timestamps: sortedTimestamps }, () => {
        const bpm = this.computeBpm();
        onSubmit({ bpm });
      });
    });
  }

  handleKeyPress = ({ key }: any) => {
    if (key !== ' ') {
      return;
    }
    return this.handleBeat();
  }

  handleSkip = (_: any) => {
    const { onSkip } = this.props;
    const { started } = this.state;
    if (started) {
      return;
    }
    onSkip(_);
  }

  computeBpm = () => {
    const { timestamps } = this.state;
    const diffs = [];
    for (let i = 0; i < timestamps.length - 1; i++) {
      const a = timestamps[i];
      const b = timestamps[i + 1];
      diffs.push(b - a);
    }
    // Mean milliseconds
    const mean = diffs.reduce((a, b) => a + b) / diffs.length;
    const bpm = 60 * 1000 / mean;
    this.setState({ bpm });
    return bpm;
  }

  setStateIfMounted = (state: any) => {
    if (this.mounted) {
      this.setState(state);
    }
  }

  render = () => {
    const { tracks: [currentTrack,] } = this.props;
    const { finished, started, timestamps } = this.state;
    const percentage = 100 * Math.min(1, timestamps.length / TAPS_NEEDED);

    return (
      <div className="Play">
        <div style={{ textAlign: 'center', marginTop: '1rem', marginBottom: '1rem' }}>
          Tap to the music in your head
        </div>
        <div className="SongAndTapContainer">
          <SongDetails {...currentTrack} />
          <TapTarget
            percentage={percentage}
            finished={finished}
            timestamps={timestamps}
            onTap={this.handleBeat}
          />
        </div>
        <SkipButton started={started} onClick={this.handleSkip} />
      </div>
    );
  }
}

const mapStateToProps = ({ tracks: { tracks } }: AppState) => ({ tracks });

export default connect(mapStateToProps)(Challenge);