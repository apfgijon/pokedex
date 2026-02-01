"use client";

import React from 'react';
import { useFilterStore } from '~/app/store/filterStore';
import { AVAILABLE_TYPES } from '~/trpc/model/types';

type FilterKeys = 'search' | 'type' | 'gen';

export const FilterBar: React.FC = () => {
  const { filters, setFilter, reset } = useFilterStore();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilter(name as FilterKeys, value);
  };

  return (
    <section className="w-full p-4 bg-white md:rounded-full rounded-2xl border-b border-slate-200 mb-4">
      <div className="flex flex-col md:flex-row md:items-end gap-4 max-w-6xl mx-auto">
        
        <div className="flex-1">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            Pokémon Name
          </label>
          <input
            name="search"
            type="text"
            placeholder="Search e.g. Pikachu..."
            value={filters.search}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-vlue-400 focus:border-blue-400 outline-none transition-all shadow-sm"
          />
        </div>
        <div className="w-full md:w-48">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            Type
          </label>
          <select
            name="type"
            value={filters.type}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-blue-400 outline-none shadow-sm cursor-pointer"
          >
            <option value="all">all</option>
            {AVAILABLE_TYPES.map(pType => (
            <option key={pType} value={pType}>{pType}</option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-48">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            Generation
          </label>
          <select
            name="gen"
            value={filters.gen}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-blue-400 outline-none shadow-sm cursor-pointer"
          >
            <option value="all">all</option>
            <option value="1">I</option>
            <option value="2">II</option>
            <option value="3">III</option>
            <option value="4">VI</option>
            <option value="5">V</option>
            <option value="6">VI</option>
            <option value="7">VII</option>
            <option value="8">VIII</option>
            <option value="9">IX</option>
          </select>
        </div>

        <button
          onClick={reset}
          className="mt-2 md:mt-0 w-full md:w-auto px-6 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200"
        >
          Reset
        </button>
      </div>
    </section>
  );
};
