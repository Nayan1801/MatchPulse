import React from 'react'
import { FaDiscord, FaGithub, FaMailBulk, FaTwitch } from 'react-icons/fa'
import { FaX } from 'react-icons/fa6'

const links = [
   { href: 'https://github.com/Nayan1801/MatchPulse', icon: <FaGithub /> },
   { href: 'mailto:nayankathait@gmail.com', icon: <FaMailBulk /> },

]

const Footer = () => {
  return (
    <footer className='w-screen bg-violet-300 py-4 text-black'>
        <div className='container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row'>
            <p className='text-center text-sm md:text-left'>
                &copy; MatchPulse 2024. All rights reserved
            </p>

            <div className='flex justify-center gap-4 md:justify-start'>
                {links.map((link) => (
                    <a key={link} href={link.href} target='_blank' rel='noopener noreferrer' className='text-black transition-colors duration-500 ease-in-out hover:text-white'>
                        {link.icon}
                    </a>
                ) )}
            </div>

            <a href='#privacy-policy' className='text-center text-sm hover:underline md:text-right'> 
                Privacy Policy
            </a>
        </div>
    </footer>
  )
}

export default Footer