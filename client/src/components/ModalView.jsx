import React, { useEffect, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import ResultSheet from '../pages/resultSheet';
import customFetch from '../utils/customFetch';
import EditResult from './EditResult';

const ModalView = ({ open, setOpen, studentID, term, session }) => {

    const [result, setResult] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            if (studentID && term && session) {
                try {
                    const res = await customFetch.get(`/assessments/${studentID}?term=${term}&session=${session}`);
                    setResult(res.data?.data);
                } catch (error) {
                    console.error(error);
                }
            }
        };
        fetchResults();
    }, [studentID, term, session]);

    return (
        <Dialog open={open} onClose={() => { }} className="relative z-10">
            <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">

                <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">

                    <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-1/2 mx-auto">


                        <div className="bg-gray-50 px-4 py-5  sm:px-6">
                            <DialogTitle as="h3" className="text-xl font-semibold leading-6 text-gray-900">
                                Update Result
                            </DialogTitle>
                        </div>

                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">

                            <div className="sm:flex sm:items-start">

                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">

                                    <div className="mt-2">

                                        <EditResult
                                            studentResult={result}
                                            setStudentResult={setResult}
                                        />

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:mt-0 sm:w-auto"
                            >
                                Close
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};

export default ModalView;
