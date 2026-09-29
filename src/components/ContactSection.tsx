import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Send, CheckCircle, AlertCircle, MapPin, Phone, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';

const SERVICES = [
  'Web Design',
  'SEO',
  'Content Creation',
  'Chatbot Development',
  'Workflow Automation',
  'Lead Generation',
] as const;

/**
 * Get in Touch (#32) — quiet plates, website-first form, muted info marks.
 */
export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  });
  // Honeypot: bots fill this; humans never see it. Never sent to Supabase.
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    if (website.trim()) {
      setStatus('success');
      setFormData({ name: '', email: '', service: '', message: '' });
      setWebsite('');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    if (!supabase) {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
      setTimeout(() => {
        setStatus('idle');
        setErrorMessage('');
      }, 3000);
      return;
    }

    try {
      const { error } = await supabase.from('leads').insert([formData]);

      if (error) throw error;

      setStatus('success');
      setFormData({ name: '', email: '', service: '', message: '' });
      setWebsite('');

      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    } catch {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');

      setTimeout(() => {
        setStatus('idle');
        setErrorMessage('');
      }, 3000);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const fieldClass =
    'w-full rounded-lg border border-white/10 bg-black/25 px-4 py-3 text-white placeholder:text-white/35 transition-colors focus:border-purple-400/45 focus:outline-none';

  return (
    <section
      id="contact-section"
      className="relative isolate overflow-hidden bg-gray-900 px-6 py-16 md:px-10 md:py-24 lg:px-12"
    >
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
            Get in{' '}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/55 md:text-lg">
            Tell us about your site or next project. We&apos;ll reply with a clear next step.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-6 md:mt-14 md:grid-cols-2 md:gap-8 animate-on-scroll">
          <div className="contact-plate rounded-2xl p-6 md:p-8">
            <form onSubmit={handleSubmit} className="relative space-y-5">
              <div
                aria-hidden
                className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
              >
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-white/70">
                    Name <span className="text-red-400/90">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={fieldClass}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-white/70">
                    Email <span className="text-red-400/90">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={fieldClass}
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="mb-2 block text-sm font-medium text-white/70">
                    Service <span className="text-red-400/90">*</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className={`${fieldClass} [&>option]:text-black`}
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {SERVICES.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-white/70">
                    What do you need help with? <span className="text-red-400/90">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`${fieldClass} resize-none`}
                    placeholder="A short note on your site, SEO, or automation goals"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className={`contact-submit inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium tracking-wide text-white transition-opacity duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-400 ${
                  status === 'submitting' ? 'cursor-not-allowed opacity-50' : 'hover:opacity-90'
                }`}
              >
                {status === 'submitting' ? (
                  <>Sending...</>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle className="h-5 w-5" aria-hidden />
                    Sent
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" aria-hidden />
                    Send enquiry
                  </>
                )}
              </button>

              {status === 'error' && (
                <div className="mt-2 flex items-center gap-2 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
                  {errorMessage}
                </div>
              )}
            </form>
          </div>

          <aside className="contact-plate rounded-2xl p-6 md:p-8">
            <h3 className="text-lg font-medium tracking-tight text-white md:text-xl">
              Contact Information
            </h3>

            <ul className="mt-6 space-y-6">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-white/45" aria-hidden />
                <div>
                  <h4 className="text-sm font-medium text-white">Office Address</h4>
                  <p className="mt-1 text-sm leading-relaxed text-white/60">
                    Room N, 9/F, Kwun Tong Industrial Centre, 460 Kwun Tong Road, Kowloon, Hong Kong
                  </p>
                </div>
              </li>

              <li className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-white/45" aria-hidden />
                <div>
                  <h4 className="text-sm font-medium text-white">Phone</h4>
                  <p className="mt-1 text-sm text-white/60">
                    <a
                      href="tel:+85291678204"
                      className="transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-400"
                    >
                      +852 9167 8204
                    </a>
                  </p>
                </div>
              </li>

              <li className="flex gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-white/45" aria-hidden />
                <div>
                  <h4 className="text-sm font-medium text-white">Email</h4>
                  <p className="mt-1 text-sm text-white/60">
                    <a
                      href="mailto:info@hkaiautomation.com"
                      className="transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-400"
                    >
                      info@hkaiautomation.com
                    </a>
                  </p>
                </div>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
};
