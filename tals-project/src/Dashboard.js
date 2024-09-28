import React from "react";
import GlobalChart from "./Charts/GlobalChart" ;
import LightsChart from "./Charts/LightsChart" ;
import SecurityChart from "./Charts/SecurityChart" ;
import TempChart from "./Charts/TempChart" ;
import WaterChart from "./Charts/WaterChart" ;

const Dashboard = () =>{
    return(
        <div className="container my-4">
          <h1 className="display-4">Panel de Control</h1>
          <hr/>
          <h2 className="display-6">Global</h2>
          <div className="row d-flex justify-content-center">
            {
            //Vista general
            }
            <div className="card text-bg-light my-3">
              <div className="card-header">Vista Global</div>
                <div className="card-body">
                  <GlobalChart/>  
                </div>
            </div>
            <hr/>
            <h3 className="display-6">Servicios</h3>
            {
            //Awa
            }
            <div className="card text-bg-light col-md-5 mx-3 my-3">
              <div className="card-header">Agua</div>
                <div className="card-body">
                  <WaterChart/>
                </div>
            </div>
            {
            //Luz
            }
            <div className="card text-bg-light col-md-5 mx-3 my-3">
              <div className="card-header">Luminarias</div>
                <div className="card-body">
                  <LightsChart/>
                </div>
            </div>
            {
            //Temperatura
            }
            <div className="card text-bg-light col-md-5 mx-3 my-3">
              <div className="card-header">Temperatura</div>
                <div className="card-body">
                  <TempChart/>
                </div>
            </div>
            {
            //Seguridad
            }
            <div className="card text-bg-light col-md-5 mx-3 my-3">
              <div className="card-header">Seguridad</div>
                <div className="card-body">
                  <SecurityChart/>
                </div>
            </div>
          </div>
        </div>
    );
};
export default Dashboard;