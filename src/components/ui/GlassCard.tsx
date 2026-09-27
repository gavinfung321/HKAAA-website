import * as React from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

export type GlassCardProps = React.HTMLAttributes<HTMLDivElement> & {
  label: string;
  title: string;
  subhead: string;
  body: string;
  icon: LucideIcon;
  /** Resting | hovered focus | pushed-back siblings */
  tone?: 'default' | 'focus' | 'dim';
};

/**
 * 3D CSS glass card (Aceternity-style sample), themed for HKAAA.
 * `tone` boosts or softens copy contrast when the deck is focused.
 */
export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, label, title, subhead, body, icon: Icon, tone = 'default', ...props }, ref) => {
    const focused = tone === 'focus';
    const dimmed = tone === 'dim';

    return (
      <div
        ref={ref}
        className={cn(
          'group h-[300px] w-[290px] [perspective:1000px]',
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            'relative h-full rounded-[50px] bg-gradient-to-br from-gray-900/80 via-[#1a1028]/70 to-black/75 shadow-2xl transition-all duration-500 ease-in-out [transform-style:preserve-3d]',
            focused &&
              'from-gray-900/90 via-[#241038]/85 to-black/90 shadow-[0_28px_60px_rgba(0,0,0,0.55),0_0_40px_rgba(168,85,247,0.2)] group-hover:[transform:rotate3d(1,1,0,12deg)]',
            dimmed && 'from-gray-950/70 via-[#120818]/60 to-black/70',
            !focused &&
              !dimmed &&
              'group-hover:[transform:rotate3d(1,1,0,12deg)] group-hover:[box-shadow:rgba(0,0,0,0.45)_30px_50px_25px_-40px,rgba(168,85,247,0.14)_0px_25px_40px_0px]',
          )}
        >
          <div
            className={cn(
              'absolute inset-2 rounded-[55px] border-b border-l backdrop-blur-[6px] transition-all duration-400 [transform-style:preserve-3d] [transform:translate3d(0,0,25px)]',
              focused
                ? 'border-white/40 bg-gradient-to-b from-white/35 via-violet-400/15 to-white/10'
                : dimmed
                  ? 'border-white/10 bg-gradient-to-b from-white/10 via-violet-400/[0.04] to-white/[0.02]'
                  : 'border-white/25 bg-gradient-to-b from-white/20 via-violet-400/[0.07] to-white/[0.04]',
            )}
          />

          <div className="absolute inset-x-0 top-0 [transform:translate3d(0,0,26px)]">
            <div className="px-7 pb-0 pt-[88px]">
              <span
                className={cn(
                  'mb-2 block text-[11px] font-medium uppercase tracking-[0.14em] transition-colors duration-300',
                  focused ? 'text-purple-200' : dimmed ? 'text-purple-300/40' : 'text-purple-300/90',
                )}
              >
                {label}
              </span>
              <span
                className={cn(
                  'block text-xl font-semibold tracking-tight transition-all duration-300',
                  focused
                    ? 'text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]'
                    : dimmed
                      ? 'text-white/45'
                      : 'text-white drop-shadow-sm',
                )}
              >
                {title}
              </span>
              <span
                className={cn(
                  'mt-2 block text-sm transition-colors duration-300',
                  focused ? 'text-purple-100' : dimmed ? 'text-purple-200/35' : 'text-purple-200/90',
                )}
              >
                {subhead}
              </span>
              <span
                className={cn(
                  'mt-3 block text-[13px] leading-relaxed transition-colors duration-300',
                  focused
                    ? 'text-zinc-100 drop-shadow-[0_1px_8px_rgba(0,0,0,0.75)]'
                    : dimmed
                      ? 'text-zinc-400/40'
                      : 'text-zinc-200/90',
                )}
              >
                {body}
              </span>
            </div>
          </div>

          <div className="absolute right-0 top-0 [transform-style:preserve-3d]">
            {[
              { size: '170px', pos: '8px', z: '20px', delay: '0s' },
              { size: '140px', pos: '10px', z: '40px', delay: '0.4s' },
              { size: '110px', pos: '17px', z: '60px', delay: '0.8s' },
              { size: '80px', pos: '23px', z: '80px', delay: '1.2s' },
            ].map((circle, index) => (
              <div
                key={index}
                className={cn(
                  'absolute aspect-square rounded-full transition-all duration-500 ease-in-out',
                  focused ? 'bg-violet-300/20' : dimmed ? 'bg-violet-300/[0.04]' : 'bg-violet-300/[0.08]',
                )}
                style={{
                  width: circle.size,
                  top: circle.pos,
                  right: circle.pos,
                  transform: `translate3d(0, 0, ${circle.z})`,
                  transitionDelay: circle.delay,
                }}
              />
            ))}
            <div
              className={cn(
                'absolute grid aspect-square w-[50px] place-content-center rounded-full bg-gradient-to-br from-purple-400 to-pink-500 transition-all duration-500 ease-in-out [transform:translate3d(0,0,100px)] [transition-delay:1.6s]',
                focused
                  ? 'shadow-[rgba(168,85,247,0.55)_-8px_10px_28px_0px] group-hover:[transform:translate3d(0,0,120px)]'
                  : dimmed
                    ? 'opacity-50 shadow-none'
                    : 'shadow-[rgba(168,85,247,0.35)_-8px_10px_20px_0px] group-hover:[transform:translate3d(0,0,120px)]',
              )}
              style={{ top: '30px', right: '30px' }}
            >
              <Icon className="h-[18px] w-[18px] text-white" strokeWidth={2.25} aria-hidden />
            </div>
          </div>
        </div>
      </div>
    );
  },
);

GlassCard.displayName = 'GlassCard';
