const assert = require('assert');

import Page from './index';

class Cell {
  constructor (posx, posy) {
    this.posx = posx;
    this.posy = posy;
  }
}

describe( 'test setup ', () => {
  it('works', () => assert(true));
});

describe('getTotalAliveNeighbours(), ', () => {
  it('return correct amount of neighbours', () => {
    const grid = [
      new Cell(1, 1),
      new Cell(1, 2),
      new Cell(1, 3),
      new Cell(0, 0),
      new Cell(5, 5)
    ];
    const cellToCheck = grid[0];
    // let PageComp = new Page();
    // PageComp.grid = grid;
    const result = Page.getTotalAliveNeighbours(grid, cellToCheck);
    assert.strictEqual(result, 2);
  });
});

describe('getNextGenStillAliveCells(), ', function() {
  it('return correct cells', () => {
    const grid = [
      new Cell(1, 1),
      new Cell(1, 2),
      new Cell(1, 3),
      new Cell(0, 0),
      new Cell(5, 5)
    ];
    const expectedCellsStillAlive = [
      new Cell(1, 1),
      new Cell(1, 2)
    ];
    const result = Page.getNextGenStillAliveCells(grid);
    assert.deepStrictEqual(result, expectedCellsStillAlive);
  });
});

describe('getNextGenBecomeAliveCells(), ', function() {
  it('return correct cells', () => {
    const grid = [
      new Cell(0, 0),
      new Cell(1, 1),
      new Cell(1, 2),
      new Cell(1, 3),
      new Cell(5, 5),
    ];
    const expectedCellsBecomeAlive = [
      new Cell(0, 1),
      new Cell(0, 2),
      new Cell(2, 2)
    ];
    const result = Page.getNextGenBecomeAliveCells(grid);
    assert.deepEqual(result, expectedCellsBecomeAlive);
  });
});

describe('createGraphicalWorld()', function() {
  it('creates correct graphical world', () => {
    const grid = [
      new Cell(0, 0),
      new Cell(1, 1),
      new Cell(1, 2),
      new Cell(1, 3),
      new Cell(5, 5),
    ];
    const expectedGraphicalWorld = [
      [true, false, false],
      [false, true, true],
      [false, false, false]
    ];
    const result = Page.createGraphicalWorld(grid);
    assert.deepStrictEqual(result, expectedGraphicalWorld);
  });
});
