describe("Cell", function() {
  beforeEach(function () {
    var board = [[1, 1], [1, 1]];
    var cellName = "static";
    cell = new Cell(board, cellName);
  });
  describe("Properties", function () {

    it("has an board property", function () {
      expect(cell.board).toEqual([[1, 1], [1, 1]]);
    });

    it("has a nextBoard property", function () {
      expect(cell.nextBoard).toEqual([]);
    });

    it("has a yIndex property", function () {
      expect(cell.yIndex).toEqual(0);
    });

    it("has an xIndex property", function () {
      expect(cell.xIndex).toEqual(0);
    });

    it("has a liveNeighbors property", function () {
      expect(cell.liveNeighbors).toEqual(0);
    });

    it("has a liveNeighbors property", function () {
      expect(cell.liveNeighbors).toEqual(0);
    });

    it("has a table contents property", function () {
      expect(cell.tableContents).toEqual("")
    });

    it("has a cellName property", function () {
      expect(cell.cellName).toEqual("static");
    });

    it("has a running property", function () {
      expect(cell.running).toEqual(true);
    });

    it("has a topOutterEdgeArray property", function () {
      expect(cell.topOutterEdgeArray).toEqual([])
    });

    it("has a bottomOutterEdgeArray property", function () {
      expect(cell.bottomOutterEdgeArray).toEqual([])
    });

    it("has a leftOutterEdgeArray property", function () {
      expect(cell.leftOutterEdgeArray).toEqual([])
    });

    it("has a rightOutterEdgeArray property", function () {
      expect(cell.rightOutterEdgeArray).toEqual([])
    });

    it("has a moving property", function () {
      expect(cell.moving).toEqual(false)
    });

    it("has a movingCycleCount property", function () {
      expect(cell.movingCycleCount).toEqual(0)
    });

  });

  describe("game rules", function () {
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
  });

  describe("building the next iteration", function () {
    describe("#buildCell", function () {
      it("builds the next cell", function () {
        var y = 0;
        var x = 0;
        cell.nextBoard[y] = [];

        spyOn(cell, "countLiveNeighbors").and.callThrough();
        spyOn(cell, "applyRulesToCell").and.callThrough();

        cell.buildCell(y, x);

        expect(cell.countLiveNeighbors).toHaveBeenCalled();
        expect(cell.applyRulesToCell).toHaveBeenCalled();
        expect(cell.nextBoard[y][x]).toEqual(1)
      })
    });

    describe("#buildNextBoard", function () {
      it("builds the next board when it is a still live", function () {
        spyOn(cell, "buildInnerCells").and.callThrough();
        spyOn(cell, "buildOutterEdges").and.callThrough();
        spyOn(cell, "addOutterEdgesToNextBoard").and.callThrough();
        spyOn(cell, "trimEmptyEdges").and.callThrough();
        spyOn(cell, "manageMovement").and.callThrough();

        cell.buildNextBoard();

        expect(cell.nextBoard).toEqual(cell.board);
        expect(cell.buildInnerCells).toHaveBeenCalled();
        expect(cell.buildOutterEdges).toHaveBeenCalled();
        expect(cell.addOutterEdgesToNextBoard).toHaveBeenCalled();
        expect(cell.trimEmptyEdges).toHaveBeenCalled();
        expect(cell.manageMovement).toHaveBeenCalled();
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

      it("builds a board with new outter cells", function () {
        cell.board = [[0, 1, 1, 1],
                      [0, 0, 0, 0],
                      [0, 0, 0, 1],
                      [0, 0, 1, 1]];

        var nextBoard = [[0, 0, 1, 0],
                         [0, 0, 1, 0],
                         [0, 0, 0, 1],
                         [0, 0, 1, 1],
                         [0, 0, 1, 1]];

        cell.buildNextBoard();

        expect(cell.nextBoard).toEqual(nextBoard);
      });

      it("resets the live neighbors to 0", function () {
        cell.buildNextBoard();

        expect(cell.liveNeighbors).toEqual(0);
      })
    });

    describe("#prepareForNextIteration", function () {
      it("prepares for the next board", function () {
        cell.nextBoard = [];

        cell.prepareForNextIteration();
        expect(cell.board).toEqual([]);
        expect(cell.nextBoard).toEqual([]);
      });
    });

    describe("#buildOutterEdges", function () {
      it("builds all of the outter edges", function () {
        spyOn(cell, "buildTopOutterEdge");
        spyOn(cell, "buildBottomOutterEdge");
        spyOn(cell, "buildRightOutterEdge");
        spyOn(cell, "buildLeftOutterEdge");

        cell.buildOutterEdges();

        expect(cell.buildTopOutterEdge).toHaveBeenCalled();
        expect(cell.buildBottomOutterEdge).toHaveBeenCalled();
        expect(cell.buildRightOutterEdge).toHaveBeenCalled();
        expect(cell.buildLeftOutterEdge).toHaveBeenCalled();
      });

      describe("#buildTopOutterEdge", function () {
        it("builds the outter cells of the top edge", function () {
          cell.board = [[1, 1, 1]];
          cell.buildTopOutterEdge();
          expect(cell.topOutterEdgeArray).toEqual([0, 1, 0]);
        });
      });

      describe("#buildBottomOutterEdge", function () {
        it("builds the outter cells of the bottom edge", function () {
          cell.board = [[1, 1, 1]];
          cell.buildBottomOutterEdge();
          expect(cell.bottomOutterEdgeArray).toEqual([0, 1, 0])

        });
      });

      describe("#buildRightOutterEdge", function () {
        it("builds the outter cells of the right edge", function () {
          cell.board = [[1],
                        [1],
                        [1]];
          cell.buildRightOutterEdge();
          expect(cell.rightOutterEdgeArray).toEqual([0, 1, 0]);
        });
      });

      describe("#buildLeftOutterEdge", function () {
        it("builds the outter cells of the left edge", function () {
          cell.board = [[1],
                        [1],
                        [1]];
          cell.buildLeftOutterEdge();
          expect(cell.leftOutterEdgeArray).toEqual([0, 1, 0]);
        });
      });
    });

    describe("#addOutterEdgesToNextBoard", function () {
      it("adds the outter edge", function () {
        cell.topOutterEdgeArray = [1, 1, 1];
        cell.bottomOutterEdgeArray = [1, 1, 1];
        cell.leftOutterEdgeArray = [1, 1, 1];
        cell.rightOutterEdgeArray = [1, 1, 1];

        cell.nextBoard = [[0, 0, 0],
                          [0, 0, 0],
                          [0, 0, 0]];

        cell.addOutterEdgesToNextBoard();
        expect(cell.nextBoard).toEqual([[0, 1, 1, 1, 0],
                                        [1, 0, 0, 0, 1],
                                        [1, 0, 0, 0, 1],
                                        [1, 0, 0, 0, 1],
                                        [0, 1, 1, 1, 0]])
      });

      it("adds the outter edges if they contain a live cell", function () {
        cell.topOutterEdgeArray = [0, 1, 0];
        cell.bottomOutterEdgeArray = [0, 1, 0];
        cell.leftOutterEdgeArray = [0, 1, 0];
        cell.rightOutterEdgeArray = [0, 1, 0];

        cell.nextBoard = [[1, 1, 0],
                          [1, 0, 0],
                          [1, 0, 0]];

        spyOn(cell, "addTopOutterEdge");
        spyOn(cell, "addBottomOutterEdge");
        spyOn(cell, "addLeftOutterEdge");
        spyOn(cell, "addRightOutterEdge");

        cell.addOutterEdgesToNextBoard();

        expect(cell.addTopOutterEdge).toHaveBeenCalled();
        expect(cell.addBottomOutterEdge).toHaveBeenCalled();
        expect(cell.addLeftOutterEdge).toHaveBeenCalled();
        expect(cell.addRightOutterEdge).toHaveBeenCalled();
      });

      it("does not add the outter edges if they do not contain a live cell", function () {
        cell.topOutterEdgeArray = [0, 0, 0];
        cell.bottomOutterEdgeArray = [0, 0, 0];
        cell.leftOutterEdgeArray = [0, 0, 0];
        cell.rightOutterEdgeArray = [0, 0, 0];

        cell.nextBoard = [[1, 1, 0],
                          [1, 0, 0],
                          [1, 0, 0]];

        spyOn(cell, "addTopOutterEdge");
        spyOn(cell, "addBottomOutterEdge");
        spyOn(cell, "addLeftOutterEdge");
        spyOn(cell, "addRightOutterEdge");

        cell.addOutterEdgesToNextBoard();

        expect(cell.addTopOutterEdge).not.toHaveBeenCalled();
        expect(cell.addBottomOutterEdge).not.toHaveBeenCalled();
        expect(cell.addLeftOutterEdge).not.toHaveBeenCalled();
        expect(cell.addRightOutterEdge).not.toHaveBeenCalled();
      });

      describe("#addTopOutterEdge", function () {
        it("adds the topOutterEdgeArray to the nextBoard", function () {
          cell.nextBoard = [[0, 0, 0]];
          cell.topOutterEdgeArray = [1, 1, 1];
          cell.addTopOutterEdge();

          expect(cell.nextBoard).toEqual([[1, 1, 1], [0, 0, 0]])
        });

        it("adds a 0 to the beginning of the rightOutterEdgeArray", function () {
          cell.nextBoard = [[0, 0, 0]];
          cell.topOutterEdgeArray = [1, 1, 1];
          cell.rightOutterEdgeArray = [1, 1, 1];
          cell.addTopOutterEdge();

          expect(cell.rightOutterEdgeArray).toEqual([0, 1, 1, 1])
        });

        it("adds a 0 to the beginning of the leftOutterEdgeArray", function () {
          cell.nextBoard = [[0, 0, 0]];
          cell.topOutterEdgeArray = [1, 1, 1];
          cell.leftOutterEdgeArray = [1, 1, 1];
          cell.addTopOutterEdge();

          expect(cell.leftOutterEdgeArray).toEqual([0, 1, 1, 1])
        })
      });

      describe("#addBottomOutterEdge", function () {
        it("adds the bottomOutterEdgeArray to the nextBoard", function () {
          cell.nextBoard = [[0, 0, 0]];
          cell.bottomOutterEdgeArray = [1, 1, 1];
          cell.addBottomOutterEdge();

          expect(cell.nextBoard).toEqual([[0, 0, 0], [1, 1, 1]])
        });

        it("adds a 0 to the end of the rightOutterEdgeArray", function () {
          cell.nextBoard = [[0, 0, 0]];
          cell.bottomOutterEdgeArray = [1, 1, 1];
          cell.rightOutterEdgeArray = [1, 1, 1];
          cell.addBottomOutterEdge();

          expect(cell.rightOutterEdgeArray).toEqual([1, 1, 1, 0])
        });

        it("adds a 0 to the end of the leftOutterEdgeArray", function () {
          cell.nextBoard = [[0, 0, 0]];
          cell.bottomOutterEdgeArray = [1, 1, 1];
          cell.leftOutterEdgeArray = [1, 1, 1];
          cell.addBottomOutterEdge();

          expect(cell.leftOutterEdgeArray).toEqual([1, 1, 1, 0])
        })
      });

      describe("#addLeftOutterEdge", function () {
        it("adds the left outter edge to te nextBoard", function () {
          cell.nextBoard = [[0], [0]];
          cell.leftOutterEdgeArray = [1, 1];

          cell.addLeftOutterEdge();
          expect(cell.nextBoard).toEqual([[1, 0], [1, 0]])
        })
      });

      describe("#addRightOutterEdge", function () {
        it("adds the left outter edge to te nextBoard", function () {
          cell.nextBoard = [[0], [0]];
          cell.rightOutterEdgeArray = [1, 1];

          cell.addRightOutterEdge();
          expect(cell.nextBoard).toEqual([[0, 1], [0, 1]])
        })
      })
    });

    describe("#trimEmptyEdges", function () {
      it("trims the empty edges when there are three on a side", function () {
        cell.topOutterEdgeArray = [0, 0, 0];
        cell.bottomOutterEdgeArray = [0, 0, 0];
        cell.leftOutterEdgeArray = [0, 0, 0];
        cell.rightOutterEdgeArray = [0, 0, 0];

        spyOn(cell, "topThreeEdgesAreEmpty").and.returnValue(true);
        spyOn(cell, "bottomThreeEdgesAreEmpty").and.returnValue(true);
        spyOn(cell, "leftThreeEdgesAreEmpty").and.returnValue(true);
        spyOn(cell, "rightThreeEdgesAreEmpty").and.returnValue(true);

        spyOn(cell, "trimTopEdge");
        spyOn(cell, "trimBottomEdge");
        spyOn(cell, "trimRightEdge");
        spyOn(cell, "trimLeftEdge");

        cell.trimEmptyEdges();

        expect(cell.trimTopEdge).toHaveBeenCalled();
        expect(cell.trimBottomEdge).toHaveBeenCalled();
        expect(cell.trimRightEdge).toHaveBeenCalled();
        expect(cell.trimLeftEdge).toHaveBeenCalled();
        expect(cell.moving).toEqual(true);
      });

      it("does not trim the empty edges when there are not three on a side", function () {
        cell.topOutterEdgeArray = [0, 0, 0];
        cell.bottomOutterEdgeArray = [0, 0, 0];
        cell.leftOutterEdgeArray = [0, 0, 0];
        cell.rightOutterEdgeArray = [0, 0, 0];

        spyOn(cell, "topThreeEdgesAreEmpty").and.returnValue(false);
        spyOn(cell, "bottomThreeEdgesAreEmpty").and.returnValue(false);
        spyOn(cell, "leftThreeEdgesAreEmpty").and.returnValue(false);
        spyOn(cell, "rightThreeEdgesAreEmpty").and.returnValue(false);

        spyOn(cell, "trimTopEdge");
        spyOn(cell, "trimBottomEdge");
        spyOn(cell, "trimRightEdge");
        spyOn(cell, "trimLeftEdge");

        cell.trimEmptyEdges();

        expect(cell.trimTopEdge).not.toHaveBeenCalled();
        expect(cell.trimBottomEdge).not.toHaveBeenCalled();
        expect(cell.trimRightEdge).not.toHaveBeenCalled();
        expect(cell.trimLeftEdge).not.toHaveBeenCalled();
        expect(cell.moving).toEqual(false);
      });

      it("does not trim the empty edges when the outterEdgeArray contains a live cell", function () {
        cell.topOutterEdgeArray = [0, 1, 0];
        cell.bottomOutterEdgeArray = [0, 1, 0];
        cell.leftOutterEdgeArray = [0, 1, 0];
        cell.rightOutterEdgeArray = [0, 1, 0];

        spyOn(cell, "trimTopEdge");
        spyOn(cell, "trimBottomEdge");
        spyOn(cell, "trimRightEdge");
        spyOn(cell, "trimLeftEdge");

        cell.trimEmptyEdges();

        expect(cell.trimTopEdge).not.toHaveBeenCalled();
        expect(cell.trimBottomEdge).not.toHaveBeenCalled();
        expect(cell.trimRightEdge).not.toHaveBeenCalled();
        expect(cell.trimLeftEdge).not.toHaveBeenCalled();
        expect(cell.moving).toEqual(false);
      });
    });

    describe("#manageMovement", function () {
      it("tracks the movement cycle", function () {
        cell.moving = true;

        cell.manageMovement();

        expect(cell.movingCycleCount).toEqual(1)
      });

      it("resents the moving cycle count after 5 cycles", function () {
        cell.movingCycleCount = 5;
        cell.manageMovement();
        expect(cell.movingCycleCount).toEqual(0)
      });

      it("sets the nextBoard equal to the original board after 5 cycles", function () {
        cell.movingCycleCount = 5;
        cell.manageMovement();
        expect(cell.nextBoard).toEqual(cell.board);
      })
    })
  });

  describe("displaying the next board", function () {
    describe("#showNextBoard", function () {
      it("shows the next iteration on the html page", function (){
        spyOn(cell, 'buildNextBoard');
        spyOn(cell, 'buildTableContents');
        spyOn(cell, 'appendTableToPage');
        spyOn(cell, 'removeTableFromPage');
        spyOn(cell, 'prepareForNextIteration');

        cell.showNextBoard();

        expect(cell.buildNextBoard).toHaveBeenCalled();
        expect(cell.buildTableContents).toHaveBeenCalled();
        expect(cell.appendTableToPage).toHaveBeenCalled();
        expect(cell.removeTableFromPage).toHaveBeenCalled();
        expect(cell.prepareForNextIteration).toHaveBeenCalled();
      });
    });
  });

  describe("showing the original board", function () {
    it("shows the original board", function () {
      spyOn(cell, "buildTableContents");
      spyOn(cell, "appendTableToPage");
      spyOn(cell, "prepareForNextIteration");

      cell.showOriginalBoard();

      expect(cell.buildTableContents).toHaveBeenCalled();
      expect(cell.appendTableToPage).toHaveBeenCalled();
      expect(cell.prepareForNextIteration).toHaveBeenCalled();
    })
  })
});
