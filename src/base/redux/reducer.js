import { SET_TOOL, SET_STROKE, SET_FILL, SET_IPC } from 'base/redux/actions';
/**
 * Base reducers
 */
export const initalState = {
  tool: 'line',
  stroke: '#000000',
  fill: '',
  ipc: {},
};

export const reducer = (state = initalState, action) => {
  switch (action.type) {
    case SET_IPC:
      return {
        ...state,
        ipc: action.ipc,
      };
    case SET_TOOL:
      return {
        ...state,
        tool: action.tool,
      };
    case SET_STROKE:
      return {
        ...state,
        stroke: action.stroke,
      };
    case SET_FILL:
      return {
        ...state,
        fill: action.fill,
      };
    default:
      return state;
  }
};
