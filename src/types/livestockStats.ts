export interface LivestockStatsMonth {
  month: number;
  label: string;
  maleBirths: number;
  femaleBirths: number;
  deaths: number;
  statusChanges: number;
}

export interface LivestockStatsYear {
  year: number;
  totalMaleBirths: number;
  totalFemaleBirths: number;
  totalBirths: number;
  totalDeaths: number;
  totalStatusChanges: number;
  months: LivestockStatsMonth[];
}
