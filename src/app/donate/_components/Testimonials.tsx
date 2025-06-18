import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "NoteInsight has transformed how I organize my research. I'm happy to support such a valuable tool!",
      author: "Sarah M., Researcher",
      role: "Donor",
    },
    {
      quote:
        "As a student, I rely on NoteInsight daily. Donating is my way of saying thanks for keeping it free.",
      author: "James T., Student",
      role: "Donor",
    },
    {
      quote:
        "I've tried many note apps, but NoteInsight's simplicity is unmatched. Happy to contribute to its development!",
      author: "Alex P., Developer",
      role: "Donor",
    },
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Supporters Say</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from users who have contributed to NoteInsight&apos;s success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#d8f999]"
            >
              <p className="text-gray-700 italic mb-6">
                &quot;{testimonial.quote}&quot;
              </p>
              <div className="flex items-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                <div className="ml-4">
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
