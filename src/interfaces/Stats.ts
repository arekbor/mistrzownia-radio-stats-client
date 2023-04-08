export interface Stats {
  id: number;
  steamId: string;
  username: string;
  avatarURL: string;
  profileURL: string;
  youtubeURL: string;
  youtubeName: string;
  datetime: string;
  countAllStats: number;
}

export interface ResponseStats {
  count: number;
  data: Stats[];
}
