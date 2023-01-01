const fetch = require("node-fetch-commonjs")

const generateSlug = path =>
  path
    .replace(/^\//, "")
    .replace(/\/$/, "")
    .replace(/\//g, "-")

exports.onCreatePage = ({ page, actions }, { url }) => {
  const slug = generateSlug(page.path)
  if (!slug.length) {
    return
  }
  fetch(`${url}/comments/${slug}`)
    .then(response => response.json())
    .then(({ data, success }) => {
      if (!success) {
        return
      }
      actions.deletePage(page)
      actions.createPage({
        ...page,
        context: {
          ...page.context,
          comments: data,
        },
      })
    })
}
