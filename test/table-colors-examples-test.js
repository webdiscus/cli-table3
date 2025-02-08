// Note: Jest sets FORCE_COLOR=1 which limits the use of only 16 colors.
// Force enable truecolor loading ENV variable FORCE_COLOR=3.
require('../env/truecolor');

const colors = require('ansis');
const Table = require('..');

describe('Examples for README', function () {
  it('header text in green bold', function () {
    let table = new Table({ head: ['Name', 'Age'], style: { border: [], head: ['green', 'bold'] } });
    table.push(['Walter White', '50']);

    let s = colors.bold.green;
    let expected = [
      '┌──────────────┬─────┐',
      '│' + s(' Name         ') + '│' + s(' Age ') + '│',
      '├──────────────┼─────┤',
      '│ Walter White │ 50  │',
      '└──────────────┴─────┘',
    ].join('\n');

    let received = table.toString();

    // display colored table to make the screenshot for README
    //console.log(received);

    expect(received).toEqual(expected);
  });

  it('header text in Orange italic', function () {
    let table = new Table({ head: ['Name', 'Age'], style: { border: [], head: ['hex(#FFA500)', 'italic'] } });
    table.push(['Walter White', '50']);

    let s = colors.italic.hex('#FFA500');
    let expected = [
      '┌──────────────┬─────┐',
      '│' + s(' Name         ') + '│' + s(' Age ') + '│',
      '├──────────────┼─────┤',
      '│ Walter White │ 50  │',
      '└──────────────┴─────┘',
    ].join('\n');

    let received = table.toString();

    // display colored table to make the screenshot for README
    //console.log(received);

    expect(received).toEqual(expected);
  });

  it('border and head text in orange', function () {
    let table = new Table({
      head: ['Name', 'Age'],
      style: { border: ['hex(#FFD700)'], head: ['hex(#FFA500)', 'italic'] },
    });

    table.push(['Walter White', '50']);

    let text = colors.italic.hex('#FFA500');
    let border = colors.hex('#FFD700');

    let expected = [
      border`┌──────────────` + border`┬─────┐`,
      border`│` + text` Name         ` + border`│` + text` Age ` + border`│`,
      border`├──────────────` + border`┼─────┤`,
      border`│` + ` Walter White ` + border`│` + ` 50  ` + border`│`,
      border`└──────────────` + border`┴─────┘`,
    ].join('\n');

    let received = table.toString();

    // display colored table to make the screenshot for README
    //console.log(received);

    expect(received).toEqual(expected);
  });

  it('border and head text in orange, body in custom colors', function () {
    let table = new Table({
      head: ['Name', 'Age'],
      style: { border: ['hex(#FFD700)'], head: ['hex(#FFA500)', 'italic'] },
    });

    let c = colors;

    table.push([c.green('Walter White'), c.red('50')], [c.hex('#FF69B4')('Jesse Pinkman'), c.blueBright('24')]);

    let text = colors.italic.hex('#FFA500');
    let border = colors.hex('#FFD700');

    let expected = [
      border`┌───────────────` + border`┬─────┐`,
      border`│` + text` Name          ` + border`│` + text` Age ` + border`│`,
      border`├───────────────` + border`┼─────┤`,
      border`│` + ` ` + c.green`Walter White` + `  ` + border`│` + ` ` + c.red`50` + `  ` + border`│`,
      border`├───────────────` + border`┼─────┤`,
      border`│` + ` ` + c.hex('#FF69B4')`Jesse Pinkman` + ` ` + border`│` + ` ` + c.blueBright`24` + `  ` + border`│`,
      border`└───────────────` + border`┴─────┘`,
    ].join('\n');

    let received = table.toString();

    // display colored table to make the screenshot for README
    //console.log(received);

    expect(received).toEqual(expected);
  });

  it('border and head text in orange, body text in green', function () {
    let table = new Table({
      head: ['Name', 'Age'],
      style: { border: ['hex(#FFD700)'], head: ['hex(#FFA500)', 'italic'] },
    });

    table.push(['Walter White', '50'], ['Jesse Pinkman', '24']);

    let text = colors.italic.hex('#FFA500');
    let border = colors.hex('#FFD700');

    let expected = [
      border`┌───────────────` + border`┬─────┐`,
      border`│` + text` Name          ` + border`│` + text` Age ` + border`│`,
      border`├───────────────` + border`┼─────┤`,
      border`│` + ` Walter White` + `  ` + border`│` + ` 50` + `  ` + border`│`,
      border`├───────────────` + border`┼─────┤`,
      border`│` + ` Jesse Pinkman` + ` ` + border`│` + ` 24` + `  ` + border`│`,
      border`└───────────────` + border`┴─────┘`,
    ].join('\n');
    expected = colors.green(expected);

    let received = colors.green(table.toString());

    // display colored table to make the screenshot for README
    //console.log(colors.green(received));

    expect(received).toEqual(expected);
  });

  it('border and head text in orange, body text in green, background in truecolor', function () {
    let bgColor = '#3d239d';
    let table = new Table({
      head: ['Name', 'Age'],
      style: { border: ['hex(#FFD700)'], head: ['hex(#FFA500)', 'italic'] },
    });

    table.push(['Walter White', '50'], ['Jesse Pinkman', '24']);

    let text = colors.italic.hex('#FFA500');
    let border = colors.hex('#FFD700');

    let expected = [
      border`┌───────────────` + border`┬─────┐`,
      border`│` + text` Name          ` + border`│` + text` Age ` + border`│`,
      border`├───────────────` + border`┼─────┤`,
      border`│` + ` Walter White` + `  ` + border`│` + ` 50` + `  ` + border`│`,
      border`├───────────────` + border`┼─────┤`,
      border`│` + ` Jesse Pinkman` + ` ` + border`│` + ` 24` + `  ` + border`│`,
      border`└───────────────` + border`┴─────┘`,
    ].join('\n');
    expected = colors.green.bgHex(bgColor)(expected);

    let received = colors.green.bgHex(bgColor)(table.toString());

    // display colored table to make the screenshot for README
    //console.log('\n' + received);

    expect(received).toEqual(expected);
  });
});
