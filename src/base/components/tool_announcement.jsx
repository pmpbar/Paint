import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'base/static/css/tool_announcement.css';

export default class ToolAnnouncement extends Component {
  static propTypes = {
    tool: PropTypes.string.isRequired,
  };
  componentWillReceiveProps() {
    this.div.classList.remove('updated');
    // Magic, I don't know why this is needed
    void this.div.offsetWidth;
    this.div.classList.add('updated');
  }
  render() {
    const { tool } = this.props;
    return (<div ref={(div) => { this.div = div; }} className="tool-announcement updated">
      <div className="tool-announcement-text">
        {tool[0].toUpperCase() + tool.slice(1)} Selected
      </div>
    </div>);
  }
}
