angular.module('cammy', [])

.config(function config($routeProvider) {
  $routeProvider
  .when( '/', {controller: 'MainCtrl', templateUrl: 'pages/main.html'})
  .otherwise({redirectTo: '/'});
})

.controller('MainCtrl', function HomeController($scope) {
  var oldX, oldY;
  $scope.rotate = function(event) {
    if ($scope.isRotating) {
      $scope.camera.theta -= (oldX - event.clientX);
      $scope.camera.phi -= (oldY - event.clientY);
    }
    
    oldX = event.clientX;
    oldY = event.clientY;
  };
  
  var project = function(array) {
    var phiRadian = $scope.camera.phi*Math.PI/180;
    var thetaRadian = $scope.camera.theta*Math.PI/180;
    
    var ct = Math.cos(thetaRadian);
    var sp = Math.sin(phiRadian);
    var st = Math.sin(thetaRadian);
    var pr = Math.cos(phiRadian);
    
    var a = ct*pr;
    var b = st*pr;
    
    return array
      .map(function(point, pointIndex) {
        var x = point.x*20, y = point.y*20, z = point.z*20;
        return {x: -x*st + y*ct, y: x*a + y*b - z*sp, color: point.color};
      })
      .map(function(point, index) {
        return index%$scope.settings.accuracy === 0 ? point : null;
      })
      ;
  };
  
  
  d3.json('logo.json', function(error, data) {
    $scope.init_markers = data.points;
    $scope.lines = data.lines;
    $scope.markers = project($scope.init_markers);
    $scope.$apply();    
  });
  
  $scope.camera = {theta: -35, phi: -55};
  $scope.settings = {accuracy: 1};
  $scope.init_markers = [];
  $scope.lines = [];
  
  var update = function() {$scope.markers = project($scope.init_markers);};
  $scope.$watch('camera', update, true);
  $scope.$watch('settings', update, true);
})


.directive('scene', function() {
  return {
    restrict: 'E',
    scope: {markers: '=', lines: '='},
    template: '<div></div>',
    replace: true,
    link: function($scope, iElm, iAttrs, controller) {
      var clean = function() {
        d3.select(iElm[0]).select('svg').remove();
      };
      
      var draw = function(points, lines) {
        var margin = {top: 0, right: 0, bottom: 0, left: 0}
         , width = 500 - margin.left - margin.right
         , height = 500 - margin.top - margin.bottom;

        var x = d3.scale.linear()
         .domain([-10, 10])
         .range([ 0, width ]);

        var y = d3.scale.linear()
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


        var g = main.append("svg:g"); 
        
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
        if ($scope.markers) {
          draw($scope.markers, $scope.lines);
        }
      }, true);
    }
  }
})
;