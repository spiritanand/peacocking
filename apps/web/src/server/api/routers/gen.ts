import { falAxiosInstance } from "@web/data/axiosClient";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const genRouter = createTRPCRouter({
  generateImage: protectedProcedure.mutation(async () => {
    try {
      const res = await falAxiosInstance.post(
        "/fal-ai/flux/schnell",
        {
          prompt:
            'Extreme close-up of a single tiger eye, direct frontal view. Detailed iris and pupil. Sharp focus on eye texture and color. Natural lighting to capture authentic eye shine and depth. The word "SPIRIT" is painted over it in big, white brush strokes with visible texture.',
          image_size: "landscape_4_3",
          num_inference_steps: 4,
          num_images: 1,
          enable_safety_checker: true,
        },
        {
          params: {
            // fal_webhook: "http://localhost:3000/api/fal/webhook",
          },
        },
      );

      console.log({ res });
    } catch (e) {
      console.log({ e });
    }

    return {
      url: "https://example.com",
    };
  }),
});
