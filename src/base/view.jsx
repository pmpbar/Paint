import React, { Component } from 'react';
import { toolValidator } from 'base/redux/validators';
import ToolAnnouncement from 'base/components/tool_announcement';
import Canvas from 'base/containers/canvas';

export default class App extends Component {
  static propTypes = {
    tool: toolValidator.isRequired,
  };
  render() {
    const { tool } = this.props;
    if (!tool) {
      return null;
    }

    return (<div className="app">
      <ToolAnnouncement tool={tool} />
      <Canvas />
    </div>);
  }
}
