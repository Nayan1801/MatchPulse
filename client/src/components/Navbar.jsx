import React, { useRef, useEffect, useState } from 'react';
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useWindowScroll } from 'react-use';
import gsap from 'gsap';

const navItems = ['Home', 'About Us', 'Contact Us'];

const Navbar = () => {
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isIndicatorActive, setIsIndicatorActive] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navContainerRef = useRef(null);
    const audioElementRef = useRef(null);
    const dropdownRef = useRef(null);
    const logoRef = useRef(null);
    const { y: currentScrollY } = useWindowScroll();
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        if (currentScrollY === 0) {
            setIsNavVisible(true);
            navContainerRef.current.classList.remove("floating-nav");
        } else if (currentScrollY > lastScrollY) {
            setIsNavVisible(false);
            navContainerRef.current.classList.add("floating-nav");
        } else if (currentScrollY < lastScrollY) {
            setIsNavVisible(true);
            navContainerRef.current.classList.add("floating-nav");
        }
        setLastScrollY(currentScrollY);
    }, [currentScrollY, lastScrollY]);

    useEffect(() => {
        gsap.to(navContainerRef.current, {
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            duration: 0.25,
            ease: 'power3.out'
        });
    }, [isNavVisible]);

    const toggleAudioIndicator = () => {
        setIsAudioPlaying((prev) => !prev);
        setIsIndicatorActive((prev) => !prev);
    };

    useEffect(() => {
        if (isAudioPlaying) {
            audioElementRef.current.play();
        } else {
            audioElementRef.current.pause();
        }
    }, [isAudioPlaying]);

    const handleLogoClick = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    // Close dropdown if clicking outside or on a nav item
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current && 
                !dropdownRef.current.contains(event.target) &&
                logoRef.current &&
                !logoRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }
        }
        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    // Handle click on nav item in dropdown to close it
    const handleDropdownItemClick = () => {
        setIsDropdownOpen(false);
    };

    return (
        <>
        <style>{`
            .nav-container {
                /* common styling */
                transition: transform 0.25s ease, opacity 0.25s ease;
            }
            .dropdown-menu {
                position: absolute;
                top: 60px;
                left: 0;
                right: 0;
                background: white;
                box-shadow: 0 10px 25px rgba(0,0,0,0.12);
                border-radius: 8px;
                padding: 8px 0;
                display: flex;
                flex-direction: column;
                max-width: 200px;
                margin: 0 auto;
                z-index: 50;
                transform-origin: top center;
                animation: dropdownScaleFadeIn 0.3s forwards;
                user-select: none;
            }
            .dropdown-menu a {
                padding: 10px 20px;
                color: #333;
                font-weight: 600;
                text-decoration: none;
                transition: background-color 0.2s, color 0.2s;
                cursor: pointer;
            }
            .dropdown-menu a:hover {
                background-color: #2563eb; /* Blue-600 */
                color: white;
            }
            @keyframes dropdownScaleFadeIn {
                from {
                    opacity: 0;
                    transform: scale(0.95);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            .nav-hover-btn {
                margin-left: 1rem;
                font-weight: 600;
                color: #1f2937; /* gray-800 */
                text-decoration: none;
                position: relative;
                cursor: pointer;
            }
            .nav-hover-btn::after {
                content: '';
                position: absolute;
                width: 0;
                height: 2px;
                bottom: -3px;
                left: 0;
                background-color: #3b82f6; /* blue-500 */
                transition: width 0.3s;
            }
            .nav-hover-btn:hover::after {
                width: 100%;
            }
            .indicator-line {
                width: 3px;
                height: 10px;
                margin: 0 1px;
                background: #2563eb;
                border-radius: 2px;
                opacity: 0.3;
                animation: indicatorAnimation 1s infinite;
            }
            .indicator-line.active {
                opacity: 1;
                animation-play-state: running;
            }
            @keyframes indicatorAnimation {
                0%, 100% {
                    transform: scaleY(1);
                    opacity: 0.3;
                }
                50% {
                    transform: scaleY(2);
                    opacity: 1;
                }
            }

            /* Responsive: hide nav items below md breakpoint */
            @media (max-width: 767px) {
                .desktop-nav-items {
                    display: none;
                }
            }
        `}</style>
        <div ref={navContainerRef} className='nav-container fixed inset-x-0 top-4 z-50 h-16 border-none sm:inset-x-6'>
            <header className='absolute top-1/2 w-full -translate-y-1/2'>
                <nav className='flex size-full items-center justify-between p-4 relative'>
                    <div className='flex items-center gap-6'>
                        <img
                            ref={logoRef}
                            src='/img/logo.png'
                            alt='logo'
                            className='w-12 h-12 rounded-full cursor-pointer select-none'
                            onClick={handleLogoClick}
                            aria-haspopup="true"
                            aria-expanded={isDropdownOpen}
                        />
                        <Button
                            id="product-button"
                            title="Products"
                            rightIcon={<TiLocationArrow />}
                            containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
                        />
                    </div>
                    <div className='flex h-full items-center'>
                        {/* Desktop nav items */}
                        <div className='desktop-nav-items md:flex hidden'>
                            {navItems.map((item, index) => (
                                <a key={index} href={`#${item.toLowerCase()}`} className='nav-hover-btn'>
                                    {item}
                                </a>
                            ))}
                        </div>
                        <button className='ml-10 flex items-center space-x-0.5 cursor-pointer' onClick={toggleAudioIndicator}>
                            <audio ref={audioElementRef} className='hidden' src='/audio/loop.mp3' loop />
                            {[1, 2, 3, 4].map((bar) => (
                                <div
                                    key={bar}
                                    className={`indicator-line ${isIndicatorActive ? 'active' : ''}`}
                                    style={{ animationDelay: `${bar * 0.1}s` }}
                                />
                            ))}
                        </button>
                    </div>
                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div ref={dropdownRef} className='dropdown-menu'>
                            {navItems.map((item, index) => (
                                <a
                                    key={index}
                                    href={`#${item.toLowerCase()}`}
                                    onClick={handleDropdownItemClick}
                                    tabIndex={0}
                                    role="menuitem"
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    )}
                </nav>
            </header>
        </div>
        </>
    );
};

export default Navbar;

