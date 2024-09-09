import { getUser } from './api';

export const checkIfLoggedIn = async () => {
  const userId = localStorage.getItem('userId');
  if (!userId) return { status: false };
  // Fetch user data
  try {
    const { user } = await getUser(userId);
    return { status: true, user };
  } catch (error) {
    return { status: false, error };
  }
};
