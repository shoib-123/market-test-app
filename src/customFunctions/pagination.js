export default function pagination(arr) {
  let pages = Math.ceil(arr.length / 10)
  let pagesArr = []
  for (let i = 1; i <= pages; i++) {
    pagesArr.push(i)
  }
  return pagesArr
}
