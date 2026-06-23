const categories = [
  "Pizza",
  "Burger",
  "Biryani",
  "South Indian",
  "Chinese",
  "Desserts",
];

export default function CategoriesSection() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-10 text-3xl font-bold">
          Popular Categories
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <div
              key={category}
              className="cursor-pointer rounded-xl border bg-gray-50 p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="font-semibold">{category}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}