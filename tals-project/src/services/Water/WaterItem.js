const WTItem = ({porcentaje,litros}) => {
  return (
    <div className="d-flex flex-row mb-3 justify-content-evenly">
      <div className="d-flex flex-column">
        <div className="card card-body">
          <h3 className="card-title">Tanque de agua</h3>
          <p className="card-text my-3">
            Nivel Actual de Agua: <strong>{porcentaje || 'N/A'} %</strong>
          </p>
          <p className="card-text">
            Litros Restantes: <strong>{litros || 'N/A'} Lts</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WTItem;
