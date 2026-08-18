import { PHASE_META } from '../data/exercises';
import './BreathCircle.css';

const SIZE = 260;
const STROKE_WIDTH = 8;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function BreathCircle({ phase, progress, scale, timeLeft, running }) {
  const color = PHASE_META[phase.type]?.color ?? 'var(--accent)';
  const dashOffset = CIRCUMFERENCE * (1 - progress);

  return (
    <div className="breath-circle" style={{ '--phase-color': color }}>
      <svg
        className="breath-circle__ring"
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        width={SIZE}
        height={SIZE}
      >
        <circle
          className="breath-circle__ring-bg"
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          strokeWidth={STROKE_WIDTH}
        />
        <circle
          className="breath-circle__ring-fg"
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          strokeWidth={STROKE_WIDTH}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
        />
      </svg>
      <div
        className={`breath-circle__orb${running ? ' is-running' : ''}`}
        style={{ transform: `scale(${scale})` }}
      >
        <span className="breath-circle__label">{phase.label}</span>
        <span className="breath-circle__count">{timeLeft}</span>
      </div>
    </div>
  );
}
