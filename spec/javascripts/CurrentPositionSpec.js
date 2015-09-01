describe("current cell position", function() {

  beforeEach(function() {
    var board = [[1,1], [1,1]];
    cell = new Cell(board);
  });

  describe("#cellIsLastInArray", function () {
    it("evaluates whether the cell is last in the array", function () {
      cell.yIndex = 0;
      cell.xIndex = 1;

      val = cell.cellIsLastInArray();

      expect(val).toEqual(true);
    });
  });

  describe("#cellIsFirstInArray", function () {
    it("evaluates whether the cell is first in the array", function () {
      cell.yIndex = 0;
      cell.xIndex = 1;

      val = cell.cellIsFirstInArray();

      expect(val).toEqual(false);

      cell.yIndex = 0;
      cell.xIndex = 0;

      val = cell.cellIsFirstInArray();

      expect(val).toEqual(true);
    });
  });

  describe("#cellIsOnTopEdge", function () {
    it("evaluates if the cell is on the top edge", function () {
      cell.yIndex = 0;
      cell.xIndex = 1;

      val = cell.cellIsOnTopEdge();

      expect(val).toEqual(true);

      cell.yIndex = 1;
      cell.xIndex = 0;

      val = cell.cellIsOnTopEdge();

      expect(val).toEqual(false);
    });
  });
});