import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import Modal from "./components/Modal";

export default function DashboardAdmin() {

  return (
    <>
      <title>Dashboard | Eco Maint</title>

      <AdminLayout title="Início">
        
        <section className="space-y-4">
        </section>

      </AdminLayout>
    </>
  );
}
