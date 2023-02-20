import { BaseDB } from "./data/BaseDB"

export class Migrations extends BaseDB {
   public static async createTables(): Promise<void> {
      Migrations.connection.raw(`
         CREATE TABLE IF NOT EXISTS cookenu_users(
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            role VARCHAR(255) NOT NULL DEFAULT 'normal',
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
         );
         
         CREATE TABLE IF NOT EXISTS cookenu_recipes(
            id VARCHAR(255) PRIMARY KEY,
            author_id VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
         );

         CREATE TABLE IF NOT EXISTS cookenu_following(
            id VARCHAR(255) PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            user_to_follow_id VARCHAR(255) NOT NULL,
            following_since TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES cookenu_users(id),
            FOREIGN KEY (user_to_follow_id) REFERENCES cookenu_users(id)
         );
      `)
      .then(() => {
         console.log(`Tables created successfully!`)
      })
      .catch((error: any) => console.log(error.sqlMessage || error.message))
   }
}

Migrations.createTables()