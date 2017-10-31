import { connect } from 'react-redux';
import { setStroke, setFill } from 'base/redux/actions';
import ColorPicker from 'base/components/color_picker';

const mapStateToProps = state => ({
  tool: state.tool,
  stroke: state.stroke,
  fill: state.fill,
});
const mapDispatchToProps = dispatch => ({
  setStroke: (stroke) => {
    dispatch(setStroke(stroke));
  },
  setFill: (fill) => {
    dispatch(setFill(fill));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ColorPicker);

