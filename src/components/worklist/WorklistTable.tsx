export default function WorklistTable() {
  const cases = [
    {
      patient: "Rahul Sharma",
      institution: "Apollo",
      site: "Pune",
      doctor: "Dr. Patil",
      status: "Pending",
    },
    {
      patient: "Priya Mehta",
      institution: "Ruby Hall",
      site: "Mumbai",
      doctor: "Dr. Joshi",
      status: "Completed",
    },
    {
      patient: "Amit Verma",
      institution: "Apollo",
      site: "Nashik",
      doctor: "Dr. Kulkarni",
      status: "Pending",
    },
  ];

  return (
    <div className="bg-white border rounded-2xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left p-4">Patient</th>
            <th className="text-left p-4">Institution</th>
            <th className="text-left p-4">Site</th>
            <th className="text-left p-4">Doctor</th>
            <th className="text-left p-4">Status</th>
          </tr>
        </thead>

        <tbody>
          {cases.map((item, index) => (
            <tr
              key={index}
              className="border-t"
            >
              <td className="p-4">{item.patient}</td>
              <td className="p-4">{item.institution}</td>
              <td className="p-4">{item.site}</td>
              <td className="p-4">{item.doctor}</td>
              <td className="p-4">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}