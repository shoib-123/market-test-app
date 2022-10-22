import loader from "../assets/loader.gif"
import "./main.css"

function Loader() {
  return (
    <div className="loaderContainer">
      <img src={loader} alt="Loading...." className="loader" />
    </div>
  )
}

export default Loader
