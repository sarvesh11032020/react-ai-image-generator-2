import React, { useRef, useState } from 'react'
import './ImageGenerator.css'
import default_image from '../Assets/default_image.svg'

const ImageGenerator = () => {
    const [imgurl, setimgurl] = useState("/")
    let inputRef = useRef(null)
    const [loading, setloading] = useState(false)
    const API_KEY = process.env.REACT_APP_AAIG_API_KEY;
    console.log(process.env.REACT_APP_AAIG_API_KEY);

    const generateimage = async () => {
        if (inputRef.current.value === ""){
            return 0;
        }
        setloading(true)
        const response = await fetch("https://api.openai.com/v1/images/generations",
        {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                Authorization: "Bearer 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",
                "User-Agent": "Chrome"
            },
            body:JSON.stringify({
                prompt: `${inputRef.current.value}`,
                n:1,
                size: "512x512",
            }),
        });
        let data = await response.json();
        console.log(data);
        let data_array = data.data;
        setimgurl(data_array[0].url)
        setloading(false)
    }
  return (
    <div className='aig'>
        <div className='header'>
            AI-Image <span>Generator</span>
        </div>
        <div className='imgloading'>
            <div className='image'>
                <img src = {imgurl === "/" ? default_image : imgurl}></img>
            </div>
            <div className='loading'>
                <div className={loading ? "loadingbar-full":"loadingbar"}></div>
                <div className={loading ? "loadingtext" : "display-none"}>Loading</div>
            </div>
        </div>
        <div className='searchbox'>
            <input type = "text" ref = {inputRef} className='searchinput' placeholder='Please enter your prompt'></input>
            <div className='generatorbtn' onClick={() => {
                {generateimage()}
            }}>Generate</div>
        </div>
    </div>
  )
}

export default ImageGenerator