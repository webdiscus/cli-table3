const colors = require('ansis');
const Table = require('..');

describe('@api Table 16 colors', function () {
  it('text and border in red', function () {
    let { expected, received } = color16Test('red');
    expect(received).toEqual(expected);
  });

  it('text and border in green', function () {
    let { expected, received } = color16Test('green');
    expect(received).toEqual(expected);
  });

  it('text and border in yellow', function () {
    let { expected, received } = color16Test('yellow');
    expect(received).toEqual(expected);
  });

  it('text and border in blue', function () {
    let { expected, received } = color16Test('blue');
    expect(received).toEqual(expected);
  });

  it('text and border in magenta', function () {
    let { expected, received } = color16Test('magenta');
    expect(received).toEqual(expected);
  });

  it('text and border in cyan', function () {
    let { expected, received } = color16Test('cyan');
    expect(received).toEqual(expected);
  });

  it('text and border in white', function () {
    let { expected, received } = color16Test('white');
    expect(received).toEqual(expected);
  });

  it('text and border in grey', function () {
    let { expected, received } = color16Test('grey');
    expect(received).toEqual(expected);
  });

  it('text and border in gray', function () {
    let { expected, received } = color16Test('gray');
    expect(received).toEqual(expected);
  });

  it('text and border in redBright', function () {
    let { expected, received } = color16Test('redBright');
    expect(received).toEqual(expected);
  });

  it('text and border in greenBright', function () {
    let { expected, received } = color16Test('greenBright');
    expect(received).toEqual(expected);
  });

  it('text and border in yellowBright', function () {
    let { expected, received } = color16Test('yellowBright');
    expect(received).toEqual(expected);
  });

  it('text and border in blueBright', function () {
    let { expected, received } = color16Test('blueBright');
    expect(received).toEqual(expected);
  });

  it('text and border in magentaBright', function () {
    let { expected, received } = color16Test('magentaBright');
    expect(received).toEqual(expected);
  });

  it('text and border in cyanBright', function () {
    let { expected, received } = color16Test('cyanBright');
    expect(received).toEqual(expected);
  });

  it('text and border in whiteBright', function () {
    let { expected, received } = color16Test('whiteBright');
    expect(received).toEqual(expected);
  });

  it('text and border in bgBlack', function () {
    let { expected, received } = color16Test('white', 'bgBlack');
    expect(received).toEqual(expected);
  });

  it('text and border in bgRed', function () {
    let { expected, received } = color16Test('white', 'bgRed');
    expect(received).toEqual(expected);
  });

  it('text and border in bgGreen', function () {
    let { expected, received } = color16Test('black', 'bgGreen');
    expect(received).toEqual(expected);
  });

  it('text and border in bgYellow', function () {
    let { expected, received } = color16Test('black', 'bgYellow');
    expect(received).toEqual(expected);
  });

  it('text and border in bgBlue', function () {
    let { expected, received } = color16Test('white', 'bgBlue');
    expect(received).toEqual(expected);
  });

  it('text and border in bgMagenta', function () {
    let { expected, received } = color16Test('white', 'bgMagenta');
    expect(received).toEqual(expected);
  });

  it('text and border in bgCyan', function () {
    let { expected, received } = color16Test('black', 'bgCyan');
    expect(received).toEqual(expected);
  });

  it('text and border in bgWhite', function () {
    let { expected, received } = color16Test('black', 'bgWhite');
    expect(received).toEqual(expected);
  });

  it('text and border in bgGrey', function () {
    let { expected, received } = color16Test('blue', 'bgGrey');
    expect(received).toEqual(expected);
  });

  it('text and border in bgGray', function () {
    let { expected, received } = color16Test('blue', 'bgGray');
    expect(received).toEqual(expected);
  });

  it('text and border in bgRedBright', function () {
    let { expected, received } = color16Test('black', 'bgRedBright');
    expect(received).toEqual(expected);
  });

  it('text and border in bgGreenBright', function () {
    let { expected, received } = color16Test('black', 'bgGreenBright');
    expect(received).toEqual(expected);
  });

  it('text and border in bgYellowBright', function () {
    let { expected, received } = color16Test('black', 'bgYellowBright');
    expect(received).toEqual(expected);
  });

  it('text and border in bgBlueBright', function () {
    let { expected, received } = color16Test('black', 'bgBlueBright');
    expect(received).toEqual(expected);
  });

  it('text and border in bgMagentaBright', function () {
    let { expected, received } = color16Test('black', 'bgMagentaBright');
    expect(received).toEqual(expected);
  });

  it('text and border in bgCyanBright', function () {
    let { expected, received } = color16Test('black', 'bgCyanBright');
    expect(received).toEqual(expected);
  });

  it('text and border in bgWhiteBright', function () {
    let { expected, received } = color16Test('red', 'bgWhiteBright');
    expect(received).toEqual(expected);
  });
});

function color16Test(textColor, bgColor = 'visible') {
  let table = new Table({ head: ['hello'], style: { border: [textColor, bgColor], head: [textColor, bgColor] } });

  let s = colors[bgColor][textColor];
  let expected = [s('┌───────┐'), `${s`│`}${s` hello `}${s`│`}`, s('└───────┘')].join('\n');
  let received = table.toString();

  // display colored table to make the screenshot for README
  //console.log(received);

  return { expected, received };
}
