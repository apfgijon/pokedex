"use client";
//This is just a dynamic import because the ssr was trying to call server
//on build.
import dynamic from 'next/dynamic';

export const ListPokemon = dynamic(
  () => import('~/app/_components/pokelist').then((mod) => mod.ListPokemon),
  { ssr: false }
);
