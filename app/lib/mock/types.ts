// ScamAlert TypeScript Types
// Based on user's original model

// Comment entity
export interface Comment {
  id: string;
  content: string;
  poster: {
    username: string;
  };
}

// Victim entity (who posted the scam)
export interface Victim {
  username: string;
  anonymous?: boolean; // anonymous flag but not going to use it
}

// Scam entity - main entity
export interface Scam {
  id: string;
  scam_id: string; // 6-character nano-id format: scam-{6-char-nano-id}
  title: string;
  content: string;
  type: string; // category
  platform: string[]; // tags style, single or multiple
  location: string[]; // tags style, single or multiple
  victim: Victim; // who posted the scam
  evidence_urls: string[]; // array of urls
  upvotes: number;
  comments: Comment[];
}
