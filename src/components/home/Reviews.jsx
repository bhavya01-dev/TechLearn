import React from 'react';
import { motion } from 'framer-motion';

const reviewsLeft = [
  {
    name: "Daksh Mavani",
    text: "I had got myself enrolled in C language course as a beginner. We were given excellent guidance."
  },
  {
    name: "Loknath",
    text: "Through her experience ma'am has explained the concepts in a way in which we can understand easily."
  },
  {
    name: "Sudhakar Reddy",
    text: "The tutor was really good and explained each and every topic clearly with personalized attention."
  }
];

const reviewsRight = [
  {
    name: "Rajani",
    text: "It was a great experience to be back in classroom after almost 25 years. The logic was explained well."
  },
  {
    name: "Shradha",
    text: "Very good learning experience. I have learnt C language in Techlearn Solutions with ease."
  },
  {
    name: "Samuel Jude Philips",
    text: "Many people don't know about this centre due to its location but you'll go in as a student and come out a professional."
  },
  {
    name: "Prasanna",
    text: "Mam explains the class in a very good way. She helps us crack the code logic very easily."
  }
];



const ReviewItem = ({ name, text }) => (
  <div
    className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative hover:shadow-xl transition-all duration-300"
  >
    {/* Decorative Quote Mark */}
    <div className="absolute top-6 right-6 text-blue-100/50">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.01697 21L5.01697 18C5.01697 16.8954 5.9124 16 7.01697 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.01697C5.46468 8 5.01697 8.44772 5.01697 9V11C5.01697 11.5523 4.56925 12 4.01697 12H3.01697V5H13.017V15C13.017 18.3137 10.3307 21 7.01697 21H5.01697Z" />
      </svg>
    </div>

    <p className="text-[#334155] leading-relaxed text-base mb-6 relative z-10 font-medium italic">"{text}"</p>

    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-100 to-blue-50 border border-blue-200 flex items-center justify-center text-[#1E3A8A] font-bold text-lg shrink-0">
        {name.charAt(0)}
      </div>
      <div>
        <h4 className="text-[#0F172A] font-bold text-base font-inter">{name}</h4>
        <div className="flex text-yellow-400 text-sm mt-0.5 gap-0.5">
          {'★'.repeat(5)}
        </div>
      </div>
    </div>
  </div>
);

const ReviewColumn = ({ reviews, duration, reverse = false }) => {
  // Duplicate reviews 3 times to ensure seamless infinite scroll
  const columnReviews = [...reviews, ...reviews, ...reviews];

  return (
    <div className="relative h-[600px] md:h-[800px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
      <motion.div
        className="flex flex-col gap-8 pb-8"
        animate={{
          y: reverse ? ["-33.33%", "0%"] : ["0%", "-33.33%"]
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {columnReviews.map((r, i) => (
          <ReviewItem key={i} name={r.name} text={r.text} />
        ))}
      </motion.div>
    </div>
  );
};

const Reviews = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-transparent to-blue-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-center">

          {/* Left Column - Moves Up */}
          <div className="lg:col-span-1">
            <ReviewColumn reviews={reviewsLeft} duration={40} />
          </div>

          {/* Center Title - Static */}
          <div className="lg:col-span-1 flex items-center justify-center h-[200px] lg:h-auto">
            <motion.h2
              className="text-5xl md:text-6xl font-extrabold italic text-center sticky top-24"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <span className="text-[#2563EB]">learn</span> <span className="text-[#1E3A8A]">REVIEWS</span>
            </motion.h2>
          </div>

          {/* Right Column - Moves Down (Reverse) */}
          <div className="lg:col-span-1">
            <ReviewColumn reviews={reviewsRight} duration={45} reverse={true} />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Reviews;