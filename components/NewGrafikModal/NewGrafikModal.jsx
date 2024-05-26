import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import './NewGrafikModal.scss';
import { TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { format } from 'date-fns';
import axios from 'axios';

export const NewGrafikModal = ({open, setOpen, submit}) => {
  const cancelButtonRef = useRef(null);
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [price, setPrice] = useState(0);

  const handleSubmit = () => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    axios.post('/api/trainings/create', {
      date: date,
      startTime: startTime,
      endTime: endTime,
      price: parseFloat(price).toFixed(2),
      trener: user._id
    });

    const training = {
      dateStr: date,
      startTime: startTime,
      endTime: endTime,
      price: parseFloat(price).toFixed(2),
    }
    submit(training);
    setOpen(false);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-3xl font-semibold leading-6 text-gray-900 mt-5">
                        Izveidot jauno notikumu
                      </Dialog.Title>
                      <div className="mt-10">
                        <div className="mt-10">
                            <p className="InputLabel">Datums:</p>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>

                        <div className="mt-10">
                            <p className="InputLabel">Sakums:</p>
                            <TimePicker
                                ampm={false}
                                value={startTime}
                                onChange={(newValue) => {
                                    setStartTime(format(newValue, 'HH:mm'));
                                }}
                            />
                        </div>

                        <div className="mt-10">
                            <p className="InputLabel">Beigums:</p>
                            <TimePicker
                                ampm={false}
                                value={endTime}
                                onChange={(newValue) => {
                                    setEndTime(format(newValue, 'HH:mm'));
                                }}
                            />
                        </div>

                        <div>
                            <p className="InputLabel">Cena (€):</p>
                            <input
                                className="Input"
                                type="number"
                                step="0.01"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="transition duration-300 inline-flex w-full justify-center rounded-md bg-violet-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-400 sm:ml-3 sm:w-auto"
                    onClick={handleSubmit}
                  >
                    Saglabat
                  </button>
                  <button
                    type="button"
                    className="transition duration-300 mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-200 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Atcelt
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    </LocalizationProvider>
  );
}

export default NewGrafikModal;