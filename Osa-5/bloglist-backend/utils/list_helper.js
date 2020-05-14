const dummy = (blogs) => {
    return (1)
}

const totalLikes = (blogs) => {
    var likes = 0;
    blogs.forEach(element => {
        likes += element.likes
    })

    return (
        likes
    )
}

const favouriteBlog = (blogs) => {
    var favourite = {}
    var max = 0;

    blogs.forEach(blog => {
        if (max < blog.likes) {
            max = blog.likes
            favourite = blog
        }
    })
    return (
        favourite
    )

}


module.exports = {
    dummy,
    totalLikes,
    favouriteBlog

}