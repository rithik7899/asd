import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { JSX } from "react"

// interface ExamResult {
//   candidateName: string
//   rollNumber: string
//   category: string
//   examDate: string,
//   examTime: string
//   venueName: string
//   subjectName: string
//   rrbZone: string
//   ranks: {
//     zone: string
//     overall: string
//     shift: string
//     category: string
//   }
//   averageMarks: {
//     overall: number
//     shift: number
//     category: number
//   }
// }

export interface StudentProps {
    fullName: string,
    category: string,
    testDate: string,
    testTime: string,
    rollNumber: number,
    ranks: {
        overallRank: number,
        categoryRank: number
    },
    testCenter: string,
    subject: string
}

export default function RankCard({ 
    fullName, 
    category, 
    testDate, 
    testTime, 
    rollNumber, 
    ranks, 
    testCenter, 
    subject }: StudentProps ): JSX.Element {

  const result = {
//     candidateName: "Manmohan Singh",
//     rollNumber: "281241170410494",
//     category: "OBC",
//     examDate: "26/11/2024",
//     examTime: "12:30 PM - 1:30 PM",
//     venueName: "iON Digital Zone iDZ 2 Sector 62",
//     subjectName: "ALP Stage 1",
//     rrbZone: "gorakhpur",
//     ranks: {
//       zone: "157/655",
//       overall: "13428/61288",
//       shift: "819/3986",
//       category: "2299/31235"
//     },
    averageMarks: {
      overall: 32.96,
      shift: 32.68,
      category: 34.86
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Candidat details Card */}
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

        {/* Rankings Card */}
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
              {/* <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-center text-sm font-medium text-gray-500">Shift Rank</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-2xl font-bold text-purple-900">{result.ranks.shift}</p>
                </CardContent>
              </Card> */}
            </div>

            <div className="mt-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-center text-sm font-medium text-gray-500">Category Rank</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-2xl font-bold text-purple-900">{ranks.categoryRank}</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-center text-sm font-medium text-gray-500">Average Marks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-2xl font-bold text-purple-900">{result.averageMarks.overall}</p>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-center text-sm font-medium text-gray-500">Shift Average</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-2xl font-bold text-purple-900">{result.averageMarks.shift}</p>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-center text-sm font-medium text-gray-500">Category Average</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-2xl font-bold text-purple-900">{result.averageMarks.category}</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

