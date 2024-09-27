export enum ImageSize {
  SQUARE_HD = "square_hd",
  SQUARE = "square",
  PORTRAIT_4_3 = "portrait_4_3",
  PORTRAIT_16_9 = "portrait_16_9",
  LANDSCAPE_4_3 = "landscape_4_3",
  LANDSCAPE_16_9 = "landscape_16_9",
}
export enum OutputFormat {
  JPEG = "jpeg",
  PNG = "png",
}

export enum LogLevel {
  STDERR = "STDERR",
  STDOUT = "STDOUT",
  ERROR = "ERROR",
  INFO = "INFO",
  WARN = "WARN",
  DEBUG = "DEBUG",
}

export enum RequestType {
  MODEL = "MODEL",
  GEN = "GEN",
}
export const RequestTypeDescription: Record<RequestType, string> = {
  [RequestType.MODEL]: "Model",
  [RequestType.GEN]: "Image",
};

export enum RequestStatus {
  IN_QUEUE = "IN_QUEUE",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}
export const RequestStatusDescription: Record<RequestStatus, string> = {
  [RequestStatus.IN_QUEUE]: "Request is waiting to be processed",
  [RequestStatus.IN_PROGRESS]: "Request is currently being processed",
  [RequestStatus.COMPLETED]: "Request has been successfully completed",
  [RequestStatus.FAILED]: "Request processing has failed",
};

export const INR_TO_USD_RATE = 84;
