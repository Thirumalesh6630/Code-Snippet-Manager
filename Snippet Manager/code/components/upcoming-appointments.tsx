import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock } from "lucide-react"
import Link from "next/link"

const appointments = [
  {
    id: "A-1234",
    patient: "Meera Joshi",
    time: "09:00 AM",
    type: "Consultation",
  },
  {
    id: "A-1235",
    patient: "Arjun Nair",
    time: "10:30 AM",
    type: "Follow-up",
  },
  {
    id: "A-1236",
    patient: "Kavita Sharma",
    time: "11:45 AM",
    type: "Consultation",
  },
  {
    id: "A-1237",
    patient: "Rahul Mehta",
    time: "01:15 PM",
    type: "Follow-up",
  },
  {
    id: "A-1238",
    patient: "Ananya Patel",
    time: "03:00 PM",
    type: "Consultation",
  },
]

export function UpcomingAppointments() {
  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div key={appointment.id} className="flex items-center justify-between rounded-lg border p-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-emerald-100 text-emerald-800">
                {appointment.patient
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{appointment.patient}</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{appointment.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>Today</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{appointment.type}</Badge>
            <Link href={`/dashboard/appointments/${appointment.id}`}>
              <Button variant="ghost" size="sm">
                View
              </Button>
            </Link>
          </div>
        </div>
      ))}
      <Link href="/dashboard/appointments">
        <Button variant="outline" className="w-full">
          View All Appointments
        </Button>
      </Link>
    </div>
  )
}
