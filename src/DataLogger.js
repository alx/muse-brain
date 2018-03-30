import SimpleNodeLogger from 'simple-node-logger'

export default class DataLogger {

  constructor(options) {
    this.options = options;

    this.log = SimpleNodeLogger.createRollingFileLogger( {
      logDirectory:'./logs',
      fileNamePattern:`roll-<DATE>-${this.options.activity}.log`,
      dateFormat:'YYYY.MM.DD.HH.mm'
    });
  }

  info(data) {
    this.log.info(data);
  }

}
