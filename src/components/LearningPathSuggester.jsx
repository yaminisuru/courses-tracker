import { useState, useEffect } from 'react';
import '../styles/LearningPathSuggester.css';

const LearningPathSuggester = ({ selectedDomain }) => {
  const [learningPath, setLearningPath] = useState([]);

  const coreSkills = {
    "Web Development": [
      { skill: "HTML/CSS", objectives: ["Learn HTML basics", "Learn CSS basics", "Learn responsive design"] },
      { skill: "JavaScript", objectives: ["Basic syntax", "DOM manipulation", "ES6 features"] },
      { skill: "Frontend Frameworks", objectives: ["Introduction to React", "State management", "Component lifecycle"] },
      { skill: "Backend Development", objectives: ["Basics of Node.js", "Building RESTful APIs", "Authentication and security"] },
      { skill: "Databases", objectives: ["SQL basics", "NoSQL basics", "Database design"] },
      { skill: "Version Control", objectives: ["Git basics", "Branching and merging", "Collaboration workflows"] },
      { skill: "Deployment and DevOps", objectives: ["Web hosting basics", "CI/CD", "Monitoring and maintenance"] },
    ],
    "Data Science": [
      { skill: "Python", objectives: ["Learn Python basics", "Data structures in Python", "Python libraries for data science"] },
      { skill: "Statistics", objectives: ["Descriptive statistics", "Inferential statistics", "Hypothesis testing"] },
      { skill: "Machine Learning", objectives: ["Supervised learning", "Unsupervised learning", "Model evaluation"] },
      { skill: "Data Visualization", objectives: ["Matplotlib basics", "Seaborn basics", "Plotly basics"] },
      { skill: "Data Wrangling", objectives: ["Data cleaning", "Data transformation", "Handling missing data"] },
    ],
    "Cybersecurity": [
      { skill: "Network Security", objectives: ["Basics of networking", "Network protocols", "Network security tools"] },
      { skill: "Cryptography", objectives: ["Basic encryption", "Public key cryptography", "Cryptographic protocols"] },
      { skill: "Threat Analysis", objectives: ["Identifying threats", "Risk assessment", "Threat mitigation strategies"] },
      { skill: "Security Operations", objectives: ["Monitoring systems", "Incident response", "Forensic analysis"] },
    ],
    "Artificial Intelligence": [
      { skill: "Machine Learning", objectives: ["Supervised learning", "Unsupervised learning", "Reinforcement learning"] },
      { skill: "Neural Networks", objectives: ["Basics of neural networks", "Deep learning", "Convolutional neural networks"] },
      { skill: "Natural Language Processing", objectives: ["Text processing", "Language models", "Sentiment analysis"] },
      { skill: "AI Ethics", objectives: ["Bias in AI", "Fairness", "Transparency and accountability"] },
    ],
    "Cloud Computing": [
      { skill: "Cloud Fundamentals", objectives: ["Basics of cloud computing", "Service models (IaaS, PaaS, SaaS)", "Cloud providers"] },
      { skill: "AWS", objectives: ["EC2 basics", "S3 basics", "RDS basics"] },
      { skill: "Azure", objectives: ["Azure basics", "Azure storage", "Azure databases"] },
      { skill: "Google Cloud", objectives: ["GCP basics", "Compute Engine", "Cloud Storage"] },
    ],
    "Mobile Development": [
      { skill: "iOS Development", objectives: ["Swift basics", "Xcode basics", "UI design"] },
      { skill: "Android Development", objectives: ["Java/Kotlin basics", "Android Studio basics", "UI design"] },
      { skill: "Cross-Platform Development", objectives: ["React Native basics", "Flutter basics", "Performance optimization"] },
    ],
    "Blockchain": [
      { skill: "Blockchain Basics", objectives: ["Blockchain fundamentals", "Consensus mechanisms", "Blockchain applications"] },
      { skill: "Ethereum", objectives: ["Smart contracts", "Solidity basics", "Decentralized applications"] },
      { skill: "Bitcoin", objectives: ["Bitcoin basics", "Bitcoin network", "Mining and transactions"] },
      { skill: "Blockchain Security", objectives: ["Security challenges", "Cryptographic principles", "Attack vectors"] },
    ],
    "Game Development": [
      { skill: "Game Design", objectives: ["Game design principles", "Level design", "User experience"] },
      { skill: "Unity", objectives: ["Unity basics", "C# scripting", "3D game development"] },
      { skill: "Unreal Engine", objectives: ["Unreal Engine basics", "Blueprints", "3D game development"] },
      { skill: "Game Physics", objectives: ["Physics simulation", "Collision detection", "Animation principles"] },
    ],
    "Internet of Things (IoT)": [
      { skill: "IoT Fundamentals", objectives: ["IoT basics", "IoT architectures", "IoT applications"] },
      { skill: "IoT Hardware", objectives: ["Arduino basics", "Raspberry Pi basics", "Sensor integration"] },
      { skill: "IoT Software", objectives: ["IoT protocols", "Data collection", "Cloud integration"] },
      { skill: "IoT Security", objectives: ["IoT security challenges", "Encryption and authentication", "Secure communication"] },
    ],
    "DevOps": [
      { skill: "DevOps Fundamentals", objectives: ["DevOps principles", "CI/CD pipelines", "Infrastructure as code"] },
      { skill: "Containerization", objectives: ["Docker basics", "Container orchestration", "Kubernetes basics"] },
      { skill: "Monitoring and Logging", objectives: ["Monitoring tools", "Log management", "Incident response"] },
      { skill: "Cloud DevOps", objectives: ["Cloud infrastructure", "Cloud automation", "Cloud security"] },
    ]
  };

  useEffect(() => {
    if (selectedDomain && coreSkills[selectedDomain]) {
      setLearningPath(coreSkills[selectedDomain]);
    } else {
      setLearningPath([]);
    }
  }, [selectedDomain]);

  return (
    <div className="learning-path-suggester">
      <h2>Suggested Learning Path for {selectedDomain || 'Select a Domain'}</h2>
      <div className="learning-path-list">
        <ul>
          {learningPath.map((item, index) => (
            <li key={index}>
              <strong>{item.skill}</strong>
              <ul>
                {item.objectives.map((objective, i) => (
                  <li key={i}>{objective}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LearningPathSuggester;