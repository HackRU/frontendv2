import { Fragment, ReactNode, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { inter } from '@/app/ui/fonts';

export default function PopupDialog(props: {
  onYes: () => void;
  onNo: () => void;
  setOpen: (open: boolean) => void;
  open: boolean;
  content: ReactNode;
  title: string;
  details?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: 'warning' | 'neutral';
}) {
  const {
    open,
    onYes,
    setOpen,
    content,
    title,
    onNo,
    details,
    confirmLabel = 'Continue',
    cancelLabel = 'Go back',
    tone = 'warning',
  } = props;

  const cancelButtonRef = useRef(null);
  return (
    <Transition.Root
      show={open}
      as={Fragment}
    >
      <Dialog
        as="div"
        className="relative z-[120]"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-[2px] transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={`${inter.className} relative w-full max-w-lg transform overflow-hidden rounded-md bg-white text-left shadow-2xl transition-all`}
              >
                <div className="px-5 pb-5 pt-6 sm:px-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-md ${tone === 'warning' ? 'bg-amber-100' : 'bg-teal-100'}`}
                    >
                      <ExclamationTriangleIcon
                        className={`h-6 w-6 ${tone === 'warning' ? 'text-amber-700' : 'text-teal-700'}`}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-semibold text-slate-950"
                      >
                        {title}
                      </Dialog.Title>
                      <div className="mt-2 text-sm leading-6 text-slate-600">
                        {content}
                      </div>
                    </div>
                  </div>
                  {details && <div className="mt-5">{details}</div>}
                </div>
                <div className="flex flex-col-reverse gap-2 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className={`min-h-10 inline-flex justify-center rounded-md px-4 py-2 text-sm font-semibold text-white shadow-sm transition ${tone === 'warning' ? 'bg-amber-700 hover:bg-amber-800' : 'bg-teal-800 hover:bg-teal-900'}`}
                    onClick={() => {
                      onYes();
                      setOpen(false);
                    }}
                  >
                    {confirmLabel}
                  </button>
                  <button
                    type="button"
                    className="min-h-10 inline-flex justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm ring-1 ring-inset ring-slate-300 transition hover:bg-slate-100"
                    onClick={() => {
                      onNo();
                      setOpen(false);
                    }}
                    ref={cancelButtonRef}
                  >
                    {cancelLabel}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
