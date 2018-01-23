import React, { Component } from 'react';
import { CompactPicker } from 'react-color';
import { actionValidator, colorValidator } from 'base/redux/validators';
import 'base/static/css/color_picker.css';

export default class ColorPicker extends Component {
  static propTypes = {
    stroke: colorValidator.isRequired,
    fill: colorValidator.isRequired,
    setStroke: actionValidator.isRequired,
    setFill: actionValidator.isRequired,
  };
  componentDidMount() {
    const { ipcRenderer } = window.require('electron');
    // ipcRenderer.send('redux-sync', { window:'main', cmd: 'setStroke', data:  });
    document.title = `Set Fill`;
    ipcRenderer.on('redux-sync', (e, update) => {
      console.log(update);
    });
  }
  handleStroke = (color) => {
    const { ipcRenderer } = window.require('electron');
    ipcRenderer.send('redux-sync', { window:'main', cmd: 'setStroke', data:  color });
    this.props.setStroke(color.hex);
  };
  render() {
    const { stroke, fill, setFill } = this.props;
    return (<div>
      <CompactPicker color={stroke} onChange={(color) => { this.handleStroke(color.hex); }} />
      {/* <CompactPicker color={fill} onChange={(color) => { setFill(color.hex); }} /> */}
    </div>);
  }
}
