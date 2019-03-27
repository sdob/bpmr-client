import React, { Component } from 'react';
import { AppState } from "../App";
import { connect } from "react-redux";
import { fetchTracks, startNextTrack, submitAnswer } from "./actions";
import { Step, Track } from "./types";
import Sending from "./Sending";
import Result from './Result';
import Challenge from "./Challenge";
import { logoutSuccess } from "../auth/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedoAlt } from "@fortawesome/free-solid-svg-icons/faRedoAlt";

interface PlayProps {
  dispatch: Function;
  loading: boolean;
  tracks: Track[];
}

export interface Results {
  bpm: number;
  score: number;
  trueBpm: number;
}


interface PlayState {
  currentStep: Step;
  results: Results | undefined;
  sending: boolean;
}

export class Play extends Component<PlayProps, PlayState> {
  mounted = false

  state = {
    currentStep: Step.Challenge,
    results: undefined,
    sending: false,
  }

  componentDidMount = async () => {
    this.mounted = true;
    const { dispatch } = this.props;
    try {
      await dispatch(fetchTracks());
    } catch (e) {
      await dispatch(logoutSuccess());
    }
  }

  componentWillUnmount = () => {
    this.mounted = false;
  }

  handleSkip = async () => {
    await this.handleNextTrack();
  }

  handleNextTrack = async () => {
    const { dispatch } = this.props;
    await dispatch(startNextTrack());
    this.setState({ currentStep: Step.Challenge });
  }

  handleSubmit = async ({ bpm }: { bpm: number }) => {
    this.setState({ sending: true });
    const { dispatch, tracks } = this.props;
    const [{ id },] = tracks;
    const { score, true_bpm: trueBpm } = await dispatch(submitAnswer({ bpm, id }));
    this.setStateIfMounted({
      sending: false,
      currentStep: Step.Result,
      results: { bpm, score, trueBpm },
    });
  }

  setStateIfMounted = (state: any) => {
    if (this.mounted) {
      this.setState(state);
    }
  }

  render = () => {
    const { loading, tracks } = this.props;
    const { currentStep, results } = this.state;

    if (loading || !tracks.length) {
      return (
        <div className="Play Play--loading">
          <FontAwesomeIcon icon={faRedoAlt} size="lg" spin />
        </div>
      );
    }

    switch (currentStep) {
      case Step.Result:
        return <Result {...results} onStartNextTrack={this.handleSkip} />;
      case Step.Sending:
        return <Sending />;
      default:
        return <Challenge onSubmit={this.handleSubmit} onSkip={this.handleSkip} />;
    }

    /*
    if (sending) {
      return (
        <div className="Play">
          <Sending />
        </div>
      );
    }
    */

  }
}

const mapStateToProps = ({ tracks: { loading, tracks } }: AppState) => ({ loading, tracks });

export default connect(mapStateToProps)(Play);
