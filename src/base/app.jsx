import React from 'react';
import Toolbar from 'base/components/toolbar';
import Canvas from 'base/components/visual/canvas';
import 'base/static/css/app.css';


export default () => (
  <div className="app">
    <Toolbar />
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <Canvas />
        </div>
      </div>
    </div>
  </div>
);

