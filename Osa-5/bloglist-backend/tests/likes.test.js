const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const oneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }]

    const threeBlogs = [

        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'nimi',
            author: 'a',
            url: 'a.fi',
            likes: 25,
            __v: 0
        },

        {
            _id: '5a422aa676234d17f8',
            title: 'bnimi',
            author: 'b',
            url: 'b.fi',
            likes: 100,
            __v: 0
        },

        {
            _id: '5a422aa71b5417f8',
            title: 'cnimi',
            author: 'c',
            url: 'c.fi',
            likes: 1,
            __v: 0
        }
    ]

    const emptyBlogs = []


    test('one blog', () => {
        const result = listHelper.totalLikes(oneBlog)
        expect(result).toBe(5)

    })

    test('3 blogs', () => {
        const result = listHelper.totalLikes(threeBlogs)
        expect(result).toBe(126)
    })

    test('empty list is zero', () => {
        const result = listHelper.totalLikes(emptyBlogs)
        expect(result).toBe(0)
    })

})

describe('most likes', () => {
    const threeBlogs = [

        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'nimi',
            author: 'a',
            url: 'a.fi',
            likes: 25,
            __v: 0
        },

        {
            _id: '5a422aa676234d17f8',
            title: 'bnimi',
            author: 'b',
            url: 'b.fi',
            likes: 100,
            __v: 0
        },

        {
            _id: '5a422aa71b5417f8',
            title: 'cnimi',
            author: 'c',
            url: 'c.fi',
            likes: 1,
            __v: 0
        }
    ]

    test('blog with most likes', () => {
        const result = listHelper.favouriteBlog(threeBlogs)

        expect(result).toEqual(
            {
                _id: '5a422aa676234d17f8',
                title: 'bnimi',
                author: 'b',
                url: 'b.fi',
                likes: 100,
                __v: 0
            })
    })

})
