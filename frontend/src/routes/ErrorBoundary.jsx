import { isRouteErrorResponse, useRouteError } from 'react-router';

export function ErrorBoundary() {
  const error = useRouteError();
  console.log('error: ', error);

  return (
    <div className='flex min-h-dvh flex-col items-center justify-center space-y-10'>
      <h2 className='text-center text-xl lg:text-2xl'>
        {isRouteErrorResponse(error) && `${error.status} ${error.statusText}`}
        {error instanceof Error && `${error.message}`}
      </h2>
      <button
        className='cursor-pointer rounded-lg border p-3 hover:bg-gray-400 hover:text-white'
        onClick={() => window.location.replace('/')}
      >
        메인으로 돌아가기
      </button>
    </div>
  );
}
