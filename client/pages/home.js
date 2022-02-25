import { useRouter } from "next/router";
import { useState } from "react";
import ip from "../components/ip";
import Image from 'next/image';

export const getServerSideProps = async () => {

  let data = await fetch(`${ip}/home`)
  let displayName = await data.json();

  let values = await fetch(`${ip}/memos`)
  let memos = await values.json();

  return {

    props:{ displayName, memos }

  }

}

export default function Home ({ displayName, memos }) {

  let { display } = displayName
  const router = useRouter();

  return (
    <div>

      <h1 className="text-center bg-white text-blue-500 font-bold pt-8 text-3xl">
        Memos
      </h1>
      <h3 className="text-center text-black font-light p-2 text-xl">Welcome Back {display}!</h3>

      <div className="text-center bg-white text-gray-700 font-bold p-8 text-3xl">
        Fresh New Memos Will Display Here 🎉🔥
      </div>

      <div className="rounded-full text-white bg-blue-500 p-2 text-center w-[88px] m-auto" onClick={() => {
        router.push('/upload')
      }}>
        POST!
      </div>

      {
        memos.map(each => {

          return(
            <div key={each._id} className="p-8">
              <div className="shadow-lg mx-auto w-[600px]">
                <div className="text-left p-8 drop-shadow-md object-cover">
                  <div>
                  <Image src={each.picture64} width={640} height={480} />
                  </div>
                  <h1 className="text-2xl font-light">{each.desc}</h1>
                  <h4 className="text-slate-400">{each.author}</h4>
                  <h5 className="text-slate-300">{each.createdAt}</h5>
                </div>
                  <div className="flex flex-row pb-14 pl-8">

                      <img src="https://freepikpsd.com/file/2019/10/delete-icon-png-red-5-Transparent-Images.png" alt="Delete!" className="h-auto w-12 hover:scale-150 transition-all hover:transition-all" onClick={() => {
                        DeleteElem(each._id)
                      }} />

                      <img src="Edit.png" alt="Edit!" className="h-auto w-12 hover:opacity-100 opacity-100 hover:scale-150 transition-all hover:transition-all" onClick={() => {
                        openModal(each._id)
                      }} />

                  </div>
              
          <div id="modal" className="text-center absolute p-20 top-1/4 left-1/3 hidden z-10 rounded-2xl bg-gray-200">
            <div className="text-2xl ml-96 w-12 text-center rounded-full bg-red-600 text-white cursor-pointer" onClick={closeModal}>X</div>
          <div className="text-center ">Description: <input type="text" id="update" /></div>
          <h4 className="mt-4 text-gray-400 text-center ">Updated At {TimeCalc()}</h4>
          <button className="bg-blue-500 shadow-lg shadow-blue-300 rounded-xl font-bold text-white px-8 py-4 hover:scale-125 hover:transition-all transition-all mt-8 cursor-pointer" onClick={() => {
              ConfirmElem(each._id, each.desc, router)
            }}>
              Submit
              </button>

            </div>

              </div>
            </div>
            )

        })


      }


    </div>
  );

}

async function DeleteElem(id) {

  let delReq = await fetch(`${ip}/memos/${id}`, {
    method: 'DELETE'
  })

  console.log('delReq has been send')

}

async function openModal(id) {

  let modal = document.querySelector("#modal");
  modal.style.display = 'inline'
  modal.style.position = 'fixed'

}

async function ConfirmElem(id, toBeChanged, router) {

  console.log("req not send Yet!");
  let update = document.querySelector("#update")
  let data = {toChange: update.value, toBeChanged };
  closeModal();
  router.push('/home')
  let sendUpdate = await fetch(`${ip}/memos/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  })

}

function TimeCalc() {

  let currentdate = new Date(); 
  let datetime = currentdate.getHours() + ":"  
  + currentdate.getMinutes() + ", " + currentdate.getDate() + "/"
  + (currentdate.getMonth()+1)  + "/" 
  + currentdate.getFullYear()  

  return datetime;

}

function closeModal() {

  let modal = document.querySelector("#modal");
  modal.style.display = 'none'

}