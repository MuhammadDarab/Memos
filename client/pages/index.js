import { useRouter } from 'next/router'
import ip from "../components/ip";

function err(res){

  if(res === "OK"){
    errBox.style.opacity = '0'
  }
  else{
    let errbox = document.querySelector('#errBox');
    errbox.innerText = res;
    errbox.style.opacity = '1'
  }

}

export default function Home() {

  const router = useRouter();
  let resp = 'UNCHANGED';
  
  const LogInHandler = async () => {

    let email = document.querySelector('#Email')
    let password = document.querySelector('#Password')
    
    let flag = false;

    if(email.value && password.value){

      let data = {email: email.value, password: password.value};
      await fetch(`${ip}/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      }).then( async (response) => {

        if(response.status === 200){
          console.log('Logging you in🎉')
          flag = true;
          err("OK");
        }
        else if(response.status === 401){
          console.log('Password Mismatch⛔, Retry Please!')
          err('Password Mismatch⛔, Retry Please!');
        }
        else if(response.status === 404){
          console.log('Email Not found❌, Try Again!')
          err('Email Not found❌, Try Again!');
        }
        else{
          console.log('Server had an error, Sorry For inconvenience🛑')
          err('Server had an error, Sorry For inconvenience🛑');
        }

        resp = await response.json();
        console.log(resp);

      });
    }
    else{
      console.log('Please fill the fields.')
      return false;
    }
  
    return [flag, resp.display];

  }

  return (<div className='flex flex-col mx-auto'>

    <title> Login To Memo! </title>

      <div className='text-center self-center mx-auto'>

      <h1 className="text-center text-blue-500 font-body p-8 text-3xl">
        Memos
      </h1>
      <h2 className="text-center font-body p-2 text-3xl font-bold">
        Sign Up Today.
      </h2>
      <h2 className="text-center font-body mb-8 text-xl font-light">
        Free as always
      </h2>

      <div className='flex flex-col w-96 text-center mx-auto p-20 rounded-xl bg-gray-300 shadow-xl'>
        <div className="mx-auto w-auto ">
          <h1 className='text-3xl pb-4'>Email</h1>
            <input id="Email" placeholder='Enter Your Email' type="text" className='rounded-md text-center p-2 mb-8'/>
          <h1 className='text-3xl pb-4'>Password</h1>
            <input id="Password" placeholder='Enter Your Password' type="password" className='rounded-md text-center p-2' />
        </div>
      </div>

      <div className="flex flex-row w-max mx-auto mt-6">
        <div className='bg-blue-500 shadow-lg shadow-blue-300 rounded-xl text-center font-bold text-white px-8 py-4 m-4 hover:scale-125 hover:transition-all transition-all' onClick={ async () => {
            
            let value = await LogInHandler();
            console.log(value[1])
            if(value[0]){
              router.push(`/home`)
            }
          
          }}>
          Log In
        </div>
        <div className='shadow-xl border-blue-300 rounded-xl text-center font-bold px-8 py-4 m-4 hover:scale-125 hover:transition-all transition-all' onClick={() => router.push('/signup')}>
          Sign Up
        </div>
      </div>

      <div id='errBox' className='opacity-0 hover:transition-all transition-all  rounded-xl text-xl text-center font-bold w-96 mx-auto p-8 bg-red-400 border-[1px] border-slate-500 text-white'>
      </div>

      </div>

    </div>
  )
}
