/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Route, Switch } from "react-router-dom";
import { MainPage } from "./pages/main";
import { MobilePage } from "./pages/mobile/mobile";
import './main.scss';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={MainPage} />
      </Switch>
      <Switch>
        <Route exact path="/mobile" component={MobilePage} />
      </Switch>
    </>
  );
}



export default App;
