import React, { useState, useMemo, useEffect } from "react";
import MemberCard from "../components/MemberCard";
import memberData from "../data/MEMBER.json";
import SkeletonLoader from "../utils/SkeletonLoader";

export default function MemberList() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // ✅ Simulasikan loading data dari file JSON
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // delay 0.8 detik untuk efek skeleton
    return () => clearTimeout(timer);
  }, []);

  // 🔍 Filter + Pencarian + Urutkan A–Z
  const filteredMembers = useMemo(() => {
    const filtered = memberData.filter((m) => {
      const matchesSearch =
        m.nama_member.toLowerCase().includes(search.toLowerCase()) ||
        m.biodata?.namaPanggilan
          ?.toLowerCase()
          .includes(search.toLowerCase());
      const matchesFilter =
        filter === "all" ||
        m.kategori.toLowerCase().includes(filter.toLowerCase());
      return matchesSearch && matchesFilter;
    });

    return filtered.sort((a, b) =>
      a.nama_member.localeCompare(b.nama_member, "id", { sensitivity: "base" })
    );
  }, [search, filter]);

  // ⏳ Saat loading, tampilkan skeleton loader
  if (loading) return <SkeletonLoader type="member" />;

  return (
    <div className="max-w-7xl mx-auto py-1 text-gray-800">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          👩‍🎤 Daftar Member JKT48
        </h2>
      </div>

      {/* FILTER KATEGORI */}
      <div className="flex flex-wrap gap-3 mb-6">
        {["all", "anggota", "trainee"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition cursor-pointer ${
              filter === f
                ? "bg-red-400 text-white"
                : "bg-[#0b0b0b] text-gray-200 hover:bg-[#2a0e12]"
            }`}
          >
            {f === "all"
              ? "Semua"
              : f.charAt(0).toUpperCase() + f.slice(1).toLowerCase()}
          </button>
        ))}

        {/* SEARCH BAR */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center w-full sm:w-auto">
          <input
            type="text"
            placeholder="Cari member..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
          />
        </div>
      </div>

      {/* GRID MEMBER */}
      {filteredMembers.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-4 md:grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-4">
          {filteredMembers.map((member, i) => (
            <MemberCard key={i} data={member} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500">
          <p className="text-lg font-semibold text-red-600 mb-2">
            Tidak ditemukan ⚠️
          </p>
          <p className="text-sm">Coba ubah pencarian atau kategori.</p>
        </div>
      )}
    </div>
  );
}
