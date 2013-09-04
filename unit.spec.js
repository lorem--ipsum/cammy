describe('$nom', function() {
  beforeEach(module('nomnom'));
  
  describe('$herlock', function() {
    it('should link dots for a 3x2 grid', inject(function($herlock) {
      var vertices = [
        {color: "a"}, {color: "b"}, {color: "c"},
        {color: "d"}, {color: "e"}, {color: "f"}
      ];
      
      var expectedResult =[
        {from: 0, to: 1, color: "a"}, {from: 1, to: 2, color: "b"},
        {from: 3, to: 4, color: "d"}, {from: 4, to: 5, color: "e"},
        {from: 0, to: 3, color: "a"}, {from: 1, to: 4, color: "b"}, {from: 2, to: 5, color: "c"}
      ];
      
      expect($herlock.link(2, 3, vertices)).toEqual(expectedResult);
    }));
    
    it('should link dots for a 3x3 grid', inject(function($herlock) {
      var vertices = [
        {color: "a"}, {color: "b"}, {color: "c"},
        {color: "d"}, {color: "e"}, {color: "f"},
        {color: "g"}, {color: "h"}, {color: "i"}
      ];
      
      var expectedResult =[
        { from: 0, to: 1, color: 'a' },
        { from: 1, to: 2, color: 'b' },
        { from: 3, to: 4, color: 'd' },
        { from: 4, to: 5, color: 'e' },
        { from: 6, to: 7, color: 'g' },
        { from: 7, to: 8, color: 'h' },
        { from: 0, to: 3, color: 'a' },
        { from: 3, to: 6, color: 'd' },
        { from: 1, to: 4, color: 'b' },
        { from: 4, to: 7, color: 'e' },
        { from: 2, to: 5, color: 'c' },
        { from: 5, to: 8, color: 'f' }
      ]
      
      expect($herlock.link(3, 3, vertices)).toEqual(expectedResult);
    }));
    
    it('should link dots for a 5x5 grid', inject(function($herlock) {
      var vertices = [
        {color: "a"}, {color: "b"}, {color: "c"}, {color: "0"}, {color: "5"},
        {color: "d"}, {color: "e"}, {color: "f"}, {color: "1"}, {color: "6"},
        {color: "g"}, {color: "h"}, {color: "i"}, {color: "2"}, {color: "7"},
        {color: "j"}, {color: "k"}, {color: "l"}, {color: "3"}, {color: "8"},
        {color: "m"}, {color: "n"}, {color: "o"}, {color: "4"}, {color: "9"}
      ];
      
      var expectedResult = [
        {from: 0, to: 1},
        {from: 1, to: 2},
        {from: 2, to: 3},
        {from: 3, to: 4},

        {from: 5, to: 6},
        {from: 6, to: 7},
        {from: 7, to: 8},
        {from: 8, to: 9},

        {from: 10, to: 11},
        {from: 11, to: 12},
        {from: 12, to: 13},
        {from: 13, to: 14},

        {from: 15, to: 16},
        {from: 16, to: 17},
        {from: 17, to: 18},
        {from: 18, to: 19},

        {from: 20, to: 21},
        {from: 21, to: 22},
        {from: 22, to: 23},
        {from: 23, to: 24},



        {from: 0, to: 5},
        {from: 5, to: 10},
        {from: 10, to: 15},
        {from: 15, to: 20},

        {from: 1, to: 6},
        {from: 6, to: 11},
        {from: 11, to: 16},
        {from: 16, to: 21},

        {from: 2, to: 7},
        {from: 7, to: 12},
        {from: 12, to: 17},
        {from: 17, to: 22},

        {from: 3, to: 8},
        {from: 8, to: 13},
        {from: 13, to: 18},
        {from: 18, to: 23},

        {from: 4, to: 9},
        {from: 9, to: 14},
        {from: 14, to: 19},
        {from: 19, to: 24}
      ];
      
      expect($herlock.link(5, 5, vertices)).toEqual(expectedResult);
    }));

    it('should work with 50x50 vertices', inject(function($herlock) {
      var v = [];
      for (var i = 0 ; i< 2500; i++) {
        v.push({color: i})
      }
      
      $herlock.link(50, 50, v);
    }))
  
  });
  
  describe('unit behavior', function() {
    it('should detect an invalid expression', inject(function($n) {
      expect(function() {$n.om(12, 'toto');}).toThrow();
      
      // If the first expression is true, the next is never evaluated.
      // This should be changed.
      expect(function() {$n.om(12, '11').or(78);}).toThrow();
    }));
    
    it('should detect an inside value', inject(function($n) {
      expect($n.om(12, ']10,15[')()).toBeTruthy();
    }));
    
    it('should treat a single value as an equality', inject(function($n) {
      expect($n.om(12, '12')()).toBeTruthy();
      expect($n.om(12, '11')()).toBeFalsy();
    }));
    
    it('should detect an outside value', inject(function($n) {
      expect($n.om(18, ']10,15[')()).toBeFalsy();
    }));
    
    it('should detect a border value', inject(function($n) {
      expect($n.om(15, ']10,15]')()).toBeTruthy();
    }));
  })
  
  describe('OR chaining', function() {
    it('should handle new expression', inject(function($n) {
      expect($n.om(27, ']10,15]').or('[24,42[')()).toBeTruthy();
      expect($n.om(27, ']10,15]').or('[24,25[')()).toBeFalsy();
      
      expect($n.om(27, ']10,15]').or('[24,42[').or('[0,10]')).toBeTruthy();
      
      expect($n.om(180, '[0,10]').or('[170,190]')()).toBeTruthy();
      expect($n.om(180, '[0,10]').or('[170,190]').or('[350,360]')()).toBeTruthy();
    }));
    
    it('should handle new value and new expression', inject(function($n) {
      expect($n.om(27,']10,15]').or('[28,42[').or(9,'[0,10]')).toBeTruthy();
    }));
  });
  
  describe('AND chaining', function() {
    it('should handle new expression', inject(function($n) {
      expect($n.om(12, ']10,15]').and('[9,42[')()).toBeTruthy();
      expect($n.om(12, ']10,15]').and('[9,42[').and('[0,100]')()).toBeTruthy();
      expect($n.om(12, ']10,15]').and('[9,42[').and('[90,100]')()).toBeFalsy();
    }));
    
    it('should handle new value and new expression', inject(function($n) {
      expect($n.om(12,']10,15]').and('[0,42[').and(9,'[0,10]')).toBeTruthy();
    }));
  });
  
  
  it('should throw an error when mixing operators', inject(function($n) {
    expect(function() {
      $n.om(12, ']10,15]').and('[9,42[').or('[0,100]')()
    }).toThrow();
    
    expect(function() {
      $n.om(12, ']10,15]').or('[9,42[').and('[0,100]')()
    }).toThrow();
  }));
})
