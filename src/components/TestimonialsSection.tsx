import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'John (@johnsmstrategy)',
    role: 'Founder of SM Strategy',
    image: 'https://framerusercontent.com/images/ETgoVdeITLLIYCHTFNeVuZDMyQY.png',
    quote: 'The automation features have saved us countless hours! Managing multiple accounts is now a breeze.',
    rating: 5
  },
  {
    name: 'Robby (@robbygrow)',
    role: 'Founder of Robby Grow',
    image: 'https://framerusercontent.com/images/bnJJiW5Vfixlrz7M2pzoeyHBU.png',
    quote: 'The chatbot handles client questions like a pro, saving me hours of back-and-forth. That leaves me free to focus on the big-picture and value-adding tasks',
    rating: 5
  },
  {
    name: 'Mike (@leadzpulses)',
    role: 'Founder of Leadz Pulse',
    image: 'https://framerusercontent.com/images/TE1IVemAYexma7YD9HJc0Z663E.png',
    quote: 'Completely transformed how I plan and post content. The analytics dashboard is a game-changer.',
    rating: 5
  },
  {
    name: 'Sarah (@sarahdigital)',
    role: 'Digital Marketing Director',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80',
    quote: 'Their AI solutions have revolutionized our marketing approach. The results speak for themselves.',
    rating: 5
  },
  {
    name: 'David (@techforward)',
    role: 'Tech Innovation Lead',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80',
    quote: 'The level of automation and precision in their solutions is unmatched. Truly game-changing for our operations.',
    rating: 5
  }
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex space-x-1">
    {[...Array(rating)].map((_, i) => (
      <Star
        key={i}
        className="w-4 h-4 text-yellow-500 fill-yellow-500"
      />
    ))}
  </div>
);

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.95
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = testimonials.length - 1;
      if (nextIndex >= testimonials.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const visibleTestimonials = React.useMemo(() => {
    const start = currentIndex;
    const items = [];
    for (let i = 0; i < 3; i++) {
      const index = (start + i) % testimonials.length;
      items.push({ ...testimonials[index], index });
    }
    return items;
  }, [currentIndex]);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl md:text-6xl font-normal mb-6">
            Trusted by <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">Clients</span>
          </h2>
                  </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 p-2 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all"
            onClick={() => paginate(-1)}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 p-2 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all"
            onClick={() => paginate(1)}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {visibleTestimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.name}-${testimonial.index}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 35,
                  mass: 0.8,
                  restDelta: 0.001
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="group relative bg-zinc-900/30 rounded-2xl p-8 border border-white/10 backdrop-blur-sm transform transition-all duration-300 hover:bg-zinc-900/40 hover:border-purple-500/20"
                style={{
                  minHeight: '300px',
                  transformOrigin: direction > 0 ? 'left' : 'right'
                }}
              >
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500" />
              
              {/* Content */}
              <div className="relative">
              <div className="flex items-center space-x-4">
                <motion.div 
                  className="w-20 h-20 rounded-full overflow-hidden border-2 border-purple-500/20 ring-2 ring-purple-500/10 ring-offset-2 ring-offset-black/50"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <img 
                    src={testimonial.image} 
                    alt={`${testimonial.name}'s profile`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div>
                  <p className="text-white font-medium text-lg">{testimonial.name}</p>
                  <p className="text-gray-400 text-lg">{testimonial.role}</p>
                  <StarRating rating={testimonial.rating} />
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 relative"
              >
                <span className="absolute -left-2 -top-2 text-4xl text-purple-500/20">"</span>
                <p className="text-gray-300 leading-relaxed pl-4 text-lg">
                "{testimonial.quote}"
                </p>
                <span className="absolute -right-2 bottom-0 text-4xl text-purple-500/20">"</span>
              </motion.div>
              </div>
            </motion.div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  const newDirection = index > currentIndex ? 1 : -1;
                  setDirection(newDirection);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-purple-500 w-4'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};