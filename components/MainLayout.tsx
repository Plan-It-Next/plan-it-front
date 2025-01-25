import { TravelSearchProvider } from '@/context/TravelSearchContext';
import Header from './commons/header/HeaderComponent';
import { ReactNode } from 'react';

export interface LayoutProps {
    children: ReactNode;
}

export const MainLayout = ({ children }: LayoutProps) => {
    return (
        <TravelSearchProvider>
            <Header />
            {children}
        </TravelSearchProvider>
    );
};
