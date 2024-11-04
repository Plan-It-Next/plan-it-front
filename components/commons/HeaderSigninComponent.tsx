import React, { useState } from 'react';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    Button,
    Input,
    Link,
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Divider
} from "@nextui-org/react";
import { EyeFilledIcon } from "@nextui-org/shared-icons";
import { EyeSlashFilledIcon } from "@nextui-org/shared-icons";
import HeaderAvatarComponent from "./HeaderAvatarComponent";

interface User {
    name: string;
    email: string;
    avatar: string;
}

interface ErrorState {
    email: string;
    password: string;
    general: string;
}

interface HeaderSigninComponentProps {
    isScrolled?: boolean;
}

const HeaderSigninComponent: React.FC<HeaderSigninComponentProps> = ({ isScrolled = false }) => {
    // User signed in state
    const [isSignedIn, setIsSignedIn] = useState(false);

    // User setter
    const [user, setUser] = useState<User | null>(null);

    // Email setter
    const [email, setEmail] = useState("");

    // Password setter
    const [password, setPassword] = useState("");

    // Inputs error setter
    const [errors, setErrors] = useState<ErrorState>({
        email: "",
        password: "",
        general: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    // Password visibility variables
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    // Email checking regex
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Sign in handler
    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({ email: "", password: "", general: "" });

        // Validate inputs
        let hasErrors = false;
        const newErrors = { email: "", password: "", general: "" };

        if (!email) {
            newErrors.email = "email is empty";
            hasErrors = true;
        } else if (!validateEmail(email)) {
            newErrors.email = "input is not an email";
            hasErrors = true;
        }

        if (!password) {
            newErrors.password = "password is empty";
            hasErrors = true;
        }

        if (hasErrors) {
            setErrors(newErrors);
            return;
        }

        // Simulate API call
        setIsLoading(true);
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // For demo purposes, only allow specific credentials
            if (email === "test@example.com" && password === "password123") {
                setIsSignedIn(true);
                setUser({
                    name: "Sofia PS",
                    email: email,
                    avatar: "https://static.wikia.nocookie.net/546b011b-c00e-45aa-8281-8b9c01d2f9d9/scale-to-width/755"
                });
            } else {
                setErrors(prev => ({ ...prev, general: "Incorrect email or password, please try again." }));
            }
        } catch {
            setErrors(prev => ({ ...prev, general: "login failed" }));
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignOut = () => {
        setIsSignedIn(false);
        setUser(null);
        setEmail("");
        setPassword("");
        setErrors({ email: "", password: "", general: "" });
    };

    if (isSignedIn && user) {
        return <HeaderAvatarComponent user={user} onSignOut={handleSignOut} />;
    }

    return (
        <Popover placement="bottom-end">
            <PopoverTrigger>
                <Button
                    variant="flat"
                    color="primary"
                    className={`font-bold ${isScrolled ? 'text-black' : 'text-sky-200'}`}
                >
                    Sign In
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <Card className="w-80 border-none bg-background/60 dark:bg-default-100/50">
                    <CardHeader className="flex gap-3">
                        <div className="flex flex-col">
                            <p className="text-md font-bold">Sign In</p>
                            <p className="text-small text-default-500">Enter your credentials</p>
                        </div>
                    </CardHeader>
                    <Divider/>
                    <form onSubmit={handleSignIn}>
                        <CardBody className="gap-4">
                            <Input
                                label="Email"
                                placeholder="Enter your email"
                                type="email"
                                variant="bordered"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                isRequired
                                isInvalid={!!errors.email}
                                errorMessage={errors.email}
                                onValueChange={() => setErrors(prev => ({ ...prev, email: "", general: "" }))}
                            />
                            <Input
                                label="Password"
                                placeholder="Enter your password"
                                type={isVisible ? "text" : "password"}
                                variant="bordered"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                isRequired
                                isInvalid={!!errors.password}
                                errorMessage={errors.password}
                                onValueChange={() => setErrors(prev => ({ ...prev, password: "", general: "" }))}
                                endContent={
                                    <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                                        {isVisible ? (
                                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                                    </button>
                                }
                            />
                            {errors.general && (
                                <div className="text-tiny text-danger text-center">
                                    {errors.general}
                                </div>
                            )}
                            <Button
                                color="primary"
                                className="w-full"
                                type="submit"
                                isLoading={isLoading}
                            >
                                Sign In
                            </Button>
                        </CardBody>
                    </form>
                    <Divider/>
                    <CardFooter className="justify-center">
                        <p className="text-small text-default-500">
                            Don&apos;t have an account?{" "}
                            <Link href="/signup" color="primary">
                                Sign Up
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </PopoverContent>
        </Popover>
    );
};

export default HeaderSigninComponent;