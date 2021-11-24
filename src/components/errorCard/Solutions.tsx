import React, { useContext } from 'react';
import ErrorOccurrenceContext from "../contexts/ErrorOccurrenceContext";

export default function Solutions() {
    const { solutions } = useContext(ErrorOccurrenceContext);

    return (
        <aside id="solution" className="flex flex-col w-full lg:col-span-2 2xl:col-span-1">
            <div className="flex-grow px-6 sm:px-10 py-8 text-gray-800  bg-green-300">
                <button
                    className="absolute top-4 right-4 leading-none opacity-50 hover:opacity-75 text-sm"><i
                    className="fas fa-times"/></button>
                <section className="mt-2 (optical-correction)">
                    <button className="mb-4 group flex items-center justify-start ">
                        <i className="-ml-6 w-6 fas fa-angle-down opacity-0 group-hover:opacity-40 text-sm"/>
                        <h2 className="min-w-0 truncate font-semibold leading-snug">
                            Have you set up your database?
                        </h2>
                    </button>
                </section>
                <hr className="mb-4 border-t border-gray-800/20"/>
                <section>
                    <button className="group mb-4 flex items-center justify-start">
                        <i className="-ml-6 w-6 far fa-angle-up opacity-0 group-hover:opacity-40 text-sm"/>
                        <h2 className="min-w-0 truncate font-semibold leading-snug">
                            Have you ran migrations?</h2>
                    </button>
                    <div
                        className="my-4 max-w-max flex items-stretch pl-4 pr-2 py-2 bg-gray-800/60 rounded-sm">
                        <code className="flex items-center flex-grow text-gray-100 font-mono text-sm">php
                            artisan migrate</code>
                        <button className="
                                  ml-4
                                  px-4
                                  h-8
                                  bg-white/20
                                  text-white
                                  whitespace-nowrap
                                  border-b border-gray-500/25
                                  text-xs uppercase tracking-wider
                                  font-bold
                                  rounded-sm
                                  shadow-md
                                  hover:shadow-lg
                                  active:shadow-none
                              ">
                            Run
                        </button>
                    </div>
                    <ul className="grid grid-cols-1 gap-y-1 text-sm">
                        <li>
                            <a href="https://laravel.com/docs/master/migrations#running-migrations"
                               target="_blank" className="underline text-green-700 dark:text-green-800">Database:
                                Running Migrations</a>
                        </li>
                        <li>
                            <a href="https://laravel.com/docs/master/migrations#running-migrations"
                               target="_blank" className="underline text-green-700 dark:text-green-800">CLI:
                                Artisan Migrate</a>
                        </li>
                    </ul>
                </section>
            </div>
        </aside>
    )
}
