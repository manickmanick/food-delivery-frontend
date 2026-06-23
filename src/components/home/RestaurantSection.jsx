import Button from "../ui/Button";
import Card from "../ui/Card";
import SectionTitle from "../ui/SectionTitle";

const restaurants = [
  {
    id: 1,
    name: "Pizza Palace",
    cuisine: "Italian",
  },
  {
    id: 2,
    name: "Burger Hub",
    cuisine: "Fast Food",
  },
  {
    id: 3,
    name: "Biryani House",
    cuisine: "Indian",
  },
];

export default function RestaurantSection() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          title="Popular Restaurants"
          subtitle="Top rated restaurants near you"
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {restaurants.map((restaurant) => (
            <Card
              key={restaurant.id}
              className="overflow-hidden"
            >
              <div className="h-56 bg-gradient-to-r from-orange-300 to-red-300" />

              <div className="p-6">
                <h3 className="text-2xl font-bold">
                  {restaurant.name}
                </h3>

                <p className="mt-2 text-slate-500">
                  {restaurant.cuisine}
                </p>

                <Button className="mt-6">
                  View Menu
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}