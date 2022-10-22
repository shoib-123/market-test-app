import React, { useEffect, useState } from "react"
import { Table, Button } from "react-bootstrap"
import useFetch from "../hooks/use-fetch"
import { api } from "./api"
import Loader from "./loader"
import pagination from "../customFunctions/pagination"
import ErrorPage from "./errorPage"
import "./main.css"

function Main() {
  const [data, loading] = useFetch(api)
  const [dataArray, setdataArray] = useState([])
  const [message, setMessage] = useState(false)
  const [pages, setPages] = useState([])
  const [slicedArr, setSlicedArr] = useState(10)

  const handleSlice = (e) => {
    setSlicedArr(e * 10)
  }

  useEffect(() => {
    if (data && Object.keys(data).length > 1) {
      setdataArray(
        Object.keys(data["Time Series (5min)"]).slice(slicedArr - 10, slicedArr)
      )
      setPages(pagination(Object.keys(data["Time Series (5min)"])))
      localStorage.setItem("count", 45)
    } else if (data && Object.keys(data).length == 1) {
      setMessage(true)
    }
  }, [data, slicedArr])

  return (
    <>
      {loading && <Loader />}
      {message && <ErrorPage />}
      {dataArray && dataArray.length > 0 && (
        <>
          <Table className="table">
            <thead>
              <tr>
                <th>Date-Time</th>
                <th>Open</th>
                <th>High</th>
                <th>Low</th>
                <th>Close</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>
              {dataArray.map((values) => {
                return (
                  <tr>
                    <td>{values}</td>
                    {Object.values(data["Time Series (5min)"][values]).map(
                      (innerValues) => {
                        return <td>{innerValues}</td>
                      }
                    )}
                  </tr>
                )
              })}
            </tbody>
          </Table>
          <div className="paginationContainer">
            {pages &&
              pages.length > 0 &&
              pages.map((buttons) => {
                return (
                  <Button
                    variant="primary"
                    onClick={handleSlice.bind(this, +buttons)}
                  >
                    {buttons}
                  </Button>
                )
              })}
          </div>
        </>
      )}
    </>
  )
}

export default Main
