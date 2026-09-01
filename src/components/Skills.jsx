// Skills genera la lista de habilidades usando un array y el método .map().
// La idea es mantener los datos organizados en una estructura simple y reutilizable.
const skills = [
  'HTML5',
  'CSS',
  'JavaScript',
  'TypeScript',
  'PHP',
  'React.js',
  'AngularJS',
  'WordPress',
  'MySQL',
  'C++',
  'Lua',
  'Git',
  'JIRA',
];

function Skills() {
  return (
    <section className="section">
      <h2 className="section-title">Habilidades</h2>
      <div className="skill-grid">
        {skills.map((skill) => (
          <div key={skill} className="skill-item">
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
