import Link from 'next/link';

export const metadata = { title: 'Not Found' };

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <p className="mt-4 text-lg text-gray-600">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/" className="mt-6 inline-block rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
