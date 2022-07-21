import json from '../../config/branch.json';

export type Branch = 'MAIN' | 'ROUTER'

export const currentBranch = json.currentBranch as Branch;
