import React, { useState } from 'react'
import PropTypes from 'prop-types'
import blogs from '../services/blogs'


const BlogForm = ({ createBlog }) => {


    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')
    
    

    const handleTitleChange = (event) => {
        setNewTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setNewAuthor(event.target.value)
    }

    const handleUrlChange = (event) => {
        setNewUrl(event.target.value)
    }

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl,
            likes: 0,
            user: blogs.user
        })


        setNewAuthor('')
        setNewTitle('')
        setNewUrl('')
    }

    return (
        <div>
            <h2>Add new Blog</h2>
            
            <form onSubmit={addBlog} >
                <div>
                    Title: <input id='title' value={newTitle}
                        onChange={handleTitleChange} />
                </div>
                <div>
                    Author: <input id='author' value={newAuthor}
                        onChange={handleAuthorChange} />
                </div>
                <div>
                    Url: <input id='url' value={newUrl}
                        onChange={handleUrlChange} />
                </div>
                <div>
                    <button id='createblogbutton' type="submit">create</button>
                </div>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}
export default BlogForm