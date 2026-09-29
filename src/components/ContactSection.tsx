import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Send, CheckCircle, AlertCircle, MapPin, Phone, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useMessages } from '../i18n';

/**
 * Get in Touch (#32) — quiet plates, website-first form, muted info marks.
 */
export const ContactSection = () => {
  const t = useMessages();
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

  const fail = () => {
    setStatus('error');
    setErrorMessage(t.contact.error);
    setTimeout(() => {
      setStatus('idle');
      setErrorMessage('');
    }, 3000);
  };

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
      fail();
      return;
    }

    try {
      const { error } = await supabase.from('leads').insert([formData]);
      if (error) throw error;

      setStatus('success');
      setFormData({ name: '', email: '', service: '', message: '' });
      setWebsite('');
      setTimeout(() => setStatus('idle'), 3000);
    } catch {
      fail();
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
            {t.contact.h2Before}{' '}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              {t.contact.h2Highlight}
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/55 md:text-lg">
            {t.contact.sub}
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
                    {t.contact.name} <span className="text-red-400/90">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={fieldClass}
                    placeholder={t.contact.phName}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-white/70">
                    {t.contact.email} <span className="text-red-400/90">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={fieldClass}
                    placeholder={t.contact.phEmail}
                  />
                </div>

                <div>
                  <label htmlFor="service" className="mb-2 block text-sm font-medium text-white/70">
                    {t.contact.service} <span className="text-red-400/90">*</span>
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
                      {t.contact.phService}
                    </option>
                    {t.contact.services.map((service) => (
                      <option key={service.value} value={service.value}>
                        {service.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-white/70">
                    {t.contact.message} <span className="text-red-400/90">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`${fieldClass} resize-none`}
                    placeholder={t.contact.phMessage}
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
                  <>{t.contact.sending}</>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle className="h-5 w-5" aria-hidden />
                    {t.contact.sent}
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" aria-hidden />
                    {t.contact.submit}
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
              {t.contact.infoHeading}
            </h3>

            <ul className="mt-6 space-y-6">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-white/45" aria-hidden />
                <div>
                  <h4 className="text-sm font-medium text-white">{t.contact.office}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-white/60">{t.contact.address}</p>
                </div>
              </li>

              <li className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-white/45" aria-hidden />
                <div>
                  <h4 className="text-sm font-medium text-white">{t.contact.phone}</h4>
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
                  <h4 className="text-sm font-medium text-white">{t.contact.emailLabel}</h4>
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
