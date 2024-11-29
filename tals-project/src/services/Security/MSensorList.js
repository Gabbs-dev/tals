import MSensorItem from './MSensorItem';
import SecurityChart from '../../Charts/SecurityChart';

const MSensorList = () => {

    return (
        <div className='row'>
            <h1 className='display-6 mt-5'>Sensor de Movimiento</h1>
            <hr className='divider'/>
            <div className="col">
                <MSensorItem/>
                {/*}
                <div className="card text-bg-light">
                    <div className="card-header">Historial</div>
                    <div className="card-body">
                    </div>
                </div>
                {*/}
            </div>
            {/*}
            <div className="col-md-8">
                <div className="card text-bg-light">
                    <div className="card-header">Resumen Global</div>
                    <div className="card-body">
                        <SecurityChart/>
                    </div>
                </div>
            </div>
            {/*}
            <h2 className='display-6 mt-3'>Control de Regado / Configuración</h2>
            <hr className='divider'/>
            <div className="card text-bg-light mt-3">
                <div className="d-flex aling-items-center justify-content-between card-header">
                    <h4>Resumen Global</h4>
                    <a className='btn btn-primary' href="/water/sprayconfig">Configurar Dispositivo</a>
                </div>
                <div className="card-body">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Dispositivos</th>
                                <th scope="col">Actividad</th>
                                <th scope="col">Humedad del Suelo</th>
                                <th scope="col">Inicio Regado Automático</th>
                                <th scope="col">Ciere Regado Automático</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Jardín</td>
                                <td>Activo</td>
                                <td>80%</td>
                                <td>16:00</td>
                                <td>16:01</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            {*/}
        </div>
    );
};

export default MSensorList;