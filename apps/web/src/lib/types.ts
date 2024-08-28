import { z } from "zod";
import { ImageSize, LogLevel, OutputFormat } from "@web/lib/constants";

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

// API Response Metadata Schema
export const ApiResponseMetadataSchema = z.object({
  request_id: z.string(),
  gateway_request_id: z.string(),
  status: z.enum(["OK", "ERROR"]),
  error: z.null().or(z.string()),
});

// Image Generation API Response Schema
export const ImageGenerationWebhookSchema = ApiResponseMetadataSchema.extend({
  payload: ImageGenerationOutputSchema,
});

// Model Creation Schemas
const FileDetailsSchema = z.object({
  url: z.string().url(),
  content_type: z.string(),
  file_name: z.string(),
  file_size: z.number().int().positive(),
});

export const ModelCreationOutputSchema = z.object({
  diffusers_lora_file: FileDetailsSchema,
  config_file: FileDetailsSchema,
  debug_caption_files: FileDetailsSchema,
  experimental_multi_checkpoints: z.array(FileDetailsSchema),
});

export const ModelCreationWebhookSchema = ApiResponseMetadataSchema.extend({
  payload: ModelCreationOutputSchema,
});

// Logging Schema
const LogEntrySchema = z.object({
  message: z.string(),
  level: z.nativeEnum(LogLevel),
  source: z.string(),
  timestamp: z.string(),
});

export const LogsSchema = z.array(LogEntrySchema);

// Types inferred from the schemas
export type ImageGenerationInput = z.infer<typeof ImageGenerationInputSchema>;
export type ImageGenerationOutput = z.infer<typeof ImageGenerationOutputSchema>;
export type ImageGenerationApiResponse = z.infer<
  typeof ImageGenerationWebhookSchema
>;
export type ModelCreationOutput = z.infer<typeof ModelCreationOutputSchema>;
export type ModelCreationApiResponse = z.infer<
  typeof ModelCreationWebhookSchema
>;
export type ApiResponseMetadata = z.infer<typeof ApiResponseMetadataSchema>;
export type LogEntry = z.infer<typeof LogEntrySchema>;
export type Logs = z.infer<typeof LogsSchema>;
