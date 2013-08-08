describe('$nom', function() {
  beforeEach(module('nomnom'));
  
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
