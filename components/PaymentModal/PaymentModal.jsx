import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import MyDocument from '../MyDocument/MyDocument';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';


export const PaymentModal = ({open, setOpen, summa, product, term, onSubmit, trenerTalr, trener}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [cvc, setCvc] = useState('');
  const cancelButtonRef = useRef(null);
  const [isSecondStep, setIsSecondStep] = useState(false);

  useEffect(() => {
    setCardNumber('')
    setMonth('')
    setDay('')
    setCvc('')
    setIsSecondStep(false)
  }, [open])

  const handleSubmit = async () => {
    setIsSecondStep(true);
    onSubmit();
    // submit(training);
    // setOpen(false);
  }

  const handleDownload = async () => {
    const blob = await pdf(<MyDocument price={summa} product={product} term={term} trener={trener} trenerTalr={trenerTalr} />).toBlob();
    saveAs(blob, 'document.pdf');
  }

  const renderPayButton = (summa) => {
    if (isSecondStep) return null;

    const isDisabled = !cardNumber || cardNumber.length !== 16
      || !month || month.length > 2
      || !day || day.length > 2
      || !cvc || cvc.length !== 3;

    return (
      <button
      type="button"
      className={`transition duration-300 inline-flex w-full justify-center rounded-md ${isDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-violet-500'} px-3 py-2 text-sm font-semibold text-white shadow-sm ${isDisabled ? '' : 'hover:bg-violet-400'} sm:ml-3 sm:w-auto`}
      onClick={handleSubmit}
      disabled={isDisabled}
      >
      Apmaksāt {summa}€
      </button>
    )
  }

  const renderContent = () => {
    if (!isSecondStep) {
      return (
        <div className="mt-10">
          <div>
              <p className="InputLabel">Kartes numurs:</p>
              <input
                  className="Input"
                  type="number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
              />
          </div>

          <div>
              <p className="InputLabel">Kartes termiņš:</p>
              <div className="flex">
                  <input
                      className="Input"
                      type="number"
                      placeholder="MM"
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                  />
                  <span className="mx-2">/</span>
                  <input
                      className="Input"
                      type="number"
                      placeholder="DD"
                      value={day}
                      onChange={(e) => setDay(e.target.value)}
                  />
              </div>
          </div>

          <div>
              <p className="InputLabel">Kods:</p>
              <input
                  className="Input"
                  type="password"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
              />
          </div>
        </div>
      )
    }

    return (
      <div className='mt-10'>
        <p>Paldies par apmaksu!</p>
        <button className="Button mt-4" onClick={handleDownload}>Lejupielādes kvīti</button>
      </div>
    )
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
                        Veikt maksājumu
                      </Dialog.Title>
                      { renderContent() }
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  { renderPayButton(summa) }
                  <button
                    type="button"
                    className="transition duration-300 mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 hover:bg-gray-300 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    {isSecondStep ? 'Aizvērt' : 'Atcelt'}
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

export default PaymentModal;