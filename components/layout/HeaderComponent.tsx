import React, { useState, useEffect } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { Icon } from '@iconify/react';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > window.innerHeight * 0.95) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Navbar isBordered={false} className="bg-transparent w-full fixed top-0 left-0 right-0 z-50">
            <NavbarBrand>
                <Link
                    href="/"
                    className={`font-bold text-inherit ${isScrolled ? 'text-black' : 'text-white'}`}
                >
                    <Icon icon="mdi:airplane" className="mr-2" />
                    PlanIt
                </Link>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link
                        color="foreground"
                        href="/discover"
                        className={`font - bold text-inherit ${isScrolled ? 'text-black' : 'text-white'}`}
                    >
                        <Icon icon="mdi:compass" className="mr-1" />
                        Discover
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link
                        color="foreground"
                        href="/book"
                        className={`font - bold text-inherit ${isScrolled ? 'text-black' : 'text-white'}`}
                    >
                        <Icon icon="mdi:book-open" className="mr-1" />
                        Book
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link
                        color="foreground"
                        href="/travel"
                        className={`font - bold text-inherit ${isScrolled ? 'text-black' : 'text-white'}`}
                    >
                        <Icon icon="mdi:airplane-takeoff" className="mr-1" />
                        Travel
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link
                        color="foreground"
                        href="/privilege-club"
                        className={`font - bold text-inherit ${isScrolled ? 'text-black' : 'text-white'}`}
                    >
                        <Icon icon="mdi:star" className="mr-1" />
                        Privilege Club
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Button
                        color="primary"
                        href="#" variant="flat"
                        className={`font - bold text-inherit ${isScrolled ? 'text-black' : 'text-white'}`}
                    >
                        <Icon icon="mdi:login" className="mr-1" />
                        Sign In
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};

export default Header;