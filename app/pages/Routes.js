import React, { Component } from "react";
import { Router, Stack, Scene } from "react-native-router-flux";
import Regform from "../components/regform";

import Loginform from "../components/login";

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Stack key="root" hideNavBar={true}>
          <Scene key="login" component={Loginform} title="Login" />
          <Scene key="signup" component={Regform} title="Signup" />
        </Stack>
      </Router>
    );
  }
}
