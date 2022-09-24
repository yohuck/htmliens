import { Link, routes } from '@redwoodjs/router'

const Article = ({ article }) => {
  return (
    <article key={article.id}>
      <header>
        <h2>
          <Link to={routes.article({ id: article.id })}>{article.title}</Link>
        </h2>
      </header>
      <p>{article.body}</p>
      <div className="posted">
        <Link to={routes.article({ id: article.id })}>
          Posted at: {article.createdAt}
        </Link>
      </div>
    </article>
  )
}

export default Article
