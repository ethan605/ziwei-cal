function convertCoordToPos(xCoord, yCoord) {
  return [284*xCoord, 164*yCoord];
}

function drawLines(fromCoord, toCoord) {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");

  context.beginPath();
  
  var fromPos = convertCoordToPos(fromCoord[0], fromCoord[1]);
  var toPos = convertCoordToPos(toCoord[0], toCoord[1]);

  context.moveTo(fromPos[0], fromPos[1]);
  context.lineTo(toPos[0], toPos[1]);

  context.stroke();
}