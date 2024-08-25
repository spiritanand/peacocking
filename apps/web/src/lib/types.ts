interface Image {
  url: string;
  content_type: string;
  height: number;
  width: number;
}
interface Timings {
  inference?: number;
}
export interface GeneratedImageResponse {
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
