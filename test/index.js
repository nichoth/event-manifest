var Event = require('../event')
var test = require('tape')

test('this is the interface more or less', function (t) {
    t.plan(1)
    var A = Event('a')
    var a = A('data')
    t.deepEqual([Event.type(a), Event.data(a)], ['a', 'data'],
        'should curry event type')
})

