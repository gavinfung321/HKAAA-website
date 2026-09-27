import type { CSSProperties } from 'react';
import { Users, Cpu, Database, Globe, Lock, Settings, Terminal, Github, Sailboat, Zap } from 'lucide-react';

/**
 * Legacy Process cards (pre-#17 timeline).
 * Kept for the animated mini-UIs — not mounted in App.
 * Swap in via `import { ProcessSectionLegacy }` if we want this look back.
 */
export function ProcessSectionLegacy() {
  const techRow1 = [
    { icon: <Cpu />, name: 'CPU' },
    { icon: <Database />, name: 'Database' },
    { icon: <Globe />, name: 'Web' },
    { icon: <Lock />, name: 'Security' },
    { icon: <Settings />, name: 'Settings' },
    { icon: <Cpu />, name: 'CPU' },
    { icon: <Cpu />, name: 'CPU' },
    { icon: <Database />, name: 'Database' },
    { icon: <Globe />, name: 'Web' },
    { icon: <Lock />, name: 'Security' },
    { icon: <Settings />, name: 'Settings' },
    { icon: <Cpu />, name: 'CPU' },
  ];

  const techRow2 = [
    { icon: <Terminal />, name: 'Terminal' },
    { icon: <Users />, name: 'Users' },
    { icon: <Github />, name: 'Github' },
    { icon: <Sailboat />, name: 'Deploy' },
    { icon: <Zap />, name: 'Performance' },
    { icon: <Terminal />, name: 'Terminal' },
    { icon: <Terminal />, name: 'Terminal' },
    { icon: <Users />, name: 'Users' },
    { icon: <Github />, name: 'Github' },
    { icon: <Sailboat />, name: 'Deploy' },
    { icon: <Zap />, name: 'Performance' },
    { icon: <Terminal />, name: 'Terminal' },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 pt-16 sm:px-6 md:pb-16 md:pt-24 lg:px-8">
      <div className="space-y-16">
        <div className="space-y-6 text-center animate-on-scroll">
          <h2 className="mb-6 text-4xl font-normal md:text-6xl">
            <span className="text-white">Our</span>{' '}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Process
            </span>
          </h2>
          <h2 className="text-3xl font-normal tracking-tight md:text-5xl">
            How we{' '}
            <span className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent transition-transform duration-300 hover:scale-105 hover:-rotate-1">
              transform
            </span>{' '}
            your ideas
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            We follow a streamlined process to turn your vision into reality, combining
            cutting-edge technology with expert craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Step 1 - Discovery Call */}
          <div
            className="group relative w-full animate-on-scroll rounded-2xl border border-white/10 bg-zinc-900/30 p-6 backdrop-blur-sm transition-all duration-500 hover:border-purple-500/20 hover:bg-zinc-900/40 sm:p-8"
            style={{ '--animation-delay': '0.2s' } as CSSProperties}
          >
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-purple-500/10 blur-2xl transition-all duration-500 group-hover:bg-purple-500/20" />
            <div className="flex min-h-[380px] flex-col overflow-hidden sm:h-[420px] lg:h-[450px]">
              <div className="mt-6 grid grid-cols-2 gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3 rounded-lg bg-white/10 p-4">
                  <div className="relative flex h-10 w-10 justify-center">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-[2px] animate-pulse rounded-full bg-purple-500/80"
                        style={{
                          left: `${i * 4}px`,
                          height: `${[15, 20, 25, 20, 15][i]}px`,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          animationDelay: `${i * 0.1}s`,
                          animationDuration: '0.8s',
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-gray-200">
                    AI Developer
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-lg bg-white/10 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-600">
                    <Users className="h-6 w-6 text-gray-300" />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-gray-200">
                    Sales Expert
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-lg bg-white/10 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-600">
                    <Users className="h-6 w-6 text-gray-300" />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-gray-200">
                    Marketing Expert
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-lg bg-white/10 p-4">
                  <div className="relative flex h-10 w-10 justify-center">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-[2px] animate-pulse rounded-full bg-purple-500/80"
                        style={{
                          left: `${i * 4}px`,
                          height: `${[15, 20, 25, 20, 15][i]}px`,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          animationDelay: `${i * 0.1}s`,
                          animationDuration: '0.8s',
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-gray-200">You</span>
                </div>
              </div>

              <div className="mb-4 mt-auto">
                <span className="text-2xl font-normal text-purple-400/60 md:text-3xl">Step 01</span>
                <h3 className="text-2xl font-normal transition-colors duration-300 group-hover:text-purple-400 md:text-3xl">
                  Discovery Call
                </h3>
              </div>

              <p className="text-sm leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
                Schedule a discovery call to discuss your needs and explore how we can help
                transform your ideas into reality.
              </p>
            </div>
          </div>

          {/* Step 2 - Solution Design */}
          <div
            className="group relative w-full animate-on-scroll rounded-2xl border border-white/10 bg-zinc-900/30 p-6 backdrop-blur-sm transition-all duration-500 hover:border-purple-500/20 hover:bg-zinc-900/40 sm:p-8"
            style={{ '--animation-delay': '0.4s' } as CSSProperties}
          >
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-purple-500/10 blur-2xl transition-all duration-500 group-hover:bg-purple-500/20" />
            <div className="flex min-h-[380px] flex-col overflow-hidden sm:h-[420px] lg:h-[450px]">
              <div className="mt-6 rounded-xl border border-white/5 bg-black/50 p-4 font-mono text-sm text-gray-400 transition-all duration-300 hover:border-white/10">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs text-gray-500">FeatureSection.tsx</span>
                  <span className="rounded-full bg-purple-400/10 px-3 py-1 text-xs text-purple-400">
                    Design
                  </span>
                </div>
                <div className="h-[120px] overflow-hidden">
                  <pre className="text-xs transition-transform duration-[2000ms] ease-in-out group-hover:-translate-y-[80px]">
                    <code className="transition-colors duration-300 group-hover:text-purple-400/80">{`const App = () => {
return (

<div> <Header /> <HeroSection /> <FeatureSection /> <Footer /> </div> ); }; 
// Additional features
const FeatureSection = () => {
return (

<section> <h2>Amazing Features</h2> <div className="grid"> {features.map(feature => ( <Feature key={feature.id} {...feature} /> ))} </div> </section> ); };`}</code>
                  </pre>
                </div>
              </div>

              <div className="mb-4 mt-auto">
                <span className="text-2xl font-normal text-purple-400/60 md:text-3xl">Step 02</span>
                <h3 className="text-2xl font-normal transition-colors duration-300 group-hover:text-purple-400 md:text-3xl">
                  Solution Design
                </h3>
              </div>

              <p className="text-sm leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
                Our experts work with you to design the perfect solution that meets your specific
                needs and requirements.
              </p>
            </div>
          </div>

          {/* Step 3 - Implementation */}
          <div
            className="group relative w-full animate-on-scroll rounded-2xl border border-white/10 bg-zinc-900/30 p-6 backdrop-blur-sm transition-all duration-500 hover:border-purple-500/20 hover:bg-zinc-900/40 sm:p-8"
            style={{ '--animation-delay': '0.6s' } as CSSProperties}
          >
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-purple-500/10 blur-2xl transition-all duration-500 group-hover:bg-purple-500/20" />
            <div className="flex min-h-[380px] flex-col overflow-hidden sm:h-[420px] lg:h-[450px]">
              <div className="mt-6 h-[180px] overflow-hidden">
                <div className="flex animate-slide-left space-x-4">
                  {techRow1.map((tech, i) => (
                    <div
                      key={`row1-${i}`}
                      className="flex h-20 w-20 flex-none items-center justify-center rounded-xl border border-white/5 bg-black/50 transition-all duration-300 hover:scale-105 hover:border-purple-500/20 hover:bg-purple-500/5"
                    >
                      <div className="flex h-[68px] w-[68px] items-center justify-center text-gray-400 transition-colors duration-300 group-hover:text-purple-400">
                        {tech.icon}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex animate-slide-right space-x-4">
                  {techRow2.map((tech, i) => (
                    <div
                      key={`row2-${i}`}
                      className="flex h-20 w-20 flex-none items-center justify-center rounded-xl border border-white/5 bg-black/50 transition-all duration-300 hover:scale-105 hover:border-purple-500/20 hover:bg-purple-500/5"
                    >
                      <div className="flex h-[68px] w-[68px] items-center justify-center text-gray-400 transition-colors duration-300 group-hover:text-purple-400">
                        {tech.icon}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4 mt-auto">
                <span className="text-2xl font-normal text-purple-400/60 md:text-3xl">Step 03</span>
                <h3 className="text-2xl font-normal transition-colors duration-300 group-hover:text-purple-400 md:text-3xl">
                  Implementation
                </h3>
              </div>

              <p className="text-sm leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
                Our highly skilled team implements your solution using cutting-edge technologies and
                industry best practices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
