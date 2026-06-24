import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import AddressForm from "../components/address/AddressForm";

import AddressCard from "../components/address/AddressCard";

import {
  getAddresses,
  createAddress,
  deleteAddress,
  setDefaultAddress,
} from "../api/addressApi";

export default function AddressesPage() {
  const [addresses, setAddresses] = useState([]);

  const loadAddresses = async () => {
    const response = await getAddresses();

    setAddresses(response.data.data);
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  const handleCreate = async (form) => {
    await createAddress(form);

    loadAddresses();
  };

  const handleDelete = async (id) => {
    await deleteAddress(id);

    loadAddresses();
  };

  const handleDefault = async (id) => {
    await setDefaultAddress(id);

    loadAddresses();
  };

  return (
    <MainLayout>
      <section className="min-h-screen bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="mb-10 text-4xl font-bold">My Addresses</h1>

          <AddressForm onSubmit={handleCreate} />

          <div className="space-y-4">
            {addresses.map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                onDelete={handleDelete}
                onDefault={handleDefault}
              />
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
