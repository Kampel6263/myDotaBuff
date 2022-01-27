/**
 * general state
 */
class GeneralState {
  /**
   * Is app ready
   */
  // public data;
  public heroes: object[] = [];
  public searchResult: object[] = [];
  public profile: object = {};
  public profileRecentMatches: object[] = [];
  public matchDetails: object = {};
  public showPreloader: number | null = null;
  public playerHeroes: object[] = [{}];
  public wardMapData: { obs: object; sen: object } = { obs: {}, sen: {} };
  public histograms: { x: number; games: number; win: number }[] = [];
}

export { GeneralState };
