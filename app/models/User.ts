interface IUser {
  email: string;
  name: string;

  // assistant
  isAssistantEnabled: boolean;

  // speech
  isTextToSpeechEnabled: boolean;
  model: string;
  voice: string;

  // vision
  isVisionEnabled: boolean;
  visionId: string;

  // r.a.g.
  isRagEnabled: boolean;
  ragId?: string | null;
  topK: string;
  chunkSize: string;
  chunkBatch: string;
  parsingStrategy: string;
}
