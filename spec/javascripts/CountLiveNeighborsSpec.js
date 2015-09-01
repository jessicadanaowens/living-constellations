describe("Cell", function() {

  beforeEach(function() {
    var board = [[1,1], [1,1]];
    cell = new Cell(board);
  });

  describe("#countLiveNeighbors", function () {
    it("counts the live neighbors around the individual cell", function () {
      cell.countLiveNeighbors();
      expect(cell.liveNeighbors).toEqual(3)
    });

    it("calls a bunch of functions to count each neighbor", function () {
      spyOn(cell, "right").and.callThrough();
      spyOn(cell, "bottomRight").and.callThrough();
      spyOn(cell, "bottom").and.callThrough();
      spyOn(cell, "bottomLeft").and.callThrough();
      spyOn(cell, "left").and.callThrough();
      spyOn(cell, "topRight").and.callThrough();
      spyOn(cell, "top").and.callThrough();
      spyOn(cell, "topLeft").and.callThrough();

      cell.countLiveNeighbors();

      expect(cell.right).toHaveBeenCalled();
      expect(cell.bottomRight).toHaveBeenCalled();
      expect(cell.bottom).toHaveBeenCalled();
      expect(cell.bottomLeft).toHaveBeenCalled();
      expect(cell.right).toHaveBeenCalled();
      expect(cell.topRight).toHaveBeenCalled();
      expect(cell.top).toHaveBeenCalled();
      expect(cell.topLeft).toHaveBeenCalled();
    });
  });

  describe("#right", function () {
    it("evaluates the right neighbor", function () {
      cell.yIndex = 0;
      cell.xIndex = 0;

      spyOn(cell, "cellIsLastInArray");

      var right = cell.right();

      expect(right).toEqual(1);
      expect(cell.cellIsLastInArray).toHaveBeenCalled();
    });

    it("evaluates the right neighbor as 0 if cell is on the edge", function () {
      cell.yIndex = 0;
      cell.xIndex = 1;

      spyOn(cell, "cellIsLastInArray").and.callThrough();

      cell.right();

      expect(cell.liveNeighbors).toEqual(0);
    })
  });

  describe("#bottomRight", function () {
    it("evaluates the bottom right neighbor", function () {
      cell.yIndex = 0;
      cell.xIndex = 0;

      spyOn(cell, "cellIsOnBottomEdge");
      spyOn(cell, "cellIsLastInArray");

      cell.bottomRight();

      expect(cell.cellIsOnBottomEdge).toHaveBeenCalled();
      expect(cell.cellIsLastInArray).toHaveBeenCalled();
    });

    it("evaluates the bottom right neighbor as 0 if the cell is on the right or bottom edge", function () {
      cell.yIndex = 0;
      cell.xIndex = 1;

      var bottomRight = cell.bottomRight();

      expect(bottomRight).toEqual(0);

      cell.yIndex = 1;
      cell.xIndex = 1;

      bottomRight = cell.bottomRight();

      expect(bottomRight).toEqual(0);
    })
  });

  describe("#bottom", function () {
    it("evaluates the bottom neighbor", function () {
      cell.yIndex = 0;
      cell.xIndex = 0;

      spyOn(cell, "cellIsOnBottomEdge");

      var bottom = cell.bottom();

      expect(bottom).toEqual(1);
      expect(cell.cellIsOnBottomEdge).toHaveBeenCalled();
    });

    it("evaluates the bottom neighbor as 0 if the cell is on the bottom edge", function () {
      cell.yIndex = 1;
      cell.xIndex = 0;

      spyOn(cell, "cellIsOnBottomEdge").and.callThrough();

      var bottom = cell.bottom();

      expect(bottom).toEqual(0);
    });
  });

  describe("#bottomLeft", function () {
    it("evaluates the bottom left neighbor as 0 if the cell is on the left edge", function () {
      cell.yIndex = 0;
      cell.xIndex = 0;

      spyOn(cell, "cellIsFirstInArray").and.callThrough();

      var bottomLeft = cell.bottomLeft();

      expect(bottomLeft).toEqual(0);
      expect(cell.cellIsFirstInArray).toHaveBeenCalled();
    });

    it("evaluates the bottom left neighbor as 0 if the cell is on the bottom edge", function () {
      cell.yIndex = 1;
      cell.xIndex = 1;

      spyOn(cell, "cellIsOnBottomEdge").and.callThrough();

      var bottomLeft = cell.bottomLeft();

      expect(bottomLeft).toEqual(0);
      expect(cell.cellIsOnBottomEdge).toHaveBeenCalled();
    });

    it("evaluates the bottom left neighbor", function () {
      cell.yIndex = 0;
      cell.xIndex = 1;

      var bottomLeft = cell.bottomLeft();

      expect(bottomLeft).toEqual(1);
    });
  });


  describe("#left", function () {
    it("evaluates the left neighbor as 0 if the cell is on the left edge", function () {
      cell.yIndex = 0;
      cell.xIndex = 0;

      spyOn(cell, "cellIsFirstInArray").and.callThrough();

      var left = cell.left();

      expect(left).toEqual(0);
      expect(cell.cellIsFirstInArray).toHaveBeenCalled();
    });

    it("evaluates the left neighbor", function () {
      cell.yIndex = 0;
      cell.xIndex = 1;

      var left = cell.left();

      expect(left).toEqual(1);
    });
  });

  describe("#topleft", function () {
    it("evaluates the top left neighbor as 0 if the cell is on the top edge or left edge", function () {
      cell.yIndex = 0;
      cell.xIndex = 0;

      spyOn(cell, "cellIsFirstInArray").and.callThrough();
      spyOn(cell, "cellIsOnTopEdge").and.callThrough();

      var topLeft = cell.topLeft();

      expect(topLeft).toEqual(0);
      expect(cell.cellIsFirstInArray).toHaveBeenCalled();
    });

    it("evaluates the top left neighbor", function () {
      cell.yIndex = 1;
      cell.xIndex = 1;

      var topLeft = cell.topLeft();

      expect(topLeft).toEqual(1);
    });
  });

  describe("#top", function () {
    it("evaluates the top neighbor as 0 if the cell is on the top edge", function () {
      cell.yIndex = 0;
      cell.xIndex = 0;

      spyOn(cell, "cellIsOnTopEdge").and.callThrough();

      var top = cell.top();

      expect(top).toEqual(0);
      expect(cell.cellIsOnTopEdge).toHaveBeenCalled();
    });

    it("evaluates the top neighbor", function () {
      cell.yIndex = 1;
      cell.xIndex = 1;

      var top = cell.top();

      expect(top).toEqual(1);
    });
  });

  describe("#topRight", function () {
    it("evaluates the top right neighbor as 0 if the cell is on the top edge or right edge", function () {
      cell.yIndex = 0;
      cell.xIndex = 0;

      spyOn(cell, "cellIsOnTopEdge").and.callThrough();
      spyOn(cell, "cellIsLastInArray").and.callThrough();


      var topRight = cell.topRight();

      expect(topRight).toEqual(0);
      expect(cell.cellIsOnTopEdge).toHaveBeenCalled();

      cell.yIndex = 1;
      cell.xIndex = 1;

      topRight = cell.topRight();

      expect(topRight).toEqual(0);
    });

    it("evaluates the top right neighbor", function () {
      cell.yIndex = 1;
      cell.xIndex = 0;

      var topRight = cell.topRight();

      expect(topRight).toEqual(1);
    });
  });
});