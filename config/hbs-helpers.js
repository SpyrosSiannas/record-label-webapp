const _ = require('underscore');

module.exports = {
    times: function(n, block) {
        var accum = '';
        for(var i = 0; i < n; ++i)
            accum += block.fn(i);
        return accum;
    },

    everyNth: function(context, every, options) {
        var fn = options.fn, inverse = options.inverse;
        var ret = "";
        if(context && context.length > 0) {
            for(var i=0, j=context.length; i<j; i++) {
            var modZero = i % every === 0;
            ret = ret + fn(_.extend({}, context[i], {
                isModZero: modZero,
                isModZeroNotFirst: modZero && i > 0,
                isLast: i === context.length - 1
            }));
            }
        } else {
            ret = inverse(this);
        }
        return ret;
    },

    if_even: function(conditional, options) {
        if((conditional % 2) == 0) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    },

    is_defined : function (value) {
        return value !== undefined;
    },

    not_null : function (value) {
        return value !== null;
    },

    equals : function (value, check) {
        return value == check;
    }
}
