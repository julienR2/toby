const userAgent =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'

const faviconRegex =
  /<head>[\s\S]*?rel=['"](?:shortcut )?icon['"].*?href=['"](?<favicon>[^?'"]+)[?'"][\s\S]*?<\/head>/gm
const titleRegex =
  /<head>[\s\S]*?<title>(?<title>.*?)<\/title>[\s\S]*?<\/head>/gm
const descriptionRegex =
  /<head>[\s\S]*?<meta.*?(name=['"]|property="og:)description['"].*?content=['"](?<description>.*?)['"][\s\S]*?<\/head>/gm

export const getPreview = async (url: string) => {
  console.log('url', url)
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'User-Agent': userAgent },
    })

    const html = await response.text()

    const favIconUrl = faviconRegex.exec(html)?.groups.favicon
    const title = titleRegex.exec(html)?.groups.title
    const description = descriptionRegex.exec(html)?.groups.description

    return {
      url,
      description,
      title,
      favIconUrl,
    }
  } catch (error) {
    return { url }
  }
}
