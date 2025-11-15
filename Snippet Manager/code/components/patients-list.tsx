import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, Phone } from "lucide-react"
import Link from "next/link"

const patients = [
  {
    id: "P-7891",
    name: "Rajesh Kumar",
    age: 45,
    gender: "Male",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@example.com",
    bloodGroup: "O+",
    address: "123 Main Street, Mumbai, Maharashtra",
    lastVisit: "2023-04-15",
    status: "Admitted",
  },
  {
    id: "P-5623",
    name: "Priya Singh",
    age: 32,
    gender: "Female",
    phone: "+91 87654 32109",
    email: "priya.singh@example.com",
    bloodGroup: "B+",
    address: "456 Park Avenue, Delhi, Delhi",
    lastVisit: "2023-04-14",
    status: "Admitted",
  },
  {
    id: "P-3421",
    name: "Amit Verma",
    age: 58,
    gender: "Male",
    phone: "+91 76543 21098",
    email: "amit.verma@example.com",
    bloodGroup: "A-",
    address: "789 Lake View, Bangalore, Karnataka",
    lastVisit: "2023-04-12",
    status: "Admitted",
  },
  {
    id: "P-9078",
    name: "Sunita Reddy",
    age: 27,
    gender: "Female",
    phone: "+91 65432 10987",
    email: "sunita.reddy@example.com",
    bloodGroup: "AB+",
    address: "234 Hill Road, Chennai, Tamil Nadu",
    lastVisit: "2023-04-10",
    status: "Discharged",
  },
  {
    id: "P-2345",
    name: "Vikram Malhotra",
    age: 62,
    gender: "Male",
    phone: "+91 54321 09876",
    email: "vikram.malhotra@example.com",
    bloodGroup: "O-",
    address: "567 River Side, Kolkata, West Bengal",
    lastVisit: "2023-04-09",
    status: "Admitted",
  },
  {
    id: "P-6789",
    name: "Meera Joshi",
    age: 41,
    gender: "Female",
    phone: "+91 43210 98765",
    email: "meera.joshi@example.com",
    bloodGroup: "B-",
    address: "890 Mountain View, Hyderabad, Telangana",
    lastVisit: "2023-04-08",
    status: "Discharged",
  },
  {
    id: "P-1234",
    name: "Arjun Nair",
    age: 35,
    gender: "Male",
    phone: "+91 32109 87654",
    email: "arjun.nair@example.com",
    bloodGroup: "A+",
    address: "345 Ocean Front, Pune, Maharashtra",
    lastVisit: "2023-04-07",
    status: "Discharged",
  },
]

export function PatientsList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Patients</CardTitle>
        <CardDescription>A list of all patients in the hospital database.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Blood Group</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Status</TableHead>
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
                        <div className="text-xs text-muted-foreground">
                          {patient.age} yrs, {patient.gender}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      <span>{patient.phone}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{patient.email}</div>
                  </TableCell>
                  <TableCell>{patient.bloodGroup}</TableCell>
                  <TableCell>{new Date(patient.lastVisit).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={patient.status === "Admitted" ? "outline" : "secondary"}>{patient.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/patients/${patient.id}`}>View Details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/patients/${patient.id}/edit`}>Edit Patient</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/patients/${patient.id}/history`}>Medical History</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Discharge Patient</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          Showing <strong>7</strong> of <strong>100</strong> patients
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
