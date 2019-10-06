import React from "react"

const Loader = () => {
  console.log("loader")
  return (
    <div style={{ display: "flex", justifyContent: "center", height: "120px" }}>
      <img alt="loader" src="/loader.svg" />
    </div>
  )
}

export default Loader
