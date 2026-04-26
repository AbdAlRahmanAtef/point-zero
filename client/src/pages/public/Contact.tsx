import React, { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulation only
  };

  return (
    <div className="w-full flex-1 flex items-center justify-center py-20 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl w-full mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">Get in Touch</h1>
            <p className="text-neutral-400 text-lg">
              Interested in our simulated services? Reach out to our team to
              start your project.
            </p>
          </div>

          <div className="space-y-6">
            <ContactInfo
              icon={<Mail className="w-6 h-6 text-cyan-400" />}
              title="Email"
              value="contact@zer0-p0int.demo"
            />
            <ContactInfo
              icon={<Phone className="w-6 h-6 text-cyan-400" />}
              title="Phone"
              value="+1 (555) 123-4567"
            />
            <ContactInfo
              icon={<MapPin className="w-6 h-6 text-cyan-400" />}
              title="Location"
              value="123 Simulation Ave, Cyber City, Digital Realm"
            />
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-cyan-500 focus:outline-none text-white transition-colors"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-cyan-500 focus:outline-none text-white transition-colors"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">
                  Message
                </label>
                <textarea
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-cyan-500 focus:outline-none text-white transition-colors h-32 resize-none"
                  placeholder="Tell us about your project..."
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2"
              >
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Send className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
              <p className="text-neutral-400">
                Thank you for contacting us. Since this is a demo, no email was
                actually sent.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-cyan-400 hover:text-cyan-300 font-medium"
              >
                Send another message
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ContactInfo({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1 w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="text-neutral-400">{value}</p>
      </div>
    </div>
  );
}
