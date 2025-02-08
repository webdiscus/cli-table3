const Table = require('../src/table');
const colors = require('ansis');

// prettier-ignore
// Disable prettier so that examples are formatted more clearly

module.exports = function (runTest) {
  function it(name, fn) {
    let result = fn();
    runTest(name, result[0], result[1], result[2]);
  }

  it('use colSpan to span columns - (colSpan above normal cell)', function () {
    function makeTable() {
      let table = new Table({ style: { head: [], border: [] } });

      table.push(
        [{ colSpan: 2, content: 'greetings' }],
        [{ colSpan: 2, content: 'greetings' }],
        ['hello', 'howdy']
      );

      return table;
    }

    let expected = [
      '┌───────────────┐',
      '│ greetings     │',
      '├───────────────┤',
      '│ greetings     │',
      '├───────┬───────┤',
      '│ hello │ howdy │',
      '└───────┴───────┘',
    ];

    return [makeTable, expected];
  });

  it('use colSpan to span columns - (colSpan below normal cell)', function () {
    function makeTable() {
      let table = new Table({ style: { head: [], border: [] } });

      table.push(
        ['hello', 'howdy'],
        [{ colSpan: 2, content: 'greetings' }],
        [{ colSpan: 2, content: 'greetings' }]
      );

      return table;
    }

    let expected = [
      '┌───────┬───────┐',
      '│ hello │ howdy │',
      '├───────┴───────┤',
      '│ greetings     │',
      '├───────────────┤',
      '│ greetings     │',
      '└───────────────┘',
    ];

    return [makeTable, expected];
  });

  it('use rowSpan to span rows - (rowSpan on the left side)', function () {
    function makeTable() {
      let table = new Table({ style: { head: [], border: [] } });

      table.push(
        [{ rowSpan: 2, content: 'greetings' }, { rowSpan: 2, content: 'greetings', vAlign: 'center' }, 'hello'],
        ['howdy']
      );

      return table;
    }

    let expected = [
      '┌───────────┬───────────┬───────┐',
      '│ greetings │           │ hello │',
      '│           │ greetings ├───────┤',
      '│           │           │ howdy │',
      '└───────────┴───────────┴───────┘',
    ];

    return [makeTable, expected];
  });

  it('use rowSpan to span rows - (rowSpan on the right side)', function () {
    function makeTable() {
      let table = new Table({ style: { head: [], border: [] } });

      table.push(
        ['hello', { rowSpan: 2, content: 'greetings' }, { rowSpan: 2, content: 'greetings', vAlign: 'bottom' }],
        ['howdy']
      );

      return table;
    }

    let expected = [
      '┌───────┬───────────┬───────────┐',
      '│ hello │ greetings │           │',
      '├───────┤           │           │',
      '│ howdy │           │ greetings │',
      '└───────┴───────────┴───────────┘',
    ];

    return [makeTable, expected];
  });

  it('mix rowSpan and colSpan together for complex table layouts', function () {
    function makeTable() {
      let table = new Table({ style: { head: [], border: [] } });

      table.push(
        [
          { content: 'hello', colSpan: 2 },
          { rowSpan: 2, colSpan: 2, content: 'sup' },
          { rowSpan: 3, content: 'hi' },
        ],
        [{ content: 'howdy', colSpan: 2 }],
        ['o', 'k', '', '']
      );

      return table;
    }

    let expected = [
      '┌───────┬─────┬────┐',
      '│ hello │ sup │ hi │',
      '├───────┤     │    │',
      '│ howdy │     │    │',
      '├───┬───┼──┬──┤    │',
      '│ o │ k │  │  │    │',
      '└───┴───┴──┴──┴────┘',
    ];

    return [makeTable, expected];
  });

  it('multi-line content will flow across rows in rowSpan cells', function () {
    function makeTable() {
      let table = new Table({ style: { head: [], border: [] } });

      table.push(
        ['hello', { rowSpan: 2, content: 'greetings\nfriends' }, { rowSpan: 2, content: 'greetings\nfriends' }],
        ['howdy']
      );

      return table;
    }

    let expected = [
      '┌───────┬───────────┬───────────┐',
      '│ hello │ greetings │ greetings │',
      '├───────┤ friends   │ friends   │',
      '│ howdy │           │           │',
      '└───────┴───────────┴───────────┘',
    ];

    return [makeTable, expected];
  });

  it('multi-line content will flow across rows in rowSpan cells - (complex layout)', function () {
    function makeTable() {
      let table = new Table({ style: { head: [], border: [] } });

      table.push(
        [
          { content: 'hello', colSpan: 2 },
          { rowSpan: 2, colSpan: 2, content: 'sup\nman\nhey' },
          { rowSpan: 3, content: 'hi\nyo' },
        ],
        [{ content: 'howdy', colSpan: 2 }],
        ['o', 'k', '', '']
      );

      return table;
    }

    let expected = [
      '┌───────┬─────┬────┐',
      '│ hello │ sup │ hi │',
      '├───────┤ man │ yo │',
      '│ howdy │ hey │    │',
      '├───┬───┼──┬──┤    │',
      '│ o │ k │  │  │    │',
      '└───┴───┴──┴──┴────┘',
    ];

    return [makeTable, expected];
  });

  it('rowSpan cells can have a staggered layout', function () {
    function makeTable() {
      let table = new Table({ style: { head: [], border: [] } });

      table.push(
        [{ content: 'a', rowSpan: 2 }, 'b'],
        [{ content: 'c', rowSpan: 2 }],
        ['d']
      );

      return table;
    }

    let expected = ['┌───┬───┐', '│ a │ b │', '│   ├───┤', '│   │ c │', '├───┤   │', '│ d │   │', '└───┴───┘'];

    return [makeTable, expected];
  });

  it('the layout manager automatically create empty cells to fill in the table', function () {
    function makeTable() {
      let table = new Table({ style: { head: [], border: [] } });

      //notice we only create 3 cells here, but the table ends up having 6.
      table.push(
        [{ content: 'a', rowSpan: 3, colSpan: 2 }, 'b'],
        [],
        [{ content: 'c', rowSpan: 2, colSpan: 2 }],
        []
      );
      return table;
    }

    let expected = [
      '┌───┬───┬──┐',
      '│ a │ b │  │', // top-right and bottom-left cells are automatically created to fill the empty space
      '│   ├───┤  │',
      '│   │   │  │',
      '│   ├───┴──┤',
      '│   │ c    │',
      '├───┤      │',
      '│   │      │',
      '└───┴──────┘',
    ];

    return [makeTable, expected];
  });

  it('use table `rowHeights` option to fix row height. The truncation symbol will be shown on the last line.', function () {
    function makeTable() {
      let table = new Table({
        rowHeights: [2],
        style: { head: [], border: [] },
      });

      table.push(['hello\nhi\nsup']);

      return table;
    }

    let expected = ['┌───────┐', '│ hello │', '│ hi…   │', '└───────┘'];

    return [makeTable, expected];
  });

  it('if `colWidths` is not specified, the layout manager will automatically widen rows to fit the content', function () {
    function makeTable() {
      let table = new Table({ style: { head: [], border: [] } });

      table.push(
        [{ colSpan: 2, content: 'hello there' }],
        ['hi', 'hi']
      );

      return table;
    }

    let expected = ['┌─────────────┐', '│ hello there │', '├──────┬──────┤', '│ hi   │ hi   │', '└──────┴──────┘'];

    return [makeTable, expected];
  });

  it('you can specify a column width for only the first row, other rows will be automatically widened to fit content', function () {
    function makeTable() {
      let table = new Table({
        colWidths: [4],
        style: { head: [], border: [] },
      });

      table.push(
        [{ colSpan: 2, content: 'hello there' }],
        ['hi', { hAlign: 'center', content: 'hi' }]
      );

      return table;
    }

    let expected = ['┌─────────────┐', '│ hello there │', '├────┬────────┤', '│ hi │   hi   │', '└────┴────────┘'];

    return [makeTable, expected];
  });

  it('a column with a null column width will be automatically widened to fit content', function () {
    function makeTable() {
      let table = new Table({
        colWidths: [null, 4],
        style: { head: [], border: [] },
      });

      table.push(
        [{ colSpan: 2, content: 'hello there' }],
        [{ hAlign: 'right', content: 'hi' }, 'hi']
      );

      return table;
    }

    let expected = ['┌─────────────┐', '│ hello there │', '├────────┬────┤', '│     hi │ hi │', '└────────┴────┘'];

    return [makeTable, expected];
  });

  it('feel free to use colors in your content strings, column widths will be calculated correctly', function () {
    function makeTable() {
      let table = new Table({
        colWidths: [5],
        style: { head: [], border: [] },
      });

      table.push([colors.red('hello')]);

      return table;
    }

    let expected = ['┌─────┐', '│ ' + colors.red('he') + '… │', '└─────┘'];

    return [makeTable, expected, 'truncation-with-colors'];
  });
};

/*

 let expected = [
   '┌──┬───┬──┬──┐'
 , '│  │   │  │  │'
 , '├──┼───┼──┼──┤'
 , '│  │ … │  │  │'
 , '├──┼───┼──┼──┤'
 , '│  │ … │  │  │'
 , '└──┴───┴──┴──┘'
 ];
 */
