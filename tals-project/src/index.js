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

//externals
import 'bootstrap/dist/css/bootstrap.min.css';
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
                <Route path='/lights/register' Component={LightsForm} />
                <Route path='/lights/update/:id' Component={LightsForm} />
                <Route path='/water' Component={WTList} />
                <Route path='/water/register' Component={WTForm} />
                <Route path='/water/update/:id' Component={WTForm} />
                <Route path='/thermostat' Component={ThermList} />
                <Route path='/thermostat/register' Component={ThermForm} />
                <Route path='/thermostat/update/:id' Component={ThermForm} />
            </Routes>
        </div>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();