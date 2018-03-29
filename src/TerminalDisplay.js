import blessed from 'blessed'
import contrib from 'blessed-contrib'
import ip from 'ip'

const colorBand = {
  delta: "red",
  theta: "cyan",
  alpha: "blue",
  beta: "green",
  gamma: "yellow"
};
const bandRegexp = /.*elements\/(.[^\/]*)_absolute/i;

export default class TerminalDisplay {

  constructor(options) {
    this.options = options;
    this.screen = blessed.screen();
    this.absoluteLineData = [];

    this.initScreenLayout();
    this.handleKeyboard();

    this.options.dataSource.on('inputOscMessage', this.handleData.bind(this));
  }

  initScreenLayout() {

    // Setup grid layout
    this.grid = new contrib.grid({ rows: 12, cols: 12, screen: this.screen });

    // Add a absoluteLine chart
    this.absoluteLine = this.grid.set(0, 0, 12, 12, contrib.line, {
      style: {
        line: "yellow",
        text: "green",
        baseline: "black"
      },
      showLegend: true,
      wholeNumbersOnly: false, //true=do not show fraction in y axis
      label: `Muse Monitor - IP: ${ip.address()} - Port: ${this.options.dataSource.options.oscIn.port}`,
      showNthLabel: this.options.lineLength
    });

  }

  handleKeyboard() {
    this.screen.key(["escape", "q", "C-c"], function(ch, key) {
      return process.exit(0);
    });
  }

  setAbsoluteLineData(data) {

    const element = data.message.elements[0];
    const match = element.address.match(bandRegexp)

    if ( match ) {

      const band = match[1];
      let bandData = this.absoluteLineData.find(d => d.band == band);

      if(!bandData) {
        bandData = {
          band: band,
          x: Array(this.options.lineLength).fill(null).map((b, i) => `t${i}`),
          y: Array(this.options.lineLength).fill(0),
          style: {
            line: colorBand[band]
          }
        };

        this.absoluteLineData.push(bandData);
      }

      const value = parseInt(element.args[0].value * 100);
      bandData.title = `${band} - ${value}`
      bandData.y.shift();
      bandData.y.push(value);

      this.absoluteLine.setData(this.absoluteLineData);
      this.screen.render();
    }

  }

  handleData(data) {
    this.setAbsoluteLineData(data);
  }

}
