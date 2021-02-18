import dotenv from 'dotenv';
dotenv.config();

export const JWT_SIGNING_SECRET = process.env.JWT_SIGNING_SECRET || 'this_secret_should_come_from_hidden_env_files_and_never_committed_to_repo';
