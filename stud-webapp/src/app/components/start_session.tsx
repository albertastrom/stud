import React, { useState } from 'react'
import Modal from 'react-modal'

const StartSessionModal = () => {
   const [isOpen, setIsOpen] = useState(false)
   const customStyles = {
      overlay: {
         backgroundColor: 'rgba(0, 0, 0, 0.6)'
      },
      content: {
         top: '50%',
         left: '50%',
         right: 'auto',
         bottom: 'auto',
         width: '70%',
         height: 'auto',
         marginRight: '-50%',
         transform: 'translate(-50%, -50%)',
         borderRadius: '40px',
         backgroundColor: 'bg-blue-700'
      }
   }
   return (
      <div>
         <button onClick={() => setIsOpen(true)}>Start Session</button>
         <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
            <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold leading-tighter tracking-tighter mb-4 grid place-content-center mt-8" data-aos="zoom-y-out">Start Session</h1>
                
                <div className="place-content-center">
                    <h2 className="text-center font-semibold text-2xl text-gray-600 mt-8 grid place-content-center">
                        Add Goals
                    </h2>
                    <p className="grid place-content-center">
                        Input what you plan to do in this session to track your progress
                    </p>
                    <div className="w-1/3 grid place-content-center">
                        <form>
                            <input type="text" name="goal" id="goal" className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" placeholder="Add goal"/>
                        </form>
                    </div>
                </div>
                <div className="py-8 grid place-content-center">
                    <button id="startSessionButton" value="start" className="p-2 cursor-pointer text-white text-3xl bg-blue-600 w-52 h-24 hover:bg-blue-700 mb-4 rounded-3xl">Start</button>
                </div>
                <div className="grid place-content-center pb-8">
                    <button onClick={() => setIsOpen(false)} className="">Close</button>
                </div>
            </div>
         </Modal>
      </div>
   )
}
export default StartSessionModal


// ignore
function GoalTable() {
    <table id="table">
        <tr>
            <GoalInput />
        </tr>
    </table>
    const updateTable = () => {
        var table = document.getElementById("table");
        // Create an empty <tr> element and add it to the 1st position of the table:
        if (table != null) {
            //var row = table.insertRow(0);
            //row = <GoalInput />;
        }
        
    }
    function GoalInput() {
        return <input type="text" name="goal" id="goal" onChange={updateTable} className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" placeholder="Add goal"/>
    }
    return <div className="grid place-content-center mt-4 overflow-y-auto h-32">
    
</div>
}