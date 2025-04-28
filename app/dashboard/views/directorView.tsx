'use client';

import React from 'react';
import Image from 'next/image';
import Pagination from '@/app/dashboard/components/pagination';
import Search from '@/app/dashboard/components/search';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';

import { Suspense } from 'react';

import { getSelf, getUsers } from '@/app/lib/data';
import { generatePagination } from '@/app/lib/utils';
import { useState, useEffect } from 'react';

function DirectorView(userData: any) {
  const [allUsers, setAllUsers] = useState<any>(null);
  const [users, setUsers] = useState<any>(null);
  const [query, setQuery] = useState<String>('');
  const [currentPage, setPage] = useState<number>(1);
  const [totalPages, setTotal] = useState<number>(1);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await getUsers();
        // console.log(data)
        setAllUsers(data);
        setUsers(data);
        setTotal(Math.ceil(Object.keys(data).length / 10));
        //   setLoading(false);
      } catch (error) {
        console.log(error);
        //   setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  useEffect(() => {
    if (query === '') {
      setUsers(allUsers);
      allUsers && setTotal(Math.ceil(Object.keys(allUsers).length / 10));
      setPage(1);
    } else {
      const filteredUsers = Object.keys(allUsers)
        .filter(
          (email) =>
            allUsers[email].first_name
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            allUsers[email].last_name
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            email.split('@')[0].toLowerCase().includes(query.toLowerCase()) ||
            allUsers[email].registration_status.toLowerCase() ===
              query.toLowerCase(),
        )
        .reduce(
          (
            res: Record<string, (typeof allUsers)[keyof typeof allUsers]>,
            email,
          ) => ((res[email] = allUsers[email]), res),
          {},
        );

      setUsers(filteredUsers);
      // console.log(filteredUsers)
      setTotal(Math.ceil(Object.keys(filteredUsers).length / 10));
      setPage(1);
    }
  }, [query]);

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-full max-w-2xl justify-between">
        <div className="flex w-full items-center justify-between">
          <h1 className={`text-2xl`}>Hackers</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <div className="relative flex flex-1 flex-shrink-0">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              placeholder="Search hackers..."
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>

          {/* <CreateInvoice /> */}
        </div>

        <div className="mt-6 flow-root">
          <div className="inline-block min-w-full align-middle">
            <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {users &&
                  Object.keys(users)
                    .slice((currentPage - 1) * 10, currentPage * 10)
                    .map((email: string) => (
                      <div
                        key={email}
                        className="mb-2 w-full rounded-md bg-white p-4"
                      >
                        <div className="flex items-center justify-between border-b pb-4">
                          <div>
                            <div className="mb-2 flex items-center">
                              {/* <Image
                          src={users[email].image_url}
                          className="mr-2 rounded-full"
                          width={28}
                          height={28}
                          alt={`${users[email].first_name}'s profile picture`}
                      /> */}
                              <p>
                                {users[email].first_name}{' '}
                                {users[email].last_name}
                              </p>
                            </div>
                            <p className="text-sm text-gray-500">{email}</p>
                          </div>
                          {/* <InvoiceStatus status={invoice.status} /> */}
                        </div>
                        <div className="flex w-full items-center justify-between pt-4">
                          <div>
                            <p className="text-xl font-medium">
                              {users[email].registration_status}
                            </p>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Link
                              href={`/dashboard`}
                              className="rounded-md border p-2 hover:bg-gray-100"
                            >
                              <PencilIcon className="w-5" />
                            </Link>

                            {/* <form> */}
                            <button
                              onClick={() =>
                                (
                                  document.getElementById(
                                    email,
                                  ) as HTMLDialogElement
                                )?.showModal()
                              }
                              className="rounded-md border p-2 hover:bg-gray-100"
                            >
                              <span className="sr-only">Delete</span>
                              <TrashIcon className="w-5" />
                            </button>
                            {/* </form> */}
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
              <table className="hidden min-w-full text-gray-900 md:table">
                <thead className="rounded-lg text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Hacker
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Email
                    </th>
                    {/* <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                  Date
                  </th> */}
                    <th scope="col" className="px-3 py-5 font-medium">
                      Registration Status
                    </th>
                    <th scope="col" className="relative py-3 pl-6 pr-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {users &&
                    Object.keys(users)
                      .slice((currentPage - 1) * 10, currentPage * 10)
                      .map((email: string) => (
                        <tr
                          key={email}
                          className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                        >
                          <td className="whitespace-nowrap py-3 pl-6 pr-3">
                            <div className="flex items-center gap-3">
                              {/* <Image
                          src={users[email].image_url}
                          className="rounded-full"
                          width={28}
                          height={28}
                          alt={`${users[email].first_name}'s profile picture`}
                      /> */}
                              <p>
                                {users[email].first_name}{' '}
                                {users[email].last_name}
                              </p>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-3">
                            {email}
                          </td>
                          <td className="whitespace-nowrap px-3 py-3">
                            {users[email].registration_status}
                          </td>
                          {/* <td className="whitespace-nowrap px-3 py-3">
                      {formatDateToLocal(invoice.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                      <InvoiceStatus status={invoice.status} />
                  </td> */}
                          <td className="whitespace-nowrap py-3 pl-6 pr-3">
                            <div className="flex justify-end gap-3">
                              <Link
                                href={`/dashboard`}
                                className="rounded-md border p-2 hover:bg-gray-100"
                              >
                                <PencilIcon className="w-5" />
                              </Link>

                              {/* <form> */}
                              <button
                                onClick={() =>
                                  (
                                    document.getElementById(
                                      email,
                                    ) as HTMLDialogElement
                                  )?.showModal()
                                }
                                className="rounded-md border p-2 hover:bg-gray-100"
                              >
                                <span className="sr-only">Delete</span>
                                <TrashIcon className="w-5" />
                              </button>
                              {/* </form> */}
                            </div>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {users &&
          Object.keys(users)
            .slice((currentPage - 1) * 10, currentPage * 10)
            .map((email: string) => (
              <dialog key={email} id={email} className="modal bg-transparent">
                <div className="bg-card text-card-foreground rounded-3xl border bg-gray-50 p-8 shadow-sm">
                  <div className="modal-box">
                    <h3 className="text-3xl font-bold">
                      Confirm delete user {email}?
                    </h3>
                    <hr className="h-px w-full border-0 bg-gray-50"></hr>

                    <p className="py-4 text-xl">This action cannot be undone</p>
                  </div>

                  <form method="dialog" className="modal-backdrop">
                    <button className="ring-offset-background focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground mr-2 inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                      Cancel
                    </button>
                    <button className="ring-offset-background focus-visible:ring-ring text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                      Delete
                    </button>
                  </form>
                </div>
              </dialog>
            ))}

        <div className="mt-5 flex w-full justify-center">
          <div className="inline-flex">
            <PaginationArrow
              direction="left"
              // href={createPageURL(currentPage - 1)}
              isDisabled={currentPage <= 1}
            />

            <div className="flex -space-x-px">
              {allPages.map((page, index) => {
                let position:
                  | 'first'
                  | 'last'
                  | 'single'
                  | 'middle'
                  | undefined;

                if (index === 0) position = 'first';
                if (index === allPages.length - 1) position = 'last';
                if (allPages.length === 1) position = 'single';
                if (page === '...') position = 'middle';

                return (
                  <PaginationNumber
                    key={index}
                    // href={createPageURL(page)}
                    page={page}
                    position={position}
                    isActive={currentPage === page}
                  />
                );
              })}
            </div>

            <PaginationArrow
              direction="right"
              // href={createPageURL(currentPage + 1)}
              isDisabled={currentPage >= totalPages}
            />
          </div>
        </div>
      </div>
    </div>
  );

  function PaginationNumber({
    page,
    isActive,
    position,
  }: {
    page: number | string;
    position?: 'first' | 'last' | 'middle' | 'single';
    isActive: boolean;
  }) {
    const className = clsx(
      'flex h-10 w-10 items-center justify-center text-sm border',
      {
        'rounded-l-md': position === 'first' || position === 'single',
        'rounded-r-md': position === 'last' || position === 'single',
        'z-10 bg-blue-600 border-blue-600 text-white': isActive,
        'hover:bg-gray-100': !isActive && position !== 'middle',
        'text-gray-300': position === 'middle',
      },
    );

    return isActive || position === 'middle' ? (
      <div className={className}>{page}</div>
    ) : (
      <div
        onClick={() => {
          setPage(Number(page));
        }}
        className={className}
      >
        {page}
      </div>
    );
  }

  function PaginationArrow({
    direction,
    isDisabled,
  }: {
    direction: 'left' | 'right';
    isDisabled?: boolean;
  }) {
    const className = clsx(
      'flex h-10 w-10 items-center justify-center rounded-md border',
      {
        'pointer-events-none text-gray-300': isDisabled,
        'hover:bg-gray-100': !isDisabled,
        'mr-2 md:mr-4': direction === 'left',
        'ml-2 md:ml-4': direction === 'right',
      },
    );

    const icon =
      direction === 'left' ? (
        <ArrowLeftIcon className="w-4" />
      ) : (
        <ArrowRightIcon className="w-4" />
      );

    return isDisabled ? (
      <div className={className}>{icon}</div>
    ) : (
      <div
        onClick={() => {
          direction === 'left'
            ? setPage(currentPage - 1)
            : setPage(currentPage + 1);
        }}
        className={className}
      >
        {icon}
      </div>
    );
  }
}

export default DirectorView;
