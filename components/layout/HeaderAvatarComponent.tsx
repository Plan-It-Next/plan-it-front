import React from 'react';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    Avatar,
    Button,
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Divider,
} from "@nextui-org/react";



const UserAvatarMenu = ({ user, onSignOut }) => {
    return (
        <Popover placement="bottom-end">
            <PopoverTrigger>
                <Avatar
                    isBordered
                    showFallback
                    as="button"
                    className="transition-transform"
                    color="primary"
                    name={user.name}
                    size="sm"
                    src={user.avatar}
                />
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <Card className="w-64 border-none bg-background/60 dark:bg-default-100/50">
                    <CardHeader className="justify-between">
                        <div className="flex gap-3">
                            <Avatar
                                isBordered
                                color="primary"
                                size="sm"
                                src={user.avatar}
                                name={user.name}
                            />
                            <div className="flex flex-col items-start justify-center">
                                <h4 className="text-small font-semibold leading-none text-default-600">{user.name}</h4>
                                <h5 className="text-small tracking-tight text-default-500">{user.email}</h5>
                            </div>
                        </div>
                    </CardHeader>
                    <Divider/>
                    <CardBody className="p-0">
                        <div className="flex flex-col">
                            <Button
                                className="w-full justify-start h-12 gap-2 rounded-none hover:bg-default-100"
                                variant="light"
                            >
                                My Profile
                            </Button>
                            <Button
                                className="w-full justify-start h-12 gap-2 rounded-none hover:bg-default-100"
                                variant="light"
                            >
                                My Trips
                            </Button>
                        </div>
                    </CardBody>
                    <Divider/>
                    <CardFooter>
                        <Button
                            className="w-full text-danger"
                            color="danger"
                            variant="light"
                            onPress={onSignOut}
                        >
                            Sign Out
                        </Button>
                    </CardFooter>
                </Card>
            </PopoverContent>
        </Popover>
    );
};

export default UserAvatarMenu;