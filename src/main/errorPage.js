import React, { useEffect, useState } from "react"
import "./main.css"

function getValue() {
  if (localStorage.getItem("count") !== null) {
    return +localStorage.getItem("count")
  } else {
    return 45
  }
}

function ErrorPage() {
  const [count, setCount] = useState(getValue())
  const [button, showButton] = useState(false)

  useEffect(() => {
    let timer = setInterval(() => {
      setCount((count) => count - 1)
    }, [1000])
    return () => {
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    if (count > 0) {
      localStorage.setItem("count", count)
    } else {
      localStorage.setItem("count", 45)
      showButton(true)
    }
  }, [count])

  return (
    <div className="errorContainer">
      {button ? (
        <h2>You can now refresh the page to fetch data !!!</h2>
      ) : (
        <div>
          <h2 className="errorText">You have made too many API calls !!!</h2>
          <h5 className="errorText">{`Please wait for ${count} seconds`}</h5>
        </div>
      )}
    </div>
  )
}

export default ErrorPage
