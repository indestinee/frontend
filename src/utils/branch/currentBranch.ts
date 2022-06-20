import json from '../../config/branch.json';

/* eslint-disable no-unused-vars */
export enum Branch {
  MAIN,
  ROUTER,
}

export const currentBranch = Branch[json.currentBranch as keyof typeof Branch];
