import * as LightsServer from '../services/Lights/LightsServer';
import { NotificationProvider } from '../Header/Notifications/NotificationServer';

export const addEventListener = async (message,event) => {
  if (message === 'lights'){
    try{
      if (event === 'ON') {
        // Enviar comando a Django para encender luces
        const order = {'autoLight' : 'ON'};
        LightsServer.autoLightState(order);
        console.log(order);
        return order;
      } else if (event === 'OFF') {
        // Enviar comando a Django para apagar luces
        const order = {'autoLight' : 'OFF'};
        LightsServer.autoLightState(order);
        console.log(order);
        return order;
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