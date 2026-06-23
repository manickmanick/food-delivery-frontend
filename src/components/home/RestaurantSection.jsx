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
        <h2 className="mb-12 text-center text-4xl font-bold">
          Popular Restaurants
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="h-56 bg-gradient-to-r from-orange-300 to-red-300"></div>

              <div className="p-6">
                <h3 className="text-2xl font-bold">{restaurant.name}</h3>

                <p className="mt-2 text-slate-500">{restaurant.cuisine}</p>

                <button className="mt-6 rounded-lg bg-orange-500 px-4 py-2 text-white hover:bg-orange-600">
                  View Menu
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
