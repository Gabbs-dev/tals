﻿import React from "react";
import { Offcanvas,Collapse } from "bootstrap";

const Header = () => {
    return(
        <header>
            <nav className="navbar navbar-dark bg-black">
              <div className="container-fluid">
                <a className="navbar-brand" href="/">TALS</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                  <div className="offcanvas-header">
                    <h5 className="offcanvas-title">Menú Principal</h5>
                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                  </div>
                  <div className="offcanvas-body">
                    <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                      <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/">Dashboard</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link active" href="/users">Usuarios</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link active" href="/devices">Agregar Dispositivo</a>
                      </li>
                      <li className="nav-item">
                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button bg-dark text-white" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                                        Servicios
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse show">
                                    <div className="accordion-body bg-dark">
                                        <ul className="navbar-nav">
                                           <li className="nav-item"><a className="nav-link active" href="/lights">Luminarias</a></li> 
                                        </ul>
                                        <ul className="navbar-nav">
                                           <li className="nav-item"><a className="nav-link active" href="/water">Agua</a></li> 
                                        </ul>
                                        <ul className="navbar-nav">
                                           <li className="nav-item"><a className="nav-link active" href="/thermostat">Temperatura</a></li> 
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </nav>
        </header>
    );
    // eslint-disable-next-line
};

export default Header;