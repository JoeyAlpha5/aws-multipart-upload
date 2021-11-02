import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client, S3 } from "@aws-sdk/client-s3";

function App() {
  const [file,setFile] = useState();
  function fileChange(e){
    var file = e.target.files[0];
    // console.log(e.target.files[0])

    const target = { Bucket:"", Key:file.name, Body:file};
    const creds = {accessKeyId: "",secretAccessKey:""};
    try {
      const parallelUploads3 = new Upload({
        client: new S3Client({region:"us-east-1",credentials:creds}),
        leavePartsOnError: false, // optional manually handle dropped parts
        params: target,
      });

      parallelUploads3.on("httpUploadProgress", (progress) => {
        console.log(progress);
      });

      parallelUploads3.done();
    } catch (e) {
      console.log(e);
    }




  }
  return (
    <div>
      <input type="file" id="file" onChange={fileChange}/>  
    </div>
  );
}

export default App;
