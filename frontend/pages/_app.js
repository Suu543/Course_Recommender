import App from "next/app";
import Head from "next/head";
import React from "react";

import Navbar from "../components/Navber";

export default class RootApp extends App {
  render() {
    const { Component, ...other } = this.props;
    return (
      <React.Fragment>
        <Head>
          <title>Course Recommender</title>
        </Head>
        <div>
          <Navbar />
          <main>
            <Component {...other} />
          </main>
        </div>
      </React.Fragment>
    );
  }
}
