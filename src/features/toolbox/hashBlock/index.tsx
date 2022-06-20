import './index.css';

interface HashBlockParams {
  name: string,
  getValue: () => string,
};

export const HashBlock = (param: HashBlockParams) => {
  const value = (() => {
    try {
      return param.getValue();
    } catch {
      return '[INVALID]';
    }
  })();

  return (
    <tr>
      <td>{param.name}</td>
      <td><div className="scrollable-text">{value}</div></td>
    </tr>
  );
};
