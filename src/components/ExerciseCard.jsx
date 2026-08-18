import { Link } from 'react-router-dom';
import { PhasePattern } from './PhasePattern';
import './ExerciseCard.css';

export function ExerciseCard({ exercise }) {
  const patternText = exercise.phases.map((phase) => phase.duration).join(' – ');

  return (
    <Link to={`/exercise/${exercise.id}`} className="exercise-card">
      <span className="exercise-card__name">{exercise.name}</span>

      <h3 className="exercise-card__title">{exercise.title}</h3>
      <p className="exercise-card__description">{exercise.description}</p>

      <div className="exercise-card__pattern">
        <PhasePattern phases={exercise.phases} />
        <span className="exercise-card__pattern-text">{patternText}</span>
      </div>

      <div className="exercise-card__phases">
        {exercise.phases.map((phase, index) => (
          <span key={index} className="exercise-card__phase-chip">
            {phase.label} {phase.duration}с
          </span>
        ))}
      </div>

      <span className="exercise-card__cta">
        Начать
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}
