import { useState } from 'react';
import LearningPathSuggester from './LearningPathSuggester';
import '../styles/LearningPathTool.css';
import Navigation from './navigation';

const LearningPathTool = () => {
  const [selectedDomain, setSelectedDomain] = useState(null);

  const allDomains = [
    "Web Development", "Game Development", "Data Science", "Cybersecurity",
    "Artificial Intelligence", "Cloud Computing", "Mobile Development",
    "Blockchain", "Internet of Things (IoT)", "DevOps"
  ];

  const handleDomainSelect = (domain) => {
    setSelectedDomain(domain);
  };

  return (
    <div>
      <Navigation/>
    <div className="learning-path-tool">
      <h1>Learning Path Tool</h1>
      <div className="domains">
        {allDomains.map((domain) => (
          <button
            key={domain}
            className={selectedDomain === domain ? 'selected' : ''}
            onClick={() => handleDomainSelect(domain)}
          >
            {domain}
          </button>
        ))}
      </div>
      {selectedDomain && <LearningPathSuggester selectedDomain={selectedDomain} />}
    </div>
    </div>
  );
};

export default LearningPathTool