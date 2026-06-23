import Card from "../ui/Card";
import SectionTitle from "../ui/SectionTitle";

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
        <SectionTitle
          title="Popular Categories"
          subtitle="Choose your favorite food category"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {categories.map((category) => (
            <Card
              key={category}
              className="cursor-pointer p-8 text-center hover:-translate-y-2"
            >
              <p className="text-lg font-semibold">
                {category}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}