import UpdateProduct from '@/app/components/product/UpdateProduct';

export default function Page() {
    // ACA TENES QUE TRAER EL ID QUE QUIERAS ACTUALIZAR
    // ESTE ES SOLO DE EJEMPLO
  const productId = 'bb488be9-71ef-424c-bce8-8a3351f7c971'; // UUID de prueba

  return (
    <UpdateProduct productId={productId} />
  );
}
