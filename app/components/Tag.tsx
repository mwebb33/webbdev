import { Link } from "@remix-run/react";
import kebabCase from '@/utils/kebabCase'

const Tag = ({ text }) => {
  return (
    <Link to={`/tags/${kebabCase(text)}`}>
      <a className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
        {text.split(' ').join('-')}
      </a>
    </Link>
  )
}

export default Tag
