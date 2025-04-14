import React from "react";
import ModalBase from "./ModalBase";
import { Product } from "@/app/lib/definitions";

interface Props {
  product: Product;
  onClose: () => void;
  onChange: (product: Product) => void;
  onSubmit: () => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function ProductEditModal({
  product,
  onClose,
  onChange,
  onSubmit,
  onDelete,
}: Props) {
  return (
    <ModalBase
      title="Editar Producto"
      onClose={onClose}
      onSubmit={onSubmit}
      submitText="Guardar cambios"
      showDelete={true}
      onDelete={() => onDelete(product.id)}
    >
      <img src={`/images${product.image_url}`} alt={product.name} className="modal-image" />
      <label>
        Name:
        <input
          type="text"
          value={product.name}
          onChange={(e) => onChange({ ...product, name: e.target.value })}
        />
      </label>
      <label>
        Description:
        <textarea
          value={product.description}
          onChange={(e) => onChange({ ...product, description: e.target.value })}
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          value={product.price}
          onChange={(e) => onChange({ ...product, price: Number(e.target.value) })}
        />
      </label>
    </ModalBase>
  );
}
