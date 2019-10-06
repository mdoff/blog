import React, { useState } from "react"
import PropTypes from "prop-types"

import CommentForm from "./comment-form"

const formatDate = date => new Date(date).toLocaleString()
const toSlug = path =>
  path
    .replace(/^\//, "")
    .replace(/\/$/, "")
    .replace(/\//g, "-")

const Comments = props => {
  const [localComments, setLocalComments] = useState([])
  const slug = toSlug(props.location.pathname)

  const comments = [...props.comments, ...localComments]
  return (
    <>
      <h3>Comments:</h3>
      {comments.map((comment, index) => (
        <div
          key={`comment-${comment.id}`}
          style={{
            marginBottom: "16px",
            padding: "8px",
            background: index % 2 ? "#FFFFFF" : "#FAFAFA",
          }}
        >
          <div style={{ marginBottom: "8px" }}>
            <span style={{ fontWeight: "bold" }}>{comment.name}</span>{" "}
            <span style={{ fontStyle: "italic" }}>
              ({formatDate(comment.created_at)})
            </span>
          </div>
          <div>{comment.comment}</div>
        </div>
      ))}
      <CommentForm
        slug={slug}
        addLocalComment={comment =>
          setLocalComments([...localComments, comment])
        }
      />
    </>
  )
}

export default Comments

Comments.propTypes = {
  location: PropTypes.shape({
    href: PropTypes.string,
    location: PropTypes.string,
  }).isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      slug: PropTypes.string,
      comment: PropTypes.string,
      created_at: PropTypes.string,
    })
  ),
}
