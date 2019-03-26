import React, { Component, Fragment } from 'react';

import Login from './auth/Login';
import Navbar from './Navbar';
import Play from "./tracks/Play";
import { connect } from "react-redux";
import { AuthState } from "./auth/types";
import { TrackState } from "./tracks/types";

interface AppProps {
  token: string;
}

export interface AppState {
  auth: AuthState;
  tracks: TrackState;
}

class App extends Component<AppProps> {
  render() {
    const { token } = this.props;

    return (
      <Fragment>
        <Navbar />
        {token ? <Play /> : <Login />}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ auth: { token } }: AppState) => ({ token });

export default connect(mapStateToProps)(App);
