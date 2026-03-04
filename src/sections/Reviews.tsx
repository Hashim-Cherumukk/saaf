// src/sections/Reviews.tsx

const reviews = [
  {
    id: 1,
    name: "Ahmed K.",
    product: "Midnight Oud Perfume",
    text: "The projection and longevity are unmatched. I get compliments every time I wear this. True premium quality.",
    rating: 5,
  },
  {
    id: 2,
    name: "Omar S.",
    product: "Royal Black Qamees",
    text: "The fabric feels incredible against the skin, and the tailoring is perfect right out of the box. Highly recommended.",
    rating: 5,
  },
  {
    id: 3,
    name: "Tariq M.",
    product: "Classic White Qamees",
    text: "Fast shipping, beautiful packaging, and the qamees itself is flawless. Saaf Couture is my new standard.",
    rating: 5,
  },
];

function StarRating() {
  return (
    <div className="flex gap-1 text-black dark:text-[#FFD700]">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="bg-white py-24 transition-colors duration-300 dark:bg-[#013220]">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        <div className="mb-16 flex flex-col items-center text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-black dark:text-[#FFD700] md:text-4xl">
            Words From Our Clients
          </h2>
          <div className="mt-4 h-1 w-16 bg-black dark:bg-[#FFD700]"></div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="flex flex-col justify-between border border-gray-100 bg-zinc-50 p-8 transition-colors dark:border-[#FFD700]/10 dark:bg-[#012818]"
            >
              <div>
                <StarRating />
                <p className="mt-6 font-sans text-base leading-relaxed text-gray-700 dark:text-[#FFD700]/80">
                  "{review.text}"
                </p>
              </div>
              <div className="mt-8 border-t border-gray-200 pt-6 dark:border-[#FFD700]/20">
                <p className="font-serif font-bold text-black dark:text-[#FFD700]">{review.name}</p>
                <p className="mt-1 font-sans text-xs text-gray-500 dark:text-[#FFD700]/60">
                  Purchased: {review.product}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}