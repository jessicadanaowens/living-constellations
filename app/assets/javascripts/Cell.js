var Cell = function (board, cellName) {
  this.originalBoard = board;
  this.board = board;
  this.nextBoard = [];
  this.yIndex = 0;
  this.xIndex = 0;
  this.liveNeighbors = 0;
  this.tableContents = "";
  this.cellName = cellName;
  this.running = true;
  this.topOutterEdgeArray = [];
  this.bottomOutterEdgeArray = [];
  this.rightOutterEdgeArray = [];
  this.leftOutterEdgeArray = [];
  this.moving = false;
  this.movingCycleCount = 0;
};

Cell.prototype.startRunning = function startRunning (cell) {!
  setTimeout(function () {
    cell.showNextBoard();
    if (cell.running === true) {
      startRunning(cell)
    }
  }, 1000);
};

Cell.prototype.initializeOnPage = function initializeOnPage (organism, cellName) {
  if(organism.length > 5) {
    $('.organisms').append("<div class='col-md-6' id=" + cellName + "><h4 class='white'>" + cellName + "</h4><br><table id=" + cellName + ">" + "</table></div><br>" );
  } else {
    $('.organisms').append("<div class='col-md-3' id=" + cellName + "><h4 class='white'>" + cellName + "</h4><br><table id=" + cellName + ">" + "</table></div><br>" );
  }
};

Cell.prototype.showOriginalBoard = function showOriginalBoard () {
  this.nextBoard = this.board;
  this.buildTableContents();
  this.appendTableToPage();
  this.prepareForNextIteration();
};

Cell.prototype.showNextBoard = function showNextBoard () {
  this.buildNextBoard();
  this.buildTableContents();
  this.removeTableFromPage();
  this.appendTableToPage();
  this.prepareForNextIteration();
};

Cell.prototype.buildNextBoard = function buildNextBoard () {
  this.buildInnerCells();
  this.buildOutterEdges();
  this.addOutterEdgesToNextBoard();
  this.trimEmptyEdges();
  this.manageMovement();
};

Cell.prototype.manageMovement = function manageMovement () {
  if(this.movingCycleCount == 5) {
    this.nextBoard = this.originalBoard;
    this.movingCycleCount = 0;
  }else if (this.moving == true) {
    this.movingCycleCount += 1;
  }
};

Cell.prototype.trimEmptyEdges = function trimEmptyEdges () {
  if(this.topOutterEdgeArray.indexOf(1) == -1 && this.topThreeEdgesAreEmpty()){
    this.trimTopEdge();
    this.moving = true;
  };

  if(this.bottomOutterEdgeArray.indexOf(1) == -1 && this.bottomThreeEdgesAreEmpty()) {
    this.trimBottomEdge();
    this.moving = true
  };

  if(this.leftOutterEdgeArray.indexOf(1) == -1 && this.leftThreeEdgesAreEmpty()) {
    this.trimLeftEdge();
    this.moving = true;
  };

  if(this.rightOutterEdgeArray.indexOf(1) == -1 && this.rightThreeEdgesAreEmpty()) {
    this.trimRightEdge();
    this.moving = true;
  };
};

Cell.prototype.topThreeEdgesAreEmpty = function topThreeEdgesAreEmpty() {
  return this.nextBoard[0].indexOf(1) == -1 &&
    this.nextBoard[1].indexOf(1) == -1 &&
    this.nextBoard[2].indexOf(1) == -1;

};

Cell.prototype.bottomThreeEdgesAreEmpty = function bottomThreeEdgesAreEmpty () {
  var yIndex = this.nextBoard.length - 1;

  return this.nextBoard[yIndex].indexOf(1) == -1 &&
    this.nextBoard[yIndex - 1].indexOf(1) == -1 &&
    this.nextBoard[yIndex - 2].indexOf(1) == -1
};

Cell.prototype.leftThreeEdgesAreEmpty = function leftThreeEdgesAreEmpty () {
  var count = 0;
  for(var y = 0; y < this.nextBoard.length; y++) {
    if (this.nextBoard[y][0] == 1 || this.nextBoard[y][1] == 1 || this.nextBoard[y][2] == 1){
      count += 1
    }
  }
  count == 0;
};

Cell.prototype.rightThreeEdgesAreEmpty = function rightThreeEdgesAreEmpty () {
  var count = 0;
  var xIndex = this.nextBoard.length - 1;
  for(var y = 0; y < this.nextBoard.length; y++) {
    if (this.nextBoard[y][xIndex] == 1  || this.nextBoard[y][xIndex - 1] == 1 || this.nextBoard[y][xIndex - 2] == 1) {
      count += 1
    }
  }
  count == 0;
};

Cell.prototype.trimTopEdge = function trimTopEdge () {
  this.nextBoard.splice(0, 1);
};

Cell.prototype.trimBottomEdge = function trimBottomEdge () {
  var yIndex = this.nextBoard.length - 1;

  this.nextBoard.splice(yIndex, 1);
};

Cell.prototype.trimLeftEdge = function trimLeftEdge () {
  for(var y = 0; y < this.nextBoard.length; y++) {
    this.nextBoard[y].splice(0, 1);
  }
};

Cell.prototype.trimRightEdge = function trimRightEdge () {
  var xIndex = this.nextBoard.length - 1;

  for(var y = 0; y < this.nextBoard.length; y++) {
    this.nextBoard[y].splice(xIndex, 1);
  }
};

Cell.prototype.buildInnerCells = function buildInnerCells () {
  for(var y = 0; y < this.board.length; y++) {
    this.yIndex = y;
    this.nextBoard[y] = [];

    for (var x = 0; x < this.board[y].length; x++) {
      this.xIndex = x;
      this.buildCell(y, x);
      this.liveNeighbors = 0;
    }
  }
};

Cell.prototype.buildOutterEdges = function buildOutterEdges () {
  this.buildTopOutterEdge();
  this.buildBottomOutterEdge();
  this.buildRightOutterEdge();
  this.buildLeftOutterEdge();
};

Cell.prototype.addOutterEdgesToNextBoard = function addOutterEdgesToNextBoard () {
  if(this.topOutterEdgeArray.indexOf(1) != -1){
    this.addTopOutterEdge();
  }

  if(this.bottomOutterEdgeArray.indexOf(1) != -1) {
    this.addBottomOutterEdge();
  }

  if(this.leftOutterEdgeArray.indexOf(1) != -1) {
    this.addLeftOutterEdge();
  }

  if(this.rightOutterEdgeArray.indexOf(1) != -1) {
    this.addRightOutterEdge();
  }
};

Cell.prototype.addTopOutterEdge = function addTopOutterEdge () {
  this.nextBoard.unshift(this.topOutterEdgeArray);
  this.rightOutterEdgeArray.unshift(0);
  this.leftOutterEdgeArray.unshift(0);
};

Cell.prototype.addBottomOutterEdge = function addBottomOutterEdge () {
  this.nextBoard.push(this.bottomOutterEdgeArray);
  this.rightOutterEdgeArray.push(0);
  this.leftOutterEdgeArray.push(0);
};

Cell.prototype.addLeftOutterEdge = function addLeftOutterEdge () {
  for(var y = 0; y < this.nextBoard.length; y++) {
    this.nextBoard[y].unshift(this.leftOutterEdgeArray[y]);
  };
};

Cell.prototype.addRightOutterEdge = function addRightOutterEdge () {
  for(var y = 0; y < this.nextBoard.length; y++) {
    this.nextBoard[y].push(this.rightOutterEdgeArray[y]);
  };
};


Cell.prototype.buildTopOutterEdge = function buildTopOutterEdge () {
  this.yIndex = 0;

  for(var x = 0; x < this.board[0].length; x++) {
    this.xIndex = x;
    if (this.board[0][x] == 1 && this.right() == 1 && this.left() == 1) {
      this.topOutterEdgeArray[x] = 1;
    } else {
      this.topOutterEdgeArray[x] = 0;
    }
  }
};

Cell.prototype.buildBottomOutterEdge = function buildBottomOutterEdge () {
  this.yIndex = this.board.length - 1;

  for(var x = 0; x < this.board[this.yIndex].length; x++) {
    this.xIndex = x;
    if (this.board[this.yIndex][x] == 1 && this.right() == 1 && this.left() == 1) {
      this.bottomOutterEdgeArray[x] = 1;
    } else {
      this.bottomOutterEdgeArray[x] = 0;
    }
  }
};

Cell.prototype.buildLeftOutterEdge = function buildLeftOutterEdge () {
  for(var y = 0; y < this.board.length; y++) {
    this.yIndex = y;
    this.xIndex = 0;

    if (this.board[this.yIndex][0] == 1 && this.top() == 1 && this.bottom() == 1) {
      this.leftOutterEdgeArray[y] = 1;
    } else {
      this.leftOutterEdgeArray[y] = 0;
    }
  }
};

Cell.prototype.buildRightOutterEdge = function buildRightOutterEdge () {
  for(var y = 0; y < this.board.length; y++) {
    this.yIndex = y;
    this.xIndex = this.board[this.yIndex].length - 1;
    if (this.board[this.yIndex][this.xIndex] == 1 && this.top() == 1 && this.bottom() == 1) {
      this.rightOutterEdgeArray[y] = 1;
    } else {
      this.rightOutterEdgeArray[y] = 0;
    }
  }
};

Cell.prototype.buildTableContents = function buildTableContents () {
  for(var y = 0; y < this.nextBoard.length; y++) {

    this.tableRows = "";
    for (var x = 0; x < this.nextBoard[y].length; x++) {

      if (this.nextBoard[y][x] == 1) {
        this.tableRows = this.tableRows + "<td class='alive glyphicon glyphicon-star'></td>";
      } else {
        this.tableRows = this.tableRows + "<td class='dead glyphicon glyphicon-star'></td>";
      }
    }
    this.tableContents = this.tableContents + "<tr>" + this.tableRows + "</tr>";
  }

  return this.tableContents;
};

Cell.prototype.appendTableToPage = function appendTableToPage () {
  $('table#' + this.cellName).append(this.tableContents);
};

Cell.prototype.removeTableFromPage = function removeTableFromPage () {
  $('table#' + this.cellName).children().empty();
};

Cell.prototype.prepareForNextIteration = function prepareForNextIteration () {
  this.board = this.nextBoard;
  this.nextBoard = [];
  this.tableContents = "";
  this.topOutterEdgeArray = [];
  this.bottomOutterEdgeArray = [];
  this.rightOutterEdgeArray = [];
  this.leftOutterEdgeArray = [];
};

Cell.prototype.buildCell = function buildCell (y, x) {
  this.nextBoard[y][x] = 0;
  this.countLiveNeighbors();
  this.applyRulesToCell();
};

Cell.prototype.currentCellIsAlive = function currentCellIsAlive () {
  return this.board[this.yIndex][this.xIndex] == 1;
};

Cell.prototype.applyRulesToCell = function applyRulesToCell () {
  if(this.currentCellIsAlive()) {
    this.applyRulesToLiveCell();
  } else {
    this.applyRulesToDeadCell();
  }
};

Cell.prototype.applyRulesToLiveCell = function applyRulesToLiveCell () {
  if(this.liveNeighbors < 2 || this.liveNeighbors > 3) {
    this.nextBoard[this.yIndex][this.xIndex] = 0;
  } else {
    this.nextBoard[this.yIndex][this.xIndex] = 1;
  };
};

Cell.prototype.applyRulesToDeadCell = function applyRulesToDeadCell () {
  if(this.liveNeighbors == 3) {
    this.nextBoard[this.yIndex][this.xIndex] = 1;
  } else {
    this.nextBoard[this.yIndex][this.xIndex] = 0;
  };
};

Cell.prototype.countLiveNeighbors = function countLiveNeighbors() {
  this.liveNeighbors =
  this.right() +
  this.bottomRight() +
  this.bottom() +
  this.bottomLeft() +
  this.left() +
  this.topLeft() +
  this.top() +
  this.topRight();
};

Cell.prototype.right = function right() {
  var val;
  if (this.cellIsLastInArray()) {
    val = 0;
  } else {
    val = this.board[this.yIndex][this.xIndex + 1];
  };

  return val;
};

Cell.prototype.bottomRight = function bottomRight() {
  var val;
  if (this.cellIsOnBottomEdge() || this.cellIsLastInArray()) {
    val = 0;
  } else {
    val = this.board[this.yIndex + 1][this.xIndex + 1];
  };

  return val;
};

Cell.prototype.bottom = function bottom () {
  var val;

  if(this.cellIsOnBottomEdge()) {
    val = 0;
  } else {
    val = this.board[this.yIndex + 1][this.xIndex];
  }

  return val;
};

Cell.prototype.bottomLeft = function bottomLeft () {
  var val;

  if(this.cellIsFirstInArray() || this.cellIsOnBottomEdge()) {
    val = 0;
  } else {
    val = this.board[this.yIndex + 1][this.xIndex - 1];
  }

  return val;
};

Cell.prototype.left = function left () {
  var val;

  if(this.cellIsFirstInArray()) {
    val = 0;
  } else {
    val = this.board[this.yIndex][this.xIndex - 1];
  }

  return val;
};

Cell.prototype.topLeft = function topLeft () {
  var val;

  if(this.cellIsFirstInArray() || this.cellIsOnTopEdge()) {
    val = 0;
  } else {
    val = this.board[this.yIndex - 1][this.xIndex - 1];
  }

  return val;
};

Cell.prototype.top = function top () {
  var val;

  if(this.cellIsOnTopEdge()) {
    val = 0;
  } else {
    val = this.board[this.yIndex - 1][this.xIndex];
  }

  return val;
};

Cell.prototype.topRight = function topRight () {
  var val;

  if(this.cellIsOnTopEdge() || this.cellIsLastInArray()) {
    val = 0;
  } else {
    val = this.board[this.yIndex - 1][this.xIndex + 1];
  }

  return val;
};

Cell.prototype.cellIsLastInArray = function cellIsLastInArray () {
  return this.xIndex == (this.board[this.yIndex].length - 1);
};

Cell.prototype.cellIsFirstInArray = function cellIsFirstInArray () {
  return this.xIndex == 0;
};

Cell.prototype.cellIsOnBottomEdge = function cellIsOnBottomEdge () {
  return this.yIndex == (this.board.length - 1);
};

Cell.prototype.cellIsOnTopEdge = function cellIsOnTopEdge () {
  return this.yIndex == 0;
};


