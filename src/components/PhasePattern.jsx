import { PHASE_META } from '../data/exercises';
import './PhasePattern.css';

export function PhasePattern({ phases, size = 'md' }) {
  return (
    <div className={`phase-pattern phase-pattern--${size}`}>
      {phases.map((phase, index) => (
        <div
          key={index}
          className="phase-pattern__segment"
          style={{
            flexGrow: phase.duration,
            background: PHASE_META[phase.type]?.color ?? 'var(--accent)',
          }}
          title={`${phase.label}: ${phase.duration} сек`}
        />
      ))}
    </div>
  );
}
