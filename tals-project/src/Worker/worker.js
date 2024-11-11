import * as LightsServer from '../services/Lights/LightsServer';

// Interruptores automaticos
export const addEventListener = async (message,event) => {
  if (message === 'lights'){
    try{
      if (event === 'ON') {
        // Enviar comando a Django para encender luces
        const order = {
          'luz1' : '1',
          'luz2' : '1',
          'luz3' : '1',
          'luz4' : '1',
          'luz5' : '1',
          'luz6' : '1',
        };
        const turn_on = LightsServer.createLightState(order);
        if (turn_on){
          console.log({'message':'Success'}); 
        }
      } else if (event === 'OFF') {
        // Enviar comando a Django para apagar luces
        const order = {
          'luz1' : '0',
          'luz2' : '0',
          'luz3' : '0',
          'luz4' : '0',
          'luz5' : '0',
          'luz6' : '0',
        };
        const turn_off = LightsServer.createLightState(order);
        if (turn_off){
          console.log({'message':'Success'}); 
        } 
      }
    } catch(error){
      console.log('Ha ocurrido un error: ',error);
    }
  } /*else if (message === 'spray'){
    // Regado
    try {
      if (now >= inicio) {
        // Enviar comando a Django para iniciar regado
        try{
          const order = {'autoSpray' : 'ON'};
          console.log(order);
        } catch(error){
          console.log('Error al enviar el comando: ', error);
        };
      } else if (now >= cierre) {
        // Enviar comando a Django para cerrar regado
        try{
          const order = {'autoSpray' : 'OFF'};
          console.log(order);
        } catch(error){
          console.log('Error al enviar el comando: ', error);
        }
      }
    } catch(error){
      console.log('Ha ocurrido un error: ',error);
    }
  }*/
};