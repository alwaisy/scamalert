import type { Models } from "node-appwrite";
import type { LocalUser } from "./server/lib/user-sync";

declare module "h3" {
  interface H3EventContext {
    user?: Models.User<Models.Preferences>; // Appwrite user
    localUser?: LocalUser; // Local database user
  }
}
