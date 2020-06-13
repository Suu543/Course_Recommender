import React from "react";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

// Components
import Navbar from "../components/Navbar/Navbar";

export default class RootApp extends App {
  render() {
    const { Component, pageProps, ...other } = this.props;
    return (
      <React.Fragment>
        <Head>
          <title>Course Recommender</title>
        </Head>
        <div>
          <Navbar />
          <main>
            <Component {...pageProps} {...other} />
          </main>
        </div>
      </React.Fragment>
    );
  }
}

RootApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};
