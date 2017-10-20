import { SET_TOOL, SET_DSC } from 'base/redux/actions';
/**
 * Base reducers
 */
const defaultState = {
  tool: 'line',
  drawStackCmd: '',
};

const base = (state = defaultState, action) => {
  switch (action.type) {
    case SET_TOOL:
      return {
        ...state,
        tool: action.tool,
      };
    case SET_DSC:
      return {
        ...state,
        drawStackCmd: action.drawStackCmd,
      };
    default:
      return state;
  }
};

export default base;
