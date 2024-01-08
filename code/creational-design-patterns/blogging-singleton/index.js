import { Blog } from './blog.js'

const main = async () => {
  const blog = new Blog()
  await blog.initialize()

  await blog.createPost(
    'blackspade',
    'In that old castle, there was a daemonic spider called "spaedarman".',
  )

  const posts = await blog.getAllPosts()
  console.log(`posts: ${JSON.stringify(posts)}`)
}

main()
