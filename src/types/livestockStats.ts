export interface LivestockMonthStatus {
  status: string;
  label: string;
  total: number;
}

export interface LivestockStatsMonth {
  month: number;
  label: string;
  maleBirths: number;
  femaleBirths: number;
  deaths: number;
  statusChanges: number;
  statusBreakdown: LivestockMonthStatus[];
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
