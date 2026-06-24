import Card from "../ui/Card";
import Button from "../ui/Button";
import { Link } from "react-router-dom";

export default function RestaurantCard({ restaurant }) {
  return (
    <Link to={`/restaurants/${restaurant.id}`}>
      <Card className="overflow-hidden transition hover:scale-[1.02]">
        <img
          src={restaurant.imageUrl}
          alt={restaurant.name}
          className="h-52 w-full object-cover"
        />
        <div className="p-5">
          <h3 className="text-2xl font-bold">{restaurant.name}</h3>

          <p className="mt-2 text-gray-500">{restaurant.description}</p>

          <p className="mt-2 text-sm text-slate-600">📍 {restaurant.address}</p>

          <p className="mt-2 font-medium">⭐ {restaurant.rating}</p>

          <Button className="mt-5">View Menu</Button>
        </div>
      </Card>
    </Link>
  );
}
