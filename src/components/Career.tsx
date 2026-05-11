import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Senior Experience Engineer</h4>
                <h5>Publicis Sapient</h5>
              </div>
              <h3>2021–NOW</h3>
            </div>
            <p>
              Developed and maintained a digital platform using React.js, Redux, Hooks, 
              and Material UI. Implemented comprehensive testing achieving 95% code coverage. 
              Developed Prisma-based PostgreSQL schemas and REST APIs with Express JS. 
              Optimized UI/UX performance, improving application load time by 30%.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Senior Engineer</h4>
                <h5>Brillio Technologies</h5>
              </div>
              <h3>2021-21</h3>
            </div>
            <p>
              Feb 2021 – Oct 2021. Led the migration of a legacy web application from Ext JS to React.js, 
              implementing Redux and Saga for state management. Ensured code quality 
              by adhering to ESLint and Sonar standards, reducing bugs by 25%. 
              Supervised a team of 5 developers, providing mentorship.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineer</h4>
                <h5>Mediaocean</h5>
              </div>
              <h3>2019–21</h3>
            </div>
            <p>
              Jan 2019 – Feb 2021. Developed an advertising product using Knockout.js and React.js. 
              Built responsive and adaptive web applications ensuring compatibility 
              across devices and browsers. Mentored 3 junior developers and improved 
              code quality by implementing TDD, increasing test coverage by 40%.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Application Developer</h4>
                <h5>Fujitsu Consulting India</h5>
              </div>
              <h3>2016–19</h3>
            </div>
            <p>
              June 2016 – Jan 2019. Revamped the user interface of a cloud-based product using HTML5, CSS3, 
              JavaScript, Bootstrap, and AngularJS, improving user engagement by 15%. 
              Designed wireframes and mockups for layout pages. Achieved Single Page 
              Application (SPA) behavior using modern JavaScript frameworks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
