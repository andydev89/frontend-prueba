import { Toast } from 'bootstrap'
import '@/assets/styles/bootstrap.scss'
import 'bootstrap/dist/js/bootstrap.bundle.min'

export function showToast(type: 'success' | 'error' | 'info', message: string) {
  const container = document.getElementById('toast-container')
  if (!container) return

  const toastEl = document.createElement('div')
  toastEl.className = `toast align-items-center text-white border-0 show 
    ${type === 'success' ? 'bg-success' : type === 'error' ? 'bg-danger' : 'bg-info'}`
  toastEl.role = 'alert'
  toastEl.ariaLive = 'assertive'
  toastEl.ariaAtomic = 'true'

  toastEl.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `

  container.appendChild(toastEl)

  // ✅ usa el Toast importado directamente
  const toast = new Toast(toastEl, { delay: 3000 })
  toast.show()

  toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove())
}


