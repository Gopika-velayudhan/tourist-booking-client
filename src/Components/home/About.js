import React from "react";
import about1 from '../Assests/about3.jpg';
import about2 from '../Assests/aout2.jpg';
import about3 from '../Assests/about image.webp';
import './About.css'; 

function About() {
  return (
    <div className="about-container">
      <div className="about-images">
        <img src={about3} alt="about" className="img1"/>
        <img src={about1} alt="about" className="img2" />
        <img src={about2} alt="about" className="img3" />
      </div>
      <div className="about-text">
        <h1 className="about-heading">About ExploreEpic</h1>
        <h2 className="about-subheading">Who We Are</h2>
        <p>
          Welcome to the wonderland of all time, explore the beauty of India
          through ExploreEpic and write your daily with more and more happy
          moments through India Tour Packages. We help you to craft the outing
          in India by exploring the elegance and culture of India.
        </p>
        <p>
          Explore Epic welcomes you to explore the gracefulness of India through
          exciting India Tour Packages. We invite you to experience the
          charismatic architecture of India to have a remarkable travel memory
          in the entire life. We believe in the culture of India Athithi Devo
          Bhava which means treating the Guest as God, so we are really honest
          to say that we believe in the happiness of our Guests.
        </p>
        <p>
          Our Dedicated Team will guide you from the beginning with India's beauty in
          backwaters, plantations, mountains, beaches etc... to have a great
          memory in Incredible India. We have the most exciting packages for
          your happy journey in India.
        </p>
        <p>
          Join ExploreEpic to experience the perfect blend with travel experience
          and our culture through India Tour Packages. Feel the freshness of India
          through ExploreEpic and get close to nature by exploring hilly mountains,
          plantations, backwaters, beaches and much more. We assure your transformation
          as a Keralite after your days with ExploreEpic by grasping the culture
          and beauty of Incredible India.
        </p>
      </div>
    </div>
  );
}

export default About;
