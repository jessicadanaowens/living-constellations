describe("Cell", function() {
  describe("Properties", function () {
    beforeEach(function() {
      var board = [[1,1], [1,1]];
      cell = new Cell(board);
    });

    describe("#currentCellIsAlive", function () {
      it("returns true if the current cell is alive", function () {
        cell.yIndex = 0;
        cell.xIndex = 0;

        var alive = cell.currentCellIsAlive();

        expect(alive).toEqual(true);
      });
    });

    describe("#applyRulesToLiveCell", function() {
      it("kills the cell if it has fewer than two live neighbors", function () {
        cell.yIndex = 0;
        cell.xIndex = 0;
        cell.nextBoard = [[0]];
        cell.liveNeighbors = 1;

        cell.applyRulesToLiveCell();

        expect(cell.nextBoard[cell.yIndex][cell.xIndex]).toEqual(0)
      });

      it("gives life to the cell if it has two live neighbors", function () {
        cell.yIndex = 0;
        cell.xIndex = 0;
        cell.nextBoard = [[0]];
        cell.liveNeighbors = 2;

        cell.applyRulesToLiveCell();

        expect(cell.nextBoard[cell.yIndex][cell.xIndex]).toEqual(1)
      });

      it("gives life to the cell if it has three live neighbors", function () {
        cell.yIndex = 0;
        cell.xIndex = 0;
        cell.nextBoard = [[0]];
        cell.liveNeighbors = 3;

        cell.applyRulesToLiveCell();

        expect(cell.nextBoard[cell.yIndex][cell.xIndex]).toEqual(1)
      });

      it("kills the cell if it has more than three live neighbors", function () {
        cell.yIndex = 0;
        cell.xIndex = 0;
        cell.nextBoard = [[0]];
        cell.liveNeighbors = 4;

        cell.applyRulesToLiveCell();

        expect(cell.nextBoard[cell.yIndex][cell.xIndex]).toEqual(0)
      });
    });

    describe("#applyRulesToDeadCell", function () {
      it("gives life to the cell if it has three live neighbors", function () {
        cell.yIndex = 0;
        cell.xIndex = 0;
        cell.nextBoard = [[0]];
        cell.liveNeighbors = 3;

        cell.applyRulesToDeadCell();

        expect(cell.nextBoard[cell.yIndex][cell.xIndex]).toEqual(1)
      });
    });

    describe("#applyRulesToCell", function () {
      it("applies rules to a live cell", function () {
        spyOn(cell, "currentCellIsAlive").and.returnValue(true);
        spyOn(cell, "applyRulesToLiveCell").and.returnValue(true);

        cell.applyRulesToCell();

        expect(cell.applyRulesToLiveCell).toHaveBeenCalled()
      });

      it("applies rule to a deadcell", function () {
        cell.yIndex = 0;
        cell.xIndex = 0;
        cell.board[cell.yIndex][cell.xIndex] = 0;
        cell.nextBoard = [[0]];

        spyOn(cell, "currentCellIsAlive");
        spyOn(cell, "applyRulesToDeadCell");

        cell.applyRulesToCell();

        expect(cell.applyRulesToDeadCell).toHaveBeenCalled()
      });
    });

    describe("#buildCell", function () {
      it("builds the next cell", function () {
        var y = 0;
        var x = 0;
        cell.nextBoard[y]=[];

        spyOn(cell, "countLiveNeighbors").and.callThrough();
        spyOn(cell, "applyRulesToCell").and.callThrough();

        cell.buildCell(y, x);

        expect(cell.countLiveNeighbors).toHaveBeenCalled();
        expect(cell.applyRulesToCell).toHaveBeenCalled();
        expect(cell.nextBoard[0][0]).toEqual(1)
      })
    });

    describe("#buildNextBoard", function () {
      it("builds the next board when it is a still live", function () {
        cell.buildNextBoard();

        expect(cell.nextBoard).toEqual(cell.board);
      });

      it("builds a beacon", function () {
        cell.board = [[1, 1, 0, 0],
          [1, 0, 0, 0],
          [0, 0, 0, 1],
          [0, 0, 1, 1]];

        var nextBoard = [[1, 1, 0, 0],
          [1, 1, 0, 0],
          [0, 0, 1, 1],
          [0, 0, 1, 1]];

        cell.buildNextBoard();

        expect(cell.nextBoard).toEqual(nextBoard);
      });

      it("builds a toad", function () {
        cell.board = [[0, 0, 0, 0],
          [0, 1, 1, 1],
          [1, 1, 1, 0],
          [0, 0, 0, 0]];

        var nextBoard = [[0, 0, 1, 0],
          [1, 0, 0, 1],
          [1, 0, 0, 1],
          [0, 1, 0, 0]];

        cell.buildNextBoard();

        expect(cell.nextBoard).toEqual(nextBoard);
      });

      it("resets the live neighbors to 0", function () {
        cell.buildNextBoard();

        expect(cell.liveNeighbors).toEqual(0);
      })
    });

    describe("#evolve", function () {
      it("allows the board to continuously evolve", function () {

      })
    })
  });
});