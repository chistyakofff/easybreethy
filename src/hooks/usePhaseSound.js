import { useCallback, useEffect, useRef } from 'react';
import phaseChangeSoundUrl from '../assets/sounds/phase-change.mp3';
import { useSoundSettings } from './useSoundSettings';

// Проигрывает звук при каждой смене фазы, пока упражнение запущено.
// Срабатывает на старт с нуля (totalElapsed === 0) и на смену индекса фазы —
// но не на паузу, сброс или простое возобновление той же фазы после паузы.
export function usePhaseSound(running, phaseIndex, totalElapsed) {
  const sound = useSoundSettings();
  const audioRef = useRef(null);
  const lastPhaseRef = useRef(-1);
  const wasRunningRef = useRef(false);
  const totalElapsedRef = useRef(totalElapsed);
  totalElapsedRef.current = totalElapsed;

  useEffect(() => {
    const audio = new Audio(phaseChangeSoundUrl);
    audio.preload = 'auto';
    audioRef.current = audio;
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = sound.volume;
  }, [sound.volume]);

  const play = useCallback(() => {
    if (!sound.enabled || !audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  }, [sound.enabled]);

  useEffect(() => {
    const freshStart = running && !wasRunningRef.current && totalElapsedRef.current === 0;
    const phaseChanged = phaseIndex !== lastPhaseRef.current;
    if (running && (freshStart || phaseChanged)) {
      play();
    }
    lastPhaseRef.current = phaseIndex;
    wasRunningRef.current = running;
  }, [running, phaseIndex, play]);

  return sound;
}
