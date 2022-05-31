interface Range {
  min: number,
  max: number,
}

interface ProgressBarParams {
  value: number,
  maxValue: number,
  minValue: number,
  greenThreshold: Range | null,
  yellowThreshold: Range | null,
  redThreshold: Range | null,
}

export default function ProgressBar(param: ProgressBarParams) {
  const getColor = () => {
    if (param.greenThreshold &&
      param.value >= param.greenThreshold.min &&
      param.value <= param.greenThreshold.max) {
      return 'bg-success';
    } else if (param.yellowThreshold &&
      param.value >= param.yellowThreshold.min &&
      param.value <= param.yellowThreshold.max) {
      return 'bg-warning';
    } else if (param.redThreshold &&
      param.value >= param.redThreshold.min &&
      param.value <= param.redThreshold.max) {
      return 'bg-danger';
    } else {
      return 'bg-info';
    }
  };

  const color = getColor();
  const value = param.value / (param.maxValue - param.minValue) * 100;
  return (
    <div className="progress" style={{width: '100%'}}>
      <div
        className={`progress-bar ${color}`}
        role="progressbar"
        style={{'width': `${value}%`}}
        aria-valuenow={param.value}
        aria-valuemin={param.minValue}
        aria-valuemax={param.maxValue}>{param.value}</div>
    </div>
  );
}
