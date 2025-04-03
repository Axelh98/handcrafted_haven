

// Importamos los componentes de filtros y productos
import FilterList from "@/app/ui/productList/FilterList";
import GridProducts from "@/app/ui/productList/GridProducts";

export default function ProductListPage() {
  return (
    <div className="product-list-page">
      {/* Columna de filtros */}
      <FilterList />

      {/* Columna de productos */}
      <GridProducts />
    </div>
  );
}
