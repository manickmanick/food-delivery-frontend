import { useState } from "react";

import Input from "../ui/Input";
import Button from "../ui/Button";

export default function AddressForm({ onSubmit }) {
  const [form, setForm] = useState({
    label: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
    isDefault: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(form);

    setForm({
      label: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      landmark: "",
      isDefault: false,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-10 rounded-xl bg-white p-6 shadow"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          placeholder="Label (Home)"
          value={form.label}
          onChange={(e) =>
            setForm({
              ...form,
              label: e.target.value,
            })
          }
        />

        <Input
          placeholder="Address Line 1"
          value={form.addressLine1}
          onChange={(e) =>
            setForm({
              ...form,
              addressLine1: e.target.value,
            })
          }
        />

        <Input
          placeholder="Address Line 2"
          value={form.addressLine2}
          onChange={(e) =>
            setForm({
              ...form,
              addressLine2: e.target.value,
            })
          }
        />

        <Input
          placeholder="City"
          value={form.city}
          onChange={(e) =>
            setForm({
              ...form,
              city: e.target.value,
            })
          }
        />

        <Input
          placeholder="State"
          value={form.state}
          onChange={(e) =>
            setForm({
              ...form,
              state: e.target.value,
            })
          }
        />

        <Input
          placeholder="Pincode"
          value={form.pincode}
          onChange={(e) =>
            setForm({
              ...form,
              pincode: e.target.value,
            })
          }
        />
      </div>

      <Button type="submit" className="mt-5">
        Save Address
      </Button>
    </form>
  );
}
