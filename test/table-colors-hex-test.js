// Note: Jest sets FORCE_COLOR=1 which limits the use of only 16 colors.
// Force enable truecolor loading ENV variable FORCE_COLOR=3.
require('../env/truecolor');

const colors = require('ansis');
const Table = require('..');

describe('@api Table truecolor', function () {
  it('colorize header text using a hex truecolor value', function () {
    let table = new Table({ head: ['hello', 'goodbye'], style: { border: [], head: ['hex(#c74384)'] } });

    let style = colors.hex('#c74384');
    let expected = [
      '┌───────┬─────────┐',
      '│' + style(' hello ') + '│' + style(' goodbye ') + '│',
      '└───────┴─────────┘',
    ];

    expect(table.toString()).toEqual(expected.join('\n'));
  });

  it('colorize header text and background using a hex truecolor value', function () {
    let table = new Table({
      head: ['hello', 'goodbye'],
      style: { border: [], head: ['bgHex(#3d239d)', 'hex(#f5862b)', 'underline'] },
    });

    let style = colors.underline.hex('#f5862b').bgHex('#3d239d');
    let expected = [
      '┌───────┬─────────┐',
      '│' + style(' hello ') + '│' + style(' goodbye ') + '│',
      '└───────┴─────────┘',
    ];

    expect(table.toString()).toEqual(expected.join('\n'));
  });

  it('colorize border and text using a hex truecolor value', function () {
    let table = new Table({
      head: ['hello', 'goodbye'],
      style: { border: ['hex(#3d239d)'], head: ['hex(#f5862b)', 'bold'] },
    });

    // styles for border and text
    let border = colors.hex('#3d239d');
    let text = colors.bold.hex('#f5862b');

    let expected = [
      border`┌───────` + border`┬─────────┐`,
      border`│` + text(' hello ') + border`│` + text(' goodbye ') + border`│`,
      border`└───────` + border`┴─────────┘`,
    ];

    expect(table.toString()).toEqual(expected.join('\n'));
  });

  it('text and border in truecolor with background, v1', function () {
    let { expected, received } = truecolorTest('#f5862b', '#3d239d');
    expect(received).toEqual(expected);
  });

  it('text and border in truecolor with background, v2', function () {
    let { expected, received } = truecolorTest('#f3d722', '#28936b');
    expect(received).toEqual(expected);
  });

  it('text and border in truecolor with background, v3', function () {
    let { expected, received } = truecolorTest('#1624d7', '#d7467d');
    expect(received).toEqual(expected);
  });
});

function truecolorTest(textColor, bgColor = '#000') {
  let textColorHex = `hex(${textColor})`;
  let bgColorHex = `bgHex(${bgColor})`;
  let table = new Table({
    head: ['hello'],
    style: { border: [textColorHex, bgColorHex], head: [textColorHex, bgColorHex, 'bold'] },
  });

  let border = colors.bgHex(bgColor).hex(textColor);
  let text = colors.bold.bgHex(bgColor).hex(textColor);
  let expected = [border('┌───────┐'), `${border`│`}${text` hello `}${border`│`}`, border('└───────┘')].join('\n');
  let received = table.toString();

  // display colored table to make the screenshot for README
  //console.log(received);

  return { expected, received };
}
