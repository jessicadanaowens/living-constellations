$( document ).ready(function() {
  newOrganism = new OrganismForm();

  $('button.star').click(function (event) {
    var id = $(this).attr('id');
    var button = $(this);

    newOrganism.parseId(button);
    newOrganism.defineXandY();
    newOrganism.changeCell(button);
  });

  $('button#create').click(function (event) {
    createCustomOrganism();
    $(this).prop('disabled', true);
  });

  $('button#clear').click(function (event) {
    clear();
  });

  function clear () {
    location.reload();
  }

  function createCustomOrganism () {
    customCell = new Cell(newOrganism.cells, "custom");
    initializeOnPage("custom");
    customCell.showOriginalBoard();
    customCell.startRunning(customCell);
  }

  function initializeOnPage (cellName) {
    $('.organisms').append("<div class='col-md-6' id=" + cellName + "><h4 class='white'>" + cellName + "</h4><br><table id=" + cellName + ">" + "</table></div><br>" );
  };
});