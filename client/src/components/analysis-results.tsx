import { AnalysisReport } from "@/lib/types";
import { OverallScore } from "./overall-score";
import { DetailedAnalysis } from "./detailed-analysis";
import { CoreWebVitals } from "./core-web-vitals";
import { ImprovementGuide } from "./improvement-guide";
import { ReportDownload } from "./report-download";

interface AnalysisResultsProps {
  report: AnalysisReport;
}

export function AnalysisResults({ report }: AnalysisResultsProps) {
  return (
    <div className="space-y-8">
      <OverallScore report={report} />
      <DetailedAnalysis report={report} />
      <CoreWebVitals report={report} />
      <ImprovementGuide report={report} />
      <ReportDownload report={report} />
    </div>
  );
}
