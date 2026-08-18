import { exercises } from '../data/exercises';
import { ExerciseCard } from '../components/ExerciseCard';
import './Home.css';

export function Home() {
  return (
    <div className="home">
      <section className="home__hero">
        <span className="home__eyebrow">EasyBreethy</span>
        <h1 className="home__title">Дыхание, которое возвращает спокойствие</h1>
        <p className="home__subtitle">
          Короткие упражнения с таймером по фазам — вдох, задержка, выдох. Помогают снизить
          тревогу и мягко выйти из панической атаки прямо сейчас. Выберите карточку и просто
          дышите вместе с кругом.
        </p>
      </section>

      <section className="home__grid">
        {exercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </section>

      <p className="home__disclaimer">
        Это не медицинская рекомендация. Если тревога сильная или повторяется часто —
        обратитесь к врачу или специалисту по психическому здоровью.
      </p>
    </div>
  );
}
