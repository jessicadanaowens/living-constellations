$( document ).ready(function() {
  var beacon = [[1, 1, 0, 0],
    [1, 0, 0, 0],
    [0, 0, 0, 1],
    [0, 0, 1, 1]];

  var toad = [[0, 0, 0, 0],
    [1, 1, 1, 0],
    [0, 1, 1, 1],
    [0, 0, 0, 0]];

  var pulsar = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

  var glider = [[0, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
    [1, 1, 1]];

  pulsarCell = new Cell(pulsar, "pulsar");
  pulsarCell.initializeOnPage(pulsar, "pulsar");
  pulsarCell.startRunning(pulsarCell);

  beaconCell = new Cell(beacon, "beacon");
  beaconCell.initializeOnPage(beacon, "beacon");
  beaconCell.startRunning(beaconCell);

  toadCell = new Cell(toad, "toad");
  toadCell.initializeOnPage(toad, "toad");
  toadCell.startRunning(toadCell);

  gliderCell = new Cell(glider, "glider");
  gliderCell.initializeOnPage(glider, "glider");
  gliderCell.startRunning(gliderCell);
});