const EventEmitter = require('events')
const oscMin = require('osc-min')
const dgram = require('dgram')

export default class Osc2Udp extends EventEmitter {

  constructor(options) {
    super();

    this.options = options;
    this.oscInput = dgram.createSocket("udp4", this.handleOscInputMessage.bind(this));
    this.udpOutput = dgram.createSocket("udp4");

    console.log(`OSC listener running at http://${options.oscIn.ip}:${options.oscIn.port}`);
    this.oscInput.bind(options.oscIn.port, options.oscIn.ip);
  }

  handleOscInputMessage(msg, rinfo) {

    const message = oscMin.fromBuffer(msg);
    this.emit('inputOscMessage', {message: message});

    const udpOutOptions = this.options.udpOut;
    if(udpOutOptions) {
      this.udpOutput.send(msg, udpOutOptions.port, udpOutOptions.ip);
    }

    if(this.options.logger) {
      this.options.logger.info({message: message});
    }

  }

}
