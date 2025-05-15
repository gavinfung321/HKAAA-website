import React from 'react';
import { motion } from 'framer-motion';
import { Github, X, Linkedin, UserPlus } from 'lucide-react';

const teamMembers = [
  {
    name: 'Gavin Fung',
    role: 'Co-founder',
    image: 'https://i.imgur.com/ZrLavkA.jpeg',
    description: 'Gavin Fung oversees all creative projects, bringing his keen eye for design and exceptional storytelling abilities to the table.',
    socials: {
      linkedin: 'https://www.linkedin.com/in/gavin-fung-48811539/'
    }
  },
  {
    name: 'Natalie Tso',
    role: 'Co-founder',
    image: 'https://i.imgur.com/zn9uZhz.jpeg',
    description: 'Natalie Tso is the creative force behind our stunning visual designs with a strong background in UI/UX and graphic design.',
    socials: {
      linkedin: 'https://www.linkedin.com/in/natalie-tso-b6b204a0/'
    }
  }
];

const JoinTeamCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.6 }}
    className="group relative bg-zinc-900/30 rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-500 hover:bg-zinc-900/40 hover:border-purple-500/20"
  >
    <div className="aspect-square overflow-hidden bg-black flex items-center justify-center relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
      <div className="relative z-10 text-center p-8">
        <h2 className="text-4xl md:text-5xl font-normal mb-4">
          Become Our <br /> 
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">Member?</span>
        </h2>
        <p className="text-gray-300 mb-8">
          Join the HKAAA community and unlock a world of creative possibilities.
        </p>
        <a
          href="mailto:info@hkaiautomation.com"
          className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity mx-auto group inline-flex"
        >
          <span>Apply CV</span>
          <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </a>
      </div>
    </div>
  </motion.div>
);

export const TeamSection = () => {
  return (
    <section id="team-section" className="pt-12 md:pt-16 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="space-y-16">
        <div className="space-y-6 text-center animate-on-scroll">
          <h2 className="text-4xl md:text-6xl font-normal mb-6">
            Meet Our <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">Team</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            We're a team of passionate individuals dedicated to transforming businesses through AI innovation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="group relative bg-zinc-900/30 rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-500 hover:bg-zinc-900/40 hover:border-purple-500/20"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/95 group-hover:to-black/90 transition-all duration-500" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl font-medium text-white mb-1 drop-shadow-lg">{member.name}</h3>
                <p className="text-purple-600 font-medium mb-3 drop-shadow-md">{member.role}</p>
                <p className="text-gray-200 text-sm leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {member.description}
                </p>
                <div className="flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <a href={member.socials.linkedin} className="text-gray-300 hover:text-white transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
          <JoinTeamCard />
        </div>
      </div>
    </section>
  );
};