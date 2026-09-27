import { useReducedMotion } from 'framer-motion';

type Testimonial = {
  name: string;
  role: string;
  image: string;
  quote: string;
};

/** Mix prior clients + Asian personas. Title · industry; one Founder, one CEO. */
const testimonials: Testimonial[] = [
  {
    name: 'John',
    role: 'Founder · Marketing',
    image:
      'https://framerusercontent.com/images/ETgoVdeITLLIYCHTFNeVuZDMyQY.png',
    quote:
      'The automation features have saved us countless hours. Managing multiple accounts is now a breeze.',
  },
  {
    name: 'Daniel',
    role: 'CPA Partner · Accounting',
    image: '/testimonials/accountant.png',
    quote:
      'We finally have a site clients trust. Enquiries come in clean, and follow-up is simple.',
  },
  {
    name: 'Robby',
    role: 'Growth lead · Agency',
    image: 'https://framerusercontent.com/images/bnJJiW5Vfixlrz7M2pzoeyHBU.png',
    quote:
      'The chatbot handles client questions like a pro, saving me hours of back-and-forth. That leaves me free to focus on the big picture.',
  },
  {
    name: 'Mei',
    role: 'Brand lead · Retail',
    image: '/testimonials/ecommerce.png',
    quote:
      'The new site looks sharp on mobile and the chatbot catches questions while we sleep.',
  },
  {
    name: 'Mike',
    role: 'Content lead · Media',
    image: '/testimonials/mike.png',
    quote:
      'Completely transformed how I plan and post content. The analytics dashboard is a game-changer.',
  },
  {
    name: 'Sophia',
    role: 'CEO · Consulting',
    image: '/testimonials/ceo.png',
    quote:
      'Clear scope, honest timeline, and a team we can reach. The site was only the start.',
  },
];

function TestimonialCard({
  item,
  index,
}: {
  item: Testimonial;
  index: number;
}) {
  const label = String(index).padStart(2, '0');

  return (
    <div className="group/card relative shrink-0">
      {/* Purple glow — outside overflow so blur isn’t clipped */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-0.5 rounded-[14px] bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 blur transition-opacity duration-500 group-hover/card:opacity-25"
      />

      <article className="testimonial-card relative flex h-[22rem] w-[min(88vw,26rem)] flex-col p-6 md:h-[24rem] md:w-[28rem] md:p-8">
        {/* Header — hairline under profile row */}
        <div className="flex items-center gap-4 border-b border-white/[0.075] pb-4 md:pb-5">
          <img
            src={item.image}
            alt=""
            className="h-12 w-12 rounded-lg object-cover md:h-14 md:w-14"
            loading="lazy"
            width={56}
            height={56}
          />
          <div className="min-w-0">
            <p className="truncate text-base font-medium text-white md:text-lg">
              {item.name}
            </p>
            <p className="truncate text-xs uppercase tracking-wide text-white/50 transition-colors duration-300 group-hover/card:text-purple-300/80">
              {item.role}
            </p>
          </div>
        </div>

        {/* Quote — always lit */}
        <p className="flex-1 py-6 text-lg leading-relaxed text-white/80 transition-colors duration-300 group-hover/card:text-white md:py-7 md:text-xl md:leading-[1.55]">
          “{item.quote}”
        </p>

        {/* Footer — hairline above index */}
        <div className="flex items-center border-t border-white/[0.075] pt-3 transition-colors duration-300 group-hover/card:border-purple-400/25">
          <span className="text-[11px] tracking-[0.14em] text-white/45 transition-colors duration-300 group-hover/card:text-purple-300/70">
            {label}
          </span>
        </div>
      </article>
    </div>
  );
}

/**
 * Soft auto-marquee under the hero. No dots/arrows.
 * Cards stay full color; hover adds purple glow. Strip pauses on hover.
 */
export const TestimonialsSection = () => {
  const reduceMotion = useReducedMotion();
  const loop = [...testimonials, ...testimonials];

  return (
    <section
      id="testimonials-section"
      className="relative overflow-hidden bg-gray-900 py-16 md:py-20"
      aria-label="Client testimonials"
    >
      {/* Heading options — swap when designer picks (see plan):
          A Trusted by founders who / ship sites that work
          B Sites that work. / Clients who stay.
          C Built for founders / who need the site done right
          D Real clients. / Real results in Hong Kong.
          E From first site / to the systems that run after
      */}
      <div className="mx-auto mb-10 max-w-3xl px-6 text-center md:mb-14">
        <h2 className="text-3xl font-normal leading-tight tracking-tight text-white/85 md:text-5xl md:leading-[1.15]">
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Sites
          </span>{' '}
          that work.
          <br />
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Clients
          </span>{' '}
          who stay.
        </h2>
      </div>

      {reduceMotion ? (
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-5 px-6">
          {testimonials.map((item, i) => (
            <TestimonialCard key={item.name} item={item} index={i + 1} />
          ))}
        </div>
      ) : (
        <div className="group/marquee relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-16 bg-gradient-to-r from-gray-900 to-transparent md:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-16 bg-gradient-to-l from-gray-900 to-transparent md:w-24" />

          <div className="testimonial-marquee flex w-max gap-5 pl-4 group-hover/marquee:[animation-play-state:paused] md:gap-6">
            {loop.map((item, i) => (
              <TestimonialCard
                key={`${item.name}-${i}`}
                item={item}
                index={(i % testimonials.length) + 1}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
