import React, { Component } from 'react';
import SpotifyLogin from 'react-spotify-login';
import { connect } from "react-redux";
import { loginSuccess } from "./actions";
import { LoginSuccess } from "./types";

interface LoginProps {
  dispatch: Function;
}

export class Login extends Component<LoginProps> {
  handleSuccess = (response: LoginSuccess) => {
    const { dispatch } = this.props;
    dispatch(loginSuccess(response));
  }

  render() {
    return (
      <div className="Login">
        <SpotifyLogin
          buttonText={"Login with Spotify"}
          className={"SpotifyLogin"}
          clientId="a8203669d2ee410e8863e869a85f4640"
          redirectUri="http://localhost:3000/"
          onSuccess={this.handleSuccess}
          scope="user-top-read"
        />
      </div>
    );
  }
}

export default connect()(Login);