import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getExerciseById } from '../data/exercises';
import { DEFAULT_DURATION_MINUTES } from '../data/durations';
import { useBreathingTimer } from '../hooks/useBreathingTimer';
import { usePhaseSound } from '../hooks/usePhaseSound';
import { BreathCircle } from '../components/BreathCircle';
import { DurationPicker } from '../components/DurationPicker';
import { SoundControl } from '../components/SoundControl';
import { formatDuration, pluralizeMinutes } from '../utils/time';
import './ExercisePage.css';

export function ExercisePage() {
  const { id } = useParams();
  const exercise = getExerciseById(id);

  if (!exercise) {
    return <Navigate to="/" replace />;
  }

  return <ExercisePageContent key={exercise.id} exercise={exercise} />;
}

function ExercisePageContent({ exercise }) {
  const [duration, setDuration] = useState(DEFAULT_DURATION_MINUTES);
  const timer = useBreathingTimer(exercise, duration);
  const sound = usePhaseSound(timer.running, timer.phaseIndex, timer.totalElapsed);
  const isIdle = !timer.running && timer.totalElapsed === 0;

  useEffect(() => {
    document.title = `${exercise.title} — EasyBreethy`;
    return () => {
      document.title = 'EasyBreethy';
    };
  }, [exercise]);

  const timeLabel = timer.isInfinite
    ? `∞ · Прошло ${formatDuration(Math.floor(timer.totalElapsed))}`
    : `Осталось ${formatDuration(timer.remainingSeconds)}`;

  return (
    <div className="exercise-page">
      <Link to="/" className="exercise-page__back">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M12.5 8H3.5M3.5 8L7.5 4M3.5 8L7.5 12"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Все упражнения
      </Link>

      <div className="exercise-page__header">
        <span className="exercise-page__name">{exercise.name}</span>
        <h1 className="exercise-page__title">{exercise.title}</h1>
        <p className="exercise-page__description">{exercise.description}</p>
      </div>

      <div className="exercise-page__stage">
        {timer.finished ? (
          <div className="exercise-page__complete">
            <div className="exercise-page__complete-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 12.5L10 17.5L19 7"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2>Отлично получилось</h2>
            <p>
              Вы дышали по схеме «{exercise.name}» {duration} {pluralizeMinutes(duration)}.
              Прислушайтесь к тому, как вы себя чувствуете.
            </p>
            <div className="exercise-page__complete-actions">
              <button type="button" className="btn btn--primary" onClick={timer.start}>
                Повторить ещё раз
              </button>
              <Link to="/" className="btn btn--ghost">
                К упражнениям
              </Link>
            </div>
          </div>
        ) : (
          <>
            <SoundControl sound={sound} />

            {isIdle && <DurationPicker value={duration} onChange={setDuration} />}

            <BreathCircle
              phase={timer.phase}
              progress={timer.progress}
              scale={timer.scale}
              timeLeft={timer.timeLeft}
              running={timer.running}
            />

            <div className="exercise-page__time-label">{timeLabel}</div>

            <div className="exercise-page__phases">
              {exercise.phases.map((phase, index) => (
                <span
                  key={index}
                  className={`exercise-page__phase-chip${index === timer.phaseIndex ? ' is-active' : ''}`}
                >
                  {phase.label} · {phase.duration}с
                </span>
              ))}
            </div>

            <div className="exercise-page__controls">
              <button
                type="button"
                className="btn btn--ghost btn--icon"
                onClick={timer.reset}
                aria-label="Сбросить упражнение"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <polyline
                    points="1 4 1 10 7 10"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button type="button" className="btn btn--primary btn--lg" onClick={timer.toggle}>
                {timer.running ? 'Пауза' : isIdle ? 'Начать' : 'Продолжить'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
