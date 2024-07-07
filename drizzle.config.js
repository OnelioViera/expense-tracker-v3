/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.jsx",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:myb4eMXwhc8S@ep-rough-sea-a52zxe7x.us-east-2.aws.neon.tech/Expense-Tracker-v3?sslmode=require',
  }
};


