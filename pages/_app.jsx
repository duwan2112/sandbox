import React from "react";
import App from "next/app";
import Router from "next/router";
// Utils
import {User, Alert} from "../components/contexts";
import {server} from "../utils";

// Styled components
import {ThemeProvider} from "styled-components";
import theme from "../utils/theme";
import GlobalStyles from "../utils/theme/globals";

// Stripe
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

// Components
import Toast from "../components/Toast";
import ProgressBar from "../components/ProgressBar";

// Bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";

// Responsive carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class MyApp extends App {
  state = {
    isLoggedIn: false,
    user: {},
  };

  setUser = async (data) => {
    this.setState({
      ...this.state,
      user: {...this.state.user, ...data},
    });
  };

  setLogIn = async (ok, data) => {
    if (ok) {
      this.setState({...this.state, isLoggedIn: true, user: data});
    }
  };

  setLogOut = async () => {
    const {ok} = await server.getAsync("/auth/logout");

    if (ok) {
      Router.push("/login");
      this.setState({isLoggedIn: false, user: {}});
    }
  };

  componentDidMount = async () => {
    document.body.style.opacity = 0;
    const {ok, data} = await server.getAsync("/auth/session");
    this.setLogIn(ok, data);
    document.body.style.opacity = 1;
  };

  render() {
    const {Component, pageProps} = this.props;

    return (
      <ThemeProvider theme={theme}>
        <User.UserContext.Provider
          value={{
            user: this.state.user,
            isLoggedIn: this.state.isLoggedIn,
            setLogIn: this.setLogIn,
            setLogOut: this.setLogOut,
            setUser: this.setUser,
          }}
        >
          <Alert.AlertContextProvider>
            <Elements stripe={stripePromise}>
              <ProgressBar spinner={false} color={"var(--color-success)"} />
              <Component {...pageProps} />
              <GlobalStyles />
              <Toast />
            </Elements>
          </Alert.AlertContextProvider>
        </User.UserContext.Provider>
      </ThemeProvider>
    );
  }
}

export default MyApp;
