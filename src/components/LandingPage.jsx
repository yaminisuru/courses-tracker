import React, { useState } from 'react';
import '../styles/landingpage.css';

function LandingPage() {
  const [faqOpen, setFaqOpen] = useState({});

  const toggleFaq = (index) => {
    setFaqOpen((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const faqs = [
    { question: "What is Smart Learning Paths?", answer: "Smart Learning Paths is your ultimate learning companion offering personalized learning journeys, diverse topics, and refined skills." },
    { question: "How does it work?", answer: "Our system designs better learning paths using a simplified approach, ensuring you track progress with real-time analytics." },
    { question: "What topics are covered?", answer: "We cover a range of topics including Web Development, Competitive Skills, and Interview Preparation." },
    { question: "Is there a cost to use Smart Learning Paths?", answer: "Some features of Smart Learning Paths are free, while others require a subscription. We offer various plans to suit your needs." },
    { question: "Can I track my learning progress?", answer: "Yes, you can track your learning progress with real-time analytics and detailed reports." },
    { question: "Can I suggest new features or improvements?", answer: "Absolutely! We welcome feedback from our users. You can suggest new features or improvements through our contact form." },
    { question: "Is there support available if I encounter issues?", answer: "Yes, we have a support team available to assist you. You can contact us via email or our support page." }
  ];

  const handleGetStarted = () => {
    // Redirect to the registration or login page
    window.location.href = '/register'; // Replace with actual path to your registration or login page
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Welcome to Smart Learning Paths</h1>
        <p>Your personalized learning journey starts here. Explore, track, and excel with ease.</p>
        <button className="button call-to-action" onClick={handleGetStarted}>Get Started</button>
      </header>
      <main className="main">
        <section className="how-it-works">
          <h2>How It Works</h2>
          <p>Our platform simplifies learning by creating personalized paths, tracking your progress, and providing interactive modules to keep you engaged. Here's how:</p>
          <ol>
            <li>Sign up and personalize your profile.</li>
            <li>Explore our wide range of courses and learning paths.</li>
            <li>Track your progress with real-time analytics.</li>
            <li>Engage with interactive modules and quizzes.</li>
            <li>Receive recommendations based on your learning goals.</li>
          </ol>
        </section>
        <section className="features">
          <h2>Features</h2>
          <div className="feature">
            <div className="icon">
              <img src="/courselisting.jpg" alt="Course Listing" />
            </div>
            <h3>Course Listing</h3>
            <p>Discover a diverse range of courses tailored to enhance your skills and knowledge.</p>
            <button className="button">Explore →</button>
          </div>
          <div className="feature">
            <div className="icon">
              <img src="/courses.jpg" alt="Learning Paths" />
            </div>
            <h3>Personalized Learning Paths</h3>
            <p>Create customized learning paths to achieve your educational goals more effectively.</p>
            <button className="button">Explore →</button>
          </div>
          <div className="feature">
            <div className="icon">
              <img src="/progress.jpg" alt="Progress Tracking" />
            </div>
            <h3>Progress Tracking</h3>
            <p>Monitor your learning journey with detailed progress reports and real-time analytics.</p>
            <button className="button">Explore →</button>
          </div>
        </section>
        <section className="animation-section">
          <h2>Discover Our Interactive Learning Modules</h2>
          <div className="animation">
            <img src="/logo.jpg" alt="Interactive Learning Modules" />
            <p>Engage with our interactive modules to enhance your learning experience.</p>
          </div>
        </section>
        <section className="testimonials">
          <h2>What Our Users Say</h2>
          <div className="testimonial">
            <p>"Smart Learning Paths transformed my approach to learning. The personalized recommendations are spot-on!"</p>
            <h4>- Alex Johnson</h4>
          </div>
          <div className="testimonial">
            <p>"The progress tracking feature is a game-changer. I can see exactly where I need to focus my efforts."</p>
            <h4>- Jamie Lee</h4>
          </div>
          <div className="testimonial">
            <p>"The course variety and quality are exceptional. I've learned so much in a short amount of time."</p>
            <h4>- Casey Morgan</h4>
          </div>
        </section>
        <section className="faq">
          <h2>Frequently Asked Questions</h2>
          {faqs.map((faq, index) => (
            <div key={index} className={`faq-item ${faqOpen[index] ? 'open' : ''}`}>
              <div className="faq-question" onClick={() => toggleFaq(index)}>
                {faq.question}
              </div>
              {faqOpen[index] && (
                <div className="faq-answer">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </section>
        <section className="call-to-action-section">
          <h2>Ready to Start Your Learning Journey?</h2>
          <p>Join thousands of learners who are transforming their skills with Smart Learning Paths.</p>
          <button className="button call-to-action" onClick={handleGetStarted}>Get Started Now</button>
        </section>
      </main>
      <footer className="footer">
        <p>&copy; SLP 2024 All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
