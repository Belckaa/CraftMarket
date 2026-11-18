import PropTypes from 'prop-types'
import { Modal } from '@/components/ui'
import { formatPrice } from '@/utils/formatPrice'

export default function ProductModal({ product, onClose }) {
  if (!product) return null

  return (
    <Modal
      key={product.id}
      isOpen={!!product}
      onClose={onClose}
      size="lg"
      title={product.name}
    >
      <div className="p-6">
        <h2 className="pr-10 text-2xl font-bold text-ink-900">{product.name}</h2>
        <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-brand-600">{product.category}</p>
        
        {product.image && (
          <img 
            src={product.image} 
            alt={product.name} 
            className="mt-6 aspect-video w-full rounded-control object-cover"
          />
        )}
        
        <p className="mt-6 text-3xl font-bold text-ink-900">{formatPrice(product.price)}</p>
        <p className="mt-4 text-ink-600">
          Це демонстраційне вікно деталей товару. Тут згодом з'явиться розширений опис, характеристики та відгуки.
        </p>
      </div>
    </Modal>
  )
}

ProductModal.propTypes = {
  product: PropTypes.object,
  onClose: PropTypes.func.isRequired,
}
