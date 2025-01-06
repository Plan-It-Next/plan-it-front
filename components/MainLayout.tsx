import { TravelSearchProvider } from '@/context/TravelSearchContext';
import Header from './commons/header/HeaderComponent';

export interface LayoutProps {
    children: React.ReactNode;
}

export const MainLayout = ({ children }: LayoutProps) => {
    return (
        <>
            <TravelSearchProvider>
                <Header />
                {children}
            </TravelSearchProvider>
        </>
    );
};
