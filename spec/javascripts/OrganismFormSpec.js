describe("OrganismForm", function() {
  beforeEach(function () {
    form = new OrganismForm();
  });

  describe("#defineXandY", function () {
    it("parses a string to define x and y", function () {
      form.id=("1-1");
      button = true;
      form.defineXandY(button);

      expect(form.x).toBeDefined();
      expect(form.y).toBeDefined();

    });
  });

  describe("#killCell", function () {
    it("changes the cell to dead", function () {
      form.y = 0;
      form.x = 0;
      form.killCell();
      expect(form.cells[form.y][form.x]).toEqual(0)
    })
  });

  describe("#enlivenCell", function () {
    it("changes the cell to dead", function () {
      form.y = 0;
      form.x = 0;
      form.enlivenCell();
      expect(form.cells[form.y][form.x]).toEqual(1)
    })
  });
});