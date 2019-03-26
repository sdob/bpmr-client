import React, { Component, Fragment } from 'react';
import CircularProgressbar from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';

import { Track } from "./types";
import { connect } from "react-redux";
import { AppState } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedoAlt } from "@fortawesome/free-solid-svg-icons/faRedoAlt";

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

  handleKeyPress = ({ key }: any) => {
    if (key !== ' ') {
      return;
    }
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
    const {
      onSkip,
      tracks: [currentTrack,],
    } = this.props;

    const { finished, timestamps } = this.state;

    const percentage = 100 * Math.min(1, timestamps.length / TAPS_NEEDED);

    console.info('percentage: ' + percentage);

    return (
      <div className="Play">
        <h1>
          What's the BPM of...
        </h1>
        <div>
          <img
            height={250}
            src={currentTrack.album.images[0].url}
            width={250}
            alt={``}
          />
        </div>
        <div style={{ display: 'flex' }}>
          {currentTrack.name}
          {' '}
          by
          {' '}
          {currentTrack.artists.map(a => a.name).join(' and ')}
          ?
        </div>
        <div>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            Tap in time to the music!
          </div>
          <div style={{ width: '50%', marginTop: '1rem', marginLeft: 'auto', marginRight: 'auto' }}>
            {timestamps.length < TAPS_NEEDED && (
              <Fragment>
                <div onClick={this.handleKeyPress} style={{ borderRadius: '50%' }}>
                  <CircularProgressbar
                    strokeWidth={5}
                    styles={{ path: { transition: 'stroke-dashoffset 0.1s ease 0s' } }}
                    percentage={percentage}
                    text={`${Math.round(percentage)}`}
                  />
                </div>
              </Fragment>
            )}
            {finished && (
              <div style={{ textAlign: 'center' }}>
                <FontAwesomeIcon icon={faRedoAlt} size="lg" spin />
              </div>
            )}
          </div>
        </div>
        {false && (
          <div style={{ marginTop: '2rem' }}>
            <button onClick={onSkip}>Skip</button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ tracks: { tracks } }: AppState) => ({ tracks });

export default connect(mapStateToProps)(Challenge);