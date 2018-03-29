![muse-brain](https://raw.githubusercontent.com/alx/muse-brain/master/assets/screenshot.png)

# muse-brain

Convert Muse Monitor OSC packets to UDP datagram

Require [Muse Monitor](http://www.musemonitor.com) Android app.

## Installation

```
git clone https://github.com/alx/muse-brain.git
cd muse-brain
yarn
yarn start:dev
```

## Configuration

Inside `src/index.js` :

```
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
```

Inside [Muse Monitor](http://www.musemonitor.com) Android app, set the OSC IP and Port as indicated on the title bar of the `muse-brain` window.
