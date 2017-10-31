import { connect } from 'react-redux';
import App from 'base/view';

const mapStateToProps = state => ({
  tool: state.tool,
});
const mapDispatchToProps = dispatch => ({ });
export default connect(mapStateToProps, mapDispatchToProps)(App);
