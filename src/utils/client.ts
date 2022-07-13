export const isWindows = () => {
  const agent = navigator.userAgent.toLowerCase();
  return agent.indexOf('win') >= 0;
};
