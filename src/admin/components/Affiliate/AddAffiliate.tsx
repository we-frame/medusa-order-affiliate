"use client";

import { XMark } from "@medusajs/icons";
import { Button, Input, toast } from "@medusajs/ui";
import React, { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

interface AddAffiliateTypes {
  refetch: Function;
}

const AddAffiliate = ({ refetch }: AddAffiliateTypes) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const dialogRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    setShowModal(true);
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closeModal = () => {
    setShowModal(false);
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const requestBody = {
        first_name: name.split(" ")[0],
        last_name: name.split(" ").length >= 2 ? name.split(" ")[1] : "",
        password: uuidv4(),
        email: email,
      };

      const response = await fetch("http://localhost:9000/store/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to add affiliate");
      }

      toast.success("Successfully added new affiliate");
      refetch(); // refetch affiliate data

      const result = await response.json();
      console.log("Affiliate added:", result);

      // Reset form
      setName("");
      setEmail("");
      closeModal();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={openModal}
        variant="secondary"
        className="bg-pink-50 hover:bg-pink-50 border border-pink-50 rounded-xl shadow-sm active:text-pink-50 text-base text-white font-medium px-3"
      >
        Add Affiliate
      </Button>
      <dialog
        ref={dialogRef}
        id="reAssessmentTimer"
        className="w-11/12 max-w-md border-none rounded-lg shadow-xl p-0 overflow-hidden"
      >
        <div className="w-full px-6 py-4 flex flex-col items-start justify-center gap-3 bg-white">
          <div className="w-full flex items-center justify-between">
            <h4 className="text-base font-medium">Add Affiliate</h4>
            <button onClick={closeModal} className="cursor-pointer">
              <XMark />
            </button>
          </div>

          <form
            className="w-full flex flex-col items-start justify-start gap-3"
            onSubmit={handleSubmit}
          >
            {/* <div className="w-full">
              <label htmlFor="name" className="text-sm font-medium">
                Name
                <span className="text-red-500 ml-[1px]">*</span>
              </label>
              <Input
                placeholder="Enter Full name"
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 border border-black"
                required
              />
            </div> */}

            <div className="w-full">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  className="block w-full rounded-md border p-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  placeholder="Enter Full name"
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* <div className="w-full">
              <label htmlFor="email" className="text-sm font-medium">
                Email
                <span className="text-red-500 ml-[1px]">*</span>
              </label>
              <Input
                placeholder="Enter e-mail"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
                required
              />
            </div> */}

            <div className="w-full">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  className="block w-full rounded-md p-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 border"
                  placeholder="Enter e-mail"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="w-full flex items-center justify-end gap-2 mt-3">
              <Button
                type="submit"
                variant="transparent"
                className="bg-blue-200 text-blue-500 text-sm hover:bg-blue-200 hover:text-blue-500"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </Button>

              <Button
                variant="transparent"
                onClick={closeModal}
                className="bg-red-200 text-red-500 text-sm hover:bg-red-200 hover:text-red-500"
              >
                Close
              </Button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default AddAffiliate;
