import { connect } from 'react-redux';
import { setIPC, setTool, setStroke } from 'base/redux/actions';
import Canvas from 'base/components/canvas';

const mapStateToProps = state => ({
  tool: state.tool,
  stroke: state.stroke,
  fill: state.fill,
  ipc: state.ipc,
});
const mapDispatchToProps = dispatch => ({
  setIPC: (ipc) => {
    dispatch(setIPC(ipc));
  },
  setTool: (tool) => {
    dispatch(setTool(tool));
  },
  setStroke: (stroke) => {
    dispatch(setStroke(stroke));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Canvas);

