import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ColorPicker from 'base/containers/color_picker';
import App from 'base/con';

export default (<Router>
  <div>
    <Route exact path="/" component={App} />
    <Route path="/colorpicker" component={ColorPicker} />
  </div>
</Router>);
