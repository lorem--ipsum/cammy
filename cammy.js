angular.module('cammy', ['nomnom'])

.config(function config($routeProvider) {
  $routeProvider
  .when('/', {controller: 'MainCtrl', templateUrl: 'pages/main.html'})
  .otherwise({redirectTo: '/'});
})


.controller('BodyCtrl', function($scope) {
  $scope.remarkables = [
    {theta:45, phi:45}, {theta:135, phi:45}, {theta:225, phi:45}, {theta:315, phi:45},
    {theta:45, phi:125}, {theta:135, phi:125}, {theta:225, phi:125}, {theta:315, phi:125},
    {theta:0, phi:0}, {theta:90, phi:0}, {theta:180, phi:0}, {theta:270, phi:0},
    {theta:0, phi:90}, {theta:90, phi:90}, {theta:180, phi:90}, {theta:270, phi:90},
    {theta:0, phi:180}, {theta:90, phi:180}, {theta:180, phi:180}, {theta:270, phi:180}
  ];
})

.controller('MainCtrl', function($scope, $camera, $axis) {
  $scope.angles = {theta: 45, phi: 45};
  
  d3.json('logo.json', function(error, data) {
    $scope.data = {vertices: data.points, lines: data.lines, options: {drawLines: true}};
    $scope.stats = {vertices: data.points.length, lines: data.lines.length};
    $scope.$apply();    
  });
})

//TONEVERDO: Add pseudo memoization for that
.factory('$axis', function($n) {
  return {
    xScale: d3.scale.linear().domain([-0.5, 0.5]).range([-0.5, 0.5]),
    yScale: d3.scale.linear().domain([-0.5, 0.5]).range([-0.5, 0.5]),
    zScale: d3.scale.linear().domain([-0.5, 0.5]).range([-0.5, 0.5]),
    
    xy: function(theta, phi) {
      var pts = [], lines = [], labels = [];
      
      var z = (phi > 90) ? 0.5 : -0.5;
      var zOffset = function(offset) {
        return z - (90 - phi || 1)/Math.abs(90 - phi || 1)/100 * Math.max((offset - Math.abs((90 - phi))), 0);
      }
      
      var ySign = ($n.om(phi,'180')() && $n.om(theta,'90').or('270')() ? -1 : 1) * ($n.om(theta,'[0,180[')() ? -1 : 1);
      
      // x ticks
      this.xScale.ticks(10).map(function(tick) {
        pts.push({x: tick, y: -0.5, z: z}, {x: tick, y: 0.5, z: z});
        lines.push({from: pts.length - 2, to: pts.length - 1, color: 'grey'});
      });
      
      // x labels
      if (
        $n.om(phi, '[0,80]').or('[100,180]')()
        ||
        ($n.om(phi, '[80,100]')() && !$n.om(theta, '[0,10]').or('[170,190]').or('[350,360]')())
      ) {
        this.xScale.ticks(10).map(function(tick) {
          pts.push({x: tick, y: ySign * 0.6, z: zOffset(7)});
          labels.push({point: pts.length - 1, text: '' + tick});
        });
        
        pts.push({x: 0, y: ySign * 0.8, z: zOffset(30)});
        labels.push({point: pts.length - 1, text: 'x axis'});
      }
      
      // y ticks
      this.yScale.ticks(10).map(function(tick) {
        pts.push({x: -0.5, y: tick, z: z}, {x: 0.5, y: tick, z: z});
        lines.push({from: pts.length - 2, to: pts.length - 1, color: 'grey'});
      });
      
      // y labels
      var xSign = 1;
      
      if (
          (!$n.om(phi,'180')() && $n.om(theta, '[0,90[').or('[270,360]')())
          ||
          ($n.om(phi,'180')() && $n.om(theta, '270').or('180')())
      ) {
        xSign = -1;
      }
      
      if (
        $n.om(phi, '[0,80]').or('[100,180]')()
        ||
        ($n.om(phi, '[80,100]')() && !$n.om(theta, '[80,100]').or('[250,290]')())
      ) {
        this.yScale.ticks(10).map(function(tick) {
          pts.push({x: xSign * 0.6, y: tick, z: zOffset(7)});
          labels.push({point: pts.length - 1, text: '' + tick});
        });
        
        pts.push({x: xSign * 0.8, y: 0, z: zOffset(30)});
        labels.push({point: pts.length - 1, text: 'y axis'});
      }
      
      return {vertices: pts, lines: lines, labels: labels};
    },
    
    yz: function(theta, phi) {
      var pts = [], lines = [], labels = [];
      
      var xSign = $n.om(theta, ']270,360]').or('[0,90]')() ? 1 : -1;
      
      this.yScale.ticks(10).map(function(tick) {
        pts.push({x: xSign*0.5, y: tick, z: -0.5}, {x: xSign*0.5, y: tick, z: 0.5});
        lines.push({from: pts.length - 2, to: pts.length - 1, color: 'grey'});
      });
      
      
      // z ticks
      this.zScale.ticks(10).map(function(tick) {
        pts.push({x: xSign*0.5, y: -0.5, z: tick}, {x: xSign*0.5, y: 0.5, z: tick});
        lines.push({from: pts.length - 2, to: pts.length - 1, color: 'grey'});
      });
      
      var ySign = $n.om(theta, '[180,270]')() ? 1 : -1;
      // z labels
      if (
        !$n.om(phi, '[0,10]').or('[170,180]')()
        &&
        $n.om(theta, '[0,90]').or(']180,270]')()
      ) {
        this.zScale.ticks(10).map(function(tick) {
          pts.push({x: xSign*0.6, y: ySign*0.6, z: tick});
          labels.push({point: pts.length - 1, text: tick});
        });
        
        pts.push({x: xSign * 0.8, y: ySign*0.8, z: 0});
        labels.push({point: pts.length - 1, text: 'z axis'});
      }
      
      return {vertices: pts, lines: lines, labels: labels};
    },
    
    zx: function(theta, phi) {
      var pts = [], lines = [], labels = [];
      
      var ySign = $n.om(theta, ']0,180]')() ? 1 : -1;
      
      // z ticks
      this.zScale.ticks(10).map(function(tick) {
        pts.push({x: -0.5, y: ySign*0.5, z: tick}, {x: 0.5, y: ySign*0.5, z: tick});
        lines.push({from: pts.length - 2, to: pts.length - 1, color: 'grey'});
      });
      
      var xSign = $n.om(theta,'[0,90]').or('[270,360]')() ? -1 : 1;
      // z labels
      if (
          !$n.om(phi, '[0,10]').or('[170,180]')()
          &&
          $n.om(theta, ']90,180]').or(']270,360]')()
      ) {
        this.zScale.ticks(10).map(function(tick) {
          pts.push({x: xSign*0.6, y: ySign*0.6, z: tick});
          labels.push({point: pts.length - 1, text: tick});
        });
        
        pts.push({x: xSign * 0.8, y: ySign*0.8, z: 0});
        labels.push({point: pts.length - 1, text: 'z axis'});
      }
      
      this.xScale.ticks(10).map(function(tick) {
        pts.push({x: tick, y: ySign*0.5, z: -0.5}, {x: tick, y: ySign*0.5, z: 0.5});
        lines.push({from: pts.length - 2, to: pts.length - 1, color: 'grey'});
      });
      
      return {vertices: pts, lines: lines, labels: labels};
    }
  };
})

.factory('$camera', function($n) {
  return {
    project: function(vertices, angles) {
      var phiRadian = angles.phi*Math.PI/180;
      var thetaRadian = angles.theta*Math.PI/180;
      
      var ct = Math.cos(thetaRadian);
      var sp = Math.sin(phiRadian);
      var st = Math.sin(thetaRadian);
      var pr = Math.cos(phiRadian);
      
      var a = ct*pr;
      var b = st*pr;
      
      var scale = 20;
      
      return vertices.map(function(point, pointIndex) {
        var x = point.x*scale, y = point.y*scale, z = -point.z*scale;
        return {x: -x*st + y*ct, y: x*a + y*b - z*sp, color: point.color};
      });
    },
    delta: function(deltaTheta, deltaPhi, angles) {
      angles.theta = (360 + angles.theta + deltaTheta)%360;
      angles.phi = Math.min(Math.max(angles.phi - deltaPhi, 0), 180);
      
      var remarkables = [
        {theta:0, phi:0}, {theta:90, phi:0}, {theta:180, phi:0}, {theta:270, phi:0},
        {theta:0, phi:90}, {theta:90, phi:90}, {theta:180, phi:90}, {theta:270, phi:90},
        {theta:0, phi:180}, {theta:90, phi:180}, {theta:180, phi:180}, {theta:270, phi:180}
      ];
      
      remarkables.forEach(function(couple) {
        if (
          $n.near(angles.theta, couple.theta, 2) 
          &&
          $n.near(angles.phi, couple.phi, 2)
        ) {
          angles.theta = couple.theta;
          angles.phi = couple.phi;
        }
      })
    }
  }
})

.directive('cammyCanvas', function() {
  return {
    controller: ['$scope', '$camera', '$axis', '$canvas', function($scope, $camera, $axis, $canvas) {
      $scope.draw = $canvas.draw;
      
      var oldX, oldY;
      $scope.rotate = function(event) {
        if ($scope.isRotating) {
          $camera.delta(event.clientX - oldX, event.clientY - oldY, $scope.my_angles);
        }
        
        oldX = event.clientX, oldY = event.clientY;
      };
      
      var update = function() {
        if (!$scope.my_angles) {
          return;
        }
        
        var xy = $axis.xy($scope.my_angles.theta, $scope.my_angles.phi);
        var yz = $axis.yz($scope.my_angles.theta, $scope.my_angles.phi);
        var zx = $axis.zx($scope.my_angles.theta, $scope.my_angles.phi);
        
        $scope.axes = [
          {vertices: xy.vertices, lines: xy.lines, labels: xy.labels, options: {drawLines: true}},
          {vertices: yz.vertices, lines: yz.lines, labels: yz.labels, options: {drawLines: true}},
          {vertices: zx.vertices, lines: zx.lines, labels: zx.labels, options: {drawLines: true}},
        ];
        
        $scope.axes.forEach(function(d) {d.coordinates = $camera.project(d.vertices, $scope.my_angles);});
        
        $scope.series = $scope.data ? [$scope.data] : [];
        $scope.series.forEach(function(d) {d.coordinates = $camera.project(d.vertices, $scope.my_angles);});
      };
  
      $scope.$watch('my_angles', update, true);
      $scope.$watch('data', update);
    }],
    restrict: 'E',
    scope: {data: '=', angles:'='},
    template: '<div ng-mousedown="isRotating=true" ng-mouseup="isRotating=false" ng-mousemove="rotate($event)"></div>',
    replace: true,
    link: function($scope, iElm, iAttrs, controller) {
      var g, x, y;
      
      var draw = function(axes, series) {
        var width = 750, height = 750;

        x = d3.scale.linear().domain([-20, 20]).range([ 0, width ]);
        y = d3.scale.linear().domain([-20, 20]).range([ height, 0 ]);
        
        g = d3.select(iElm[0])
         .append('canvas')
         .attr('width', width).attr('height', height).attr('class', 'chart')
        
        update(series);
      };
      
      var update = function(axes, series) {
        // This is weird.
        var ctx = g[0][0].getContext('2d');
        ctx.clearRect(0, 0, 751, 751);
        
        $scope.draw(ctx, axes, x, y);
        $scope.draw(ctx, series, x, y);
      };
      
      $scope.$watch('series', function() {
        (g && update || draw)($scope.axes, $scope.series); 
      });
      
      $scope.$watch('axes', function() {
        (g && update || draw)($scope.axes, $scope.series); 
      });
      
      $scope.$watch('angles', function() {
        $scope.my_angles = $scope.angles || {theta: 45, phi: 45};
      });
    }
  }
})
;