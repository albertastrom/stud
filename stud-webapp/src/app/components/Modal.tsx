'use client'

import React, { ChangeEvent, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, query, getDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";

type InputValue = {
    task_name: string;
    mandatory: boolean;
    done: boolean;
};
  

export default function Modal({ user } : { user: User | undefined }) {
    const [showModal, setShowModal] = React.useState(false);
    const [inputValues, setInputValues] = useState<InputValue[]>(
        [{ task_name: '', mandatory: false, done: false }]
    );

    const handleInputChange = ({event, index, field}: {event: ChangeEvent<HTMLInputElement | HTMLInputElement>, index: number, field: keyof InputValue }) => {
        const newInputValues = [...inputValues];
        if (field === 'mandatory') {
            newInputValues[index].mandatory = event.target.checked;
        } else if (field === 'task_name') {
            newInputValues[index].task_name = event.target.value;
        }
        setInputValues(newInputValues);

        if (field === 'task_name' && index === inputValues.length - 1 && event.target.value !== '') {
            // Add a new empty input field with defaults
            setInputValues([...inputValues, { task_name: '', mandatory: false, done: false }]);
        } else if (field === 'task_name' && event.target.value === '') {
            // Remove the input field below if the current input is empty
            const updatedInputValues = inputValues.filter((_, i) => i !== index + 1);
            setInputValues(updatedInputValues);
        }
    };

    const [newSession, setNewSession] = useState<{
        uid: string;
        current_state: string,
        active: boolean,
      }>({ 
        uid: '',
        current_state: '',
        active: true,
    });
    const router = useRouter();
    
    const addSession = async () => {
        console.log(user?.uid);

        const userObj = await getDoc(doc(db, 'users', user ? user.uid : ''));

        setNewSession({
          uid: user ? userObj.id : '',
          current_state: newSession.current_state,
          active: newSession.active,
        });

        if (newSession.uid !== '') {
            const session = await addDoc(collection(db, 'study_sessions'), newSession);
            inputValues.map(async (value, index) => {
                if (index !== inputValues.length - 1) {
                    await addDoc(collection(db, 'tasks'), {uid: session.id, ...value})
                }
            });

            setNewSession({ 
                uid: '',
                current_state: '',
                active: true,
            });
            setShowModal(false);
            setInputValues([{ task_name: '', mandatory: false, done: false }]);
            router.push('/session');
        }
    };

    return (
    <>
      <button
        className="bg-blue-500 text-white active:bg-teal-400 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 m-5"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Start Study Session
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Study Session Details
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form>
                    <div className="relative p-6 flex-auto">
                        {inputValues.map((value, index) => (
                            <div key={index} className="flex flex-row">
                                <label className="flex flex-col justify-center align-middle">
                                    <input
                                        type="checkbox"
                                        checked={value.mandatory}
                                        onChange={(event) => handleInputChange({event, index, field: 'mandatory'})}
                                    /><p className="pl-2 align-middle table-cell">
                                        Mandatory
                                    </p>
                                </label>
                                <input 
                                key={index}
                                value={value.task_name}
                                onChange={(event) => handleInputChange({event, index, field: "task_name"})}
                                type="text" name="goal" id="goal" className="block w-full m-2 rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" placeholder="Task name"/>
                            </div>
                        ))}
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                        className="text-red-400 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {
                            setShowModal(false);
                            setInputValues([{ task_name: '', mandatory: false, done: false }]);
                        }}
                    >
                        Close
                    </button>
                    <button
                        className="bg-blue-500 text-white active:bg-teal-400 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={addSession}
                    >
                        Start Studying
                    </button>
                    </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
        ) : null}
    </>
  );
}