import React, { Component } from 'react';
import { AppState } from "../App";
import { connect } from "react-redux";
import { fetchTracks } from "./actions";

interface PlayProps {
  dispatch: Function;
  loading: boolean;
}

export class Play extends Component<PlayProps> {
  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch(fetchTracks());
  }

  render = () => {
    const { loading } = this.props;
    if (loading) {
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
        let's play
      </div>
    );
  }
}

const mapStateToProps = ({ tracks: { loading } }: AppState) => ({ loading });

export default connect(mapStateToProps)(Play);
