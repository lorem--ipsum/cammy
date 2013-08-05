angular.module('cammy', [])

.config(function config($routeProvider) {
  $routeProvider
  .when('/', {controller: 'MainCtrl', templateUrl: 'pages/main.html'})
  .otherwise({redirectTo: '/'});
})

.factory('$box', function() {
  return {
    vertices: function() {
      return [
        {x: -0.5, y: 0.5, z: 0.5},
        {x: -0.5, y: 0.5, z: -0.5},
        {x: 0.5, y: 0.5, z: -0.5},
        {x: 0.5, y: 0.5, z: 0.5},
        
        {x: 0.5, y: -0.5, z: 0.5},
        {x: 0.5, y: -0.5, z: -0.5},
        {x: 0.5, y: 0.5, z: -0.5},
        
      ];
    },
    lines: function() {
      return [
        {from: 0, to: 1, color: '#ff0000'},
        {from: 1, to: 2, color: '#ff0000'},
        {from: 2, to: 3, color: '#ff0000'},
        {from: 3, to: 0, color: '#ff0000'},
        
        {from: 3, to: 4, color: '#000000'},
        {from: 4, to: 5, color: '#000000'},
        {from: 5, to: 6, color: '#000000'},
      ];
    }
  }
})

.controller('MainCtrl', function HomeController($scope, $camera, $box) {
  $scope.angles = $camera.angles();
  $scope.vertices = [];
  $scope.lines = [];
  
  var oldX, oldY;
  $scope.rotate = function(event) {
    if ($scope.isRotating) {
      $camera.delta(event.clientX - oldX, event.clientY - oldY);
    }
    
    oldX = event.clientX, oldY = event.clientY;
  };
  
  d3.json('logo.json', function(error, data) {
    $scope.vertices.push(data.points);
    $scope.lines.push(data.lines);
    
    update();
    $scope.$apply();    
  });
  
  
  var update = function() {
    $scope.markers = $scope.vertices && $scope.vertices.map(function(series) {
      return $camera.project(series);
    });
  };
  
  $scope.$watch('angles', update, true);
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

.directive('cammyCanvas', function() {
  return {
    restrict: 'E',
    scope: {markers: '=', lines: '='},
    template: '<div></div>',
    replace: true,
    link: function($scope, iElm, iAttrs, controller) {
      var g, x, y;
      
      var draw = function(points, lines) {
        var margin = {top: 0, right: 0, bottom: 0, left: 0}
         , width = 750 - margin.left - margin.right
         , height = 750 - margin.top - margin.bottom;

        x = d3.scale.linear()
         .domain([-20, 20])
         .range([ 0, width ]);

        y = d3.scale.linear()
         .domain([-20, 20])
         .range([ height, 0 ]);
        
        g = d3.select(iElm[0])
         .append('canvas')
         .attr('width', width + margin.right + margin.left)
         .attr('height', height + margin.top + margin.bottom)
         .attr('class', 'chart')
        
        update(points, lines);
      };
      
      var update = function(points, lines) {
        // This is weird.
        var ctx = g[0][0].getContext('2d');
        
        ctx.clearRect(0, 0, 751, 751);
        
        lines.map(function(series, i) {
          series.map(function(d) {
            ctx.beginPath();
            ctx.strokeStyle = d.color;
            ctx.moveTo(x(points[i][d.from].x), y(points[i][d.from].y));
            ctx.lineTo(x(points[i][d.to].x), y(points[i][d.to].y));
            ctx.stroke();
          });
        });
      };
      
      $scope.$watch('markers', function() {
        (g && update || draw)($scope.markers, $scope.lines); 
      }, true);
    }
  }
})
;