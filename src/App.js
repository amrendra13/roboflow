import { useRef, useState } from "react";
import './App.css';
import axios from "axios";

function App() {

  const [result, setResult] = useState("");
  const [uploadedImgSrc, setUploadedImgSrc] = useState("");
  const inputRef = useRef();
  
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
        setResult(response.data);
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
      <div>{JSON.stringify(result)}</div>
      <img src={uploadedImgSrc} alt="imge"></img>
    </div>
  );
}

export default App;
