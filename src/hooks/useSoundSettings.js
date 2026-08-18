import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'easybreethy-sound';
const DEFAULT_SETTINGS = { enabled: false, volume: 0.5 };

function readStoredSettings() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw);
    return {
      enabled: typeof parsed.enabled === 'boolean' ? parsed.enabled : DEFAULT_SETTINGS.enabled,
      volume: typeof parsed.volume === 'number' ? Math.min(1, Math.max(0, parsed.volume)) : DEFAULT_SETTINGS.volume,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function useSoundSettings() {
  const [settings, setSettings] = useState(readStoredSettings);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const setEnabled = useCallback((enabled) => {
    setSettings((prev) => ({ ...prev, enabled }));
  }, []);

  const toggleEnabled = useCallback(() => {
    setSettings((prev) => ({ ...prev, enabled: !prev.enabled }));
  }, []);

  const setVolume = useCallback((volume) => {
    setSettings((prev) => ({ ...prev, volume: Math.min(1, Math.max(0, volume)) }));
  }, []);

  return { ...settings, setEnabled, toggleEnabled, setVolume };
}
