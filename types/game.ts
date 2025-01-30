export interface MapConfig {
  [key: string]: [number, number]; // [casePrécédente, caseSuivante]
}

export interface GameSession {
  id: string;
  mapId: string;
  players: Player[];
  currentPlayerIndex: number;
  status: 'waiting' | 'playing' | 'finished';
}

export interface Map {
  id: string;
  name: string;
  config: MapConfig;
}

export interface Player {
  id: string;
  position: number;
  name: string;
}
