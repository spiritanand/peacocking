import {
  type ImageSize,
  type LogLevel,
  type OutputFormat,
} from "@web/lib/constants";

interface Image {
  url: string;
  content_type: string;
  height: number;
  width: number;
}
interface Timings {
  inference?: number;
}

export interface GenerateImageFromLoRAInput {
  loras: {
    path: string;
    scale: number;
  }[];
  prompt: string;
  image_size: ImageSize;
  num_images: number;
  output_format: OutputFormat;
  guidance_scale: number;
  num_inference_steps: number;
  enable_safety_checker: boolean;
}
export interface GenerateImageFromLoRAOutput {
  images: Image[];
  timings: Timings;
  seed: number;
  has_nsfw_concepts: boolean[];
  prompt: string;
}

type FileDetails = {
  url: string;
  content_type: string;
  file_name: string;
  file_size: number;
};
type ExperimentalCheckpoint = FileDetails;
export interface CreateNewModelResponse {
  diffusers_lora_file: FileDetails;
  config_file: FileDetails;
  debug_caption_files: FileDetails;
  experimental_multi_checkpoints: ExperimentalCheckpoint[];
}

type LogItem = {
  message: string;
  level: LogLevel;
  source: string;
  timestamp: string;
};
export type Logs = LogItem[];
