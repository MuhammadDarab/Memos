import Link from 'next/link'
import { useRouter } from 'next/router'

let ip = 'https://13da-103-57-168-179.ngrok.io'


const signup = () => {

    const router = useRouter();

    const SubmitHandler = async () => {

    let nameSignUp = document.querySelector('#NameSignUp')
    let emailSignUp = document.querySelector('#EmailSignUp')
    let passwordSignUp = document.querySelector('#PasswordSignUp')
    
    let flag = false;

    if(nameSignUp.value && emailSignUp.value && passwordSignUp.value){

        let data = {name:nameSignUp.value, email: emailSignUp.value, password: passwordSignUp.value};
        await fetch(`${ip}/signup`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
        }).then(response => {
        if(response.status === 200){
            console.log('Logging you in🎉')
            flag = true;
        }
        else{
            console.log('Server had an error, Sorry For inconvenience🛑')
        }
        });
    }
    else{
        console.log('Please fill the fields.')
        return false;
    }
    
    return flag;

    }
    
    return (

        <div>
            <h1 className="text-center text-blue-500 font-body p-8 text-3xl">
            Memos
            </h1>

            <div className='flex flex-col w-96 text-center mx-auto p-20 rounded-xl bg-gray-300 shadow-xl'>
        <div className="mx-auto w-auto ">
          <h1 className='text-3xl pb-4'>Display Name</h1>
            <input id="NameSignUp" placeholder='Enter Your Name' type="text" className='rounded-md text-center p-2 mb-8'/>
          <h1 className='text-3xl pb-4'>Email</h1>
            <input id="EmailSignUp" placeholder='Enter Your Email' type="text" className='rounded-md text-center p-2 mb-8'/>
          <h1 className='text-3xl pb-4'>Password</h1>
            <input id="PasswordSignUp" placeholder='Enter Your Password' type="password" className='rounded-md text-center p-2' />
        </div>
      </div>

      <div className="flex flex-row w-max mx-auto mt-6">
        <div className='bg-blue-500 shadow-lg shadow-blue-300 rounded-xl text-center font-bold text-white px-8 py-4 m-4 hover:scale-125 hover:transition-all transition-all' onClick={async () => {
            let value = await SubmitHandler();
            if(value)
            router.push('/')
        }} >
          Lets Get Started!
        </div>



        </div>
        </div>

    );
}
 
export default signup;