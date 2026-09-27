import { useEffect } from 'react';
import { Trophy, HeartHandshake, Cpu, Layout, Search, PenTool } from 'lucide-react';
import { Header } from './components/Header';
import { WorkflowDemo } from './components/WorkflowDemo';
import { ChatbotDemo } from './components/ChatbotDemo';
import { BusinessGraph } from './components/BusinessGraph';
import { PricingSection } from './components/PricingSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ProcessSection } from './components/ProcessSection';
import { TeamSection } from './components/TeamSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';

const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

function App() {
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1
    });

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header scrollToSection={scrollToSection} />

      <HeroSection />

      <TestimonialsSection />

      <ProcessSection />

      {/* Why Choose Us Section */}
      <section id="why-us-section" className="pt-12 md:pt-24 pb-12 md:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-4xl md:text-6xl font-normal mb-6">
              Why <span className="gradient-text">Choose Us</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Experience the difference with our comprehensive AI solutions
            </p>
          </div>
              
          {/* Value Propositions */}
          <div className="space-y-16">
            {/* Proven Expertise */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="value-prop animate-on-scroll order-2 lg:order-1" data-index="1">
                <div className="flex items-start gap-6">
                  <div className="value-prop-icon">
                    <Trophy className="w-8 h-8 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-normal mb-2">Proven Expertise</h3>
                    <p className="text-purple-400 font-medium mb-3">Tailored AI Solutions for Real Results</p>
                    <p className="text-gray-400 leading-relaxed">
                      We deliver custom AI automation designed for your unique business needs, backed by a track record of success.
                    </p>
                  </div>
                </div>
              </div>
              <div className="animate-on-scroll order-1 lg:order-2">
                <img
                  src="https://i.imgur.com/jAALHKy.png"
                  alt="Team of experts collaborating"
                  className="w-full h-auto max-w-[600px] mx-auto"
                />
              </div>
            </div>

            {/* End-to-End Support */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-on-scroll">
                <img
                  src="https://i.imgur.com/YOnKFr8.png"
                  alt="Comprehensive support system"
                  className="w-full h-auto max-w-[600px] mx-auto"
                />
              </div>
              <div className="value-prop animate-on-scroll" data-index="2">
                  <div className="flex items-start gap-6">
                    <div className="value-prop-icon">
                      <HeartHandshake className="w-8 h-8 text-purple-500" />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-normal mb-2">End-to-End Support</h3>
                      <p className="text-purple-400 font-medium mb-3">From Strategy to Success</p>
                      <p className="text-gray-400 leading-relaxed">
                        Our team handles everything—strategy, implementation, and ongoing support—ensuring seamless integration and maximum ROI.
                      </p>
                    </div>
                  </div>
                </div>
            </div>

            {/* Cutting-Edge Technology */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="value-prop animate-on-scroll order-2 lg:order-1" data-index="3">
                <div className="flex items-start gap-6">
                  <div className="value-prop-icon">
                    <Cpu className="w-8 h-8 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-normal mb-2">Cutting-Edge Technology</h3>
                    <p className="text-purple-400 font-medium mb-3">Innovation at Your Fingertips</p>
                    <p className="text-gray-400 leading-relaxed">
                      We leverage the latest AI tools and frameworks to future-proof your business and keep you ahead of the competition.
                    </p>
                  </div>
                </div>
              </div>
            <div className="animate-on-scroll order-1 lg:order-2">
              <img
                src="https://i.imgur.com/PqoyZIl.png"
                alt="Advanced AI technology visualization"
                className="w-full h-auto max-w-[600px] mx-auto"
              />
            </div>
          </div>
          </div>

        </div>
      </section>

      {/* Services Section */}
 <section id="services-section" className="pt-12 md:pt-16 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
  <div className="space-y-16">
    <div className="space-y-6 text-center animate-on-scroll">
      <h2 className="text-4xl md:text-6xl font-normal mb-6">
        Our <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">Services</span>
      </h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Workflow Automation */}
      <div className="group relative bg-zinc-900/30 rounded-2xl p-6 sm:p-8 border border-white/10 backdrop-blur-sm transition-all duration-500 hover:bg-zinc-900/40 hover:border-purple-500/20 animate-on-scroll w-full">
        <div className="absolute -top-4 -right-4 bg-purple-500/10 w-24 h-24 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-500" />
        <div className="h-[480px] flex flex-col overflow-hidden">
          <div className="flex-1 flex items-center justify-center pt-2">
            <WorkflowDemo />
          </div>
          <div className="mt-auto">
            <h2 className="text-2xl md:text-3xl font-normal group-hover:text-purple-400 transition-colors duration-300 mb-4">
              Workflow automations
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
             We automate your workflows by intelligently connecting your favourite applications. Boosting efficiency, enhancing productivity, and reducing errors.
            </p>
          </div>
        </div>
      </div>

      {/* Chatbot Development */}
      <div className="group relative bg-zinc-900/30 rounded-2xl p-6 sm:p-8 border border-white/10 backdrop-blur-sm transition-all duration-500 hover:bg-zinc-900/40 hover:border-purple-500/20 animate-on-scroll w-full">
        <div className="absolute -top-4 -right-4 bg-purple-500/10 w-24 h-24 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-500" />
        <div className="h-[480px] flex flex-col overflow-hidden">
          <div className="flex-1 flex items-center justify-center pt-2">
            <ChatbotDemo />
          </div>
          <div className="mt-auto">
            <h2 className="text-2xl md:text-3xl font-normal group-hover:text-purple-400 transition-colors duration-300 mb-4">
              Chatbot development
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
              We develop advanced chatbots that are reactive, understand nuances, and are capable of solving extremely complicated queries.
            </p>
          </div>
        </div>
      </div>

      {/* Lead Generation */}
      <div className="group relative bg-zinc-900/30 rounded-2xl p-6 sm:p-8 border border-white/10 backdrop-blur-sm transition-all duration-500 hover:bg-zinc-900/40 hover:border-purple-500/20 animate-on-scroll w-full">
        <div className="absolute -top-4 -right-4 bg-purple-500/10 w-24 h-24 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-500" />
        <div className="h-[480px] flex flex-col overflow-hidden">
          <div className="flex-1 flex items-center justify-center pt-2">
            <BusinessGraph />
          </div>
          <div className="mt-auto">
            <h2 className="text-2xl md:text-3xl font-normal group-hover:text-purple-400 transition-colors duration-300 mb-4">
              Lead generation
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
             We enhance lead generation with AI-driven strategies that capture and convert prospects efficiently. Boosting engagement and growing your business.
            </p>
          </div>
        </div>
      </div>

      {/* Web Design */}
      <div className="group relative bg-zinc-900/30 rounded-2xl p-6 sm:p-8 border border-white/10 backdrop-blur-sm transition-all duration-500 hover:bg-zinc-900/40 hover:border-purple-500/20 animate-on-scroll w-full">
        <div className="absolute -top-4 -right-4 bg-purple-500/10 w-24 h-24 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-500" />
        <div className="h-[480px] flex flex-col overflow-hidden">
          <div className="flex-1 flex items-center justify-center pt-2">
            <div className="relative h-60 w-full bg-[#0D0D0D] rounded-xl p-4 overflow-hidden flex flex-col items-center justify-center">
              <div className="w-full max-w-[280px] bg-white/5 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="h-8 w-3/4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-md"></div>
                  <div className="flex gap-2">
                    <div className="h-6 w-20 bg-white/10 rounded-md"></div>
                    <div className="h-6 w-20 bg-white/10 rounded-md"></div>
                  </div>
                </div>
              </div>
              <div className="w-full max-w-[280px] grid grid-cols-2 gap-3">
                <div className="h-20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20"></div>
                <div className="h-20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20"></div>
              </div>
              <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <div className="w-8 h-8 text-purple-400 animate-pulse">
                  <Layout className="w-full h-full" />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-auto">
            <h2 className="text-2xl md:text-3xl font-normal group-hover:text-purple-400 transition-colors duration-300 mb-4">
              Web Design
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
              Professional custom web design tailored to your brand. Responsive, user-friendly, and conversion-optimized websites to elevate your online presence.
            </p>
          </div>
        </div>
      </div>

      {/* SEO */}
      <div className="group relative bg-zinc-900/30 rounded-2xl p-6 sm:p-8 border border-white/10 backdrop-blur-sm transition-all duration-500 hover:bg-zinc-900/40 hover:border-purple-500/20 animate-on-scroll w-full">
        <div className="absolute -top-4 -right-4 bg-purple-500/10 w-24 h-24 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-500" />
        <div className="h-[480px] flex flex-col overflow-hidden">
          <div className="flex-1 flex items-center justify-center pt-2">
            <div className="relative h-60 w-full bg-[#0D0D0D] rounded-xl p-4 overflow-hidden flex flex-col items-center justify-center">
              <div className="w-full max-w-[280px] bg-white/5 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-md p-2">
                  <Search className="w-5 h-5 text-purple-400" />
                  <div className="h-4 w-full bg-white/20 rounded"></div>
                </div>
              </div>
              <div className="w-full max-w-[280px] space-y-2">
                <div className="h-3 w-3/4 bg-purple-500/20 rounded"></div>
                <div className="h-3 w-full bg-purple-500/10 rounded"></div>
                <div className="h-3 w-2/3 bg-purple-500/10 rounded"></div>
              </div>
              <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <div className="w-8 h-8 text-purple-400 animate-pulse">
                  <Search className="w-full h-full" />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-auto">
            <h2 className="text-2xl md:text-3xl font-normal group-hover:text-purple-400 transition-colors duration-300 mb-4">
              SEO
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
              Boost your visibility with data-driven SEO strategies. Keyword research, on-page optimization, and backlink building to rank higher on Google.
            </p>
          </div>
        </div>
      </div>

      {/* Content Creation */}
      <div className="group relative bg-zinc-900/30 rounded-2xl p-6 sm:p-8 border border-white/10 backdrop-blur-sm transition-all duration-500 hover:bg-zinc-900/40 hover:border-purple-500/20 animate-on-scroll w-full">
        <div className="absolute -top-4 -right-4 bg-purple-500/10 w-24 h-24 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-500" />
        <div className="h-[480px] flex flex-col overflow-hidden">
          <div className="flex-1 flex items-center justify-center pt-2">
            <div className="relative h-60 w-full bg-[#0D0D0D] rounded-xl p-4 overflow-hidden flex flex-col items-center justify-center">
              <div className="w-full max-w-[280px] bg-white/5 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400 animate-pulse"></div>
                    <span className="text-xs text-gray-400">REC</span>
                  </div>
                  <span className="text-xs text-gray-400">00:42:31</span>
                </div>
                <div className="relative w-full h-24 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20 flex items-center justify-center">
                  <PenTool className="w-8 h-8 text-purple-400 absolute animate-bounce" />
                </div>
              </div>
              <div className="w-full max-w-[280px] grid grid-cols-3 gap-2">
                <div className="h-16 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20 flex items-center justify-center">
                  <span className="text-xs text-purple-400">Blog</span>
                </div>
                <div className="h-16 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20 flex items-center justify-center">
                  <span className="text-xs text-purple-400">Video</span>
                </div>
                <div className="h-16 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20 flex items-center justify-center">
                  <span className="text-xs text-purple-400">Social</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-auto">
            <h2 className="text-2xl md:text-3xl font-normal group-hover:text-purple-400 transition-colors duration-300 mb-4">
              Content Creation
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
              Engaging, SEO-optimized content crafted for your audience. Blogs, videos, and social media content to drive traffic and engagement.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Pricing Section */}
      <PricingSection />

      {/* Team Section */}
      <TeamSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;