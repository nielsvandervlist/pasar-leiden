import PostPreview from './post-preview'

export default function MoreStories({ posts }) {
  return (
    <div>
      <h2 className="text-2xl lg:text-5xl font-semibold tracking-wider mb-12">
        Wat is er te doen?
      </h2>
      <div className="lg:grid grid-cols-12 gap-10 auto-rows-[minmax(0,_2fr)]">
        {posts.map(({ node }) => (
          <PostPreview
            key={node.slug}
            title={node.title}
            coverImage={node.featuredImage}
            slug={node.slug}
            excerpt={node.excerpt}
          />
        ))}
      </div>
    </div>
  )
}
