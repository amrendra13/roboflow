import { useRef, useState } from "react";
import './App.css';
import axios from "axios";

function App() {

  const [result, setResult] = useState("");
  const [uploadedImgSrc, setUploadedImgSrc] = useState("");
  const inputRef = useRef();
  const map = new Map([["PMAY-Logo", "FULL HOUSE"], ["Class2", "HALF HOUSE"]]);
  const callApi = async () => {

    const file = inputRef.current.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      axios({
        method: "POST",
        url: "https://detect.roboflow.com/model/version",
        params: {
            api_key: ""
        },
        data: reader.result,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(function(response) {
        let predictions = response.data["predictions"];
        for (let i = 0; i < predictions.length; i ++) {
          if (map.has(predictions[i]["class"]) === true) {
            setResult(map.get(predictions[i]["class"]));
          }
        }
        setUploadedImgSrc(URL.createObjectURL(file));
      })
      .catch(function(error) {
        console.log(error.message);
      });
    };
    reader.readAsDataURL(file);
  }


  return (
    <div className="App">
      <input ref = {inputRef} type="file"></input>
      <br></br>
      <button onClick={callApi}>Submit</button>
      <br></br>
      <h2>{result}</h2>
      <img src={uploadedImgSrc} alt="imge"></img>
    </div>
  );
}

export default App;
