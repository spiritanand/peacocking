import { z } from "zod";
import {
  ImageSize,
  LogLevel,
  OutputFormat,
  RequestStatus,
} from "@web/lib/constants";

// Image Generation Schemas
const GenerateImageSchema = z.object({
  url: z.string().url(),
  content_type: z.string(),
  height: z.number().int().positive(),
  width: z.number().int().positive(),
});

const ImageGenerationTimingsSchema = z.object({
  inference: z.number().optional(),
});

export const ImageGenerationInputSchema = z.object({
  loras: z.array(
    z.object({
      path: z.string(),
      scale: z.number(),
    }),
  ),
  prompt: z.string(),
  image_size: z.nativeEnum(ImageSize),
  num_images: z.number().int().positive(),
  output_format: z.nativeEnum(OutputFormat),
  guidance_scale: z.number(),
  num_inference_steps: z.number().int().positive(),
  enable_safety_checker: z.boolean(),
});

export const ImageGenerationOutputSchema = z.object({
  images: z.array(GenerateImageSchema),
  timings: ImageGenerationTimingsSchema,
  seed: z.number().int(),
  has_nsfw_concepts: z.array(z.boolean()),
  prompt: z.string(),
});

// Webhook Metadata Schema
export const WebhookMetadataSchema = z.object({
  request_id: z.string(),
  gateway_request_id: z.string(),
  status: z.enum(["OK", "ERROR"]),
  error: z.string().nullable(),
});

// Image Generation Webhook Schema
export const ImageGenerationWebhookSchema = WebhookMetadataSchema.extend({
  payload: ImageGenerationOutputSchema,
});

// Model Creation Schemas
const FileDetailsSchema = z.object({
  url: z.string().url(),
  content_type: z.string(),
  file_name: z.string(),
  file_size: z.number().int().positive(),
});

export const ModelTrainInputSchema = z.object({
  rank: z.number().int().positive(),
  steps: z.number().int().positive(),
  trigger_word: z.string(),
  learning_rate: z.number().positive(),
  images_data_url: z.string().url(),
  experimental_optimizers: z.string(),
  experimental_multi_checkpoints_count: z.number().int().nonnegative(),
});

export const ModelTrainOutputSchema = z.object({
  diffusers_lora_file: FileDetailsSchema,
  config_file: FileDetailsSchema,
  // debug_caption_files: FileDetailsSchema,
  // experimental_multi_checkpoints: z.array(FileDetailsSchema),
});

const ModelTrainErrorSchema = z.object({
  loc: z.array(z.string()), // Location of the error
  msg: z.string(), // Error message
  type: z.string(), // Error type
});

const ValidationErrorPayloadSchema = z.object({
  detail: z.array(ModelTrainErrorSchema),
});

// Define the main webhook schema using discriminated unions and extending the base schema
export const ModelCreationWebhookSchema = z.discriminatedUnion("status", [
  WebhookMetadataSchema.extend({
    status: z.literal("ERROR"),
    payload: ValidationErrorPayloadSchema,
  }),
  WebhookMetadataSchema.extend({
    status: z.literal("OK"),
    payload: ModelTrainOutputSchema,
  }),
]);

// Logging Schema
const LogEntrySchema = z.object({
  message: z.string(),
  level: z.nativeEnum(LogLevel),
  source: z.string(),
  timestamp: z.string(),
});
export const LogsSchema = z.array(LogEntrySchema);
export const ModelStatusSchema = z.object({
  status: z.nativeEnum(RequestStatus),
  queue_position: z.number().int().positive().optional(),
  response_url: z.string().url(),
});

export const AddCreditsSchema = z.object({
  credits: z.coerce
    .number({ message: "Please enter a number" })
    .min(1, "Please enter a number greater or equal to 1")
    .int("Please enter a whole number")
    .positive("Please enter a positive number"),
});
export type AddCredits = z.infer<typeof AddCreditsSchema>;

// Types inferred from the schemas
export type ImageGenerationInput = z.infer<typeof ImageGenerationInputSchema>;
export type ImageGenerationOutput = z.infer<typeof ImageGenerationOutputSchema>;
export type ImageGenerationApiResponse = z.infer<
  typeof ImageGenerationWebhookSchema
>;
export type ModelTrainInput = z.infer<typeof ModelTrainInputSchema>;
export type ModelCreationOutput = z.infer<typeof ModelTrainOutputSchema>;
export type ModelCreationApiResponse = z.infer<
  typeof ModelCreationWebhookSchema
>;
export type ApiResponseMetadata = z.infer<typeof WebhookMetadataSchema>;
export type LogEntry = z.infer<typeof LogEntrySchema>;
export type Logs = z.infer<typeof LogsSchema>;
export type ModelStatus = z.infer<typeof ModelStatusSchema>;
