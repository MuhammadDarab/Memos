import styles from '../styles/Home.module.css'

export default function Home() {

  const LogInHandler = async () => {

    let credinals = "https://localhost:8080/credinals"
    let email = document.querySelector('#Email')
    let password = document.querySelector('#Password')
    if(email.value && password.value){
      // Data will now send POST request to Server, which will save data in MongoDB base.

      let data = {email: email.value, password: password.value};
      await fetch("http://localhost:8080/credinals", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      }).then(response => {
        if(response.status === 200)
          console.log('Logging you in🎉')
        else
          console.log('Invalid Credinals!❌, Retry Please!')

      });
      return true;
    }

    console.log('Invalid Credinals! Please Try Again.')
    return false;

  }

  const SignUpHandler = () => {

  }


  return (<div>
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
            <input id="Password" placeholder='Enter Your Password' type="text" className='rounded-md text-center p-2' />
        </div>
      </div>

      <div className="flex flex-row w-max mx-auto mt-6">
        <div className='bg-blue-500 shadow-lg shadow-blue-300 rounded-xl text-center font-bold text-white px-8 py-4 m-4 hover:scale-125 hover:transition-all transition-all' onClick={LogInHandler}>
          Log In
        </div>
        <div className='shadow-xl border-blue-300 rounded-xl text-center font-bold px-8 py-4 m-4 hover:scale-125 hover:transition-all transition-all' onClick={SignUpHandler}>
          Sign Up
        </div>
      </div>


    </div>
  )
}
