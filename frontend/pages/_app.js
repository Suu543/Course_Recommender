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
  static async getInitialProps({ Component, router, ctx, req, res }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, req, res, pageProps, ...other } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>Course Recommender</title>
        </Head>
        <div>
          <Navbar />
          <main>
            <Component {...req} {...res} {...pageProps} {...other} />
          </main>
        </div>
      </React.Fragment>
    );
  }
}
