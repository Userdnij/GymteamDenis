import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { format } from 'date-fns';
import { lv } from 'date-fns/locale';
import axios from 'axios';
import PaymentModal from '../PaymentModal/PaymentModal';

export const SubscribeTraining = ({open, setOpen, event, handleSubmit}) => {
  const cancelButtonRef = useRef(null);
  const [isPaymentStepOpen, setIsPaymentStepOpen] = useState(false);

  useEffect(() => {
    console.log(event)
  }, [event]);

  if(!event) return null;

  const handleSubscribe = () => {
    console.log(event)
    setIsPaymentStepOpen(true)
  }

  const onSubscribeSubmit = () => {
    axios.post('/api/trainings/subscribe', {
        trainingId: event.id,
        clientId: JSON.parse(localStorage.getItem('user'))._id
    }).then((response) => {
        console.log(response.data)
        setOpen(false);
        handleSubmit();
    }).catch((error) => {
        console.log(error)
    });
  }

  const renderPierakstities = () => {
    if (event.start > new Date()) {
      return (
        (event.title === '' || !event.title) && (
          <button
            type="button"
            className="transition duration-300 inline-flex w-full justify-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 sm:ml-3 sm:w-auto"
            onClick={handleSubscribe}
          >
            Pierakstities
          </button>
        )
      )
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <PaymentModal onSubmit={onSubscribeSubmit} open={isPaymentStepOpen} setOpen={setIsPaymentStepOpen} product={"Privāts treniņš"} summa={event.extendedProps.price} trener={event.extendedProps.trener} trenerTalr={event.extendedProps.trenerTalrunis} />
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
                        Treniņa detāļas
                      </Dialog.Title>
                      <div className="mt-10">
                        <div>
                            <p className="text-xl">Sākums: {format(event.start, 'EEEE MMMM dd yyyy HH:mm', { locale: lv })}</p>
                            <p className="text-xl">Beigums: {format(event.end, 'EEEE MMMM dd yyyy HH:mm', { locale: lv })}</p>
                            <p className="text-xl">Cena: {event.extendedProps.price}€</p>
                            <p className="text-xl">Treneris: {event.extendedProps.trener}</p>
                            <p className="text-xl">Trenera tālrunis: {event.extendedProps.trenerTalrunis}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  {renderPierakstities()}
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

export default SubscribeTraining;