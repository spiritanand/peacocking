import CustomImage from "@web/components/ui/custom-image";

const faqs: {
  question: string;
  answer: string;
}[] = [
  {
    question: "How many images do I need?",
    answer:
      "For starters, you need a minimum of 10 images. If you want to get the most out of the platform, we recommend uploading at least 12 or more images.",
  },
  {
    question: "How long does the whole process take?",
    answer:
      "It takes less than 5 minutes for the model to train. After that each image you want takes less than 10 seconds.",
  },
  {
    question: "What file formats of images are accepted?",
    answer:
      "We accept a variety of formats, including JPEG and PNG. Ensure your images are high resolution for the best results.",
  },
  //   {
  //     question: "How secure is the payment process?",
  //     answer:
  //       "We use industry-standard encryption and payment gateways to ensure that your transactions are secure and protected.",
  //   },
  {
    question: "Who owns the generated images?",
    answer:
      "You retain full ownership of the images you upload and any generated content. We do not claim any rights to your creations.",
  },
  {
    question:
      "Are there any limitations on the number of images I can generate?",
    answer:
      "Each image generation costs 0.25 credits. You can purchase credits to generate more images.",
  },
  //   {
  //     question: "How is my privacy protected?",
  //     answer:
  //       "We take your privacy seriously. All images are processed securely, and we do not share or store them longer than necessary to generate your content.",
  //   },
  //   {
  //     question: "Can I use the generated images for commercial purposes?",
  //     answer:
  //       "Yes, you have full commercial rights to use the images generated by our platform. However, please ensure that the content adheres to any applicable copyright laws.",
  //   },
  {
    question: "What should I do if my images are not generating correctly?",
    answer:
      "If you're experiencing issues with image generation, please ensure that your images meet the recommended quality guidelines. If problems persist, contact our support team for assistance.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "Payments are handled through Razorpay which accepts certain Visa/Mastercard depending on your country.",
  },
];

export default function FAQ() {
  return (
    <div className="mx-auto mb-20 max-w-7xl px-6 py-10" id="faq">
      <div className="lg:grid lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-base leading-7 text-gray-600">
            Can’t find the answer you’re looking for? Reach out to our{" "}
            <a
              href="mailto:support@peacocking.pro"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              customer support
            </a>{" "}
            team.
          </p>
          <CustomImage
            src="/man-book-faq.jpeg"
            alt="faq guy"
            className="mt-8 h-auto rounded-md"
            loading="lazy"
          />
        </div>
        <div className="mt-10 lg:col-span-7 lg:mt-0">
          <dl className="space-y-8">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <dt className="text-base text-xl font-semibold leading-7 text-gray-900">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
