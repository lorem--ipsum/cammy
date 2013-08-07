angular.module('cammy', [])

.config(function config($routeProvider) {
  $routeProvider
  .when('/', {controller: 'MainCtrl', templateUrl: 'pages/main.html'})
  .otherwise({redirectTo: '/'});
})

.controller('MainCtrl', function HomeController($scope, $camera, $axis) {
  $scope.angles = $camera.angles();
  $scope.series = [];
  
  var oldX, oldY;
  $scope.rotate = function(event) {
    if ($scope.isRotating) {
      $camera.delta(event.clientX - oldX, event.clientY - oldY);
    }
    
    oldX = event.clientX, oldY = event.clientY;
  };
  
  d3.json('other.json', function(error, data) {
    $scope.logo = data;
    $scope.stats = {vertices: data.points.length, lines: data.lines.length};
    update();
    $scope.$apply();    
  });
  
  var update = function() {
    var xy = $axis.xy($scope.angles);
    var yz = $axis.yz($scope.angles);
    var zx = $axis.zx($scope.angles);
    
    $scope.series = [
      {vertices: xy.vertices, lines: xy.lines, labels: xy.labels, options: {drawLines: true}},
      {vertices: yz.vertices, lines: yz.lines, labels: yz.labels, options: {drawLines: true}},
      {vertices: zx.vertices, lines: zx.lines, labels: zx.labels, options: {drawLines: true}},
      {vertices: $scope.logo && $scope.logo.points || [], lines: $scope.logo && $scope.logo.lines || [], options: {drawLines: true}}
    ];
    
    $scope.series.forEach(function(series) {series.vertices = $camera.project(series.vertices);});
  };
  
  $scope.$watch('angles', update, true);
})

.factory('$camera', function() {
  var _angles = {
    theta: 45, phi: 45,
    thetaBetween: function(from, to) {
      if (from > to) {
        return this.theta > from || this.theta < to;
      }
      
      return this.theta > from && this.theta < to;
    },
    phiNear: function() {
      var delta = 30;
      for (var i = 0; i < arguments.length; i++) {
        if (this.phi < arguments[i] + delta && this.phi > arguments[i] - delta) {
          return true;
        }
      }
      
      return false;
    },
    near: function() {
      var delta = 30;
      
      for (var i = 0; i < arguments.length; i+=2) {
        var theta = arguments[i], phi = arguments[i+1];
        
        if (this.thetaBetween(theta - delta, theta + delta)
          &&
          this.phi > phi - delta && this.phi < phi + delta
        ) {
          return true;
        }
      }
      
      return false;
    }
  };
  
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
          return {x: -x*st + y*ct, y: x*a + y*b - z*sp, color: point.color, plot: point.plot};
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

//TONEVERDO: Add pseudo memoization for that
.factory('$axis', function() {
  return {
    xScale: d3.scale.linear().domain([-0.5, 0.5]).range([-0.5, 0.5]),
    yScale: d3.scale.linear().domain([-0.5, 0.5]).range([-0.5, 0.5]),
    zScale: d3.scale.linear().domain([-0.5, 0.5]).range([-0.5, 0.5]),
    
    xy: function(angles) {
      var pts = [], lines = [], labels = [];
      
      var z = (angles.phi > 90) ? 0.5 : -0.5;
      var zOffset = function(offset) {
        return z - (90 - angles.phi || 1)/Math.abs(90 - angles.phi || 1)/100 * Math.max((offset - Math.abs((90 - angles.phi))), 0);
      }
      var ySign = ((angles.theta > 0 && angles.theta < 180) ? -1 : 1);
      
      // x ticks
      this.xScale.ticks(10).map(function(tick) {
        pts.push({x: tick, y: -0.5, z: z}, {x: tick, y: 0.5, z: z});
        lines.push({from: pts.length - 2, to: pts.length - 1, color: 'grey'});
      });
      
      // x labels
      if (!angles.near(0, 90, 180, 90, 360, 90)) {
        this.xScale.ticks(10).map(function(tick) {
          pts.push({x: tick, y: ySign * 0.6, z: zOffset(7)});
          labels.push({point: pts.length - 1, text: '' + tick});
        });
        
        pts.push({x: 0, y: ySign * 0.8, z: zOffset(10)});
        labels.push({point: pts.length - 1, text: 'x axis'});
      }
      
      // y ticks
      var xSign = angles.thetaBetween(90, 270) ? 1 : -1;
      this.yScale.ticks(10).map(function(tick) {
        pts.push({x: -0.5, y: tick, z: z}, {x: 0.5, y: tick, z: z});
        lines.push({from: pts.length - 2, to: pts.length - 1, color: 'grey'});
      });
      
      // y labels
      if (!angles.near(90, 90, 270, 90)) {
        this.yScale.ticks(10).map(function(tick) {
          pts.push({x: xSign * 0.6, y: tick, z: zOffset(7)});
          labels.push({point: pts.length - 1, text: '' + tick});
        });
        
        pts.push({x: xSign * 0.8, y: 0, z: zOffset(10)});
        labels.push({point: pts.length - 1, text: 'y axis'});
      }
      
      return {vertices: pts, lines: lines, labels: labels};
    },
    
    yz: function(angles) {
      var pts = [], lines = [], labels = [];
      
      var xSign = angles.thetaBetween(270, 90) ? 1 : -1;
      
      this.yScale.ticks(10).map(function(tick) {
        pts.push({x: xSign*0.5, y: tick, z: -0.5}, {x: xSign*0.5, y: tick, z: 0.5});
        lines.push({from: pts.length - 2, to: pts.length - 1, color: 'grey'});
      });
      
      
      // z ticks
      this.zScale.ticks(10).map(function(tick) {
        pts.push({x: xSign*0.5, y: -0.5, z: tick}, {x: xSign*0.5, y: 0.5, z: tick});
        lines.push({from: pts.length - 2, to: pts.length - 1, color: 'grey'});
      });
      
      var ySign = angles.thetaBetween(180, 270) ? 1 : -1;
      // z labels
      if ((angles.thetaBetween(0, 90) || angles.thetaBetween(180, 270)) && !angles.phiNear(0, 180)) {
        this.zScale.ticks(10).map(function(tick) {
          pts.push({x: xSign*0.6, y: ySign*0.5, z: tick});
          labels.push({point: pts.length - 1, text: tick});
        });
      }
      
      return {vertices: pts, lines: lines, labels: labels};
    },
    
    zx: function(angles) {
      var pts = [], lines = [], labels = [];
      
      var ySign = angles.thetaBetween(0, 180) ? 1 : -1;
      
      // z ticks
      this.zScale.ticks(10).map(function(tick) {
        pts.push({x: -0.5, y: ySign*0.5, z: tick}, {x: 0.5, y: ySign*0.5, z: tick});
        lines.push({from: pts.length - 2, to: pts.length - 1, color: 'grey'});
      });
      
      var xSign = angles.thetaBetween(270, 360) ? -1 : 1;
      // z labels
      if (
        (angles.thetaBetween(90, 180) || angles.thetaBetween(270, 360) || angles.theta == 0) && !angles.phiNear(0, 180)) {
        this.zScale.ticks(10).map(function(tick) {
          pts.push({x: xSign*0.5, y: ySign*0.6, z: tick});
          labels.push({point: pts.length - 1, text: tick});
        });
      }
      
      this.xScale.ticks(10).map(function(tick) {
        pts.push({x: tick, y: ySign*0.5, z: -0.5}, {x: tick, y: ySign*0.5, z: 0.5});
        lines.push({from: pts.length - 2, to: pts.length - 1, color: 'grey'});
      });
      
      return {vertices: pts, lines: lines, labels: labels};
    }
  };
})

.directive('cammyCanvas', function() {
  return {
    restrict: 'E',
    scope: {series: '='},
    template: '<div></div>',
    replace: true,
    link: function($scope, iElm, iAttrs, controller) {
      var g, x, y;
      
      var draw = function(series) {
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
        
        update(series);
      };
      
      var update = function(series) {
        // This is weird.
        var ctx = g[0][0].getContext('2d');
        
        ctx.clearRect(0, 0, 751, 751);
        
        if (!series) {
          return;
        }
        series.map(function(s) {
          if (!!s.options.drawLines) {
            s.lines.map(function(d) {
              ctx.beginPath();
              ctx.strokeStyle = d.color;
              ctx.moveTo(x(s.vertices[d.from].x), y(s.vertices[d.from].y));
              ctx.lineTo(x(s.vertices[d.to].x), y(s.vertices[d.to].y));
              ctx.stroke();
            });
          }
          
          if (s.labels) {
            ctx.font = '10pt';
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            ctx.fillStyle = 'black';;
            s.labels.map(function(d) {
              ctx.fillText(d.text, x(s.vertices[d.point].x), y(s.vertices[d.point].y));
            });
          }
          
          if (!!s.options.drawDots) {
            s.vertices.map(function(d) {
              ctx.fillStyle = d.color;
              ctx.fillRect(x(d.x), y(d.y), 2, 2);
            });
          }
        });
      };
      
      $scope.$watch('series', function() {
        (g && update || draw)($scope.series); 
      }, true);
    }
  }
})
;