export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          404
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Страница не найдена
        </p>
        <a
          href="/"
          className="mt-6 inline-block rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Вернуться на главную
        </a>
      </div>
    </div>
  )
}
