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

const staff = [
  {
    id: "S-001",
    name: "Dr. Thirumal",
    role: "Chief Medical Officer",
    department: "Administration",
    phone: "+91 98765 43210",
    email: "dr.thirumal@example.com",
    status: "Active",
    joinDate: "2010-01-15",
  },
  {
    id: "S-002",
    name: "Dr. Sharma",
    role: "Senior Cardiologist",
    department: "Cardiology",
    phone: "+91 87654 32109",
    email: "dr.sharma@example.com",
    status: "Active",
    joinDate: "2012-03-22",
  },
  {
    id: "S-003",
    name: "Dr. Patel",
    role: "Gynecologist",
    department: "Gynecology",
    phone: "+91 76543 21098",
    email: "dr.patel@example.com",
    status: "Active",
    joinDate: "2014-06-10",
  },
  {
    id: "S-004",
    name: "Nurse Lakshmi",
    role: "Head Nurse",
    department: "Nursing",
    phone: "+91 65432 10987",
    email: "lakshmi@example.com",
    status: "Active",
    joinDate: "2015-08-05",
  },
  {
    id: "S-005",
    name: "Ravi Kumar",
    role: "Lab Technician",
    department: "Laboratory",
    phone: "+91 54321 09876",
    email: "ravi.kumar@example.com",
    status: "On Leave",
    joinDate: "2016-11-18",
  },
  {
    id: "S-006",
    name: "Anita Desai",
    role: "Pharmacist",
    department: "Pharmacy",
    phone: "+91 43210 98765",
    email: "anita.desai@example.com",
    status: "Active",
    joinDate: "2017-04-25",
  },
  {
    id: "S-007",
    name: "Suresh Menon",
    role: "Radiologist",
    department: "Radiology",
    phone: "+91 32109 87654",
    email: "suresh.menon@example.com",
    status: "Active",
    joinDate: "2018-09-12",
  },
]

export function StaffList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Staff</CardTitle>
        <CardDescription>A list of all staff members in the hospital.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staff.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-emerald-100 text-emerald-800">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-xs text-muted-foreground">{member.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>{member.department}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      <span>{member.phone}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{member.email}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={member.status === "Active" ? "outline" : "secondary"}>{member.status}</Badge>
                  </TableCell>
                  <TableCell>{new Date(member.joinDate).toLocaleDateString()}</TableCell>
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
                          <Link href={`/dashboard/staff/${member.id}`}>View Details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/staff/${member.id}/edit`}>Edit Staff</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Change Status</DropdownMenuItem>
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
          Showing <strong>7</strong> of <strong>25</strong> staff members
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
