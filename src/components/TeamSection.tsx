import { Linkedin } from 'lucide-react';
import { BlazeBackground } from './effects/blaze/BlazeBackground';
import { headingJoinGap, useLocale, useMessages } from '../i18n';

const MEMBER_META = [
  {
    image: '/team/gavin.png',
    linkedin: 'https://www.linkedin.com/in/gavin-fung-48811539/',
  },
  {
    image: '/team/natalie.jpg',
    linkedin: 'https://www.linkedin.com/in/natalie-tso-b6b204a0/',
  },
] as const;

/**
 * Meet Our Team (#31) — two-up plates + DesignCode Blaze smoke backdrop.
 */
export const TeamSection = () => {
  const t = useMessages();
  const { locale } = useLocale();
  const gap = headingJoinGap(locale);
  const teamMembers = t.team.members.map((m, i) => ({
    ...m,
    role: t.team.role,
    ...MEMBER_META[i],
  }));

  return (
    <section
      id="team-section"
      className="relative isolate overflow-hidden bg-gray-900 px-6 py-16 md:px-10 md:py-24 lg:px-12"
    >
      <div className="pointer-events-none absolute inset-0 z-0 opacity-90" aria-hidden>
        <BlazeBackground smoke={0.65} sparks={0.45} glow={1.35} />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-20 bg-gradient-to-b from-gray-900 via-gray-900/65 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-24 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center animate-on-scroll">
          <h2 className="text-4xl font-normal tracking-tight text-white md:text-5xl lg:text-6xl">
            {t.team.h2Before}{gap}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              {t.team.h2Highlight}
            </span>
          </h2>
        </div>

        <ul className="mx-auto mt-10 grid max-w-3xl grid-cols-1 items-stretch gap-5 sm:max-w-4xl md:mt-12 md:grid-cols-2 md:gap-6 animate-on-scroll">
          {teamMembers.map((member) => (
            <li key={member.name} className="h-full">
              <article className="team-card group flex h-full flex-col overflow-hidden rounded-2xl">
                <div className="relative aspect-[5/4.5] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="team-card__photo h-full w-full object-cover object-top group-hover:scale-[1.03]"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(3,5,12,0.92)_0%,rgba(3,5,12,0.35)_42%,rgba(8,10,18,0.22)_100%)] transition-opacity duration-500 group-hover:opacity-70"
                  />
                </div>

                <div className="relative z-[1] flex flex-col gap-2 px-5 pb-5 pt-4">
                  <div>
                    <h3 className="text-lg font-medium tracking-tight text-white md:text-xl">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-white/50">
                      {member.role}
                    </p>
                  </div>
                  <p className="text-sm leading-snug text-white/70">{member.description}</p>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex w-fit items-center gap-2 text-sm text-white/65 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-400"
                  >
                    <Linkedin className="h-4 w-4" aria-hidden />
                    <span>{t.team.linkedin}</span>
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
