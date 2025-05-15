import Header from '@/components/base/header';
import { SiteFooter } from '@/components/base/side-footer';
import React from 'react';

type Props = {
    children: React.ReactNode
}

const DefaultLayout: React.FC<Props> = ({children}) => {
    return (
        <div className='p-6'>
            <Header />
            {children}
            <SiteFooter />
        </div>
    );
};

export default DefaultLayout;