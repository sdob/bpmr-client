import React, { Component, Fragment } from 'react';

import Login from './auth/Login';
import Navbar from './Navbar';
import Play from "./tracks/Play";
import { connect } from "react-redux";
import { AuthState } from "./auth/types";
import { TrackState } from "./tracks/types";
import { loginSuccess } from "./auth/actions";

interface AppProps {
  dispatch: Function;
  token: string;
}

export interface AppState {
  auth: AuthState;
  tracks: TrackState;
}

class App extends Component<AppProps> {
  componentDidMount(): void {
    const { dispatch } = this.props;
    const token = window.localStorage.getItem('token');
    if (token) {
      dispatch(loginSuccess({ access_token: token }));
    }
  }

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
