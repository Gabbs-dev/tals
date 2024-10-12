import jsonschema

def validar_datos(data):
    # Definir un esquema JSON usando jsonschema
    schema = {
        "type": "object",
        "properties": {
            "nivel_agua": {"type": "number"},
            "movimiento": {"type": "string"},
            # ... otros campos
        },
        "required": ["nivel_agua", "movimiento", ...]
    }
    try:
        jsonschema.validate(instance=data, schema=schema)
        return True
    except jsonschema.exceptions.ValidationError as e:
        print(f"Error de validación: {e}")
        return False