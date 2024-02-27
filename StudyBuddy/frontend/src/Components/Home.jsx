import React from "react";
import "./home.css";
import logo from "./images/Logo ICON.svg";
import { Link } from "react-router-dom";
import back2 from "./images/back2.png";
const Home = () => {
  return (
    <>
      <nav className="navbar navbar-light d-flex justify-content-between">
        <div className=" px-4 d-flex flex-row align-items-center">
          <img src={logo} alt="" className="" width="35px" />
          <p className="my-1 stud">Study</p>
          <p className="my-1 bud">Buddy</p>
        </div>

        <div
          className=" align-items-center justify-content-center"
          id="navbarCenteredExample"
        >
          <div className="d-flex flex-row  align-items-center justify-content-center">
            <div className="nav-item">
              <a
                className="nav-link active ms-4 tabs"
                aria-current="page"
                href="#home"
              >
                Home
              </a>
            </div>
            <div className="nav-item">
              <a className="nav-link active ms-4 tabs" href="#aboutus">
                About Us
              </a>
            </div>
            <div className="nav-item">
              <a className="nav-link active ms-4 tabs" href="#features">
                Features
              </a>
            </div>
            <div className="nav-item">
              <a className="nav-link active ms-4 tabs" href="#service">
                Services
              </a>
            </div>
            <div className="nav-item">
              <a className="nav-link active ms-4 tabs" href="#counter">
                Reviews
              </a>
            </div>
          </div>
        </div>

        <div className="px-4">
          <Link to={`/login`}>
            <button className="btn btn-primary text-end ms-5 getstarted">
              Get Started
            </button>
          </Link>
        </div>
      </nav>

      <div className="container-fluid banner main-section" id="home">
        <div className="row mainfourbox">
          <div className="col-lg-6 mt-5 pt-5">
            <img src={back2} alt="" />
          </div>
          <div className="col-lg-6 text-light mt-5 pt-5 align-items-center justify-content-center align-self-center text-light">
            <h1 className="fw-bold heading">Welcome to StudyBuddy</h1>
            <h6 className="banner-text">
              Elevate your study experience with Study Buddy, a comprehensive{" "}
              <br />
              MERN stack app designed to empower students like you.
            </h6>
          </div>
        </div>
      </div>

      <div
        className="container-fluid choose-bg pt-5  main-section  text-center"
        id="service"
      >
        <div className="mt-5">
          <div className="col-lg-12 rollin">
            <h1 className="text-light">
              Why Choose <span className="spanbuddy ">StudyBuddy?</span>
            </h1>
          </div>
          <div className="col-lg-12 mt-5">
            <div className="row mainfourbox d-flex justify-content-evenly ">
              <div className="col-3 text-wrap shadow-lg fourbox">
                <h4 className="pt-4 fw-bold"> Effortless Note-Taking</h4>
                <hr />
                <p>
                  Capture and organize your study insights effortlessly. Study
                  Buddy makes note-taking a breeze, helping you focus on what
                  matters most - learning.
                </p>
              </div>

              <div className="col-3 text-wrap shadow-lg fourbox sub-section-bottom">
                <h4 className="pt-4 fw-bold">Task Management Made Simple</h4>
                <hr />
                <p>
                  Stay on top of your academic tasks with our intuitive task
                  manager. Prioritize assignments, set deadlines, and watch your
                  productivity soar.
                </p>
              </div>

              <div className="col-3 text-wrap shadow-lg fourbox sub-section-right">
                <h4 className="pt-4 fw-bold">Connect and Collaborate</h4>
                <hr />
                <p>
                  Dive into a world of collaboration with our real-time chat
                  feature. Connect with peers, discuss coursework, and share
                  knowledge effortlessly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container-fluid counter " id="counter">
        <div class="text-center pt-5 counterinner">
          <div class="row text-light mt-5 pt-3">
            <div class="col-lg-3">
              <div class="employees border border-2 border-light  rounded-5">
                <span class="counterinner-count text-light fs-1">879</span>
                <br />
                <p class="employee-p ">Happy Clients</p>
                <br />
              </div>
            </div>

            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
              <div class="customer border border-2 border-light rounded-5">
                <span class="counterinner-count text-light fs-1">954</span>
                <p class="customer-p">Customer recommend us</p>
                <br />
              </div>
            </div>

            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
              <div class="design border border-2 border-light rounded-5">
                <span class="counterinner-count text-light fs-1">1050</span>
                <br />
                <p class="design-p">Our company's rating </p>
                <br />
              </div>
            </div>

            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
              <div class="order border border-2 border-light rounded-5">
                <span class="counterinner-count text-light fs-1">99</span>
                <span class="fs-1">%</span>
                <br />
                <p class="order-p">Client Satisfaction Rate</p>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid footer">
        <div className="text-center text-white border-top pt-3 pb-1">
          <p>Copyright all rights reserved</p>
        </div>
      </div>
    </>
  );
};

export default Home;
