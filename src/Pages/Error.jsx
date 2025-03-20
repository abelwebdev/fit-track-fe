import React from 'react'
import { NavLink } from 'react-router-dom'

function Error() {
  return (
    <section className="flex items-center h-screen p-16 bg-gray-50 dark:bg-gray-700">
      <div className="container flex flex-col items-center ">
        <div className="flex flex-col gap-6 max-w-md text-center">
          <h2 className="font-extrabold text-9xl text-gray-600 dark:text-gray-100">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl md:text-3xl dark:text-gray-300">Sorry, we couldn&apos;t find this page.</p>
          <NavLink to={`/`} className="mt-4 px-5 py-2.5 rounded-lg text-sm tracking-wider border bg-[#F8C146]"> Back to home
          </NavLink>
        </div>
      </div>
    </section>
  )
}

export default Error