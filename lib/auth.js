const { authOptions } = require("@/app/api/auth/[...nextauth]/route");
const { getServerSession } = require("next-auth");

export async function getSession() {
  return await getServerSession(authOptions);
}