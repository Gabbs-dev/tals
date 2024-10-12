import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

//Services:
import Header from './Header/Header';
import Dashboard from './Dashboard';
import UsersList from './users/UsersList';
import UsersForm from './users/UsersForm';
import LightsList from './services/Lights/LightsList';
import LightsForm from './services/Lights/LightsForm';
import WTList from './services/Water/WaterList';
import WTForm from './services/Water/WaterForm';
import ThermList from './services/Therm/ThermList';
import ThermForm from './services/Therm/ThermForm';
import DevicesList from './services/Devices';
import SprayForm from './services/Water/SprayForm';

//externals
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <Header/>
        <div className="container my-4">
            <Routes>       
                <Route exact path='/' Component={Dashboard} />
                <Route path='/devices' Component={DevicesList} />
                <Route path='/users' Component={UsersList} />
                <Route path='/users/register' Component={UsersForm} />
                <Route path='/users/update/:id' Component={UsersForm} />
                <Route path='/lights' Component={LightsList} />
                <Route path='/lights/config' Component={LightsForm} />
                <Route path='/lights/config/:id' Component={LightsForm} />
                <Route path='/water' Component={WTList} />
                <Route path='/water/tanklevelconfig' Component={WTForm} />
                <Route path='/water/tanklevelconfig/:id' Component={WTForm} />
                <Route path='/water/sprayconfig' Component={SprayForm} />
                <Route path='/water/sprayconfig/:id' Component={SprayForm} />
                <Route path='/thermostat' Component={ThermList} />
                <Route path='/thermostat/config' Component={ThermForm} />
                <Route path='/thermostat/config/:id' Component={ThermForm} />
            </Routes>
        </div>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();