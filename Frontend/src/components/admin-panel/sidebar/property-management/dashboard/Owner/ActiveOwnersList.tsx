// ActiveOwnersList.tsx
const ActiveOwnersList = ({ owners }: any) => {
  return (
    <div className="p-4 bg-white shadow rounded-md overflow-auto">
      <div className="w-fit ">
        <h3 className="text-lg font-semibold mb-4">
          List of Last 10 Active Owners
        </h3>
        <table className="w-full border">
          <thead>
            <tr className="bg-yellow-100 text-left">
              <th className="p-2">Name</th>
              <th className="p-2">Contact</th>
              <th className="p-2">Profession</th>
              <th className="p-2">Code</th>
            </tr>
          </thead>
          <tbody>
            {owners.map((owner: any, index: any) => (
              <tr key={index} className="border-b w-fit">
                <td className="p-2">{owner.business_manager_name}</td>
                <td className="p-2">{owner.business_manager_contact}</td>
                <td className="p-2">{owner.business_manager_job_position}</td>
                <td className="p-2">{owner.business_po_box}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveOwnersList;
