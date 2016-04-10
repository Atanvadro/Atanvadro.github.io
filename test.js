describe("Polygon normalisation", function(){
	var selfIntersectingPolygon = [ { x: 0,   y: 0  },
								{ x: 40,  y: 40 },
								{ x: 0,   y: 40 },
								{ x: 20,  y: 60 },
								{ x: 20,  y: 0  }];

	var fixedIntersections =  [ { x: 0,   y: 0  },
								{ x: 20,  y: 20 },
								{ x: 40,  y: 40 },
								{ x: 20,  y: 40 },
								{ x: 0,   y: 40 },
								{ x: 20,  y: 60 },
								{ x: 20,  y: 40 },
								{ x: 20,  y: 20 },
								{ x: 20,  y: 0  }];

    var fixedDirections	    = [ { x: 0,   y: 0  },
								{ x: 20,  y: 0  },
								{ x: 20,  y: 20 },
								{ x: 40,  y: 40 },
								{ x: 20,  y: 40 },
								{ x: 20,  y: 60 },
								{ x:  0,  y: 40 },
								{ x: 20,  y: 40 },
								{ x: 20,  y: 20 }];
	var reversedEdges = [{A: {x: 20, y: 20}, B: {x: 0,  y:0}},
						 {A: {x: 20, y: 20}, B: {x: 40, y:40}},
						 {A: {x: 40, y: 40}, B: {x: 20, y:40}},
						 {A: {x: 0,  y: 40}, B: {x: 20, y:40}},
					     {A: {x: 20, y: 60}, B: {x: 0,  y:40}},
						 {A: {x: 20, y: 40}, B: {x: 20, y:60}},
						 {A: {x: 20, y: 40}, B: {x: 20, y:20}},
						 {A: {x: 20, y: 0},  B: {x: 20, y:20}},
						 {A: {x: 0,  y: 0}, B: {x: 20, y:0}}];

	var reversedVertices = [{x: 20, y: 20},
							{x:  0, y: 0},
							{x: 40, y: 40},
							{x: 20, y: 40},
							{x: 0,  y: 40},
							{x: 20, y: 60},
							{x: 20, y: 0}];

	describe("reverseAllNeeded(edges)", function(){
		var edges = formEdges(fixedIntersections);
		
		var calculated = reverseAllNeeded(reversedEdges);

		for (var i = 0; i < reversedEdges.length; i++){
			it ("expected: {" + reversedEdges[i].A.x + "," + reversedEdges[i].A.y + "} {" + 
							  + reversedEdges[i].B.x + "," + reversedEdges[i].B.y + "} calcualted: {" +
							  + calculated[i].A.x + "," + calculated[i].A.y + "} {" +
							  + calculated[i].B.x + "," + calculated[i].B.y, function(){
				assert.deepEqual(reversedEdges[i], calculated[i]);
			});
		}
	});

	describe("fixSelfIntersections(polygon)", function(){
		//var r = fixSelfIntersections(selfIntersectingPolygon);
		//for (var i = 0; i < r.length; i++){
		//	console.log(r[i]);
		//}

		it("fixed correctly", function(){
			assert.deepEqual(fixSelfIntersections(selfIntersectingPolygon), fixedIntersections);
		});
	});	

	describe("fixDirections(polygon)", function(){
		it("directions fixed", function(){
			assert.deepEqual(fixDirections(fixedIntersections), fixedDirections);
		})
	});

	describe("formVerticesList(vertices, edges)", function(){
		var v = reversedVertices;
		it("test", function(){
			assert.equal(formVerticesList(v, reversedEdges), null);
		});
	});	

	describe("getTwoAdjacentPoints(segment)", function(){
		var edgeVerticalUp = {A: {x: 11, y:0}, B:{x:11, y:20}};
		var pointsVerticalUp = {left:{x: 10, y: 10}, right:{x: 12, y: 10}};

		var edgeHorisontal = {A: {x: 10, y:20}, B:{x:20, y:20}};
		var pointsHorisontal = {left:{x: 15, y: 21}, right:{x: 15, y: 19}};

		var edgeHorisontalLeft = {A: {x: 20, y:20}, B:{x:10, y:20}};
		var pointsHorisontalLeft = {left:{x: 15, y: 19}, right:{x: 15, y: 21}};

		var edgeAngledRightDown = {A: {x: 0, y:20}, B:{x:20, y:0}};
		var pointsAngledRightDown = {left:{x: 10.707106781186548, y: 10.707106781186548}, right:{x: 9.292893218813452, y: 9.292893218813452}};

		var edgeAngledLeftUp = {A: {x: 20, y:0}, B:{x:0, y:20}};
		var pointsAngledLeftUp = {left:{x: 9.292893218813452, y: 9.292893218813452}, right:{x: 10.707106781186548, y: 10.707106781186548}};

		it("check vertical Down", function(){
//			console.log("POINTS VERTICAL DOWN");
//			console.log(edge1);
//			console.log(getTwoAdjacentPoints(edge1));			
			assert.deepEqual(getTwoAdjacentPoints(edge1), points1);
		});

		it("check vertical Up", function(){
//			console.log("POINTS VERTICAL UP");
//			console.log(edgeVerticalUp);
//			console.log(getTwoAdjacentPoints(edgeVerticalUp));			
			assert.deepEqual(getTwoAdjacentPoints(edgeVerticalUp), pointsVerticalUp);
		});

		it("check horisontal ", function(){
//			console.log("POINTS HORISONTAL RIGHT");
//			console.log(getTwoAdjacentPoints(edgeHorisontal));
			assert.deepEqual(getTwoAdjacentPoints(edgeHorisontal), pointsHorisontal);
		});

		it("check horisontal left", function(){
//			console.log("POINTS HORISONTAL LEFT");
//			console.log(getTwoAdjacentPoints(edgeHorisontalLeft));
			assert.deepEqual(getTwoAdjacentPoints(edgeHorisontalLeft), pointsHorisontalLeft);
		});

		it("check angled right down", function(){
//			console.log("POINTS ANGLED RIGHT DOWN");
//			console.log(getTwoAdjacentPoints(edgeAngledRightDown));
			assert.deepEqual(getTwoAdjacentPoints(edgeAngledRightDown), pointsAngledRightDown);
		});

		it("check angled left up", function(){
//			console.log("POINTS ANGLED LEFT");
//			console.log(getTwoAdjacentPoints(edgeAngledLeftUp));
			assert.deepEqual(getTwoAdjacentPoints(edgeAngledLeftUp), pointsAngledLeftUp);
		})
	});

	describe("edgesToVertices(edges)", function(){
	    it ("lenght is correct", function(){
	    	assert.equal(edgesToVertices(reversedEdges).length, reversedVertices.length);
	    });

	    it ("vertices array is correct", function(){
	    	//console.log("EdgesToVertices() ", edgesToVertices(reversedEdges));
	    	//console.log("reversedVertices ", reversedVertices);
	    	assert.deepEqual(edgesToVertices(reversedEdges), reversedVertices);
	    });
   });

	var edge1 = {A: fixedIntersections[7], B: fixedIntersections[8]};
	var edge2 = {A: fixedIntersections[8], B: fixedIntersections[7]};
	var points1 = {left:{x: 21, y: 10}, right:{x: 19, y: 10}};

	describe("needReverse(edge, polygon)", function(){
		it("we need to revert edge", function(){
			assert.isTrue(needReverse(edge1, fixedIntersections));
		});
		it("we don't need to revert edge", function(){
			assert.isFalse(needReverse(edge2, fixedIntersections));
		});
	});

	describe("reverse(segment)", function(){
		it("reverse edge1 so it become edge2", function(){
			assert.deepEqual(reverse(edge1), edge2);
		});
	});
});

describe ("pointsEqual(A, B)", function(){
	it("points are equal", function(){
		assert.equal(pointsEqual({x: 0, y: 1}, {x: 0, y: 1}), true);
	})

	it("points are NOT equal", function(){
		assert.equal(pointsEqual({x: 0, y: 0}, {x: 400, y: 400}), false);
	})
});

describe ("edgeDirection(vertice, edge)", function(){
	var A = {x: 10, y:10};
	var B = {x: 400, y:400};
	var C = {x: -1, y: 20};
	var edge = {A: A, B: B};
	it("returns 1 if edge starts on vertice", function(){
		assert.strictEqual(edgeDirection(A, edge), 1);
	});

	it("returns -1 if edge finishes on vertice", function(){
		assert.strictEqual(edgeDirection(B, edge), -1);
	});

	it("returns 0 if edge neither starts nor finishes on vertice", function(){
		assert.strictEqual(edgeDirection(C, edge), 0);
	});
})

describe("angleBetweenSegments(segment1, segment2)", function(){
	var A = {x: 10, y:10};
	var B = {x: 400,y:10};
	var segment = {A: A, B: B};
	var reversedSegment = {A: B, B: A};
	var segment90degres =  {A: A, B: {x: A.x,  y: 400}};
	var segment45degres =  {A: A, B: {x: A.x + 10, y: A.y + 10}};
	var segment45incoming = {A: segment45degres.B, B: segment45degres.A};
	var segment225degres = {A: A, B: {x: A.x - 10, y: A.y - 10}};
	var segment225incoming = {A: segment225degres.B, B: segment225degres.A};
	var segment270degres = {A: A, B: {x: A.x,      y: 0}};
	var segment315deges =  {A: A, B: {x: A.x + 10, y: A.y - 10}};

	it("angle between same segment should be 0", function(){
		assert.strictEqual(angleBetweenSegments(segment, segment), 0);
	});

	it("angle between segment and segment is 45 degrees, " + Math.PI / 4 + " radians", function(){
		assert.strictEqual(angleBetweenSegments(segment, segment45degres), Math.PI / 4);
	});

	it("angle between segment and incoming segment is 45 degrees, " + Math.PI / 4 + " radians", function(){
		assert.strictEqual(angleBetweenSegments(segment, segment45degres), Math.PI / 4);
	});

	it("angle between segment and segment is 90 degrees, "  + Math.PI / 2 + " radians", function(){
		assert.strictEqual(angleBetweenSegments(segment, segment90degres), Math.PI / 2);
	});

	it("angle between segment and reversed segment should be PI, "  + Math.PI + " radians", function(){
		assert.strictEqual(angleBetweenSegments(segment, reversedSegment), Math.PI);
	});

	it("angle between segment and segment is 225 degrees, "  + -(Math.PI / 4 + Math.PI / 2) + " radians", function(){
		assert.strictEqual(angleBetweenSegments(segment, segment225degres), -(Math.PI / 4 + Math.PI / 2));
	});

	it("angle between segment and incoming segment is 225 degrees, "  + -(Math.PI / 4 + Math.PI / 2) + " radians", function(){
		assert.strictEqual(angleBetweenSegments(segment, segment225degres), -(Math.PI / 4 + Math.PI / 2));
	});

	it("angle between segment and segment is 270 degrees, "  + -Math.PI / 2 + " radians", function(){
		assert.strictEqual(angleBetweenSegments(segment, segment270degres), -Math.PI / 2);
	});

	it("angle between segment and segment is 315 degrees, "  + - Math.PI / 4 + " radians", function(){
		assert.strictEqual(angleBetweenSegments(segment, segment315deges),  - Math.PI / 4);
	});
});


describe("verticeInArray(arr, oneVertice)", function(){
	var arr = [{x: 1, y:1},{x: 2, y:1},{x: 3, y:3},{x: 1, y:1}];
	var v = {x: 2, y:1};
	var v2 = {x: 500, y: 600};
	it("is in array on position 1", function(){
		assert.equal(verticeInArray(arr, v), 1);
	});

	it("is not in array", function(){
		assert.equal(verticeInArray(arr, v2), -1)
	});
});

describe("calcDistance(point1, point2)", function(){
	var point1 = {x: 0, y:0};
	var point2 = {x:0,  y:400}
	result = 400;
  	it("result should be " + result, function(){
  		assert.equal(calcDistance(point1, point2), result);
  	});
});	

describe("sortNewVertices(arr, A)", function(){
	var unsorted = [{x: 50, y: 10},
					{x: 45, y: 10},
					{x: 15, y: 10},
					{x: 10, y: 10}];
	var A = {x: 5, y: 10};
	var sorted =   [{x: 10, y: 10},
					{x: 15, y: 10},
					{x: 45, y: 10},
					{x: 50, y: 10}];
	
	it("sorting correct", function(){
		assert.deepEqual(sortNewVertices(unsorted, A), sorted);
	})
});


describe("calcD(D){} - calculate second order determinant", function(){

	var D = [[3,4],
			 [5,6]];
	var result = 3*6 - 4*5;
	it("result = " + result, function(){
		assert.equal(calcD(D), result);
	});
	it("", function(){

	});
});


describe("Finding intersect point of two lines defined by segments", function(){
	var segment1 = {A: {x: 10, y: 0}, B: {x: 10, y: 10}};
	var segment2 = {A: {x: 5, y: 5 }, B: {x: 15, y: 5}};
	var segment3 = {A: {x: 0, y:400}, B: {x: 400, y: 400}}
	var intersectPoint = {x: 10, y: 5};
	var intersectPoint2= {x: 10, y: 400};

	describe("linesIntersectPoint(segment1, segment2) - calculates intersect point", function(){
		it("intersection exists : {x: " + intersectPoint.x + ", y: " + intersectPoint.y + "}", function(){
			assert.equal(linesIntersectPoint(segment1, segment2).x, intersectPoint.x);
			assert.equal(linesIntersectPoint(segment1, segment2).y, intersectPoint.y);
		});

		it("intersection exists : {x: " + intersectPoint2.x + ", y: " + intersectPoint2.y + "}", function(){
			assert.equal(linesIntersectPoint(segment1, segment3).x, intersectPoint2.x);
			assert.equal(linesIntersectPoint(segment1, segment3).y, intersectPoint2.y);
		});
	});

	describe("segmentsIntersectPoint(segment1, segment2) - if intersect point exists - coordinates are returned, else - null", function(){
		it("intersection exists : {x: " + intersectPoint.x + ", y: " + intersectPoint.y + "}", function(){
			assert.equal(segmentsIntersectPoint(segment1, segment2).x, intersectPoint.x);
			assert.equal(segmentsIntersectPoint(segment1, segment2).y, intersectPoint.y);
		});

		it("intersection DOES NOT exists : {x: " + intersectPoint2.x + ", y: " + intersectPoint2.y + "}", function(){
			assert.equal(segmentsIntersectPoint(segment1, segment3), null);

		});

	});
});


var polygon =  [{ x: 1,   y: 1  },
				{ x: 0,   y: 50 },
				{ x: 25,  y: 55.5},
				{ x: 50,  y: 50 },
				{ x: 50,  y: 1  }];

var dotOnEdge = polygon[0];
var dotInside = {x:10, y:10};
var dotOutside = {x:51, y:1};

var segmentStartsOnRightEdge = {A: {x:50, y:25},  B: {x:400, y:25}};
var segmentStartsOnLeftEdge =  {A: {x:1,  y:25},  B: {x:400, y:25}};
var segmentIntersectOneTime =  {A: {x:25, y:25},  B: {x:400, y:25}};
var segmentIntersectTwoTimes = {A: {x:0,  y:25},  B: {x:400, y:25}};
var segmentDontIntersect =     {A: {x:60, y:60},  B: {x:400, y:60}};
var segmentLiesOnEdge =        {A: {x:4,  y:1},   B: {x:400, y:1}};
var edgeLiesInsideSegment =    {A: {x:0,  y:1},   B: {x:400, y:1}};
var segmentCrossesVercice =    {A: {x:0,  y:55.5},B: {x:400, y:55.5}};
var segmentCrossesVertice2 =   {A: {x:25, y:25},  B: {x:25,  y:400}};

describe("segmentAndPolygonIntersectsCount(segment, polygon)", function(){

  it("0 - if dont intersect", function(){
  	assert.strictEqual(segmentAndPolygonIntersectsCount(segmentDontIntersect, polygon), 0);
  });

  it("1 - intersect one time", function(){
  	assert.strictEqual(segmentAndPolygonIntersectsCount(segmentIntersectOneTime, polygon), 1);
  });

  it("1 - starts on right edge", function(){
  	assert.strictEqual(segmentAndPolygonIntersectsCount(segmentStartsOnRightEdge, polygon), 1);
  });

  it("2 - intersect two times", function(){
  	assert.strictEqual(segmentAndPolygonIntersectsCount(segmentIntersectTwoTimes, polygon), 2);
  });

  it("2 - starts on left egde and intercect one right edge", function(){
  	assert.strictEqual(segmentAndPolygonIntersectsCount(segmentStartsOnLeftEdge, polygon), 2);
  });

  it("1 - segment lies on edge", function(){
  	assert.strictEqual(segmentAndPolygonIntersectsCount(segmentLiesOnEdge, polygon), 1);
  });

  it("1 - edge lies inside segment", function(){
  	assert.strictEqual(segmentAndPolygonIntersectsCount(edgeLiesInsideSegment, polygon), 0);
  });

  it("2 - segment crosses polygon verice and both edges lie on one side of segment", function(){
  	assert.strictEqual(segmentAndPolygonIntersectsCount(segmentCrossesVercice, polygon), 0);
  });

  it("1 - segment crosses polygon verice and edges lie on different side of segment", function(){
  	assert.strictEqual(segmentAndPolygonIntersectsCount(segmentCrossesVertice2, polygon), 1);
  });

});




describe("dotInPolygon()", function(){
describe("Checks if dot is inside polygon", function(){
//// returns : -1 - dot outside of polyon, 0 - dot on edge of polygon, 1 - dot is inside polygon
	it("-1 - if dot is on one of the edges of polygon", function(){
		assert.strictEqual(dotInPolygon(dotOnEdge, polygon), -1);
	});

	it("not 0 - if dot is inside polygon", function(){
		assert.notStrictEqual(dotInPolygon(dotInside, polygon), 0);
	});

	it("1 - if dot is inside polygon", function(){
		assert.strictEqual(dotInPolygon(dotInside, polygon), 1);
	});

	it("0 - if dot is outside of polygon", function(){
		var edges = formEdges(examples.first);
		var dot  = {x:0, y:0};

		assert.equal(dotInPolygon(dot, examples.first), 0);
	});


});
});


describe("doSegmentsIntersect(segment1, segment2)", function(){
describe("Accept two segments, described by end points. Checks if segments intersect", function(){
		
	it("true -  if segments intersect for segments;", function(){
		var s1 = {A: {x: 0, y: 0}, B: {x: 10, y: 10}};
		var s2 = {A: {x: 10, y: 0}, B: {x: 0, y: 10}};

		assert.equal(doSegmentsIntersect(s1, s2), true);
	});

	it("null - if segments does not intersect;", function(){
		var s1 = {A: {x: 0, y: 0}, B: {x: 3, y: 3}};
		var s2 = {A: {x: 10, y: 0}, B: {x: 0, y: 10}};


		assert.equal(doSegmentsIntersect(s1, s2), null);
	});

	it("0 -  if segments are collinear;", function(){
		var s1 = {A: {x: 0, y: 5}, B: {x: 5, y: 5}};
		var s2 = {A: {x: 10, y: 5}, B: {x: 20, y: 5}};

		assert.equal(doSegmentsIntersect(s1, s2), 0);
	});
		
});
});

describe("", function(){
describe("", function(){

	it("", function(){

	});
});
});