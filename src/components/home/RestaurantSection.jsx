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
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-10 text-3xl font-bold">
          Popular Restaurants
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="overflow-hidden rounded-xl bg-white shadow-md"
            >
              <div className="h-48 bg-gray-200"></div>

              <div className="p-5">
                <h3 className="text-xl font-semibold">
                  {restaurant.name}
                </h3>

                <p className="mt-2 text-gray-500">
                  {restaurant.cuisine}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}