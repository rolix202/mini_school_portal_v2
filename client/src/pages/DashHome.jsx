import React from 'react'
import Logo from "../assets/logo (1).svg";
import BeachImg from "../assets/beach-work.jpg"

const DashHome = () => {
    return (
        <div className="wrapper">

            <div className="flex bg-gray-100">
                <div className="px-8 py-12 max-w-md mx-auto sm:mx-w-xl lg:max-w-full lg:w-1/2 lg:py-24 lg:px-12">

                    <div className='xl:max-w-lg xl:mx-auto'>
                        <img className='h-10' src={Logo} alt="Logo" />
                        <img className='mt-6 rounded-lg shadow-xl sm:mt-8 sm:h-64 sm:w-full sm:object-cover sm:object-center lg:hidden' src={BeachImg} alt="Woman in beach" />

                        <h1 className='mt-6 text-2xl font-bold text-gray-900 leading-tight sm:text-4xl lg:text-3xl xl:text-4xl sm:mt-8'>You can work from anywhere. <br className='hidden lg:inline' /> <span className='text-indigo-500'>Take advantage of it</span> </h1>

                        <p className='mt-2 text-gray-600 sm:text-xl sm:mt-4'>Workation helps you find work-friendly rentals in beautiful locations so you can enjoy some nice weather even when you are not on vacation</p>

                        <div className="mt-4 sm:mt-6">
                            <a href="" className='btn btn-indigo sm:text-base shadow-lg'>Book your escape</a>
                            <a href="" className='ml-2 btn btn-gray sm:text-base'>Book your escape</a>
                        </div>
                    </div>

                </div>

                <div className='hidden lg:block lg:w-1/2 lg:relative'>
                    <img className='absolute inset-0 h-full w-full object-cover object-center' src={BeachImg} alt="Woman in beach" />
                </div>
            </div>




        </div>

    )
}

export default DashHome