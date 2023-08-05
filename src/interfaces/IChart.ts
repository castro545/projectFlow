/* eslint-disable no-unused-vars */

import { ChartInfo } from '../types/Chart';

export interface IChart {
  getChartInfoByProject(project_id: string[] | string | undefined): Promise<ChartInfo | null>;
}
