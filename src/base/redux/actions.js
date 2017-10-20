function makeActionCreator(type, ...argNames) {
  return (...args) => {
    const action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
}

export const SET_TOOL = 'SET_TOOL';
export const SET_DSC = 'SET_DSC';

export const setTool = makeActionCreator(SET_TOOL, 'tool');
export const setDrawStackCmd = makeActionCreator(SET_DSC, 'drawStackCmd');
