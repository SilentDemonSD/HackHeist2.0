export default function Modal({ open, onClose, title, children }){
  if(!open) return null
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="modal-title" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full max-w-md rounded-2xl bg-muted-gray border border-white/10 text-white shadow-soft">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h3 id="modal-title" className="font-semibold">{title}</h3>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-white/10" aria-label="Close">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  )
}


