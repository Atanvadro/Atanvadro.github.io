// пример многоугольников
var examples = {
  first: [
    { x: 60,  y: 60  },
    { x: 180, y: 0   },
    { x: 300, y: 60  },
    { x: 300, y: 300 },
    { x: 240, y: 180 },
    { x: 210, y: 180 },
    { x: 180, y: 240 },
    { x: 150, y: 180 },
    { x: 120, y: 180 },
    { x: 60,  y: 300 },
  ],
  second: [
    { x: 30,  y: 240 },
    { x: 330, y: 240 },
    { x: 330, y: 210 },
    { x: 270, y: 90  },
    { x: 210, y: 270 },
    { x: 210, y: 90  },
    { x: 180, y: 60  },
    { x: 150, y: 90  },
    { x: 150, y: 270 },
    { x: 90,  y: 90  },
    { x: 30,  y: 210 }
  ]
};

function drawPath(data, container, color) {
  var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  var str = 'M' + data[0].x + ',' + data[0].y+' ';
  str += data.slice(1).map(function (point) {
    return 'L' + point.x + ',' + point.y;
  }).join(' ');
  str += 'L' + data[0].x + ',' + data[0].y+' ';
  path.setAttribute('d', str);
  path.style.fill = color;
  container.appendChild(path);
}


drawPath(examples.first, document.querySelector('svg.base'), 'navy');
drawPath(examples.second, document.querySelector('svg.base'), 'yellow');


(function x() {
  var dots = examples.first;
  var i = 0;
  var length = dots.length;
  var container = document.querySelector('svg.base');

  var intervalId = window.setInterval(function() {
    animateOneDot();
  }, 1000);

  function animateOneDot() {
    drawDot(dots[i]);

      i++;

      if (i >= length) { window.clearInterval(intervalId); }
  }

  function drawDot(dot) {
    var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute("cx", dot.x);
    circle.setAttribute("cy", dot.y);
    circle.setAttribute("r", "10");
    circle.setAttribute("fill", "orange");
    container.appendChild(circle);
  }
})();

function drawCircles(data,container){
      for (var i = 0; i < data.length; i++){
        var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute("cx", data[i].x);
        circle.setAttribute("cy", data[i].y);
        circle.setAttribute("r", "10");
        circle.setAttribute("fill", "orange");
        container.appendChild(circle);
      }
}

//drawCircles(examples.first, document.querySelector('svg.base'));

intersects(examples.first, examples.second).forEach(function (p) {
  drawPath(p, document.querySelector('svg.intersections'), 'red');
})