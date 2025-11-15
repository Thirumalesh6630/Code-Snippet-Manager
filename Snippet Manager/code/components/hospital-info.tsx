export function HospitalInfo() {
  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <h1 className="text-3xl font-bold mb-2">Thirumal Hospital</h1>
        <p className="text-emerald-100 mb-8">Healthcare Management System</p>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-3">About Thirumal Hospital</h2>
          <p className="text-emerald-100 mb-4">
            Founded in 1995, Thirumal Hospital has been at the forefront of healthcare excellence for over 25 years. Our
            state-of-the-art facilities and dedicated medical professionals ensure that every patient receives the
            highest standard of care.
          </p>
          <p className="text-emerald-100">
            With specializations in cardiology, neurology, orthopedics, and pediatrics, we offer comprehensive
            healthcare services to meet the diverse needs of our community.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Our Mission</h3>
          <p className="text-emerald-100">
            To provide accessible, compassionate, and high-quality healthcare services that improve the health and
            well-being of the communities we serve.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            "Dedicated to providing exceptional healthcare services with compassion and excellence."
          </h2>
          <p className="text-emerald-100">Dr. Thirumal, Founder</p>
        </div>
      </div>
    </div>
  )
}
