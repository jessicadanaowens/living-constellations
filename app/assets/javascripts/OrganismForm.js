var OrganismForm = function () {
  this.cells = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
};

OrganismForm.prototype.defineXandY = function defineXandY () {
  this.y = this.id.split("-").splice(0, 1);
  this.x = this.id.split("-").splice(1, 1);
};

OrganismForm.prototype.parseId = function parseId (button) {
  this.id = button.attr('id');
};

OrganismForm.prototype.killCell = function killCell () {
  this.cells[this.y][this.x] = 0;
};

OrganismForm.prototype.enlivenCell = function enlivenCell () {
  this.cells[this.y][this.x] = 1;
};

OrganismForm.prototype.changeCell = function changeCell (button) {
  if(button.hasClass('selected')) {
    button.removeClass('selected');
    this.killCell()
  } else {
    button.addClass('selected');
    this.enlivenCell()
  }
};