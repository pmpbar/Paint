import { connect } from 'react-redux';
import { setDrawStackCmd } from 'base/redux/actions';
import Canvas from 'base/components/visual/canvas';

const mapStateToProps = state => ({
  tool: state.tool,
  drawStackCmd: state.drawStackCmd,
});
const mapDispatchToProps = dispatch => ({
  setDrawStackCmd: (cmd) => {
    dispatch(setDrawStackCmd(cmd));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Canvas);

