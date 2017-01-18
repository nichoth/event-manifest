var Event = require('../event')
var Manifest = require('../create-manifest')
var test = require('tape')

test('this is the interface more or less', function (t) {
    t.plan(1)
    var A = Event('a')
    var a = A('data')
    t.deepEqual([Event.type(a), Event.data(a)], ['a', 'data'],
        'should curry event type')
})

test('create manifest from object', function (t) {
    t.plan(1)
    var map = {
        categories: {
            update: function () {},
            del: function () {}
        },
        keywords: {
            update: function () {},
            delete: function () {}
        }
    }

    var expected = [
        ['categories', ['update', 'del']],
        ['keywords', ['update', 'delete']]
    ]

    var m = Manifest(map)
    t.deepEqual(m, expected, 'should create the manifest from object')
})
