import { useRouter } from 'next/router'
import { useEffect } from 'react';
import ip from "../components/ip";
let count = 0;


export async function snapSend(router) {

    count++
    if(count == 1){

        let dataFetch = await fetch(`${ip}/home`)
        let displayName = await dataFetch.json();
        let { display } = displayName

        let canvas = document.querySelector('#canvas'); 
        let context = canvas.getContext('2d');
        let video = document.querySelector('#video');
        let description = document.querySelector('#textarea').value;
        let clicked = document.getElementById('#clicked');
        clicked.style.display = 'block'

        context.drawImage(video, 0, 0, 640, 480);
        let img64 = canvas.toDataURL();

        let data = {picture64: img64, author:display, desc:description};
        await fetch(`${ip}/submit`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
        }).then(() => {
            router.push('/home')
        });

    }
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

            <div id='#clicked' className='text-xl text-white text-bold w-80 mx-auto bg-green-500 border-2 border-slate-500 p-4 m-4 rounded-2xl hidden'>
                Clicked Your Memo!, <br />
                Please Wait a Litte!
            </div>

<div className="mx-auto rounded-xl p-4 bg-blue-500" >
    <video className="mx-auto rounded-xl " width='640' height='480' id="video"></video> 
</div>
        <canvas className="mx-auto hidden" width='640' height='480' id="canvas"></canvas> 

            <div className="p-8">
                <div className="text-xl">
                Description
                </div>
                <textarea placeholder='Share Details about your Memo!' id="textarea" cols="50" rows="2" className='border-[1px] p-4 border-black shadow-lg'></textarea>
            </div>

            <div className="bg-blue-500 w-24 m-auto text-white rounded-xl p-2" onClick={() => {snapSend(router)}}>
                SUBMIT!
            </div>

        </div>
    </>);
}

export default Upload;
