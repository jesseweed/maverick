// App.Location tests

describe('Locate.page', function(){
    it('should return the current page', function(){
        // expect(App.Location.page()).to.not.equal('');
        expect(App.Location.page()).not.toBe(null);
    })
});


describe('Locate Query', function(){
    it('should return a specific uri query', function(){
        expect(App.Location.query('test')).not.toBe(null);
    })
});


describe('Locate Path', function(){
    it('should return the current path', function(){
        expect(App.Location.path()).not.toBe(null);
    })
});