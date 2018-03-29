import Osc2Udp from './Osc2Udp'
import DataLogger from './DataLogger'
import TerminalDisplay from './TerminalDisplay'

// Creating osc2udp gateway
const osc2udp = new Osc2Udp({
  oscIn: {
    ip: "0.0.0.0",
    port: 57121,
  },
  udpOut: {
    ip: "0.0.0.0",
    port: 9999
  },
  dataLength: 100,
});

// Creating our screen
const terminalDisplay = new TerminalDisplay({
  lineLength: 50,
  dataSource: osc2udp
});

// Creating our data logger
const dataLogger = new DataLogger({
  dataSource: osc2udp,
  //activity: 'meditation'
});
