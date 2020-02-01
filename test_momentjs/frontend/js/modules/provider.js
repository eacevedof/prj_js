lg("provider.js")

const get_async = async (url,post) => {

  const promise = await fetch(url,{
    method: "POST",
    body: post,
  })

  const data = await promise.json()
  return data
  
}

export default get_async