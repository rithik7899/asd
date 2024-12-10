import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download } from 'lucide-react'
import { JSX, useRef } from "react"
import { toPng } from "html-to-image"
import TopRankers from "./TopRank"
import ScoreCard from "./DownloadCard"

export interface MarksAboveData {
  marksAbove70: Record<string, number>;
  marksAbove65: Record<string, number>;
  marksAbove60: Record<string, number>;
  marksAbove55: Record<string, number>;
  marksAbove50: Record<string, number>;
  marksAbove45: Record<string, number>;
  marksAbove40: Record<string, number>;
  marksAbove35: Record<string, number>;
  marksAbove30: Record<string, number>;
  marksAbove20: Record<string, number>;
}

export interface StudentProps {
  fullName: string
  category: string
  testDate: string
  testTime: string
  rollNumber: string
  subject: string
  testCenter: string
  ranks: {
    overallRank: number
    categoryRank: number
    shiftRank: number
  }
  avgMarks: {
    overallAverageMarks: {
      _avg: {
        totalMarks: number
      }
    },
    categoryAverageMarks: {
      _avg: {
        totalMarks: number
      }
    },
    shiftAverageMarks: {
      _avg: {
        totalMarks: number
      }
    }
  }
  stats: {
    attempted: number
    notAttempted: number
    correct: number
    wrong: number
    totalMarks: number
  },
  topRankers: MarksAboveData
}

export function RankCard({
  fullName,
  category,
  testDate,
  testTime,
  rollNumber,
  ranks,
  testCenter,
  subject,
  avgMarks,
  stats,
  topRankers
}: StudentProps): JSX.Element {

  const scorecardRef = useRef<HTMLDivElement | null>(null)

  const downloadScorecard = async () => {
    if (scorecardRef.current) {
      const dataUrl = await toPng(scorecardRef.current, {
        quality: 1.0,
        backgroundColor: 'white',
      });

      const link = document.createElement('a');
      link.download = `_scorecard.png`;
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-6">
      <ScoreCard
        category={category}
        name={fullName}
        examDate={testDate}
        examTime={testTime}
        totalMarks={stats.totalMarks}
        rawRank={ranks.overallRank}
        subjectData={stats}
        ref={scorecardRef}
      //  normalizedMarks=0
      //  normalizedMarks=0
      />
      <div className="mx-auto max-w-4xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-purple-900">Candidate Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex justify-between border-b py-2">
                <span className="text-sm font-medium text-gray-500">Candidate Name</span>
                <span className="font-semibold text-gray-900">{fullName}</span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span className="text-sm font-medium text-gray-500">Roll Number</span>
                <span className="font-mono text-gray-900">{rollNumber}</span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span className="text-sm font-medium text-gray-500">Category</span>
                <Badge variant="secondary">{category.toLocaleUpperCase()}</Badge>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between border-b py-2">
                <span className="text-sm font-medium text-gray-500">Exam Date</span>
                <span className="text-gray-900">{testDate}</span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span className="text-sm font-medium text-gray-500">Exam Time</span>
                <span className="text-gray-900">{testTime}</span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span className="text-sm font-medium text-gray-500">Subject</span>
                <span className="text-gray-900">{subject}</span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span className="text-sm font-medium text-gray-500">Venue</span>
                <span className="text-gray-900">{testCenter}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-100 to-white">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-purple-900">
              Your Rank Among All Candidates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-center text-sm font-medium text-gray-500">Overall Rank</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-2xl font-bold text-purple-900">{ranks.overallRank}</p>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-center text-sm font-medium text-gray-500">Category Rank</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-2xl font-bold text-purple-900">{ranks.categoryRank}</p>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-center text-sm font-medium text-gray-500">Shift Rank</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-2xl font-bold text-purple-900">{ranks.shiftRank}</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-center text-sm font-medium text-gray-500">Average Marks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-2xl font-bold text-purple-900">
                    {avgMarks.overallAverageMarks._avg.totalMarks.toFixed(2)}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-center text-sm font-medium text-gray-500">Category Average</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-2xl font-bold text-purple-900">
                    {avgMarks.categoryAverageMarks._avg.totalMarks.toFixed(2)}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-center text-sm font-medium text-gray-500">Shift Average</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-2xl font-bold text-purple-900">
                    {avgMarks.shiftAverageMarks._avg.totalMarks.toFixed(2)}
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-purple-900">
              Marks in each subjects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[200px] text-left font-medium text-gray-500">Subject</TableHead>
                  <TableHead className="text-right font-medium text-gray-500">Attem.</TableHead>
                  <TableHead className="text-right font-medium text-gray-500">Not Attem.</TableHead>
                  <TableHead className="text-right font-medium text-gray-500">R</TableHead>
                  <TableHead className="text-right font-medium text-gray-500">W</TableHead>
                  <TableHead className="text-right font-medium text-gray-500">Marks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="hover:bg-gray-50">
                  <TableCell>{subject}</TableCell>
                  <TableCell className="text-right">{stats.attempted}</TableCell>
                  <TableCell className="text-right">{stats.notAttempted}</TableCell>
                  <TableCell className="text-right">{stats.correct}</TableCell>
                  <TableCell className="text-right">{stats.wrong}</TableCell>
                  <TableCell className="text-right">{stats.totalMarks.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow className="bg-gray-100 hover:bg-gray-200">
                  <TableCell className="font-medium">Overall</TableCell>
                  <TableCell className="text-right">{stats.attempted}</TableCell>
                  <TableCell className="text-right">{stats.notAttempted}</TableCell>
                  <TableCell className="text-right">{stats.correct}</TableCell>
                  <TableCell className="text-right">{stats.wrong}</TableCell>
                  <TableCell className="text-right">{stats.totalMarks.toFixed(2)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <div className="mt-4 flex justify-center">
              <Button variant="default" onClick={downloadScorecard} className="bg-purple-600 hover:bg-purple-700 text-white">
                <Download className="mr-2 h-4 w-4" />
                Download Your Scorecard Again
              </Button>
            </div>

            <div className="mt-6 space-y-2 text-center">
              <p className="text-sm">
                <span className="font-medium text-gray-500">Bonus Marks:</span>{" "}
                <span className="text-purple-600 font-semibold">+0</span>
              </p>
              <p className="text-sm">
                <span className="font-medium text-gray-500">Normalised Marks:</span>{" "}
                <span className="font-semibold text-gray-900">--</span>
              </p>
            </div>

            <div className="mt-6">
              <div className="bg-purple-600 text-white py-3 px-4 rounded-lg text-center font-medium">
                Your Normalised Rank
              </div>
              <div className="grid gap-6 md:grid-cols-3 mt-3">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-center text-sm font-medium text-gray-500">Rank</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-2xl font-bold text-purple-900">--</p>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-center text-sm font-medium text-gray-500">Shift Rank</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-2xl font-bold text-purple-900">--</p>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-center text-sm font-medium text-gray-500">Category Rank</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-2xl font-bold text-purple-900">--</p>
                </CardContent>
              </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <TopRankers data={topRankers} />
    </div>
  )
}

