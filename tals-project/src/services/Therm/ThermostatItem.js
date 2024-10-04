const ThermostatItem = (termostato, actualState) => {

    return (
        <div className="col-md my-3">
            <div className="card card-body">
                <h3 className="card-tittle">Termómetro: {termostato?.id || 'N/A'}</h3>
                <p className="card-text my-3">Temperatura Actual: <strong>{termostato?.temperatura || 'N/A'} ºC </strong></p>
                <p className="card-text">Humedad Actual: <strong>{termostato?.humedad || 'N/A'} % </strong></p>
                <p className="card-text">Temperatura Deseada: <strong>{termostato?.temperatura_deseada || 'N/A'} ºC </strong></p>
                <p className="card-text">Fecha: <strong>{termostato?.date || 'N/A'}</strong></p>
            </div>
        </div>
    );
};

export default ThermostatItem;