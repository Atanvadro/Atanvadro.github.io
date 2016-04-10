function intersects(fig1, fig2) {
  

  return [
    [
      { x: 60,  y: 240 },
      { x: 90,  y: 240 },
      { x: 120, y: 180 },
      { x: 90,  y: 90  },
      { x: 60,  y: 150 },
    ],
    [
      { x: 270, y: 240 },
      { x: 300, y: 240 },
      { x: 300, y: 150 },
      { x: 270, y: 90  },
      { x: 240, y: 180 },
    ],
    [
      { x: 150, y: 180 },
      { x: 180, y: 240 },
      { x: 210, y: 180 },
      { x: 210, y: 90  },
      { x: 180, y: 60  },
      { x: 150, y: 90  }
    ]
  ];
}


function fixSelfIntersections(polygon){
  edges = formEdges(polygon);
  var newPolygon = [];
  var tempVerticesArray = [];

  for (var i = 0; i < edges.length; i++){
    tempVerticesArray = [];

    newPolygon.push(edges[i].A);

    for (var j = 0; j < edges.length; j++){
      var newVertice = segmentsIntersectPoint(edges[i], edges[j]);
      if (newVertice != null){
        //console.log(newVertice.x + " " + newVertice.y);
        tempVerticesArray.push(newVertice);
      }
    }

    if (tempVerticesArray){
      tempVerticesArray = sortNewVertices(tempVerticesArray, edges[i].A);

      for (var k = 0; k < tempVerticesArray.length; k++){
      newPolygon.push(tempVerticesArray[k]);
      }
    }
  }
  return newPolygon;
}

function fixDirections(polygon){
  var edges = formEdges(polygon);
  //console.log("!!!")
  //console.log(edges);
  //console.log(reverseAllNeeded(polygon));
  return result;  
}


function formVerticesList(vertices, edges){
  var verticesList = [];
  for(var i = 0; i < vertices.length; i++){
    var newVertice = {};
    newVertice.x = vertices[i].x;
    newVertice.y = vertices[i].y;

    var Edges = findAllEdges(newVertice, edges);
    for (k = 0; k < Edges.length; k++){
      Edges[k].order =  edgeOrderCoeficient(newVertice, Edges[k]);
    }
  
    Edges.sort(compareEdgeOrger);
    newVertice.Edges = Edges;
    //console.log(Edges);


    verticesList.push(newVertice);
  }

  console.log(verticesList);

  return verticesList;
}

function edgeOrderCoeficient(oneVertice, oneEdge){
  var horisontalSegment = {A: oneVertice, B: {x: 400, y: oneVertice.y}};
  var angle = angleBetweenSegments(horisontalSegment, oneEdge);
  var direction = edgeDirection(oneVertice, oneEdge);
  var orderCoefficicent;
  if (direction === 1){
    orderCoefficicent = angle;
    return orderCoefficicent;
  }
  if (direction === -1){
    if (angle >= 0){
      orderCoefficicent = angle - Math.PI;
    }
    if (angle < 0){
      orderCoefficicent = angle + Math.PI;
    }
    return orderCoefficicent;
  }
}

function compareEdgeOrger(edge1, edge2){
  if (edge1.order > edge2.order){
    return 1;
  }
  if (edge1.order < edge2.order){
    return -1;
  }
  return 0;
}

function edgeDirection(vertice, edge){
  // 1 - edge is outgoing, -1 - edge is incoming, 0 - edge does not cross vertice
  if (pointsEqual(vertice, edge.A)){
    return 1;
  }
  if (pointsEqual(vertice, edge.B)){
    return -1;
  }
  return 0;
}

function pointsEqual(P1, P2){
  if ((P1.x == P2.x) && (P1.y == P2.y)){
    return true;
  }
  return false;
}

function angleBetweenSegments(segment1, segment2){
  //returns angle between two segments in radians: - PI to PI
    var len1 = calcDistance(segment1.A, segment1.B);
    var len2 = calcDistance(segment1.A, segment1.B);

    var v1 = segmentToVector(segment1.A, segment1.B);
    var v2 = segmentToVector(segment2.A, segment2.B);

    var angle12 = Math.atan2(pseudoScalarVectorProduct(v1, v2), scalarVectorProduct(v1,v2));

    return angle12;
}

function findAllEdges(oneVertice, edges){
  var result = [];
  for (var i = 0; i < edges.length; i++){
    if (pointsEqual(oneVertice, edges[i].A) || pointsEqual(oneVertice, edges[i].B)){
      var oneEdge = {A: {x: 0, y: 0}, B: {x:0, y:0}};
      oneEdge.A.x = edges[i].A.x;
      oneEdge.A.y = edges[i].A.y;
      oneEdge.B.x = edges[i].B.x;
      oneEdge.B.y = edges[i].B.y;
      result.push(oneEdge);
    }
  }
  return result;
}

function pointsEqual(P1, P2){
  if ((P1.x == P2.x) && (P1.y == P2.y)){
    return true;
  }
  return false;
}

function reverseAllNeeded(edges){
  var polygon = edgesToVertices(edges);
  for (var i = 0; i < edges.length; i++){
    if (needReverse(edges[i], polygon)){
      edges[i] = reverse(edges[i]);
    }
  }
  return edges;
}

function reverse(segment){
  return {A: segment.B, B: segment.A};
}

function needReverse(edge, polygon){
//checs, that left side of edge belongs to polygon
  var points = getTwoAdjacentPoints(edge);
  if (dotInPolygon(points.left, polygon) && dotInPolygon(points.right, polygon)){
    return false;
  }
  if (!dotInPolygon(points.left, polygon) && !dotInPolygon(points.right, polygon)){
    return false;
  }
  if (dotInPolygon(points.right, polygon)){
    return true;
  }
  return false;
}

function getTwoAdjacentPoints(segment)
{
  var d = calcDistance(segment.A, segment.B);
  var h = 1;
  var A = segment.A;
  var B = segment.B;
  var center = {};

  center.x = (A.x + B.x)/ 2 ;
  center.y = (A.y + B.y) / 2;
  //console.log(d);
  //console.log(center);

  var L = {};
  var R = {};

  L.x = center.x - h * (B.y - A.y) / d;
  L.y = center.y + h * (B.x - A.x) / d;

  R.x = center.x + h * (B.y - A.y) / d;
  R.y = center.y - h * (B.x - A.x) / d;
  //console.log(L);
  //console.log(R);

  var points = {left: L, right: R};
  //console.log(points);

  return points;
}

function sortNewVertices(arr, A){
  arr.sort(function(a,b){
    if (calcDistance(A, a) >= calcDistance(A, b)){
      return 1;
    } else{
      return -1;
    }
  });

  return arr;
}

function calcDistance(point1, point2){
  tmp = (point2.x - point1.x)*(point2.x - point1.x) + (point2.y - point1.y)*(point2.y - point1.y);
  return Math.sqrt(tmp);
}

function dotInPolygon(dot, polygon){
// returns : 0 - dot is outside of polygon, -1 - dot on edge of polygon, 1 - dot is inside polygon
//http://www.opita.net/node/701 - надо доделать
  var edges = formEdges(polygon);
  var endPoint = {x:400, y:dot.y};
  var segment =  {A: dot, B: endPoint};

  for (var i =0; i < edges.length; i++){
    if (isDotInEdge(dot, edges[i])){
      return -1;
    }
  }
  var count = segmentAndPolygonIntersectsCount(segment, polygon);
  if (count == 0 || isEven(count)){
    return 0;
  }else{
    return 1;
  }
}


function isEven(numer){
  return (numer % 2 == 0);
}

function segmentsIntersectPoint(segment1, segment2){
  if (doSegmentsIntersect(segment1, segment2)){
    return linesIntersectPoint(segment1, segment2);
  }
  return null;
}

function linesIntersectPoint(segment1, segment2){
  var s1 = segment1;
  var s2 = segment2;

  var a1 = s1.B.y - s1.A.y;
  var b1 = s1.A.x - s1.B.x;
  var c1 = s1.A.x * (s1.A.y - s1.B.y) + s1.A.y * (s1.B.x - s1.A.x);

  var a2 = s2.B.y - s2.A.y;
  var b2 = s2.A.x - s2.B.x;
  var c2 = s2.A.x * (s2.A.y - s2.B.y) + s2.A.y * (s2.B.x - s2.A.x);

  var D = [[a1, b1],
           [a2, b2]];

  var Dx = [[-c1, b1],
            [-c2, b2]]; 

  var Dy = [[a1, -c1],
            [a2, -c2]];

  var x = calcD(Dx)/calcD(D);
  var y = calcD(Dy)/calcD(D);

  return {x: x, y: y};
}

function calcD(D){
//Calculate second order determinant
  var result = D[0][0] * D[1][1] - D[0][1] * D[1][0];
  return result;
}

function doSegmentsIntersect(segment1, segment2){
  //segmests - desribed by starting point and finish point
  //returns : true- if segments intersect
  //returns : 0 - if segments are collinear
  //returns: null - if segments does not intersect
  //http://grafika.me/node/237
  A1B1 = segmentToVector(segment1.A, segment1.B);
  A2B2 = segmentToVector(segment2.A, segment2.B);
  
  A1A2 = segmentToVector(segment1.A, segment2.A);
  A1B2 = segmentToVector(segment1.A, segment2.B);

  A2A1 = segmentToVector(segment2.A, segment1.A);
  A2B1 = segmentToVector(segment2.A, segment1.B);

  V1 = pseudoScalarVectorProduct(A1B1, A1A2);
  V2 = pseudoScalarVectorProduct(A1B1, A1B2);

  V3 = pseudoScalarVectorProduct(A2B2, A2A1);
  V4 = pseudoScalarVectorProduct(A2B2, A2B1);

  if (V1*V2 < 0 && V3*V4 < 0){
    return true;
  }

  if ((V1 == 0) & (V2 == 0)){
    return 0; //collinear
  }

  return null; //do not intesect
}

function segmentAndPolygonIntersectsCount(segment, polygon){
  var edges = formEdges(polygon);
  var count = 0;
  
  for (var i = 0; i < edges.length; i++){
    //console.log(edges[i]);
    if (doSegmentsIntersect(segment, edges[i])){
      count++;
    }
  }
  return count;
}

function isDotInEdge(dot, edge){
  if (dotOnLine(dot, edge) == 0  && isDotBetween(dot, edge.A, edge.B)){
    return true;
  } 

  return false;
}

function dotOnLine(dot, line){
  //line - described by coodrinates of two points, same as edge
  //return == 0 - dot on line, return > 0 - dot left from  line, return < 0 - dot right from line
  var vector1 = segmentToVector(dot, line.A);
  var vector2 = segmentToVector(line.A, line.B);
  return pseudoScalarVectorProduct(vector1, vector2);
}

function isDotBetween(dot,A,B){
  //wors only if dot is on line described by A and B

  var vector1 = segmentToVector(dot, A);
  var vector2 = segmentToVector(dot, B);

  var result = scalarVectorProduct(vector1, vector2);
  //if result is <=0 - dot is between points, else - dot is outside
  if (result <= 0){
      return true;
  }

  return false;
}

function formEdges(polygon){
  var edges = [{A: {x:null, y:null},
                B: {x:null, y:null}}];
  for (var i = 0; i < polygon.length; i++)
  {
    var currentEdge = {A: {x:null, y:null}, 
                       B: {x:null, y:null}};

    currentEdge.A = polygon[i];

    if (i == polygon.length - 1){
      currentEdge.B = polygon[0];
    } else{
      currentEdge.B = polygon[i+1];
    }

    edges[i] = currentEdge;
  }
  return edges;
}

function edgesToVertices(edges){
  var polygon = [];
  for (var i = 0; i < edges.length; i++){
    polygon.push(edges[i].A);
    polygon.push(edges[i].B);
  }
  return filterVertices(polygon);
}

function filterVertices(vertices){
  var filteredVertices = [];
  for(var i = 0; i < vertices.length; i++){
    var currentVertice = vertices[i];
    if (verticeInArray(filteredVertices, currentVertice) == -1){
      filteredVertices.push(currentVertice);
    }
  }
  return filteredVertices;
}

function verticeInArray(arr, oneVertice){
  for (var i = 0; i < arr.length; i++){
    if ((arr[i].x == oneVertice.x) && (arr[i].y == oneVertice.y)){
      return i;
    }
  }
  return -1;
}

function segmentToVector(A,B){
  //Transforms segment, described by coordinates of point A and point B into vector described by vector coordinates
  //http://ru.onlinemschool.com/math/library/vector/p_to_vector/
  var vector = {x:null, y:null};
  vector.x = B.x - A.x;
  vector.y = B.y - A.y;
  return vector;
}

function scalarVectorProduct(vector1, vector2){

  return vector1.x * vector2.x + vector1.y * vector2.y;
}

function pseudoScalarVectorProduct(vector1, vector2){
  //https://habrahabr.ru/post/147691/
  //Pseudo scalar vector product is equal to 0 only then, when vectors are collinear
  //Известно, что косое произведение двух векторов положительно, если поворот от первого вектора ко 
  //второму идет против часовой стрелки, равно нулю, если векторы коллинеарны и отрицательно, если 
  //поворот идет по часовой стрелки.
  return vector1.x * vector2.y - vector1.y * vector2.x;
}
