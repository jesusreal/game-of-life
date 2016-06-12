// import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';

class Cell {
  constructor (posx, posy) {
    this.posx = posx;
    this.posy = posy;
  }
}


export default class Page extends React.Component {
  constructor() {
    super();
    this.grid = [
      new Cell(1, 1)
    ];

    this.cells = [];
  }

  getNextGen() {
    let stayAlive = Page.getNextGenStillAliveCells();
    let becomeAlive = Page.getNextGenBecomeAliveCells();
    var nextGen = stayAlive.concat(becomeAlive);
    console.log('nextGen ' , nextGen);
  }

  static getNextGenStillAliveCells (grid) {
    return grid.filter((cell) => {
      return [2,3].includes(Page.getTotalAliveNeighbours(grid, cell));
    });
  }


  static isCellInCellsList (cellToCheck, cellsList) {
    console.log(new Cell(1,1) == new Cell(1,1))
    console.log(new Cell(1,1) === new Cell(1,1))
    console.log(Object.is(new Cell(1,1), new Cell(1,1)))
    return cellsList.find((cell) =>
      cell.posx === cellToCheck.posx && cell.posy === cellToCheck.posy
    )
  }

  static getNextGenBecomeAliveCells (grid) {
    let cellsMightBecomeAlive = [];
    grid.forEach((cell) => {
        for (let i=cell.posx-1; i<= cell.posx+1; i++) {
          for (let j=cell.posy-1; j<= cell.posy+1; j++) {
            let neighbour = new Cell(i, j);
            if (Page.isCellInCellsList(neighbour, grid)) {
              continue;
            }
            if (Page.isCellInCellsList(neighbour, cellsMightBecomeAlive)) {
              continue;
            }
            cellsMightBecomeAlive = cellsMightBecomeAlive.concat([neighbour])
          }
        }
    });

    return cellsMightBecomeAlive.filter((cell) => {
      return [3].includes(Page.getTotalAliveNeighbours(grid, cell));
    });
  }

  static getTotalAliveNeighbours(grid, cellToCheck) {
    const totalAliveNeighbors = grid.filter(function(cell) {
      if (cellToCheck === cell) {
        return false;
      }
      const xdist = Math.abs(cellToCheck.posx - cell.posx);
      const ydist = Math.abs(cellToCheck.posy - cell.posy);
      return (Math.max(xdist, ydist) <= 1);
    });
    return totalAliveNeighbors.length;
  }

  render() {
    return (
      <div>
        <div id="words-groups" className="block">
          {this.cells.map((cell) => {
            return (<li ngClass={cell.state ? 'aliveCell' : 'deadCell'}></li>);
          })}
        </div>
        <NewWordComponent/>
      </div>
    );
  }
}

// setTimeout(function() {
  // console.log(ReactDOMServer.renderToString(<Page/>)); // for server-side rendering
// ReactDOM.render(<Page/>, document.getElementById('app'));
// }, 80);

// var ComponentFactory = React.createFactory(Page);
// console.log('ComponentFactory ' , ComponentFactory());
// express.Router().get('/react', function(req, res, next) {
//   // console.log(ReactDOMServer.renderToString(<Page/>)); // for server-side rendering
//   //   ReactDOM.render(<Page/>, document.getElementById('app'));

//   var markup = ReactDOMServer.renderToString(ComponentFactory());
//   console.log('markup ' , markup);
//   res.send(markup);
// });

// call this file using `babel-node src/index.js > dist/index.html` to create a server-side
// rendered HTML
