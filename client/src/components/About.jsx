import { useGSAP } from '@gsap/react'
import React from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import AnimatedTitle from './AnimatedTitle'

gsap.registerPlugin(ScrollTrigger)

const About = () => {

    useGSAP( () => {
        const clipAnimation =gsap.timeline({
            scrollTrigger: {
                trigger: '#clip',
                start: 'center center',
                end: '+=800 center', //triggers end after scroll passes 800px from the center
                scrub: 0.5, // how are we moving through the animation on scroll
                pin: true,
                pinSpacing: true,
            }
        })

        clipAnimation.to('.mask-clip-path', {
            width: '100vw',
            height: '100vh',
            borderRadius: 0,
        })
    } )

  return (
    <div id='about' className='min-h-screen w-screen'>
        <div className='relative mb-8 my-36 flex flex-col items-center gap-5'>
            <h2 className='font-general text-sm uppercase md:text-[10px]'> Welcome to MatchPulse </h2>
           <AnimatedTitle title={"Disc<b>o</b>ver the world's<br /> l<b>a</b>rgest soccer Journey"} containerClass={"mt-5 !text-black text-center"}/>
            <div className='about-subtext display-inline'>
                <p>Your real soccer journey starts here — anticipate each game like a grand strategic play of passion and skill.</p>
                <p>Our platform unites fans globally, all driven by the love of the beautiful game and the spirit of competition.</p>
                <p>Together, let's celebrate the new era of soccer excitement.</p>
            </div>
        </div>
        <div className='h-dvh w-screen' id='clip'>
            <div className='mask-clip-path about-image'>
                <img src='img/AboutImg.png'
                alt='Background'
                className='absolute left-0 top-0 size-full object-cover'
                />
            </div>
        </div>
    </div>
  )
}

export default About