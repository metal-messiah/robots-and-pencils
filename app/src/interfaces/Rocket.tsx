/* filtered object response from API */
export interface Rocket {
  id: number;
  badge: URL;
  name: string;
  type: string;
  launchDate: Date;
  details: string;
  article: URL;
}
