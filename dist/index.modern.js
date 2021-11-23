import React from 'react';

function Stacktrace() {
  return React.createElement("p", null, "stacktrace hehe 123");
}

function ErrorSection({
  errorOccurrence
}) {
  return React.createElement("section", {
    className: "mt-20 grid grid-cols-1 lg:grid-cols-5 2xl:grid-cols-1 items-stretch ~bg-white shadow-lg"
  }, React.createElement("main", {
    id: "exception",
    className: "z-10 lg:col-span-3 2xl:col-span-1"
  }, React.createElement("div", {
    className: "overflow-hidden"
  }, React.createElement("div", {
    className: "px-6 sm:px-10 py-8 overflow-x-auto"
  }, React.createElement("header", {
    className: "flex items-center justify-between"
  }, React.createElement("nav", {
    className: "group h-10 px-4 items-center flex rounded-sm ~bg-gray-500/5"
  }, React.createElement("p", {
    className: "flex flex-wrap leading-tight"
  }, React.createElement("span", null, "Illuminate", React.createElement("span", {
    className: "mx-0.5"
  }, "\\"), React.createElement("wbr", null)), React.createElement("span", null, "Database", React.createElement("span", {
    className: "mx-0.5"
  }, "\\"), React.createElement("wbr", null)), React.createElement("span", null, "QueryException", React.createElement("wbr", null))), React.createElement("button", null, React.createElement("i", {
    className: "ml-3 fas fa-angle-down group-hover:text-red-500 text-sm"
  }))), React.createElement("div", {
    className: "grid grid-flow-col justify-end gap-4 text-sm ~text-gray-500"
  }, React.createElement("span", null, React.createElement("span", {
    className: "tracking-wider"
  }, "PHP"), "7.2"), React.createElement("span", null, React.createElement("i", {
    className: "fab fa-laravel"
  }), " 7.4"))), React.createElement("h1", {
    className: "my-4 font-semibold leading-snug text-xl"
  }, errorOccurrence.exception_message, "SQLSTATE[42S02]:", React.createElement("br", null), "Base table or view not found: 1146 Table 'products' doesn't exist"), React.createElement("div", {
    className: "mt-4 group ~bg-gray-500/5"
  }, React.createElement("div", {
    className: "max-h-32 overflow-hidden mask-fade-y"
  }, React.createElement("div", {
    className: "px-4 py-2 mask-fade-x"
  }, React.createElement("code", {
    className: "font-mono leading-relaxed text-sm font-normal"
  }, React.createElement("pre", null, "SQL: select * from `users` where `uuid` =", "\n", "47a4af2e-5156-4277-86a0-b55e773f6d1e limit 1", "\n", "SQL: select * from `users` where `uuid` =", "\n", "47a4af2e-5156-4277-86a0-b55e773f6d1e limit 1")))), React.createElement("button", {
    className: "absolute top-2 right-2 hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
  }, React.createElement("i", {
    className: "far fa-copy"
  })), React.createElement("button", {
    className: "absolute -bottom-3 left-1/2 transform -translate-x-1/2 opacity-0 shadow-md ~bg-white ~text-gray-500 hover:text-indigo-500 group-hover:opacity-100 w-6 h-6 rounded-full flex items-center justify-center text-xs "
  }, React.createElement("i", {
    className: "fas fa-angle-down"
  })))))), React.createElement("aside", {
    id: "solution",
    className: "flex flex-col w-full lg:col-span-2 2xl:col-span-1"
  }, React.createElement("div", {
    className: "flex-grow px-6 sm:px-10 py-8 text-gray-800  bg-green-300"
  }, React.createElement("button", {
    className: "absolute top-4 right-4 leading-none opacity-50 hover:opacity-75 text-sm"
  }, React.createElement("i", {
    className: "fas fa-times"
  })), React.createElement("section", {
    className: "mt-2 (optical-correction)"
  }, React.createElement("button", {
    className: "mb-4 group flex items-center justify-start "
  }, React.createElement("i", {
    className: "-ml-6 w-6 fas fa-angle-down opacity-0 group-hover:opacity-40 text-sm"
  }), React.createElement("h2", {
    className: "min-w-0 truncate font-semibold leading-snug"
  }, "Have you set up your database?"))), React.createElement("hr", {
    className: "mb-4 border-t border-gray-800/20"
  }), React.createElement("section", null, React.createElement("button", {
    className: "group mb-4 flex items-center justify-start"
  }, React.createElement("i", {
    className: "-ml-6 w-6 far fa-angle-up opacity-0 group-hover:opacity-40 text-sm"
  }), React.createElement("h2", {
    className: "min-w-0 truncate font-semibold leading-snug"
  }, "Have you ran migrations?")), React.createElement("div", {
    className: "my-4 max-w-max flex items-stretch pl-4 pr-2 py-2 bg-gray-800/60 rounded-sm"
  }, React.createElement("code", {
    className: "flex items-center flex-grow text-gray-100 font-mono text-sm"
  }, "php artisan migrate"), React.createElement("button", {
    className: "\n                                  ml-4\n                                  px-4\n                                  h-8\n                                  bg-white/20\n                                  text-white\n                                  whitespace-nowrap\n                                  border-b border-gray-500/25\n                                  text-xs uppercase tracking-wider\n                                  font-bold\n                                  rounded-sm\n                                  shadow-md\n                                  hover:shadow-lg\n                                  active:shadow-none\n                              "
  }, "Run")), React.createElement("ul", {
    className: "grid grid-cols-1 gap-y-1 text-sm"
  }, React.createElement("li", null, React.createElement("a", {
    href: "https://laravel.com/docs/master/migrations#running-migrations",
    target: "_blank",
    className: "underline text-green-700 dark:text-green-800"
  }, "Database: Running Migrations")), React.createElement("li", null, React.createElement("a", {
    href: "https://laravel.com/docs/master/migrations#running-migrations",
    target: "_blank",
    className: "underline text-green-700 dark:text-green-800"
  }, "CLI: Artisan Migrate")))))));
}

export { ErrorSection as ErrorCard, Stacktrace };
