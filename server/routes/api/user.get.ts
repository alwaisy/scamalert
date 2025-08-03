// server/routes/api/user.get.ts
export default defineEventHandler(async (event) => {
  const user = event.context.user; // Appwrite user
  const localUser = event.context.localUser; // Local DB user

  if (!user) {
    return false;
  }

  // Return combined user data
  return {
    // Appwrite data
    $id: user.$id,
    email: user.email,
    name: user.name,
    emailVerification: user.emailVerification,

    // Local database data (from your existing schema)
    localId: localUser?.id,
    username: localUser?.username,
    status: localUser?.status,
    createdAt: localUser?.createdAt,
  };
});
