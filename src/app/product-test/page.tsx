
import CreateProduct from "@/app/components/product/CreateProduct";
import ListProducts from "@/app/components/product/ListProducts";

export default function Page() {
  return (
    <div>
      <h1>Productos</h1>
      <CreateProduct profileId="profile_id_example" />
      <ListProducts />
    </div>

  );
}