import { VFC } from "react";

const ArticleLdJson: VFC<{ post: Post }> = ({ post }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: `{
          "@context": "http://schema.org",
          "@type": "Article",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "${post.url}/"
          },
          "headline": "${post.title}",
          "image": {
            "@type": "ImageObject",
            "url": "${post.image}",
            "height": 670,
            "width": 1280
          },
          "datePublished": "${new Date(post.createdAt).toISOString()}",
          "dateModified": "${new Date(post.updatedAt).toISOString()}",
          "author": {
            "@type": "Person",
            "name": "${post.author.name}",
            "url": "https://tomoyukikashiro.me"
          },
          "description": "${post.summary}",
          "publisher": {
            "@type": "Organization",
            "name": "Tomoyuki Kashiro's Blog"
          }
        }`,
    }}
  ></script>
);

export default ArticleLdJson;
