import { useEffect, useState } from "react";

import Input from "../ui/Input";
import Button from "../ui/Button";

const INITIAL_FORM = {
  label: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  pincode: "",
  landmark: "",
  isDefault: false,
};

export default function AddressForm({
  initialValues = INITIAL_FORM,
  onSubmit,
  submitButtonText = "Save Address",
}) {
  const [form, setForm] = useState(INITIAL_FORM);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm({
      ...INITIAL_FORM,
      ...initialValues,
    });
  }, [initialValues]);

  const validateForm = () => {
    const newErrors = {};

    if (!form.label.trim()) {
      newErrors.label = "Label is required";
    }

    if (!form.addressLine1.trim()) {
      newErrors.addressLine1 = "Address Line 1 is required";
    }

    if (!form.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!form.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!form.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(form.pincode)) {
      newErrors.pincode = "Pincode must contain exactly 6 digits";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mb-10 rounded-xl bg-white p-6 shadow"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Input
            placeholder="Label (Home, Office...)"
            value={form.label}
            onChange={(e) => handleChange("label", e.target.value)}
            hasError={!!errors.label}
          />

          {errors.label && (
            <p className="mt-1 pl-1 text-xs font-medium text-red-500">
              {errors.label}
            </p>
          )}
        </div>

        <div>
          <Input
            placeholder="Address Line 1"
            value={form.addressLine1}
            onChange={(e) => handleChange("addressLine1", e.target.value)}
            hasError={!!errors.addressLine1}
          />

          {errors.addressLine1 && (
            <p className="mt-1 pl-1 text-xs font-medium text-red-500">
              {errors.addressLine1}
            </p>
          )}
        </div>

        <div>
          <Input
            placeholder="Address Line 2 (Optional)"
            value={form.addressLine2}
            onChange={(e) => handleChange("addressLine2", e.target.value)}
          />
        </div>

        <div>
          <Input
            placeholder="City"
            value={form.city}
            onChange={(e) => handleChange("city", e.target.value)}
            hasError={!!errors.city}
          />

          {errors.city && (
            <p className="mt-1 pl-1 text-xs font-medium text-red-500">
              {errors.city}
            </p>
          )}
        </div>

        <div>
          <Input
            placeholder="State"
            value={form.state}
            onChange={(e) => handleChange("state", e.target.value)}
            hasError={!!errors.state}
          />

          {errors.state && (
            <p className="mt-1 pl-1 text-xs font-medium text-red-500">
              {errors.state}
            </p>
          )}
        </div>

        <div>
          <Input
            placeholder="Pincode"
            maxLength={6}
            value={form.pincode}
            onChange={(e) => handleChange("pincode", e.target.value)}
            hasError={!!errors.pincode}
          />

          {errors.pincode && (
            <p className="mt-1 pl-1 text-xs font-medium text-red-500">
              {errors.pincode}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <Input
            placeholder="Landmark (Optional)"
            value={form.landmark}
            onChange={(e) => handleChange("landmark", e.target.value)}
          />
        </div>

        <div className="md:col-span-2 flex items-center gap-3">
          <input
            id="default-address"
            type="checkbox"
            checked={form.isDefault}
            onChange={(e) => handleChange("isDefault", e.target.checked)}
          />

          <label htmlFor="default-address" className="cursor-pointer text-sm">
            Make this my default address
          </label>
        </div>
      </div>

      <Button type="submit" className="mt-6">
        {submitButtonText}
      </Button>
    </form>
  );
}
