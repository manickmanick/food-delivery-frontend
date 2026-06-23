import Button from "../ui/Button";
import Card from "../ui/Card";

export default function MenuItemCard({
  item,
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">
            {item.name}
          </h3>

          <p className="mt-2 text-gray-500">
            ₹{item.price}
          </p>
        </div>

        <Button>
          Add
        </Button>
      </div>
    </Card>
  );
}