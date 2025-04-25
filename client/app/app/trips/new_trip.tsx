import React from 'react';
import ModalForm from '../components/model_form';

export default function NewTrip() {
    return (
        <main className="flex items-center justify-center pt-16 pb-4 md:px-40 px-20">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                <div className='card bg-base-100 w-full shadow-sm'>
                    <ModalForm />
                </div>
            </div>
        </main>

    );
}