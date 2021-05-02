module.exports = {
    times: function(n, block) {
        var accum = '';
        for(var i = 0; i < n; ++i)
            accum += block.fn(i);
        return accum;
    },
    // Larer replace block with query result array
    even_fill : function(n, block) {
        var accum = '';
        for (var i=0; i<n; ++i){
            if((index % 2) == 0) {
                accum += block;
            } 
        }
        return accum;
    },
    // Same as even_fill
    odd_fill : function(n, block){
        for (var i=0; i<n; ++i){
            if((index % 2) != 0) {
                accum += block;
            } 
        }
        return accum;
    }
}