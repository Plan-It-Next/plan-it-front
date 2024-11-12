import React, { useState, useEffect } from 'react';
import { Icon } from "@iconify/react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
} from "@nextui-org/react";
import { useRouter } from 'next/router';
import HeaderSigninComponent from "./HeaderSigninComponent";

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const router = useRouter();
    const isLandingPage = router.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            if (!isLandingPage) {
                setIsScrolled(true);
                return;
            }

            if (window.scrollY > window.innerHeight * 0.95) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        // Initial check
        handleScroll();

        // Only add scroll listener on landing page
        if (isLandingPage) {
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, [isLandingPage]);

    const getTextColor = () => {
        if (!isLandingPage) return 'text-black';
        return isScrolled ? 'text-black' : 'text-white';
    };

    return (
        <Navbar
            isBordered={false}
            className="bg-transparent w-full fixed top-0 left-0 right-0 z-50"
        >
            <NavbarBrand>
                <Link
                    href="/public"
                    className={`font-bold text-inherit ${getTextColor()}`}
                >
                    PlanIt
                </Link>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link
                        color="foreground"
                        href="/discover"
                        className={`font-bold text-inherit ${getTextColor()} items-center`}
                    >
                        <Icon icon="mdi:compass-outline" className="mr-1"/>
                        Discover
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link
                        color="foreground"
                        href="/book"
                        className={`font-bold text-inherit ${getTextColor()} items-center`}
                    >
                        <Icon icon="mingcute:ticket-fill" className="mr-1"/>
                        Book
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link
                        color="foreground"
                        href="/travel"
                        className={`font-bold text-inherit ${getTextColor()} items-center`}
                    >
                        <Icon icon="gis:map-edit" className="mr-1"/>
                        Plan
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link
                        color="foreground"
                        href="/privilege-club"
                        className={`font-bold text-inherit ${getTextColor()} items-center`}
                    >
                        <Icon icon="mdi:star-four-points-circle-outline" className="mr-1"/>
                        Privilege Club
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <HeaderSigninComponent isScrolled={isScrolled} />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};

export default Header;