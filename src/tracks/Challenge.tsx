import React, { Component } from 'react';
import { Field, Form, Formik, FormikActions } from "formik";

import { Track } from "./types";
import { connect } from "react-redux";
import { AppState } from "../App";

interface Props {
  dispatch: Function;
  loading: boolean;
  onSkip: (e: any) => void;
  onSubmit: (values: { bpm: string }, formikActions: FormikActions<{ bpm: string; }>) => void;
  tracks: Track[];
}

export class Challenge extends Component<Props> {
  mounted = false

  componentDidMount = () => {
    this.mounted = true;
  }

  componentWillUnmount = () => {
    this.mounted = false;
  }

  setStateIfMounted = (state: any) => {
    if (this.mounted) {
      this.setState(state);
    }
  }

  render = () => {
    const {
      onSkip,
      onSubmit,
      tracks: [currentTrack,],
    } = this.props;
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
          <Formik
            initialValues={{ bpm: '', }}
            onSubmit={onSubmit}
            render={({ values }) => (
              <Form>
                <Field type="text" name="bpm" value={values.bpm} />
                <button type="submit">Send</button>
              </Form>
            )}
          />
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