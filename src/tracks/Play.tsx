import React, { Component } from 'react';
import { AppState } from "../App";
import { connect } from "react-redux";
import { fetchTracks, startNextTrack } from "./actions";
import { Track } from "./types";

interface PlayProps {
  dispatch: Function;
  loading: boolean;
  tracks: Track[];
}

export class Play extends Component<PlayProps> {
  componentDidMount = async () => {
    const { dispatch } = this.props;
    await dispatch(fetchTracks());
  }

  handleClick = async () => {
    const { dispatch } = this.props;
    await dispatch(startNextTrack());
  }

  render = () => {
    const { loading, tracks } = this.props;
    const [currentTrack,] = tracks;
    if (loading || !tracks.length) {
      return (
        <div className="Play Play--loading">
          <h1>
            loading
          </h1>
        </div>
      );
    }

    return (
      <div className="Play">
        What's the bpm of
        <div>
          {currentTrack.name}
        </div>
        by
        <div>
          {currentTrack.artists.map(a => a.name).join(' and ')}
        </div>
        ?
        <div>
          <button onClick={this.handleClick}>Skip</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ tracks: { loading, tracks } }: AppState) => ({ loading, tracks });

export default connect(mapStateToProps)(Play);
