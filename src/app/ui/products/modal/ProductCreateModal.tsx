import React from "react";
import ModalBase from "./ModalBase";
import { Product } from "@/app/lib/definitions";

interface Props {
  product: Product;
  onClose: () => void;
  onChange: (product: Product) => void;
  onSubmit: () => Promise<void>;
}

export default function ProductCreateModal({
  product,
  onClose,
  onChange,
  onSubmit,
}: Props) {
  return (
    <ModalBase
      title="Nuevo Producto"
      onClose={onClose}
      onSubmit={onSubmit}
      submitText="Agregar"
    >
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
