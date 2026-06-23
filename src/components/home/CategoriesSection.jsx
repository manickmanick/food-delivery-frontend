const categories = [
  "🍕 Pizza",
  "🍔 Burger",
  "🍛 Biryani",
  "🥘 South Indian",
  "🥡 Chinese",
  "🍰 Desserts",
];

export default function CategoriesSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-12 text-center text-4xl font-bold">
          Popular Categories
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {categories.map((category) => (
            <div
              key={category}
              className="rounded-2xl border bg-white p-8 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
            >
              <p className="text-lg font-semibold">{category}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
