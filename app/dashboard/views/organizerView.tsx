import React from 'react'
import Image from 'next/image';
import Pagination from '@/app/dashboard/components/pagination';
import Search from '@/app/dashboard/components/search';
import Table from '@/app/dashboard/components/table';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

import { Suspense } from 'react';

import { getSelf, getUsers } from '@/app/lib/data';
import { useState, useEffect } from 'react';

function OrganizerView(userData : any) {

    const [users, setUsers] = useState<any>(null);
    const [query, setQuery] = useState<String>("");
    const [currentPage, setPage] = useState<number>(1);
    const [totalPages, setTotal] = useState<number>(1);

    useEffect(() => {
        async function fetchUsers() {
            try {
              const data = await getUsers()
              console.log(data)

              setUsers(data);
            //   setLoading(false);
            } catch (error) {
              console.log(error);
            //   setLoading(false);
            }
          }
      
        fetchUsers();
    }, []);

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
                {users && Object.keys(users).map((email : any) => (
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
                        <p>{users[email].first_name} {users[email].last_name}</p>
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

                        <form action={undefined}>
                            <button className="rounded-md border p-2 hover:bg-gray-100">
                                <span className="sr-only">Delete</span>
                                <TrashIcon className="w-5" />
                            </button>
                        </form>

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
                {users && Object.keys(users).map((email : any) => (
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
                        <p>{users[email].first_name} {users[email].last_name}</p>
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

                            <form action={undefined}>
                                <button className="rounded-md border p-2 hover:bg-gray-100">
                                    <span className="sr-only">Delete</span>
                                    <TrashIcon className="w-5" />
                                </button>
                            </form>
                        </div>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
        </div>


      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
    </div>
  )
}

export default OrganizerView