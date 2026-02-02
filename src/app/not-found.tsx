import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-white">404</h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
        Error 404! Luxio is staring at you.
      </p>
      <br/>
        
      <article className="flex center h-20 w-20 shrink-0 items-center justify-center rounded-full bg-slate-100 transition-colors group-hover:bg-blue-50">
        <img
          src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/404.png'}
          alt={'Luxio (pokemon 404) image'}
          className="[image-rendering:pixelated] rendering-crisp-edges mix-blend-multiply h-16 w-16 object-contain"
        />
      </article>
      <Link 
        href="/" 
        className="mt-6 text-indigo-600 hover:text-indigo-500 font-medium underline underline-offset-4"
      >
        Back to pokedex
      </Link>
    </div>
  );
}
