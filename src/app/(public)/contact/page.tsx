'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, CheckCircle2, Send, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    category: 'admissions',
    programmeInterest: 'STEAM Explorers: Santorini Caldera',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate enquiry submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="max-w-3xl mb-12 space-y-3">
        <span className="text-xs font-bold tracking-widest text-amber-700 uppercase">
          Direct Communication
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          Connect With Our Admissions Advisory Team
        </h1>
        <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
          Whether you are a parent exploring summer study options, an educator planning a school delegation, or an enrolled student with questions about your itinerary, our team is here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Form Column */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-stone-200 shadow-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Enquiry Successfully Received
              </h3>
              <p className="text-stone-600 text-sm max-w-md mx-auto leading-relaxed">
                Thank you for contacting JourneyOS. An academic advisor will review your request and get back to you within 24 business hours at <span className="font-semibold text-stone-900">{formData.email}</span>.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                    Your Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Dr. Thomas Wright"
                    className="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm text-stone-900 focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm text-stone-900 focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                    Phone (Optional)
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm text-stone-900 focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                    Inquiry Topic
                  </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm text-stone-900 focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 bg-white"
                  >
                    <option value="admissions">Admissions & Eligibility</option>
                    <option value="safety">Health, Safety & Insurance</option>
                    <option value="school-groups">Institutional / School Delegations</option>
                    <option value="financial">Tuition, Scholarships & Payment</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="programmeInterest" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                  Programme of Interest
                </label>
                <select
                  id="programmeInterest"
                  value={formData.programmeInterest}
                  onChange={(e) => setFormData({ ...formData, programmeInterest: e.target.value })}
                  className="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm text-stone-900 focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 bg-white"
                >
                  <option value="STEAM Explorers: Santorini Caldera">STEAM Explorers: Aegean Volcanology (Santorini)</option>
                  <option value="Earth & Ice: Glaciology Expedition">Earth & Ice: Glaciology & Clean Tech (Reykjavik)</option>
                  <option value="Innovation Lab: AI & Robotics">Innovation Lab: AI, Robotics & Urban Systems (Tokyo)</option>
                  <option value="Reef Ecology & Marine Restoration">Reef Ecology & Marine Restoration (Bali)</option>
                  <option value="Medinas & Desert Ecosystems">Cultural Geography & Desert Astronomy (Marrakech)</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                  How can our advisors help you?
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about the student's age, academic interests, or any specific dietary/medical requirements..."
                  className="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm text-stone-900 focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-stone-900 text-white font-medium hover:bg-stone-800 transition-colors shadow-md disabled:opacity-50 text-sm"
              >
                {loading ? 'Submitting...' : 'Send Admissions Enquiry'}
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Right Info Column */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-stone-100 p-8 rounded-3xl border border-stone-200 space-y-6">
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Admissions & Support Desks
            </h3>

            <div className="space-y-5">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-white border border-stone-200 text-stone-800 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-amber-700" />
                </div>
                <div>
                  <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold">General & Admissions Inquiries</div>
                  <a href="mailto:admissions@journeyos.dev" className="text-sm font-medium text-stone-900 hover:text-amber-700 transition-colors">
                    admissions@journeyos.dev
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-white border border-stone-200 text-stone-800 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-amber-700" />
                </div>
                <div>
                  <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Admissions Hotline</div>
                  <div className="text-sm font-medium text-stone-900">+1 (800) 555-JOURNEY</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-white border border-stone-200 text-stone-800 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-amber-700" />
                </div>
                <div>
                  <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Advising Office Hours</div>
                  <div className="text-sm text-stone-700">Monday – Friday: 08:30 – 18:00 (EST)</div>
                  <div className="text-xs text-stone-500 mt-0.5">24/7 emergency dispatch active during live trips</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-white border border-stone-200 text-stone-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-amber-700" />
                </div>
                <div>
                  <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Global Operations Office</div>
                  <div className="text-sm text-stone-700">Educational Expeditions Directorate</div>
                  <div className="text-xs text-stone-500">London • Boston • Singapore</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-6 rounded-3xl border border-amber-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-900 uppercase tracking-wider">
              <MessageSquare className="w-4 h-4 text-amber-700" />
              Direct Parent Consultations
            </div>
            <p className="text-xs text-amber-900/80 leading-relaxed">
              Prefer a 1-on-1 video briefing with a programme director? Submit your preferred date and time above and our team will provide a calendar link for your family.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
