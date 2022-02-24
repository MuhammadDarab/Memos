import { useRouter } from 'next/router'
import { useEffect } from 'react';

let ip = 'http://localhost:8080'

export async function snapSend(router) {

    let dataFetch = await fetch(`${ip}/home`)
    let displayName = await dataFetch.json();
    let { display } = displayName

    let canvas = document.querySelector('#canvas'); 
    let context = canvas.getContext('2d');
    let video = document.querySelector('#video');
    let description = document.querySelector('#textarea').value;
    
    context.drawImage(video, 0, 0, 640, 480);
    let img64 = canvas.toDataURL();

    console.log(img64)

    let data = {picture64: img64, author:display, desc:description};
    await fetch(`${ip}/submit`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }).then(() => {
        router.push('/home')
    });

}

const Upload = () => {

    const router = useRouter();

    useEffect(() => {
        
        let constraints = { audio: false, video:true }
        navigator.mediaDevices.getUserMedia(constraints).then((ms) => {
            let canvas = document.querySelector('video');
            canvas.srcObject = ms;
            canvas.play(); 
        })

    })


    return (<>
    
        <title> Memos | Feed </title>
        <div className="text-center ">
            
            <div className="text-3xl p-8 font-bold text-gray-700">
                Capture a Memo!
            </div>

<div className="mx-auto rounded-xl p-4 bg-blue-500" >
    <video className="mx-auto rounded-xl " width='640' height='480' id="video"></video> 
</div>
        <canvas className="mx-auto hidden" width='640' height='480' id="canvas"></canvas> 

            <div className="p-8">
                <div className="text-xl">
                Description
                </div>
                <textarea id="textarea" cols="50" rows="2"></textarea>
            </div>

            <div className="bg-blue-500 w-24 m-auto text-white rounded-xl p-2" onClick={() => {snapSend(router)}}>
                SUBMIT!
            </div>

        </div>
    </>);
}

export default Upload;
