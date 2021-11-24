import React, { useContext } from 'react';
import ErrorMessage from "components/ui/ErrorMessage";
import ErrorOccurrenceContext from "components/contexts/ErrorOccurrenceContext";

export default function ErrorCard() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);

    return (
        <section
            className="mt-20 grid grid-cols-1 lg:grid-cols-5 2xl:grid-cols-1 items-stretch ~bg-white shadow-lg">
            <main id="exception" className="z-10 lg:col-span-3 2xl:col-span-1">
                <div className="overflow-hidden">
                    <div className="px-6 sm:px-10 py-8 overflow-x-auto">
                        <header className="flex items-center justify-between">
                            <nav className="group h-10 px-4 items-center flex rounded-sm ~bg-gray-500/5">
                                <p className="flex flex-wrap leading-tight">
                                    <span>Illuminate
                                        <span className="mx-0.5">\</span>
                                        <wbr/>
                                    </span>
                                    <span>Database
                                        <span className="mx-0.5">\</span>
                                        <wbr/>
                                    </span>
                                    <span>QueryException
                                        <wbr/>
                                    </span>
                                </p>
                                <button>
                                    <i className="ml-3 fas fa-angle-down group-hover:text-red-500 text-sm"/>
                                </button>
                            </nav>
                            <div className="grid grid-flow-col justify-end gap-4 text-sm ~text-gray-500">
                                <span>
                                    <span className="tracking-wider">PHP</span>
                                    {' '}{errorOccurrence.language_version}
                                </span>
                                <span>
                                    <i className="fab fa-laravel"/>
                                    {' '}{errorOccurrence.framework_version}
                                </span>
                            </div>
                        </header>

                        <ErrorMessage />

                        {/*<div className="grid grid-cols-1 gap-x-10 gap-y-2 text-sm">*/}
                        {/*    <span className="flex flex-wrap leading-tight">*/}
                        {/*        <span>https:</span>*/}
                        {/*        <span className="mx-0.5">//</span>*/}
                        {/*        <a href="" className="hover:underline">webapp.test</a>*/}
                        {/*        <span className="mx-0.5">/</span>*/}
                        {/*        <a className="hover:underline" href="">admin</a>*/}
                        {/*        <span className="mx-0.5">/</span>*/}
                        {/*        <a className="hover:underline" href="">products</a>*/}
                        {/*        <span className="mx-0.5">/</span>*/}
                        {/*        <a className="hover:underline" href="">details</a>*/}
                        {/*    </span>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </main>
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
        </section>
    )
}
