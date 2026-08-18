import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { INFINITE_DURATION } from '../data/durations';

const REST_SCALE = 0.55;
const FULL_SCALE = 1;
// Максимальный шаг между кадрами: если вкладка была в фоне и rAF "заморозился",
// не даём таймеру перескочить сразу через несколько фаз/циклов.
const MAX_FRAME_DELTA = 0.25;

// Строит для каждой фазы диапазон масштаба круга [from, to].
// hold-фазы сохраняют масштаб, полученный на предыдущей inhale/exhale фазе —
// это делает логику независимой от конкретного порядка и количества фаз.
function buildScaleKeyframes(phases) {
  let scale = REST_SCALE;
  return phases.map((phase) => {
    const from = scale;
    let to = scale;
    if (phase.type === 'inhale') to = FULL_SCALE;
    if (phase.type === 'exhale') to = REST_SCALE;
    scale = to;
    return { from, to };
  });
}

const INITIAL_PROGRESS = { phaseIndex: 0, elapsed: 0, totalElapsed: 0 };

export function useBreathingTimer(exercise, durationMinutes) {
  const phases = exercise.phases;
  const scaleKeyframes = useMemo(() => buildScaleKeyframes(phases), [phases]);
  const isInfinite = durationMinutes === INFINITE_DURATION;
  const durationSeconds = isInfinite ? null : durationMinutes * 60;

  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const [progressState, setProgressState] = useState(INITIAL_PROGRESS);

  const lastTsRef = useRef(null);

  useEffect(() => {
    setRunning(false);
    setFinished(false);
    setProgressState(INITIAL_PROGRESS);
  }, [exercise, durationSeconds]);

  useEffect(() => {
    if (!running) {
      lastTsRef.current = null;
      return undefined;
    }

    let rafId;
    const tick = (ts) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const delta = Math.min((ts - lastTsRef.current) / 1000, MAX_FRAME_DELTA);
      lastTsRef.current = ts;

      setProgressState((prev) => {
        let { phaseIndex, elapsed } = prev;
        elapsed += delta;
        let duration = phases[phaseIndex].duration;
        while (elapsed >= duration) {
          elapsed -= duration;
          phaseIndex = (phaseIndex + 1) % phases.length;
          duration = phases[phaseIndex].duration;
        }
        return { phaseIndex, elapsed, totalElapsed: prev.totalElapsed + delta };
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [running, phases]);

  useEffect(() => {
    if (!running || durationSeconds == null) return;
    if (progressState.totalElapsed >= durationSeconds) {
      setRunning(false);
      setFinished(true);
    }
  }, [progressState.totalElapsed, running, durationSeconds]);

  const reset = useCallback(() => {
    setRunning(false);
    setFinished(false);
    setProgressState(INITIAL_PROGRESS);
  }, []);

  const start = useCallback(() => {
    if (finished) {
      setProgressState(INITIAL_PROGRESS);
    }
    setFinished(false);
    setRunning(true);
  }, [finished]);

  const pause = useCallback(() => setRunning(false), []);

  const toggle = useCallback(() => {
    setRunning((prev) => !prev);
  }, []);

  const { phaseIndex, elapsed, totalElapsed } = progressState;
  const phase = phases[phaseIndex];
  const progress = phase.duration > 0 ? Math.min(elapsed / phase.duration, 1) : 1;
  const { from, to } = scaleKeyframes[phaseIndex];
  const scale = from + (to - from) * progress;
  // Floor сначала, вычитание целых чисел потом — иначе при вычитании из
  // большого durationSeconds (сотни/тысячи секунд) теряется точность в дробной
  // части иначе, чем при вычитании из маленького phase.duration, и секундомер
  // фазы и общий таймер "тикают" в разные моменты (расхождение на кадр и больше
  // на длинных сессиях).
  const timeLeft = Math.max(1, phase.duration - Math.floor(elapsed));
  const remainingSeconds = isInfinite ? null : Math.max(0, durationSeconds - Math.floor(totalElapsed));

  return {
    phase,
    phaseIndex,
    phasesCount: phases.length,
    progress,
    scale,
    timeLeft,
    totalElapsed,
    remainingSeconds,
    isInfinite,
    running,
    finished,
    start,
    pause,
    toggle,
    reset,
  };
}
