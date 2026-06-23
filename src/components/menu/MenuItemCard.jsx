import Button from "../ui/Button";
import Card from "../ui/Card";
import useCart from "../../hooks/useCart";

export default function MenuItemCard({ item }) {
  const { addToCart } = useCart();

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">{item.name}</h3>

          <p className="mt-2 text-gray-500">₹{item.price}</p>
        </div>

        <Button onClick={() => addToCart(item)}>Add</Button>
      </div>
    </Card>
  );
}
