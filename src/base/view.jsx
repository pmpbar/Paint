import React, { Component } from 'react';
import { actionValidator, toolValidator } from 'base/redux/validators';
import ToolAnnouncement from 'base/components/tool_announcement';
import Canvas from 'base/containers/visual/canvas';

export default class App extends Component {
  static propTypes = {
    tool: toolValidator.isRequired,
    setTool: actionValidator.isRequired,
    setDrawStackCmd: actionValidator.isRequired,
  };
  componentDidMount() {
    const { ipcRenderer } = window.require('electron');
    ipcRenderer.on('change-tool', (e, tool) => {
      this.props.setTool(tool);
    });
    ipcRenderer.on('draw-stack-cmd', (e, cmd) => {
      this.props.setDrawStackCmd(cmd);
    });
  }
  render() {
    return (<div className="app">
      <ToolAnnouncement tool={this.props.tool} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <Canvas />
          </div>
        </div>
      </div>
    </div>);
  }
}
