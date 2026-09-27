import { Trophy, HeartHandshake, Cpu } from 'lucide-react';

/**
 * Legacy Why Choose Us — zig-zag + Imgur illustrations (pre-#23).
 * Not mounted. Swap in via `import { WhyUsSectionLegacy }` if needed.
 */
export function WhyUsSectionLegacy() {
  return (
    <section
      id="why-us-section-legacy"
      className="mx-auto max-w-7xl px-4 pb-12 pt-12 sm:px-6 md:pb-16 md:pt-24 lg:px-8"
    >
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center animate-on-scroll">
          <h2 className="mb-6 text-4xl font-normal md:text-6xl">
            Why <span className="gradient-text">Choose Us</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-400">
            Experience the difference with our comprehensive AI solutions
          </p>
        </div>

        <div className="space-y-16">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="value-prop order-2 animate-on-scroll lg:order-1" data-index="1">
              <div className="flex items-start gap-6">
                <div className="value-prop-icon">
                  <Trophy className="h-8 w-8 text-purple-500" />
                </div>
                <div>
                  <h3 className="mb-2 text-2xl font-normal md:text-3xl">Proven Expertise</h3>
                  <p className="mb-3 font-medium text-purple-400">
                    Tailored AI Solutions for Real Results
                  </p>
                  <p className="leading-relaxed text-gray-400">
                    We deliver custom AI automation designed for your unique business needs, backed
                    by a track record of success.
                  </p>
                </div>
              </div>
            </div>
            <div className="order-1 animate-on-scroll lg:order-2">
              <img
                src="https://i.imgur.com/jAALHKy.png"
                alt="Team of experts collaborating"
                className="mx-auto h-auto w-full max-w-[600px]"
              />
            </div>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="animate-on-scroll">
              <img
                src="https://i.imgur.com/YOnKFr8.png"
                alt="Comprehensive support system"
                className="mx-auto h-auto w-full max-w-[600px]"
              />
            </div>
            <div className="value-prop animate-on-scroll" data-index="2">
              <div className="flex items-start gap-6">
                <div className="value-prop-icon">
                  <HeartHandshake className="h-8 w-8 text-purple-500" />
                </div>
                <div>
                  <h3 className="mb-2 text-2xl font-normal md:text-3xl">End-to-End Support</h3>
                  <p className="mb-3 font-medium text-purple-400">From Strategy to Success</p>
                  <p className="leading-relaxed text-gray-400">
                    Our team handles everything—strategy, implementation, and ongoing
                    support—ensuring seamless integration and maximum ROI.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="value-prop order-2 animate-on-scroll lg:order-1" data-index="3">
              <div className="flex items-start gap-6">
                <div className="value-prop-icon">
                  <Cpu className="h-8 w-8 text-purple-500" />
                </div>
                <div>
                  <h3 className="mb-2 text-2xl font-normal md:text-3xl">Cutting-Edge Technology</h3>
                  <p className="mb-3 font-medium text-purple-400">Innovation at Your Fingertips</p>
                  <p className="leading-relaxed text-gray-400">
                    We leverage the latest AI tools and frameworks to future-proof your business and
                    keep you ahead of the competition.
                  </p>
                </div>
              </div>
            </div>
            <div className="order-1 animate-on-scroll lg:order-2">
              <img
                src="https://i.imgur.com/PqoyZIl.png"
                alt="Advanced AI technology visualization"
                className="mx-auto h-auto w-full max-w-[600px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
