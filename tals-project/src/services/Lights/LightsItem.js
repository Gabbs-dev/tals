const LightItem = ({luminaria, listLights}) => {

    return(
        <div className="col-md-4 my-3">
            <div className="card card-body">
                <h3 className="card-tittle">Luz {luminaria.id} </h3>
                <p className="card-text my-3">Ubicación: <strong>{luminaria.luz1} </strong></p>
                <p className="card-text my-3">Ubicación: <strong>{luminaria.luz2} </strong></p>
                <p className="card-text">Estado: <strong>{luminaria.auto_encendido} </strong></p>
                <p className="card-text">Estado: <strong>{luminaria.auto_apagado} </strong></p>
                <p className="card-text">Estado: <strong>{luminaria.date} </strong></p>
            </div>
        </div>
    );
};

export default LightItem;