import React, {useEffect, useState} from 'react';
import {ABOUT_LINKS, ABOUT_ME} from "../const/About";

export default function Boring(props) {

  return (
    <div className="site-wrapper">
      <link rel="stylesheet" type="text/css" href={"/style/Professional.css"} />

      <div className="site-wrapper-inner">

        <div className="cover-container">

          <div className="masthead clearfix">
            <div className="inner">
              <nav>
                <ul className="nav masthead-nav">
                  <li>
                    <a href="https://github.com/renrut" id="git_button">
                      <img src="/images/git_button.png" width="36" height="36"/>
                    </a>
                  </li>

                  <li>
                    <a href="https://www.linkedin.com/pub/turner-strayhorn/a4/95/bb2">
                      <img src="/images/linkedin_button.png" width="36" height="36"/>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div className="inner cover">
            <h1 className="cover-heading">Turner Strayhorn</h1>
            <p className="about-text">
              {ABOUT_ME}
              {ABOUT_LINKS}
            </p>
            <p className="lead">
              <div className="row buttons">
                <div className={"btn"}>
                  <a className="btn btn-lg btn-default" href="https://www.linkedin.com/pub/turner-strayhorn/a4/95/bb2">View My LinkedIn</a>
                </div>
                <div className={"btn"}>
                  <a className="btn btn-lg btn-default" href="/documents/resume.pdf">View My Resume</a>
                </div>
              </div>
            </p>
          </div>

          <div className="mastfoot">
            <div className="inner">
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
