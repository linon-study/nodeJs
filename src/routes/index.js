import React from 'react';
import { Route, Switch } from "react-router";

{/* 首页 */ }
import WrappedHorizontalLoginForm from '../containers/home';

const Root = () => {
  return (
    <div>
      <Switch>
        {/* 首页 */}
        <Route exact path='/' component={WrappedHorizontalLoginForm}/>
      </Switch>
    </div>
  )
}

export default Root;