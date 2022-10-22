import { useEffect, useState } from "react"
import axios from "axios"

function useFetch(api) {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (api) {
      axios
        .get(api)
        .then((data) => {
          setLoading(false)
          setData(data?.data)
        })
        .catch((error) => {
          setLoading(false)
          console.log(error)
        })
    }
  }, [api])

  return [data, loading]
}

export default useFetch
