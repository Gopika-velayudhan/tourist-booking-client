import React from "react";
import { useEffect } from "react";
import { FaLocationArrow, FaUsers, FaUserTie } from "react-icons/fa";
import { GiEarthAmerica } from "react-icons/gi";
import "aos/dist/aos.css";
import Aos from "aos";
import "./Service.css";

function Service() {
    useEffect(() => {
        Aos.init({ duration: 1000 });
      }, []);
  return (
    <div className="container-service">
      <h1 className="section-heading" data-aos="fade-down">Why Travel With ExploreEpic</h1>
      <div className="service-cards">
        <div className="service-card">
          <FaUserTie className="service-icon" />
          <h2 className="service-title">Our WorldWide Guide</h2>
          <p className="service-description">
            With 1400+ 5 stars review on Tripadvisor by travellers on all over
            the world. We are very proud to be one of the best travel companies
            in Vietnam.
          </p>
        </div>
        <div className="service-card"  >
          <GiEarthAmerica className="service-icon" />
          <h2 className="service-title">100% Trusted Tour Agency</h2>
          <p className="service-description">
            After a long time trying our best, we are proud to be in the top 10
            typical enterprises of UNESCO. Recognized by Vietnam Union of UNESCO.
          </p>
        </div>
        <div className="service-card">
          <FaLocationArrow className="service-icon" />
          <h2 className="service-title">17+ years of experience</h2>
          <p className="service-description">
            Explore-Epic is proud to be recommended in one of the world's renowned
            travel books - Le Petit Fute book. Travelami was also recommended.
          </p>
        </div>
        <div className="service-card" >
          <FaUsers className="service-icon" />
          <h2 className="service-title">98% Of Our Travelers Are Happy</h2>
          <p className="service-description">
            You can discover the distinctive features and differences in culture,
            beautiful scenery, and people of both Northern and Southern Vietnam.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Service;
