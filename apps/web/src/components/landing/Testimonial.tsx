export default function Testimonial() {
  return (
    <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <div className="flex items-center justify-center gap-4">
          <img alt="" src="external/YT.png" className="h-12" />
        </div>
        <figure className="mt-10">
          <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
            <p>
              “I was skeptical about using AI for my business, but Peacocking
              exceeded my expectations. The quality of the thumbnails is
              incredible, and the process was incredibly easy. The views on my
              channel has increased by 50% in the last month in part thanks to
              Peacocking.”
            </p>
          </blockquote>
          <figcaption className="mt-10">
            <img
              alt="Anand"
              src="/avatars/anand.jpg"
              className="mx-auto h-10 w-10 rounded-full object-cover"
            />
            <div className="mt-4 flex items-center justify-center space-x-3 text-base">
              <div className="font-semibold text-gray-900">
                Suryansh &quot;Spirit&quot; Anand
              </div>
              <svg
                width={3}
                height={3}
                viewBox="0 0 2 2"
                aria-hidden="true"
                className="fill-gray-900"
              >
                <circle r={1} cx={1} cy={1} />
              </svg>
              <div className="text-gray-600">
                Builder 🛠 | Content Creator 📸
              </div>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
