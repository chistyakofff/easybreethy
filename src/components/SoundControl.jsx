import './SoundControl.css';

export function SoundControl({ sound }) {
  return (
    <div className="sound-control">
      <button
        type="button"
        className="sound-control__toggle"
        onClick={sound.toggleEnabled}
        aria-pressed={sound.enabled}
        aria-label={sound.enabled ? 'Выключить звук фаз' : 'Включить звук фаз'}
        title={sound.enabled ? 'Выключить звук фаз' : 'Включить звук фаз'}
      >
        {sound.enabled ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </button>

      <input
        type="range"
        className="sound-control__slider"
        min="0"
        max="100"
        step="1"
        value={Math.round(sound.volume * 100)}
        onChange={(event) => sound.setVolume(Number(event.target.value) / 100)}
        aria-label="Громкость звука фаз"
      />
    </div>
  );
}
