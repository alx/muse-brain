import Osc2Udp from './Osc2Udp'
import DataLogger from './DataLogger'
import TerminalDisplay from './TerminalDisplay'

// Creating our data logger
const dataLogger = new DataLogger({
  activity: 'reading'
});

// Creating osc2udp gateway
const osc2udp = new Osc2Udp({
  oscIn: {
    ip: "0.0.0.0",
    port: 57121,
  },
//  udpOut: {
//    ip: "0.0.0.0",
//    port: 9999
//  },
  dataLength: 100,
  logger: dataLogger
});

// Creating our screen
const terminalDisplay = new TerminalDisplay({
  lineLength: 50,
  dataSource: osc2udp
});
