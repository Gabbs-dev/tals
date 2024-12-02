const ThermostatItem = ({temperatura,humedad,niveles}) => {
    return (
        <div className="d-flex flex-row mb-3 justify-content-evenly">
            <div className='d-flex flex-column'>
                <div className="card card-body">
                    <h3 className="card-tittle">Termómetro:</h3>
                    <p className="card-text my-3">Temperatura Actual: <strong> {temperatura || 'N/A'} ºC </strong></p>
                    <p className="card-text">Humedad Actual: <strong>{humedad || 'N/A'} % </strong></p>
                    <p className="card-text">Temperatura Deseada: <strong>{niveles || 'N/A'} ºC </strong></p>
                </div>
            </div>
        </div>
    );
};

export default ThermostatItem;