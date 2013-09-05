angular.module('nomnom', [])

.value('$colors', ["#000080","#000081","#000082","#000083","#000084","#000085","#000086","#000087","#000088","#000089","#00008A","#00008B","#00008C","#00008D","#00008E","#00008F","#000090","#000091","#000092","#000093","#000094","#000095","#000096","#000097","#000098","#000099","#00009A","#00009B","#00009C","#00009D","#00009E","#00009F","#0000A0","#0000A1","#0000A2","#0000A3","#0000A4","#0000A5","#0000A6","#0000A7","#0000A8","#0000A9","#0000AA","#0000AB","#0000AC","#0000AD","#0000AE","#0000AF","#0000B0","#0000B1","#0000B2","#0000B3","#0000B4","#0000B5","#0000B6","#0000B7","#0000B8","#0000B9","#0000BA","#0000BB","#0000BC","#0000BD","#0000BE","#0000BF","#0000C0","#0000C1","#0000C2","#0000C3","#0000C4","#0000C5","#0000C6","#0000C7","#0000C8","#0000C9","#0000CA","#0000CB","#0000CC","#0000CD","#0000CE","#0000CF","#0000D0","#0000D1","#0000D2","#0000D3","#0000D4","#0000D5","#0000D6","#0000D7","#0000D8","#0000D9","#0000DA","#0000DB","#0000DC","#0000DD","#0000DE","#0000DF","#0000E0","#0000E1","#0000E2","#0000E3","#0000E4","#0000E5","#0000E6","#0000E7","#0000E8","#0000E9","#0000EA","#0000EB","#0000EC","#0000ED","#0000EE","#0000EF","#0000F0","#0000F1","#0000F2","#0000F3","#0000F4","#0000F5","#0000F6","#0000F7","#0000F8","#0000F9","#0000FA","#0000FB","#0000FC","#0000FD","#0000FE","#0000FF","#0001FF","#0002FF","#0003FF","#0004FF","#0005FF","#0006FF","#0007FF","#0008FF","#0009FF","#000AFF","#000BFF","#000CFF","#000DFF","#000EFF","#000FFF","#0010FF","#0011FF","#0012FF","#0013FF","#0014FF","#0015FF","#0016FF","#0017FF","#0018FF","#0019FF","#001AFF","#001BFF","#001CFF","#001DFF","#001EFF","#001FFF","#0020FF","#0021FF","#0022FF","#0023FF","#0024FF","#0025FF","#0026FF","#0027FF","#0028FF","#0029FF","#002AFF","#002BFF","#002CFF","#002DFF","#002EFF","#002FFF","#0030FF","#0031FF","#0032FF","#0033FF","#0034FF","#0035FF","#0036FF","#0037FF","#0038FF","#0039FF","#003AFF","#003BFF","#003CFF","#003DFF","#003EFF","#003FFF","#0040FF","#0041FF","#0042FF","#0043FF","#0044FF","#0045FF","#0046FF","#0047FF","#0048FF","#0049FF","#004AFF","#004BFF","#004CFF","#004DFF","#004EFF","#004FFF","#0050FF","#0051FF","#0052FF","#0053FF","#0054FF","#0055FF","#0056FF","#0057FF","#0058FF","#0059FF","#005AFF","#005BFF","#005CFF","#005DFF","#005EFF","#005FFF","#0060FF","#0061FF","#0062FF","#0063FF","#0064FF","#0065FF","#0066FF","#0067FF","#0068FF","#0069FF","#006AFF","#006BFF","#006CFF","#006DFF","#006EFF","#006FFF","#0070FF","#0071FF","#0072FF","#0073FF","#0074FF","#0075FF","#0076FF","#0077FF","#0078FF","#0079FF","#007AFF","#007BFF","#007CFF","#007DFF","#007EFF","#007FFF","#0080FF","#0080FF","#0081FF","#0082FF","#0083FF","#0084FF","#0085FF","#0086FF","#0087FF","#0088FF","#0089FF","#008AFF","#008BFF","#008CFF","#008DFF","#008EFF","#008FFF","#0090FF","#0091FF","#0092FF","#0093FF","#0094FF","#0095FF","#0096FF","#0097FF","#0098FF","#0099FF","#009AFF","#009BFF","#009CFF","#009DFF","#009EFF","#009FFF","#00A0FF","#00A1FF","#00A2FF","#00A3FF","#00A4FF","#00A5FF","#00A6FF","#00A7FF","#00A8FF","#00A9FF","#00AAFF","#00ABFF","#00ACFF","#00ADFF","#00AEFF","#00AFFF","#00B0FF","#00B1FF","#00B2FF","#00B3FF","#00B4FF","#00B5FF","#00B6FF","#00B7FF","#00B8FF","#00B9FF","#00BAFF","#00BBFF","#00BCFF","#00BDFF","#00BEFF","#00BFFF","#00C0FF","#00C1FF","#00C2FF","#00C3FF","#00C4FF","#00C5FF","#00C6FF","#00C7FF","#00C8FF","#00C9FF","#00CAFF","#00CBFF","#00CCFF","#00CDFF","#00CEFF","#00CFFF","#00D0FF","#00D1FF","#00D2FF","#00D3FF","#00D4FF","#00D5FF","#00D6FF","#00D7FF","#00D8FF","#00D9FF","#00DAFF","#00DBFF","#00DCFF","#00DDFF","#00DEFF","#00DFFF","#00E0FF","#00E1FF","#00E2FF","#00E3FF","#00E4FF","#00E5FF","#00E6FF","#00E7FF","#00E8FF","#00E9FF","#00EAFF","#00EBFF","#00ECFF","#00EDFF","#00EEFF","#00EFFF","#00F0FF","#00F1FF","#00F2FF","#00F3FF","#00F4FF","#00F5FF","#00F6FF","#00F7FF","#00F8FF","#00F9FF","#00FAFF","#00FBFF","#00FCFF","#00FDFF","#00FEFF","#00FFFF","#01FFFE","#02FFFD","#03FFFC","#04FFFB","#05FFFA","#06FFF9","#07FFF8","#08FFF7","#09FFF6","#0AFFF5","#0BFFF4","#0CFFF3","#0DFFF2","#0EFFF1","#0FFFF0","#10FFEF","#11FFEE","#12FFED","#13FFEC","#14FFEB","#15FFEA","#16FFE9","#17FFE8","#18FFE7","#19FFE6","#1AFFE5","#1BFFE4","#1CFFE3","#1DFFE2","#1EFFE1","#1FFFE0","#20FFDF","#21FFDE","#22FFDD","#23FFDC","#24FFDB","#25FFDA","#26FFD9","#27FFD8","#28FFD7","#29FFD6","#2AFFD5","#2BFFD4","#2CFFD3","#2DFFD2","#2EFFD1","#2FFFD0","#30FFCF","#31FFCE","#32FFCD","#33FFCC","#34FFCB","#35FFCA","#36FFC9","#37FFC8","#38FFC7","#39FFC6","#3AFFC5","#3BFFC4","#3CFFC3","#3DFFC2","#3EFFC1","#3FFFC0","#40FFBF","#41FFBE","#42FFBD","#43FFBC","#44FFBB","#45FFBA","#46FFB9","#47FFB8","#48FFB7","#49FFB6","#4AFFB5","#4BFFB4","#4CFFB3","#4DFFB2","#4EFFB1","#4FFFB0","#50FFAF","#51FFAE","#52FFAD","#53FFAC","#54FFAB","#55FFAA","#56FFA9","#57FFA8","#58FFA7","#59FFA6","#5AFFA5","#5BFFA4","#5CFFA3","#5DFFA2","#5EFFA1","#5FFFA0","#60FF9F","#61FF9E","#62FF9D","#63FF9C","#64FF9B","#65FF9A","#66FF99","#67FF98","#68FF97","#69FF96","#6AFF95","#6BFF94","#6CFF93","#6DFF92","#6EFF91","#6FFF90","#70FF8F","#71FF8E","#72FF8D","#73FF8C","#74FF8B","#75FF8A","#76FF89","#77FF88","#78FF87","#79FF86","#7AFF85","#7BFF84","#7CFF83","#7DFF82","#7EFF81","#7FFF80","#80FF80","#80FF7F","#81FF7E","#82FF7D","#83FF7C","#84FF7B","#85FF7A","#86FF79","#87FF78","#88FF77","#89FF76","#8AFF75","#8BFF74","#8CFF73","#8DFF72","#8EFF71","#8FFF70","#90FF6F","#91FF6E","#92FF6D","#93FF6C","#94FF6B","#95FF6A","#96FF69","#97FF68","#98FF67","#99FF66","#9AFF65","#9BFF64","#9CFF63","#9DFF62","#9EFF61","#9FFF60","#A0FF5F","#A1FF5E","#A2FF5D","#A3FF5C","#A4FF5B","#A5FF5A","#A6FF59","#A7FF58","#A8FF57","#A9FF56","#AAFF55","#ABFF54","#ACFF53","#ADFF52","#AEFF51","#AFFF50","#B0FF4F","#B1FF4E","#B2FF4D","#B3FF4C","#B4FF4B","#B5FF4A","#B6FF49","#B7FF48","#B8FF47","#B9FF46","#BAFF45","#BBFF44","#BCFF43","#BDFF42","#BEFF41","#BFFF40","#C0FF3F","#C1FF3E","#C2FF3D","#C3FF3C","#C4FF3B","#C5FF3A","#C6FF39","#C7FF38","#C8FF37","#C9FF36","#CAFF35","#CBFF34","#CCFF33","#CDFF32","#CEFF31","#CFFF30","#D0FF2F","#D1FF2E","#D2FF2D","#D3FF2C","#D4FF2B","#D5FF2A","#D6FF29","#D7FF28","#D8FF27","#D9FF26","#DAFF25","#DBFF24","#DCFF23","#DDFF22","#DEFF21","#DFFF20","#E0FF1F","#E1FF1E","#E2FF1D","#E3FF1C","#E4FF1B","#E5FF1A","#E6FF19","#E7FF18","#E8FF17","#E9FF16","#EAFF15","#EBFF14","#ECFF13","#EDFF12","#EEFF11","#EFFF10","#F0FF0F","#F1FF0E","#F2FF0D","#F3FF0C","#F4FF0B","#F5FF0A","#F6FF09","#F7FF08","#F8FF07","#F9FF06","#FAFF05","#FBFF04","#FCFF03","#FDFF02","#FEFF01","#FFFF00","#FFFE00","#FFFD00","#FFFC00","#FFFB00","#FFFA00","#FFF900","#FFF800","#FFF700","#FFF600","#FFF500","#FFF400","#FFF300","#FFF200","#FFF100","#FFF000","#FFEF00","#FFEE00","#FFED00","#FFEC00","#FFEB00","#FFEA00","#FFE900","#FFE800","#FFE700","#FFE600","#FFE500","#FFE400","#FFE300","#FFE200","#FFE100","#FFE000","#FFDF00","#FFDE00","#FFDD00","#FFDC00","#FFDB00","#FFDA00","#FFD900","#FFD800","#FFD700","#FFD600","#FFD500","#FFD400","#FFD300","#FFD200","#FFD100","#FFD000","#FFCF00","#FFCE00","#FFCD00","#FFCC00","#FFCB00","#FFCA00","#FFC900","#FFC800","#FFC700","#FFC600","#FFC500","#FFC400","#FFC300","#FFC200","#FFC100","#FFC000","#FFBF00","#FFBE00","#FFBD00","#FFBC00","#FFBB00","#FFBA00","#FFB900","#FFB800","#FFB700","#FFB600","#FFB500","#FFB400","#FFB300","#FFB200","#FFB100","#FFB000","#FFAF00","#FFAE00","#FFAD00","#FFAC00","#FFAB00","#FFAA00","#FFA900","#FFA800","#FFA700","#FFA600","#FFA500","#FFA400","#FFA300","#FFA200","#FFA100","#FFA000","#FF9F00","#FF9E00","#FF9D00","#FF9C00","#FF9B00","#FF9A00","#FF9900","#FF9800","#FF9700","#FF9600","#FF9500","#FF9400","#FF9300","#FF9200","#FF9100","#FF9000","#FF8F00","#FF8E00","#FF8D00","#FF8C00","#FF8B00","#FF8A00","#FF8900","#FF8800","#FF8700","#FF8600","#FF8500","#FF8400","#FF8300","#FF8200","#FF8100","#FF8000","#FF8000","#FF7F00","#FF7E00","#FF7D00","#FF7C00","#FF7B00","#FF7A00","#FF7900","#FF7800","#FF7700","#FF7600","#FF7500","#FF7400","#FF7300","#FF7200","#FF7100","#FF7000","#FF6F00","#FF6E00","#FF6D00","#FF6C00","#FF6B00","#FF6A00","#FF6900","#FF6800","#FF6700","#FF6600","#FF6500","#FF6400","#FF6300","#FF6200","#FF6100","#FF6000","#FF5F00","#FF5E00","#FF5D00","#FF5C00","#FF5B00","#FF5A00","#FF5900","#FF5800","#FF5700","#FF5600","#FF5500","#FF5400","#FF5300","#FF5200","#FF5100","#FF5000","#FF4F00","#FF4E00","#FF4D00","#FF4C00","#FF4B00","#FF4A00","#FF4900","#FF4800","#FF4700","#FF4600","#FF4500","#FF4400","#FF4300","#FF4200","#FF4100","#FF4000","#FF3F00","#FF3E00","#FF3D00","#FF3C00","#FF3B00","#FF3A00","#FF3900","#FF3800","#FF3700","#FF3600","#FF3500","#FF3400","#FF3300","#FF3200","#FF3100","#FF3000","#FF2F00","#FF2E00","#FF2D00","#FF2C00","#FF2B00","#FF2A00","#FF2900","#FF2800","#FF2700","#FF2600","#FF2500","#FF2400","#FF2300","#FF2200","#FF2100","#FF2000","#FF1F00","#FF1E00","#FF1D00","#FF1C00","#FF1B00","#FF1A00","#FF1900","#FF1800","#FF1700","#FF1600","#FF1500","#FF1400","#FF1300","#FF1200","#FF1100","#FF1000","#FF0F00","#FF0E00","#FF0D00","#FF0C00","#FF0B00","#FF0A00","#FF0900","#FF0800","#FF0700","#FF0600","#FF0500","#FF0400","#FF0300","#FF0200","#FF0100","#FF0000","#FE0000","#FD0000","#FC0000","#FB0000","#FA0000","#F90000","#F80000","#F70000","#F60000","#F50000","#F40000","#F30000","#F20000","#F10000","#F00000","#EF0000","#EE0000","#ED0000","#EC0000","#EB0000","#EA0000","#E90000","#E80000","#E70000","#E60000","#E50000","#E40000","#E30000","#E20000","#E10000","#E00000","#DF0000","#DE0000","#DD0000","#DC0000","#DB0000","#DA0000","#D90000","#D80000","#D70000","#D60000","#D50000","#D40000","#D30000","#D20000","#D10000","#D00000","#CF0000","#CE0000","#CD0000","#CC0000","#CB0000","#CA0000","#C90000","#C80000","#C70000","#C60000","#C50000","#C40000","#C30000","#C20000","#C10000","#C00000","#BF0000","#BE0000","#BD0000","#BC0000","#BB0000","#BA0000","#B90000","#B80000","#B70000","#B60000","#B50000","#B40000","#B30000","#B20000","#B10000","#B00000","#AF0000","#AE0000","#AD0000","#AC0000","#AB0000","#AA0000","#A90000","#A80000","#A70000","#A60000","#A50000","#A40000","#A30000","#A20000","#A10000","#A00000","#9F0000","#9E0000","#9D0000","#9C0000","#9B0000","#9A0000","#990000","#980000","#970000","#960000","#950000","#940000","#930000","#920000","#910000","#900000","#8F0000","#8E0000","#8D0000","#8C0000","#8B0000","#8A0000","#890000","#880000","#870000","#860000","#850000","#840000","#830000","#820000","#810000","#800000","#800000"])

.factory('$herlock', function() {
  return {
    link: function(nx, ny, vertices) {
      var a = [];
      
      for (var x = 0; x < nx; x++) {
        for (var y = x*ny; y < x*ny+ny - 1; y++) {
          if (!vertices[y]) {
            console.log(y);
          }
          a.push({from: y, to: y+1, color: vertices[y].color});
        }
      }
      
      for (var y = 0; y < ny; y++) {
        for (var x = 0; x < nx-1; x++) {
          if (!vertices[y + ny*x]) {
            console.log(y + ny*x);
          }
          a.push({from: y + ny*x, to: y + ny*(x+1), color: vertices[y + ny*x].color})
        }
      }
      
      return a;
    }
  };
})

.factory('$perlin', function() {
  return {
    noise: function(x, y, z) {
      function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
      function lerp( t, a, b) { return a + t * (b - a); }
      function grad(hash, x, y, z) {
        var h = hash & 15;                      // CONVERT LO 4 BITS OF HASH CODE
        var u = h<8 ? x : y,                 // INTO 12 GRADIENT DIRECTIONS.
               v = h<4 ? y : h==12||h==14 ? x : z;
        return ((h&1) == 0 ? u : -u) + ((h&2) == 0 ? v : -v);
      } 
      function scale(n) { return (1 + n)/2; }
      
      var p = new Array(512);
      var permutation = [ 151,160,137,91,90,15,
        131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
        190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
        88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
        77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
        102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,
        135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,
        5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
        223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,
        129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,
        251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,
        49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
        138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180
      ];
      
      for (var i=0; i < 256 ; i++) {
        p[256+i] = p[i] = permutation[i]; 
      }

      var X = Math.floor(x) & 255, Y = Math.floor(y) & 255, Z = Math.floor(z) & 255;
      
      x -= Math.floor(x);
      y -= Math.floor(y);
      z -= Math.floor(z);
      
      var u = fade(x), v = fade(y), w = fade(z);
      
      var A = p[X  ]+Y, AA = p[A]+Z, AB = p[A+1]+Z, B = p[X+1]+Y, BA = p[B]+Z, BB = p[B+1]+Z;

      return scale(
        lerp(
          w,
          lerp(
            v,
            lerp(u, grad(p[AA], x, y, z), grad(p[BA], x-1, y, z)),
            lerp(u, grad(p[AB], x, y-1, z), grad(p[BB], x-1, y-1, z))
          ), 
          lerp(
            v,
            lerp(u, grad(p[AA+1], x, y, z-1), grad(p[BA+1], x-1, y, z-1)),
            lerp(u, grad(p[AB+1], x, y-1, z-1), grad(p[BB+1], x-1, y-1, z-1))
          )
        )
      );
    }
  }
})

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
            context.lineWidth = +s.options.lineWidth || 1;
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
          var r = s.options.dotRadius || 2;
          
          s.coordinates.map(function(d) {
            context.fillStyle = d.color;
            context.fillRect(x(d.x) - r*.5, y(d.y) - r*.5, r, r);
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