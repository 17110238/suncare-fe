import React from 'react'
import page404 from '../assets/json/404.json'
import Lottie from 'react-lottie-player'

export default function Page_404() {
    return (
        <div className="w-full h-screen flex -mt-10 justify-center">
            <div className="flex flex-col">
                <Lottie
                    loop
                    animationData={page404}
                    play
                    style={{ width: 600, height: 600 }}
                />
            </div>
        </div>
    )
}
