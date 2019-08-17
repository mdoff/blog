import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const Comments = props => {
  const {
    site: {
      siteMetadata: { discusShortName },
    },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            discusShortName
          }
        }
      }
    `
  )

  return (
    <>
      <Helmet>
        <script type="text/javascript">
          {`
        var disqus_config = function () {
        this.page.url = '${props.location.href}';
        this.page.identifier = '${props.location.pathname}';
        };
        (function() {
        var d = document, s = d.createElement('script');
        s.src = 'https://${discusShortName}.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
        })();`}
        </script>
      </Helmet>
      <div id="disqus_thread"></div>
    </>
  )
}

export default Comments

Comments.propTypes = {
  location: PropTypes.shape({
    href: PropTypes.string,
    location: PropTypes.string,
  }).isRequired,
}
