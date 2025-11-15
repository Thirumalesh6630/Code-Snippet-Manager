import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

const patients = [
  {
    id: "P-7891",
    name: "Rajesh Kumar",
    age: 45,
    gender: "Male",
    condition: "Cardiac",
    status: "Critical",
    doctor: "Dr. Sharma",
    admittedOn: "2023-04-15",
  },
  {
    id: "P-5623",
    name: "Priya Singh",
    age: 32,
    gender: "Female",
    condition: "Pregnancy",
    status: "Stable",
    doctor: "Dr. Patel",
    admittedOn: "2023-04-14",
  },
  {
    id: "P-3421",
    name: "Amit Verma",
    age: 58,
    gender: "Male",
    condition: "Respiratory",
    status: "Improving",
    doctor: "Dr. Thirumal",
    admittedOn: "2023-04-12",
  },
  {
    id: "P-9078",
    name: "Sunita Reddy",
    age: 27,
    gender: "Female",
    condition: "Fracture",
    status: "Stable",
    doctor: "Dr. Gupta",
    admittedOn: "2023-04-10",
  },
  {
    id: "P-2345",
    name: "Vikram Malhotra",
    age: 62,
    gender: "Male",
    condition: "Stroke",
    status: "Critical",
    doctor: "Dr. Thirumal",
    admittedOn: "2023-04-09",
  },
]

export function RecentPatients() {
  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Age/Gender</TableHead>
            <TableHead>Condition</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Doctor</TableHead>
            <TableHead>Admitted On</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-emerald-100 text-emerald-800">
                      {patient.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{patient.name}</div>
                    <div className="text-xs text-muted-foreground">{patient.id}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {patient.age} / {patient.gender}
              </TableCell>
              <TableCell>{patient.condition}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    patient.status === "Critical"
                      ? "destructive"
                      : patient.status === "Stable"
                        ? "outline"
                        : "secondary"
                  }
                >
                  {patient.status}
                </Badge>
              </TableCell>
              <TableCell>{patient.doctor}</TableCell>
              <TableCell>{new Date(patient.admittedOn).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <Link href={`/dashboard/patients/${patient.id}`}>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
