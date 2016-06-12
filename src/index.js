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
      new Cell(2, 6),
      new Cell(3, 6),
      new Cell(4, 6),
      new Cell(5, 6),
      new Cell(6, 6),
      new Cell(7, 6),
      new Cell(7, 5),
      new Cell(7, 4),
      new Cell(7, 3),
      new Cell(6, 3),
      new Cell(5, 3)
    ];
    this.initialGrid = this.grid;
    this.cells = [];
    this.state = {
      graphicalWorld: Page.createGraphicalWorld(this.initialGrid),
      running: false
    }
    this.intervalId = null

    this.RunGame.bind(this);
  }

  static createGraphicalWorld(grid) {
    var dim = {
      rows: 10,
      cols: 10
    };
    var graphicalWorld = new Array(dim.cols);
    for (let i=0; i<dim.rows; i++) {
      graphicalWorld[i] = new Array(dim.cols);
      for (var j=0; j<dim.cols; j++) {
        const cell = new Cell(i, j);
        graphicalWorld[i][j] = Boolean(Page.isCellInCellsList(cell, grid));
      }
    }
    return graphicalWorld;
  }

  resetWorld() {
    this.setState({running: false});
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null
    }
    this.grid = this.initialGrid;
    var graphicalWorld = Page.createGraphicalWorld(this.grid);
    this.setState({graphicalWorld: graphicalWorld})
  }

  RunGame(event) {
    this.setState({running: true});
    this.intervalId = setInterval(() => {
      let stayAlive = Page.getNextGenStillAliveCells(this.grid);
      let becomeAlive = Page.getNextGenBecomeAliveCells(this.grid);
      var nextGen = stayAlive.concat(becomeAlive);
      if (!nextGen.length) {
        alert("All cells died! :(")
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
      var graphicalWorld = Page.createGraphicalWorld(this.grid);
      this.grid = nextGen;
      this.setState({graphicalWorld: graphicalWorld})
    }, 500);
  }

  static getNextGenStillAliveCells (grid) {
    return grid.filter((cell) => {
      return [2,3].includes(Page.getTotalAliveNeighbours(grid, cell));
    });
  }


  static isCellInCellsList (cellToCheck, cellsList) {
    var cellInCellList = cellsList.find((cell) =>
      cell.posx === cellToCheck.posx && cell.posy === cellToCheck.posy
    );
    return Boolean(cellInCellList);
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
        <h3 className="header">Game of Life</h3>
        <div id="world">
          {this.state.graphicalWorld.map((row) => {
            return row.map((cell) => {
              return (<div className={cell ? 'aliveCell' : 'deadCell'}></div>);
            })
          })}
        </div>
        <button
          disabled={this.state.running}
          onClick={this.RunGame.bind(this)}>Start game</button>
        <button
          disabled={!this.state.running}
          onClick={this.resetWorld.bind(this)}>Reset</button>
      </div>
    );
  }
}

setTimeout(function() {
  // console.log(ReactDOMServer.renderToString(<Page/>)); // for server-side rendering
ReactDOM.render(<Page/>, document.getElementById('app'));
}, 80);

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
