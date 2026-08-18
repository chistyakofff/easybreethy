import { DURATION_OPTIONS } from '../data/durations';
import './DurationPicker.css';

export function DurationPicker({ value, onChange }) {
  return (
    <div className="duration-picker" role="radiogroup" aria-label="Длительность упражнения">
      {DURATION_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={option.value === value}
          className={`duration-picker__option${option.value === value ? ' is-active' : ''}`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
