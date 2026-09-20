export default defineEventHandler(async (event) => {
  const pages = await queryCollection(event, 'content')
    .where('extension', '=', 'md')
    .all()

  return pages.map(page => ({
    loc: page.path,
  }))
})