function makeActionCreator(type, ...argNames) {
  return (...args) => {
    const action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
}

export const SET_IPC = 'SET_IPC';
export const SET_TOOL = 'SET_TOOL';
export const SET_STROKE = 'SET_STROKE';
export const SET_FILL = 'SET_FILL';

export const setIPC = makeActionCreator(SET_IPC, 'ipc');
export const setTool = makeActionCreator(SET_TOOL, 'tool');
export const setStroke = makeActionCreator(SET_STROKE, 'stroke');
export const setFill = makeActionCreator(SET_FILL, 'fill');
