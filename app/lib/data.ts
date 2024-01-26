import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';

export async function getSchedule() {
  //a fake delay to simulate a real api call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const schedule: Schedule = {
    "Saturday": {
      "day": "Saturday",
      "times": [
        { "time": "10:00 AM", "event": "Check-in starts" },
        { "time": "11:00 AM", "event": "Opening Ceremony", },
        { "time": "12:00 PM", "event": "Team Building Event" },
        { "time": "12:00 PM", "event": "Hacking Starts" },
        { "time": "12:30 PM", "event": "Lunch" },
        { "time": "1:30 PM", "event": "NJ TRANSIT API Demo" },
        { "time": "2:00 PM", "event": "Algorithms in Society Workshop by Ethitech" },
        { "time": "2:30 PM", "event": "MLH Mini Event" },
        { "time": "5:30 PM", "event": "Tech Talk by NJ TRANSIT" },
        { "time": "8:00 PM", "event": "Dinner" },

      ],
    },

    "Sunday": {
      "day": "Sunday",
      "times": [
        { "time": "12:00 AM", "event": "Midnight Surprise" },
        { "time": "8:00 AM", "event": "Breakfast", },
        // { "time": "11:00 AM", "event": "Event" },
        { "time": "12:00 PM", "event": "Submissions Due" },
        { "time": "12:30 PM", "event": "Lunch", },
        { "time": "1:00 PM", "event": "Judging Begins" },
        { "time": "3:00 PM", "event": "Judging Ends" },
        { "time": "3:30 PM", "event": "Closing Ceremony", },
        // { "time": "7:00 PM", "event": "Dinner", "reactIcon": <FaUtensils /> },
        // { "time": "9:00 PM", "event": "Venue closes" },
      ],
    }
  };

  return schedule;
}

export async function fetchRevenue() {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    // console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  noStore();
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  noStore();
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  noStore();
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  noStore();
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}


export async function getSelf() {
  return  {
    "email": "testemail@gmail.com",
    "role": {
      "hacker": false,
      "volunteer": false,
      "judge": false,
      "sponsor": false,
      "mentor": false,
      "organizer": true,
      "director": false
    },
    "votes": 0,
    "github": "testgithub",
    "major": "Computer Science",
    "short_answer": "Things",
    "shirt_size": "Unisex M",
    "first_name": "Test",
    "last_name": "User",
    "dietary_restrictions": "",
    "special_needs": "No",
    "date_of_birth": "2000-01-01",
    "school": "Rutgers, The State University of New Jersey",
    "grad_year": "2026",
    "gender": "Prefer not to say",
    "registration_status": "unregistered",
    "level_of_study": "University (Undergraduate)",
    "day_of": {
      "checkIn": false
    },
    "token": [
      "faketoken"
    ],
    "country_of_residence": "US",
    "ethnicity": "Prefer not to say",
    "hackathon_count": "1",
    "phone_number": "1234567890",
    "how_you_heard_about_hackru": "Mailing List",
    "reasons": "Learn new skills"
  };



}


export async function getUsers(){
  const Users: Record<string, object> = {"testemail@gmail.com":{"role": {
    "hacker": true,
    "volunteer": false,
    "judge": false,
    "sponsor": false,
    "mentor": false,
    "organizer": false,
    "director": false
  },
  "votes": 0,
  "github": "testgithub",
  "major": "Computer Science",
  "short_answer": "Things",
  "shirt_size": "Unisex M",
  "first_name": "Test",
  "last_name": "User",
  "dietary_restrictions": "",
  "special_needs": "No",
  "date_of_birth": "2000-01-01",
  "school": "Rutgers, The State University of New Jersey",
  "grad_year": "2026",
  "gender": "Prefer not to say",
  "registration_status": "unregistered",
  "level_of_study": "University (Undergraduate)",
  "day_of": {
    "checkIn": false
  },
  "token": [
    "faketoken"
  ],
  "country_of_residence": "US",
  "ethnicity": "Prefer not to say",
  "hackathon_count": "1",
  "phone_number": "1234567890",
  "how_you_heard_about_hackru": "Mailing List",
  "reasons": "Learn new skills"
  }};

  const Names = ["Lauryn", "Underwood",
  "Darius", "Peters",
  "Eduardo", "Eaton",
  "Jeremy", "Pitts",
  "Trevor", "Valenzuela",
  "Erica", "Mathews",
  "Valentino", "Bowman",
  "Hillary", "Hanson",
  "Kody", "Shelton",
  "Ariana", "Collins",
  "Lina", "Fitzpatrick",
  "Eve", "Flores"];

  const registration_states = ["unregistered", "registered", "confirmation", "coming", "not_coming","waitlist", "confirmed", "rejected", "checked_in", "registered"]


  for (let i = 0; i < 10; i++) {
    const Random = Math.floor(Math.random() * 23);
    const email = i.toString() + "@gmail.com";
    Users[email] = {"role": {
      "hacker": true,
      "volunteer": false,
      "judge": false,
      "sponsor": false,
      "mentor": false,
      "organizer": false,
      "director": false
    },
    "votes": 0,
    "github": Names[Random] + "_Github",
    "major": "Computer Science",
    "short_answer": "Things",
    "shirt_size": "Unisex M",
    "first_name": Names[Random],
    "last_name": Names[Random+1],
    "dietary_restrictions": "",
    "special_needs": "No",
    "date_of_birth": "20"+ Random.toString() +"-01-" + Random.toString(),
    "school": "Rutgers, The State University of New Jersey",
    "grad_year": "20" + (Random + 20).toString() ,
    "gender": "Prefer not to say",
    "registration_status": registration_states[i%10],
    "level_of_study": "University (Undergraduate)",
    "day_of": {
      "checkIn": false
    },
    "token": [
      "faketoken"
    ],
    "country_of_residence": "US",
    "ethnicity": "Prefer not to say",
    "hackathon_count": "1",
    "phone_number": "1234567890",
    "how_you_heard_about_hackru": "Mailing List",
    "reasons": "Learn new skills"
    };
  }

  return Users;
 

}
