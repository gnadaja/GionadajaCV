import { useState } from 'react';
import {
  ArrowRight,
  Database,
  FileCode2,
  GitBranch,
  Globe,
  ServerCog,
  Code2,
  Cpu,
  TerminalSquare,
  Layers3,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const skillGroups = [
  {
    id: 'frontend',
    title: 'categorias_frontend',
    icon: FileCode2,
    detail: 'Web Development',
    items: [
      { name: 'HTML5', icon: Globe },
      { name: 'CSS', icon: Layers3 },
      { name: 'JavaScript', icon: Code2 },
      { name: 'TypeScript', icon: FileCode2 },
      { name: 'React.js', icon: Cpu },
      { name: 'Next.js', icon: TerminalSquare },
    ],
  },
  {
    id: 'backend',
    title: 'categorias_backend',
    icon: ServerCog,
    detail: 'Backend',
    items: [
      { name: 'PHP', icon: ServerCog },
      { name: 'MySQL', icon: Database },
      { name: 'APIs REST', icon: GitBranch },
      { name: 'MVC', icon: Layers3 },
    ],
  },
  {
    id: 'cms',
    title: 'categorias_cms',
    icon: Globe,
    detail: 'CMS',
    items: [
      { name: 'WordPress', icon: Globe },
      { name: 'Plugins', icon: GitBranch },
      { name: 'Temas', icon: Layers3 },
    ],
  },
  {
    id: 'other',
    title: 'categorias_otros',
    icon: Cpu,
    detail: 'Otros lenguajes',
    items: [
      { name: 'C++', icon: Cpu },
      { name: 'Lua', icon: TerminalSquare },
    ],
  },
  {
    id: 'tools',
    title: 'categorias_herramientas',
    icon: GitBranch,
    detail: 'Herramientas',
    items: [
      { name: 'Git', icon: GitBranch },
      { name: 'GitHub', icon: TerminalSquare },
      { name: 'Figma', icon: Layers3 },
    ],
  },
];

function Skills() {
  const { t } = useLanguage();
  const [activeGroup, setActiveGroup] = useState(skillGroups[0].id);

  const selectedGroup = skillGroups.find((group) => group.id === activeGroup) ?? skillGroups[0];
  const SelectedIcon = selectedGroup.icon;

  return (
    <section className="section">
      <h2 className="section-title">{t('skills_titulo')}</h2>

      <div className="skills-shell">
        <div className="skills-cards">
          {skillGroups.map((group) => {
            const Icon = group.icon;
            const isActive = group.id === activeGroup;

            return (
              <button
                key={group.id}
                type="button"
                className={`skill-category-card ${isActive ? 'active' : ''}`}
                onClick={() => setActiveGroup(group.id)}
              >
                <div className="skill-category-top">
                  <span className="skill-category-icon">
                    <Icon size={22} />
                  </span>
                  <span className="skill-category-meta">{group.items.length} skills</span>
                </div>

                <h3>{t(group.title)}</h3>

                <div className="skill-category-body">
                  <span className="skill-category-count">{group.detail}</span>
                  <span className="skill-category-arrow"><ArrowRight size={18} /></span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="skill-detail-panel" aria-live="polite">
          <div className="skill-detail-title">
            <span className="skill-detail-icon">
              <SelectedIcon size={18} />
            </span>
            <span>{t(selectedGroup.title)}</span>
          </div>

          <div className="skill-detail-grid">
            {selectedGroup.items.map(({ name, icon: ItemIcon }) => (
              <div key={name} className="skill-badge">
                <span className="skill-badge-icon">
                  <ItemIcon size={15} />
                </span>
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
