import { useRouter } from "next/router";
import { useState } from "react";

let ip = 'https://13da-103-57-168-179.ngrok.io'

export const getStaticProps = async () => {

  let data = await fetch(`${ip}/home`)
  let displayName = await data.json();

  let values = await fetch(`${ip}/memos`)
  let memos = await values.json();

  return {

    props:{ displayName, memos }

  }

}

export default function home ({ displayName, memos }) {

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
            <div className="p-8">
              <div key={each._id} className="shadow-lg mx-auto w-[600px]">
                <div className="text-left p-8 drop-shadow-md">
                  <img src={each.picture64} className="mx-auto rounded-xl" />
                  <h1 className="text-2xl font-light">{each.desc}</h1>
                  <h4 className="text-slate-400">{each.author}</h4>
                </div>
                <div className="pb-14">
                </div>
              </div>
            </div>
            )

        })


      }


    </div>
  );

}