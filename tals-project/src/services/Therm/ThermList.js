import ThermostatItem from './ThermostatItem';
import TempCharts from '../../Charts/TempChart';

const ThermList = () => {
    return (
        <div className='row'>
            <h1 className='display-4 text-center'>Panel de Control / Temperatura</h1>
            <hr className='divider'/>
            <h2 className='display-6 mt-5'>Dispositivos Activos</h2>
            <hr className='divider'/>
            <div className="col-md-4">
                <ThermostatItem />
            </div>
            <div className="col-md-8">
                <div className="card text-bg-light">
                    <div className="card-header">Resumen Global</div>
                    <div className="card-body">
                        <TempCharts/>
                    </div>
                </div>
            </div>
            <h2 className='display-6 mt-5'>Configuracion</h2>
            <hr className='divider'/>
            <div className="card text-bg-light mt-3">
                <div className="d-flex justify-content-between card-header">
                    <h4>Resumen Global</h4>
                    <a className='btn btn-primary' href="/thermostat/config">Configurar Dispositivo</a>
                </div>
                <div className="card-body">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Dispositivos</th>
                                <th scope="col">Actividad</th>
                                <th scope="col">Horas de Uso</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Termostato</td>
                                <td>Activo</td>
                                <td>15:20</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Termostato</td>
                                <td>Activo</td>
                                <td>20:48</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Termostato</td>
                                <td>Inactivo</td>
                                <td>32:48</td>
                            </tr>
                            <tr>
                                <th scope="row">4</th>
                                <td>Termostato</td>
                                <td>Inactivo</td>
                                <td>32:48</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ThermList;