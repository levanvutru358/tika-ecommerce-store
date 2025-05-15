import Header from '@/components/base/header';
import React from 'react';

type Props = {
    children: React.ReactNode
}

const DefaultLayout: React.FC<Props> = ({children}) => {
    return (
        <div className='p-6'>
            <Header />
            {children}
        </div>
    );
};

export default DefaultLayout;