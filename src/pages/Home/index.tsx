import { useEffect, useState } from "react";
import formatValue from "../../utils/formatValue";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Container, ProductList } from "./styles";
import { useCart } from "../../Providers/Cart";
import axios from "axios";

export interface IProduct {
  id?: number;
  name: string;
  image_url: string;
  priceFormatted?: number;
  price: number;
  description: string;
}

const Home = () => {
  const { setCart, cart } = useCart();

  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    const response = await axios.get(
      "https://kenzieshop2.herokuapp.com/products"
    );

    const data = response.data.map((product: IProduct) => ({
      ...product,
      priceFormatted: formatValue(product.price),
    }));

    setLoading(false);
    setProducts(data);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Container>
      {loading ? (
        <CircularProgress size={50} />
      ) : (
        <ProductList>
          {products.map((product) => (
            <li key={product.id}>
              <figure>
                <img src={product.image_url} alt={product.name} />
              </figure>
              <strong>{product.description}</strong>
              <div>
                <span>{product.priceFormatted}</span>

                <button
                  type="button"
                  onClick={() => setCart([...cart, product])}
                >
                  <span>Adicionar ao carrinho</span>
                </button>
              </div>
            </li>
          ))}
        </ProductList>
      )}
    </Container>
  );
};

export default Home;
