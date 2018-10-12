import React from 'react'

class Disqus extends React.Component {
  componentWillMount () {
    window.disqus_shortname = this.props.siteName
    const s = document.createElement('script'); s.async = true;
    s.type = 'text/javascript';
    s.src = 'https://' + window.disqus_shortname + '.disqus.com/count.js';
    (document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s);
  }
  componentDidMount () {
    const self = this
    /**
     *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
     *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables
     */
    window.disqus_config = function () {
      this.page.url = `${self.props.siteUrl}/${self.props.path}/`;  // Replace PAGE_URL with your page's canonical URL variable
      this.page.identifier = `/${self.props.path}/`; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };
    const d = document, s = d.createElement('script');
    s.src = `https://${self.props.siteName}.disqus.com/embed.js`;
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
  }
  render () {
    return (
      <div id="disqus_thread"></div>
    )
  }
}

export default Disqus
