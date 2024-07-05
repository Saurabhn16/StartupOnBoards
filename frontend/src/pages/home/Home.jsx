import React, { useState } from "react";
import './Home.css';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const [activeSection, setActiveSection] = useState(null);

  const handleSectionClick = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };
  const history = useNavigate();


  const handleSectionClicksearch = () => {
    history('/search');
  };

  const handleSectionClickquiz = () => {
    history('/quiz');
  };

  const handleSectionClickchat = () => {
    history('/messages');
  };

  const handleSectionClickevent = () => {
    history('/events');
  };

  const handleSectionClickblog = () => {
    history('/blogs');
  };

  return (
    <div className="home-container">
      <header>
        <nav>
        <ul>
            <li className={activeSection === "founders" ? "active" : ""} onClick={() => handleSectionClick("founders")}> Founders</li>
            <li className={activeSection === "investors" ? "active" : ""} onClick={() => handleSectionClick("investors")}>Investors</li>
            <li className={activeSection === "mentors" ? "active" : ""} onClick={() => handleSectionClick("mentors")}> Mentors</li>
          </ul>
        </nav>
      </header>

      {activeSection === "founders" && (
        <section className="content-section fade-in" onClick={handleSectionClicksearch}>
          
          <img src="https://www.thestartupboard.com/assets/images/elements/founder.svg" alt="Founder" className="image-left" />
          <div className="content">
            <h2>For Founders</h2>
            <p>This platform is to make your entrepreneurial journey easier. Created by a serial entrepreneur, this platform can connect you with mentors, investors, and vendors. Make the best use of it.</p>
          </div>
        </section>
      )}

      {activeSection === "investors" && (
        <section className="content-section fade-in" onClick={handleSectionClicksearch}>
          <img src="https://www.thestartupboard.com/assets/images/elements/investor.svg" alt="Investor" className="image-right" />
          <div className="content">
            <h2>For Investors</h2>
            <p>We know money is not a problem for the deserving Startup venture. All investors would love to invest. How do you find the good ones, easily? The Startup Board facilitates to connect you with founders whose ventures you may shortlist based on the filters. You may review or download the pitch deck, video and other collateral, and meet-up in virtual meetings without secretarial coordination. TSB helps you reduce your investment risk.</p>
          </div>
        </section>
      )}

{activeSection === "mentors" && (
        <section className="content-section fade-in" onClick={handleSectionClicksearch}>
          <img src="https://www.thestartupboard.com/assets/images/elements/mentor.svg" alt="Mentor" className="image-left" />
          <div className="content">
            <h2>For Mentors</h2>
            <p>Startup founders are creating the disruptions at a fraction of the cost that corporate probably would be able to do. It is stimulating to discuss, advise, and gain insights in brainstorming sessions with founders. Many foreign company executives are already using mentoring not only to support entrepreneurs and their journey, but also to de-risk their current business or enter into new emerging sectors.</p>
          </div>
        </section>
      )}

      <section className="subsections">
        <div className="subsection">
          <div className="content">
            <h2>Connect with Founder</h2>
            <p>Senior corporate professionals are talking to Startup founders for stimulated two-way learning. This also helps them in their workplace. Advising and exposing connections to help support founders doesn’t go waste.</p>
          </div>
          <img src="https://www.thestartupboard.com/assets/images/elements/founder.svg" alt="Founder" className="image-left" />
        </div>

        <div className="subsection">
          <img src="https://www.thestartupboard.com/assets/images/elements/investor.svg" alt="Investor" className="image-right" />
          <div className="content">
            <h2>Remunerative</h2>
            <p>If so chosen, mentors can charge and founders select you appropriately. Remuneration methods are not only cash but many others.</p>
          </div>
        </div>

        <div className="subsection">
          <img src="https://www.thestartupboard.com/assets/images/elements/show-venture.svg" alt="Show Venture" className="image-left" />
          <div className="content">
            <h2>Choose Founders & Venture</h2>
            <p>TSB helps you choose from a wide variety of founders and ventures, with sectors of your interest and competency.</p>
          </div>
        </div>

        <div className="subsection">
          <div className="content" onClick={handleSectionClickevent}>
            <h2>Join the events</h2>
            <p>Get to know and join the events, relevant to you. You may offer to be a speaker.</p>
          </div>
          <img src="https://www.thestartupboard.com/assets/images/elements/events.svg" alt="Events" className="image-right" />
        </div>

        <div className="subsection">
          <img src="https://www.thestartupboard.com/assets/images/elements/development.svg" alt="Ecosystem Products" className="image-left" />
          <div className="content"onClick={handleSectionClickblog}>
            <h2>Ecosystem Products</h2>
            <p>Get the best products from fellow founders, or other companies (coming).</p>
          </div>
        </div>

        <div className="subsection">
          <div className="content" onClick={handleSectionClicksearch}>
            <h2>Save time in finding vendors</h2>
            <p>Verified vendors are more credible to source from at negotiated rates (coming).</p>
          </div>
          <img src="https://www.thestartupboard.com/assets/images/elements/saves-time.svg" alt="Save Time" className="image-right" />
        </div>
        <div className="subsection">
          <img
            src="https://www.thestartupboard.com/assets/images/elements/virtual-meeting.svg"
            alt="Chat"
            className="image-right"
          />
          <div className="content" onClick={handleSectionClickchat}>
            <h2>Chat Functionality </h2>
            <p>
              Connect with mentors, founders, and investors through our
              intuitive chat feature. Coming soon to enhance your networking
              experience.
            </p>
          </div>
        </div> <div className="subsection">
          <img
            src="https://www.thestartupboard.com/assets/images/elements/support.svg"
            alt="Quiz"
            className="image-left"
          />
          <div className="content"  onClick={handleSectionClickquiz}>
            <h2>Quiz Section (Coming Soon)</h2>
            <p>
              Test your startup knowledge with our interactive quiz section.
              Challenge yourself and learn more about the startup ecosystem.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
