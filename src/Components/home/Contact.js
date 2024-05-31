import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Contact.css";

function Contact() {
  return (
    <div className="main">
      <section className="contact">
        <div className="content">
          <h2>Contact us</h2>
          <p>asdfghjkhgfdsdfghjhgfd</p>
        </div>
        <div className="container">
          <div className="contactInfo">
            <div className="box">
              <div className="icon">
                <i className="fa fa-map-marker" aria-hidden="true"></i>
              </div>
              <div className="text">
                <h3>Address</h3>
                <p>
                  kinfra near road kakkenjeri,
                  <br /> 
                  calicut,
                  <br /> 
                  676317
                </p>
              </div>
            </div>
            <div className="box">
              <div className="icon">
                <i className="fa fa-phone" aria-hidden="true"></i>
              </div>
              <div className="text">
                <h3>Phone</h3>
                <p>123-456-963</p>
              </div>
            </div>
            <div className="box">
              <div className="icon">
                {" "}
                <i className="fa fa-envelope-o" aria-hidden="true"></i>
              </div>
              <div className="text">
                <h3>Email</h3>
                <p>abc@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="contactForm">
            <form>
              <h2>send message</h2>
              <div className="inputBox">
                <input type="text" name="" required="required" />
                <span>FUll Name</span>
              </div>
              <div className="inputBox">
                <input type="email" name="" required="required" />
                <span>Email</span>
              </div>
              <div className="inputBox">
                <textarea required="required"></textarea>
                <span>Type your message</span>
              </div>
              <div className="inputBox">
                <input
                  type="submit"
                  value="send"
                  required="required"
                  name=""
                />
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
