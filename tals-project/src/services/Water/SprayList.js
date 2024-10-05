import SprayItem from './SprayItem';
import WaterChart from '../../Charts/WaterChart';

const SprayList = () => {

    return (
        <div className='row'>
            <h1 className='display-5 mt-5'>Control de Regado</h1>
            <hr className='divider'/>
            <div className="card text-bg-light mx-3 my-3">
              <div className="card-header">Resumen Global</div>
                <div className="card-body">
                    <WaterChart/>
                </div>
            </div>
            <h2 className='display-6 mt-5'>Dispositivos Activos</h2>
            <hr className='divider'/>
            <SprayItem/>
            <h2 className='display-6 mt-5'>Configuración</h2>
            <hr className='divider'/>
            <div className="card text-bg-light mx-3 my-3">
                <div className="d-flex align-items-center justify-content-between card-header">
                    <h4>Resumen Global</h4>
                    <button className='btn btn-primary'>Configurar Dispositivo</button>
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
        </div>
    );
};

export default SprayList;