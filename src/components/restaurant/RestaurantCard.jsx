import Card from "../ui/Card";
import Button from "../ui/Button";

export default function RestaurantCard({
  restaurant,
}) {
  return (
    <Card className="overflow-hidden">
      <div className="h-52 bg-gradient-to-r from-orange-300 to-red-300" />

      <div className="p-5">
        <h3 className="text-2xl font-bold">
          {restaurant.name}
        </h3>

        <p className="mt-2 text-gray-500">
          {restaurant.cuisine}
        </p>

        <p className="mt-2 font-medium">
          ⭐ {restaurant.rating}
        </p>

        <Button className="mt-5">
          View Menu
        </Button>
      </div>
    </Card>
  );
}