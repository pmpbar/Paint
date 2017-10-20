import { connect } from 'react-redux';
import { setTool, setDrawStackCmd } from 'base/redux/actions';
import App from 'base/view';

const mapStateToProps = state => ({
  tool: state.tool,
});
const mapDispatchToProps = dispatch => ({
  setTool: (tool) => {
    dispatch(setTool(tool));
  },
  setDrawStackCmd: (cmd) => {
    dispatch(setDrawStackCmd(cmd));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
