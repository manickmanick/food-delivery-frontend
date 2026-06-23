export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-orange-500 to-red-500">
      <div className="mx-auto max-w-7xl px-6 py-32">
        <div className="max-w-2xl">
          <h1 className="text-6xl font-bold text-white leading-tight">
            Order Your Favorite Food Anytime
          </h1>

          <p className="mt-6 text-xl text-orange-100">
            Fresh meals from the best restaurants delivered
            quickly to your doorstep.
          </p>

          <button className="mt-8 rounded-lg bg-white px-6 py-3 font-semibold text-orange-500 shadow-lg transition hover:scale-105">
            Explore Restaurants
          </button>
        </div>
      </div>
    </section>
  );
}