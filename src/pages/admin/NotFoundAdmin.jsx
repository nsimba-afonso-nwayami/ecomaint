import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import Modal from "./components/Modal";

export default function NotFoundAdmin() {
  return (
    <>
      <title>Página náo encontrada | Eco Maint</title>

      <AdminLayout title="Página náo encontrada">
        <section className="space-y-4"></section>
      </AdminLayout>
    </>
  );
}
