import z from 'zod'

const envSchema = z
  .object({
    /**
     * database connection string
     */
    MONGO_URI: z.string().url(),
    /**
     * database password
     */
    MONGO_PASSWORD: z.string().optional(),

    /** 
     * NODE env variable
     */
    NODE_ENV: z.string().optional(),

    /** 
     * NODE env variable
     */
    PORT: z.coerce.number(),

  })
  .readonly()

const parsedEnv = envSchema.safeParse(process.env)

// stop server startup if ENV is misconfigured
if (parsedEnv.success == false) {
  console.error(parsedEnv.error.issues)
  throw new Error('Error loading server environment variables.')
}

export const config = parsedEnv.data
