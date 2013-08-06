angular.module('cammy', [])

.config(function config($routeProvider) {
  $routeProvider
  .when('/', {controller: 'MainCtrl', templateUrl: 'pages/main.html'})
  .otherwise({redirectTo: '/'});
})

.controller('MainCtrl', function HomeController($scope, $camera, $axis) {
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
    $scope.logo = data;
    
    update();
    $scope.$apply();    
  });
  
  var update = function() {
    var t = $scope.angles.theta;
    var p = $scope.angles.phi;
    
    $scope.markers = [
      $axis.xy(p).vertices, $axis.yz(t).vertices, $axis.zx(t).vertices,
      $scope.logo.points
    ].map(function(series) {
      return $camera.project(series);
    });
    
    $scope.lines = [
      $axis.xy(p).lines, $axis.yz(t).lines, $axis.zx(t).lines,
      $scope.logo.lines
    ];
  };
  
  $scope.$watch('angles', update, true);
})

.factory('$axis', function() {
  return {
    xScale: d3.scale.linear().domain([-0.5, 0.5]).range([-0.5, 0.5]),
    yScale: d3.scale.linear().domain([-0.5, 0.5]).range([-0.5, 0.5]),
    zScale: d3.scale.linear().domain([-0.5, 0.5]).range([-0.5, 0.5]),
    
    
    //TONEVERDO: Add pseudo memoization for that
    xy: function(phi) {
      var pts = [], lines = [];
      
      var z = (phi > 90) ? 0.5 : -0.5;
      
      this.xScale.ticks(10).map(function(tick) {
        pts.push({x: tick, y: -0.5, z: z}, {x: tick, y: 0.5, z: z});
        lines.push({from: pts.length - 2, to: pts.length - 1, color: 'grey'});
      });
      
      this.yScale.ticks(10).map(function(tick) {
        pts.push({x: -0.5, y: tick, z: z}, {x: 0.5, y: tick, z: z});
        lines.push({from: pts.length - 2, to: pts.length - 1, color: 'grey'});
      });
      
      return {vertices: pts, lines: lines};
    },
    
    yz: function(theta) {
      var pts = [], lines = [];
      
      var x = (theta > 270 || theta < 90) ? 0.5 : -0.5;
      
      this.yScale.ticks(10).map(function(tick) {
        pts.push({x: x, y: tick, z: -0.5}, {x: x, y: tick, z: 0.5});
        lines.push({from: pts.length - 2, to: pts.length - 1, color: 'grey'});
      });
      
      this.zScale.ticks(10).map(function(tick) {
        pts.push({x: x, y: -0.5, z: tick}, {x: x, y: 0.5, z: tick});
        lines.push({from: pts.length - 2, to: pts.length - 1, color: 'grey'});
      });
      
      return {vertices: pts, lines: lines};
    },
    
    zx: function(theta) {
      var pts = [], lines = [];
      
      var y = (theta > 0 && theta < 180) ? 0.5 : -0.5;
      
      this.zScale.ticks(10).map(function(tick) {
        pts.push({x: -0.5, y: y, z: tick}, {x: 0.5, y: y, z: tick});
        lines.push({from: pts.length - 2, to: pts.length - 1, color: 'grey'});
      });
      
      this.xScale.ticks(10).map(function(tick) {
        pts.push({x: tick, y: y, z: -0.5}, {x: tick, y: y, z: 0.5});
        lines.push({from: pts.length - 2, to: pts.length - 1, color: 'grey'});
      });
      
      return {vertices: pts, lines: lines};
    }
  };
})

.factory('$camera', function() {
  var _angles = {theta: 45, phi: 45};
  
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
      
      var scale = 20;
      
      return vertices
        .map(function(point, pointIndex) {
          var x = point.x*scale, y = point.y*scale, z = -point.z*scale;
          return {x: -x*st + y*ct, y: x*a + y*b - z*sp, color: point.color};
        });
    },
    delta: function(deltaTheta, deltaPhi) {
      _angles.theta = (360 + _angles.theta + deltaTheta)%360;
      _angles.phi = Math.min(Math.max(_angles.phi - deltaPhi, 0), 180);
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