import * as Dialog from '@radix-ui/react-dialog'

/** Bottom sheet built on Radix Dialog (focus trap, Escape, scroll lock). */
export default function Sheet({ open, onOpenChange, title, children }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="sheet-overlay fixed inset-0 z-40 bg-deep/70" />
        <Dialog.Content
          dir="rtl"
          aria-describedby={undefined}
          className="sheet-content fixed inset-x-0 bottom-0 z-50 mx-auto max-h-[85dvh] max-w-md overflow-y-auto rounded-t-sheet bg-foam px-5 pb-[max(24px,env(safe-area-inset-bottom))] pt-3 text-harbour shadow-2xl"
        >
          <div className="mx-auto mb-3 h-1.5 w-11 rounded-full bg-chip" aria-hidden="true" />
          <Dialog.Title className="sr-only">{title}</Dialog.Title>
          {children}
          <Dialog.Close className="btn-soft mt-5 w-full">סגירה</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
