import Button from "../ui/Button";

export default function AddressCard({ address, onDelete, onDefault }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold">{address.label}</h3>

            {address.isDefault && (
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                Default
              </span>
            )}
          </div>

          <p className="mt-3">{address.addressLine1}</p>

          {address.addressLine2 && <p>{address.addressLine2}</p>}

          <p>
            {address.city}, {address.state}
          </p>

          <p>{address.pincode}</p>

          {address.landmark && <p>Landmark: {address.landmark}</p>}
        </div>

        <div className="flex gap-2">
          {!address.isDefault && (
            <Button onClick={() => onDefault(address.id)}>Make Default</Button>
          )}

          <Button
            className="bg-red-500 hover:bg-red-600"
            onClick={() => onDelete(address.id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
