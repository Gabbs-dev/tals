import React from "react";
import GlobalChart from "./Charts/GlobalChart" ;
import LightsChart from "./Charts/LightsChart" ;
import SecurityChart from "./Charts/SecurityChart" ;
import TempChart from "./Charts/TempChart" ;
import WaterChart from "./Charts/WaterChart" ;

const Dashboard = () =>{
    return(
        <div className="row">
          <h1 className="display-4">Panel de Control</h1>
          <hr/>
          <div className="col-md-8 my-3">
            <h2 className="display-6">Global</h2>
            <hr/>
            <div className="card text-bg-light my-3">
              <div className="card-header">Vista Global</div>
              <div className="card-body">
                <GlobalChart/> 
              </div>
            </div>
            <div className="card text-bg-light my-3">
              <div className="card-header">Vista Global</div>
              <div className="card-body">
                <GlobalChart/> 
              </div>
            </div>
            <div className="card text-bg-light my-3">
              <div className="card-header">Vista Global</div>
              <div className="card-body">
                <GlobalChart/> 
              </div>
            </div>
          </div>
          <div className="col-md-4 my-3">
            <h3 className="display-6">Servicios</h3>
            <hr/>
            <div className="card text-bg-light my-3">
              <div className="card-header">Agua</div>
              <div className="card-body">
                  <WaterChart/>
                </div>
            </div>
            <div className="card text-bg-light my-3">
              <div className="card-header">Luminarias</div>
              <div className="card-body">
                <LightsChart/>
              </div>
            </div>
            <div className="card text-bg-light my-3">
              <div className="card-header">Temperatura</div>
              <div className="card-body">
                <TempChart/>
              </div>
            </div>
            <div className="card text-bg-light my-3">
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