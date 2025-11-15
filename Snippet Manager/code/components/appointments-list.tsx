import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Clock, MoreHorizontal, User } from "lucide-react"

const appointments = [
  {
    id: "A-1234",
    patient: "Meera Joshi",
    patientId: "P-6789",
    doctor: "Dr. Thirumal",
    department: "Cardiology",
    date: "2023-04-20",
    time: "09:00 AM",
    status: "Scheduled",
    type: "Consultation",
    avatar: "/images/patient-6.jpg",
  },
  {
    id: "A-1235",
    patient: "Arjun Nair",
    patientId: "P-1234",
    doctor: "Dr. Sharma",
    department: "Orthopedics",
    date: "2023-04-20",
    time: "10:30 AM",
    status: "Confirmed",
    type: "Follow-up",
    avatar: "/images/patient-7.jpg",
  },
  {
    id: "A-1236",
    patient: "Kavita Sharma",
    patientId: "P-8765",
    doctor: "Dr. Patel",
    department: "Gynecology",
    date: "2023-04-20",
    time: "11:45 AM",
    status: "Scheduled",
    type: "Consultation",
    avatar: "/images/patient-8.jpg",
  },
  {
    id: "A-1237",
    patient: "Rahul Mehta",
    patientId: "P-5432",
    doctor: "Dr. Gupta",
    department: "Neurology",
    date: "2023-04-20",
    time: "01:15 PM",
    status: "Confirmed",
    type: "Follow-up",
    avatar: "/images/patient-9.jpg",
  },
  {
    id: "A-1238",
    patient: "Ananya Patel",
    patientId: "P-2109",
    doctor: "Dr. Thirumal",
    department: "Cardiology",
    date: "2023-04-20",
    time: "03:00 PM",
    status: "Scheduled",
    type: "Consultation",
    avatar: "/images/patient-10.jpg",
  },
]

export function AppointmentsList() {
  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Doctor</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={appointment.avatar} alt={appointment.patient} />
                    <AvatarFallback>{appointment.patient.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{appointment.patient}</div>
                    <div className="text-xs text-muted-foreground">{appointment.patientId}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>{appointment.doctor}</span>
                </div>
                <div className="text-xs text-muted-foreground">{appointment.department}</div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(appointment.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{appointment.time}</span>
                </div>
              </TableCell>
              <TableCell>{appointment.type}</TableCell>
              <TableCell>
                <Badge variant={appointment.status === "Confirmed" ? "outline" : "secondary"}>
                  {appointment.status}
                </Badge>
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
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Reschedule</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Cancel Appointment</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
