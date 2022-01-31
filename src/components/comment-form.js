import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Loader from "./loader"

const inputStyles = {
  padding: "4px 6px",
  width: "100%",
  borderRadius: "4px",
  border: "1px solid #afafaf",
}

const CommentForm = ({ slug, addLocalComment }) => {
  const {
    site: {
      siteMetadata: { commentsUrl },
    },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            commentsUrl
          }
        }
      }
    `
  )
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const [comment, setComment] = useState("")
  const formSubmit = e => {
    e.preventDefault()
    setLoading(true)
    fetch(`${commentsUrl}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug,
        name,
        comment,
      }),
    })
      .then(data => data.json())
      .then(comment => addLocalComment(comment))
      .finally(() => {
        setName("")
        setComment("")
        setLoading(false)
      })
  }
  return loading ? (
    <Loader />
  ) : (
    <form onSubmit={formSubmit}>
      <div>
        <label htmlFor="form-name">Name</label>
        <br />
        <input
          style={inputStyles}
          id="form-name"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Write your name"
        />
      </div>
      <div>
        <label htmlFor="form-comment">Comment</label>
        <br />
        <textarea
          style={inputStyles}
          id="form-comment"
          name="comment"
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Write your comment"
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default CommentForm
