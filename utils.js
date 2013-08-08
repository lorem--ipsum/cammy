angular.module('nomnom', [])

.factory('$canvas', function() {
  return {
    draw: function(context, series, x, y) {
      if (!context || !series) {
        return;
      }
      
      series.map(function(s) {
        if (!!s.options.drawLines) {
          s.lines.map(function(d) {
            context.beginPath();
            context.strokeStyle = d.color;
            context.moveTo(x(s.coordinates[d.from].x), y(s.coordinates[d.from].y));
            context.lineTo(x(s.coordinates[d.to].x), y(s.coordinates[d.to].y));
            context.stroke();
          });
        }
        
        if (s.labels) {
          context.font = '10pt';
          context.textBaseline = 'middle';
          context.textAlign = 'center';
          context.fillStyle = 'black';;
          s.labels.map(function(d) {
            context.fillText(d.text, x(s.coordinates[d.point].x), y(s.coordinates[d.point].y));
          });
        }
        
        if (!!s.options.drawDots) {
          s.coordinates.map(function(d) {
            context.fillStyle = d.color;
            context.fillRect(x(d.x), y(d.y), 2, 2);
          });
        }
      });
    }
  };
})

.factory('$n', function() {
  var operators = {
    left: {
      ']': function(v, a) {return v > a},
      '[': function(v, a) {return v >= a}
    },
    right: {
      '[': function(v, a) {return v < a},
      ']': function(v, a) {return v <= a}
    }
  };
  
  var evaluate = function(value, expression) {
    var r = /^(\[|\])(\d+),(\d+)(\[|\])$/;
    
    if (typeof expression !== 'string') {
      throw new Error('Invalid expression : ' + expression);
    }
    
    if (!r.test(expression)) {
      if (/^\d+$/.test(expression)) {
        return value === +expression;
      } else {
        throw new Error('Invalid expression : ' + expression);
      }
    }
    
    var values = expression.match(r);
    
    return (
      operators.left[values[1]](value, +values[2])
      &&
      operators.right[values[4]](value, +values[3])
    );
  };
  
  return {
    near: function(value, reference, tolerancy) {
      return value >= reference - tolerancy && value <= reference + tolerancy;
    },
    om: function(value, expression) {
      var result = evaluate(value, expression);
      
      var returned = function() {return result;};
      
      var throwUp = function() {throw new Error('Mixing operators is forbidden');};
      
      var that = this;
      returned.or = function() {
        if (arguments.length > 2) {
          throw new Error('Too many arguments');
        }
        
        var v = arguments.length === 2 ? arguments[0] : value;
        var exp = arguments.length === 2 ? arguments[1] : arguments[0];
        
        result = result || evaluate(value, exp);
        
        var returned_or = function() {return result;};
        returned_or.or = returned.or;
        returned_or.and = throwUp;
        
        return returned_or;
      };
      
      returned.and = function() {
        if (arguments.length > 2) {
          throw new Error('Too many arguments');
        }
        
        var v = arguments.length === 2 ? arguments[0] : value;
        var exp = arguments.length === 2 ? arguments[1] : arguments[0];
        
        result = result && evaluate(value, exp);
        var returned_and = function() {return result;};
        returned_and.and = returned.and;
        returned_and.or = throwUp;
        
        return returned_and;
      };
      
      return returned;
    }
  };
})