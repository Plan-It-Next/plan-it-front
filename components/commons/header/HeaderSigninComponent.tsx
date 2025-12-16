import React, {useEffect, useState} from 'react';
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
import {useAuth} from "@/context/AuthContext";

interface ErrorState {
    email: string;
    password: string;
    general: string;
}

interface HeaderSigninComponentProps {
    isScrolled?: boolean;
}

const HeaderSigninComponent: React.FC<HeaderSigninComponentProps> = ({ isScrolled = false }) => {
    // User setter
    const { setUser } = useAuth();

    // User signed in state
    const [isSignedIn, setIsSignedIn] = useState(false);


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

    const API_URL = "http://34.41.98.73/login/"+encodeURIComponent(email)+"/"+ encodeURIComponent(password) // Cambia a tu URL real

    // Verificar token al cargar el componente
    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("El token es :"+token)
        const storedUser = localStorage.getItem("user");
        if (token && storedUser) {
            setIsSignedIn(true);
            setUser(JSON.parse(storedUser));
        }
    }, []);

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
            console.log("TEST: Attempting login with:", { email, password });
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }), // If your API expects JSON body
            });

            console.log("TEST: Response status:", response.status);
            if (!response.ok) {
                const errorData = await response.json();
                console.error("TEST: Error response data:", errorData);
                throw new Error("Invalid credentials");
            }

            const data = await response.json();
            console.log("TEST: Response data:", data);
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("user", JSON.stringify(data.user));
            setUser(data.user);
            setIsSignedIn(true);

        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrors((prev) => ({ ...prev, general: "You are not registered" }));
            } else {
                setErrors((prev) => ({ ...prev, general: "An unknown error occurred." }));
            }
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
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };
    const { user } = useAuth();
    if (isSignedIn && user) {
        const avatarUser = {
            name: user.name,
            email: user.email,
            avatar: "" // Default empty avatar since it's not in the AuthContext User type
        };
        const headerAvatarComponent = <HeaderAvatarComponent user={avatarUser} onSignOut={handleSignOut}/>;
        return headerAvatarComponent;
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
