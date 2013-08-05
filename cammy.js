angular.module('cammy', [])

.config(function config($routeProvider) {
  $routeProvider
  .when('/', {controller: 'MainCtrl', templateUrl: 'pages/main.html'})
  .otherwise({redirectTo: '/'});
})

.controller('MainCtrl', function HomeController($scope, $camera) {
  var oldX, oldY;
  $scope.rotate = function(event) {
    if ($scope.isRotating) {
      $camera.delta(event.clientX - oldX, event.clientY - oldY);
    }
    
    oldX = event.clientX, oldY = event.clientY;
  };
  
  d3.json('logo.json', function(error, data) {
    $scope.init_markers = data.points;
    $scope.lines = data.lines;
    
    update();
    $scope.$apply();    
  });
  
  $scope.angles = $camera.angles();
  $scope.init_markers = [];
  $scope.lines = [];
  
  var update = function() {$scope.markers = $camera.project($scope.init_markers);};
  
  $scope.$watch('angles', update, true);
  $scope.$watch('settings', update, true);
})

.factory('$camera', function() {
  var _angles = {theta: -35, phi: -55};
  
  return {
    project: function(vertices) {
      var phiRadian = _angles.phi*Math.PI/180;
      var thetaRadian = _angles.theta*Math.PI/180;
      
      var ct = Math.cos(thetaRadian);
      var sp = Math.sin(phiRadian);
      var st = Math.sin(thetaRadian);
      var pr = Math.cos(phiRadian);
      
      var a = ct*pr;
      var b = st*pr;
      
      return vertices
        .map(function(point, pointIndex) {
          var x = point.x*20, y = point.y*20, z = point.z*20;
          return {x: -x*st + y*ct, y: x*a + y*b - z*sp, color: point.color};
        });
    },
    delta: function(deltaTheta, deltaPhi) {
      _angles.theta += deltaTheta;
      _angles.phi += deltaPhi;
    },
    angles: function() {
      return _angles;
    }
  }
})

.directive('scene', function() {
  return {
    restrict: 'E',
    scope: {markers: '=', lines: '='},
    template: '<div></div>',
    replace: true,
    link: function($scope, iElm, iAttrs, controller) {
      var clean = function() {
        g && g.selectAll('*').remove();
      };
      
      var g, x, y;
      
      var draw = function(points, lines) {
        var margin = {top: 0, right: 0, bottom: 0, left: 0}
         , width = 500 - margin.left - margin.right
         , height = 500 - margin.top - margin.bottom;

        x = d3.scale.linear()
         .domain([-10, 10])
         .range([ 0, width ]);

        y = d3.scale.linear()
         .domain([-10, 10])
         .range([ height, 0 ]);
        
        var chart = d3.select(iElm[0])
         .append('svg:svg')
         .attr('width', width + margin.right + margin.left)
         .attr('height', height + margin.top + margin.bottom)
         .attr('class', 'chart')

        var main = chart.append('g')
         .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
         .attr('width', width)
         .attr('height', height)
         .attr('class', 'main');


        g = main.append("svg:g"); 
        
        update(points, lines);
      };
      
      var update = function(points, lines) {
        g.selectAll("lines")
          .data(lines.filter(function(d) {return !!points[d.from] && !!points[d.to];}))
          .enter().append("svg:line")
          .attr("x1", function (d) { return x(points[d.from].x); } )
          .attr("y1", function (d) { return y(points[d.from].y); } )
          .attr("x2", function (d) { return x(points[d.to].x); } )
          .attr("y2", function (d) { return y(points[d.to].y); } )
          .style('stroke', function(d) {return d.color})
          ;
        };
      
      $scope.$watch('markers', function() {
        clean();
        if (!g) {
          draw($scope.markers, $scope.lines);
        } else {
          update($scope.markers, $scope.lines);
        }
      }, true);
    }
  }
})
;