export const Newsletter = () => {
  return (
    <div className="mx-auto max-w-4xl px-2 mb-16 md:grid grid-cols-12 gap-4">
      <div className="col-span-6 mb-8">
        <h2 className="inline text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-200 sm:block">
          Want product news and updates?
        </h2>
        <p className="inline text-3xl font-extrabold tracking-tight text-yellow-500 dark:text-yellow-400 sm:block">
          Sign up for my newsletter.
        </p>
      </div>

      <form className="col-span-6 sm:flex sm:items-center mb-8">
        <label htmlFor="emailAddress" className="sr-only">
          Email address
        </label>
        <input
          id="emailAddress"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="w-full px-5 py-3 placeholder-gray-500 focus:ring-yellow-500 focus:border-yellow-500 sm:max-w-xs border-gray-300 rounded-md"
          placeholder="Enter your email"
        />
        <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
          <button
            type="submit"
            className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Notify me
          </button>
        </div>
      </form>
    </div>
  );
};
