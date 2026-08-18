// Схема одного упражнения:
// {
//   id: string — уникальный slug, используется в URL
//   name: string — короткое название по цифрам ("4-4-6-2")
//   title: string — человекочитаемое название
//   description: string — краткое описание, для чего подходит
//   tags: string[] — теги для будущей фильтрации/поиска
//   phases: { type: 'inhale' | 'hold' | 'exhale', label: string, duration: number }[]
//     duration — в секундах. Порядок и количество фаз произвольны,
//     таймер и анимация круга строятся динамически по этому списку.
// }
// Длительность сессии (сколько минут повторять фазы по кругу) выбирается
// пользователем на странице упражнения — см. src/data/durations.js.

export const PHASE_META = {
  inhale: { defaultLabel: 'Вдох', color: 'var(--phase-inhale)' },
  hold: { defaultLabel: 'Задержка', color: 'var(--phase-hold)' },
  exhale: { defaultLabel: 'Выдох', color: 'var(--phase-exhale)' },
};

export const exercises = [
  {
    id: '4-4-6-2',
    name: '4-4-6-2',
    title: 'Успокаивающее дыхание',
    description:
      'Удлинённый выдох мягко снижает частоту сердцебиения и помогает выйти из приступа паники за несколько циклов.',
    tags: ['паника', 'тревога'],
    phases: [
      { type: 'inhale', label: 'Вдох', duration: 4 },
      { type: 'hold', label: 'Задержка', duration: 4 },
      { type: 'exhale', label: 'Выдох', duration: 6 },
      { type: 'hold', label: 'Задержка', duration: 2 },
    ],
  },
  {
    id: '3-4-5',
    name: '3-4-5',
    title: 'Треугольное дыхание',
    description:
      'Простой и лёгкий для запоминания ритм — хорошо подходит, чтобы быстро переключить внимание и снизить тревожность.',
    tags: ['тревога', 'фокус'],
    phases: [
      { type: 'inhale', label: 'Вдох', duration: 3 },
      { type: 'hold', label: 'Задержка', duration: 4 },
      { type: 'exhale', label: 'Выдох', duration: 5 },
    ],
  },
  {
    id: '4-2-4-2',
    name: '4-2-4-2',
    title: 'Балансирующее дыхание',
    description:
      'Равные по длительности вдох и выдох с короткими задержками выравнивают ритм дыхания и возвращают ощущение баланса.',
    tags: ['баланс', 'тревога'],
    phases: [
      { type: 'inhale', label: 'Вдох', duration: 4 },
      { type: 'hold', label: 'Задержка', duration: 2 },
      { type: 'exhale', label: 'Выдох', duration: 4 },
      { type: 'hold', label: 'Задержка', duration: 2 },
    ],
  },
  {
    id: '5-10',
    name: '5-10',
    title: 'Дыхание с удлинённым выдохом',
    description:
      'Выдох вдвое длиннее вдоха — один из самых быстрых способов включить парасимпатическую нервную систему и погасить паническую реакцию.',
    tags: ['паника', 'тревога'],
    phases: [
      { type: 'inhale', label: 'Вдох', duration: 5 },
      { type: 'exhale', label: 'Выдох', duration: 10 },
    ],
  },
  {
    id: '4-4-4-4',
    name: '4-4-4-4',
    title: 'Квадратное дыхание',
    description:
      'Классическая техника box breathing с четырьмя равными фазами — помогает сохранять концентрацию и спокойствие под давлением.',
    tags: ['фокус', 'стресс'],
    phases: [
      { type: 'inhale', label: 'Вдох', duration: 4 },
      { type: 'hold', label: 'Задержка', duration: 4 },
      { type: 'exhale', label: 'Выдох', duration: 4 },
      { type: 'hold', label: 'Задержка', duration: 4 },
    ],
  },
];

export function getExerciseById(id) {
  return exercises.find((exercise) => exercise.id === id);
}
