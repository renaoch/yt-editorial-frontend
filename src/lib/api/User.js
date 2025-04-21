export const checkUser = async () => {
  try {
    const response = await fetch("https://yt-editorial-backend.onrender.com/api/checkUser", {
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to fetch user data");
    const userData = await response.json(); // { username, email, role, avatar }

    // Check if the user has a role

    return userData;
  } catch (error) {
    console.error("[checkUser error]", error);
    return null;
  }
};

// Log the user in via Google OAuth
export const loginWithGoogle = (role) => {
  const redirectURL = `https://yt-editorial-backend.onrender.com/auth/google/${role}`;
  console.log("role: ", role);
  window.location.href = redirectURL;
};

// Log the user out
export const logoutUser = async () => {
  try {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (!confirmed) return;
    window.location.href = "/"; 
    // Sending a GET request to logout (or POST, depending on your backend logic)
    const response = await fetch("https://yt-editorial-backend.onrender.com/logout", {
      method: "POST", // You can change to GET if it's more appropriate in your backend
      credentials: "include", // ensures cookies/session are sent
    });

    if (!response.ok) throw new Error("Logout failed");

    // Optionally, you can perform a redirect after logout (for example, to the login page)
    window.location.href = "/"; // Adjust the redirect URL as needed

    return await response.json(); // Server may return a message like { success: true }
  } catch (error) {
    console.error("[logoutUser error]", error);
    return null;
  }
};
// Fetch all editors
export const getAllEditors = async () => {
  try {
    const response = await fetch("https://yt-editorial-backend.onrender.com/user/editors", {
      method: "GET",
      credentials: "include", // important for sessions
    });

    if (!response.ok) {
      throw new Error(`Cannot fetch editors: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("[getAllEditors error]", error);
    return null;
  }
};


// send a req an editor to the creator
export const assignEditor = async (editor_id) => {
  try {
    const response = await fetch(
      "https://yt-editorial-backend.onrender.com/user/assign-editor-req",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // important for sessions
        body: JSON.stringify({ editor_id }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to assign editor");
    }

    return await response.json(); // { success, message, relation }
  } catch (error) {
    console.error("[assignEditor error]", error);
    return null;
  }
};

// get assignment requests sent to the current user (editor)
export const getIncomingRequests = async () => {
  try {
    const response = await fetch(
      "https://yt-editorial-backend.onrender.com/user/assign-editor-req",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ensures cookies/session are sent
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch assignment requests");
    }

    return await response.json(); // { success, requests: [...] }
  } catch (error) {
    console.error("[getIncomingRequests error]", error);
    return null;
  }
};

// Accept an assignment request
export const acceptAssignmentRequest = async (request_id) => {
  try {
    const response = await fetch(
      `https://yt-editorial-backend.onrender.com/user/accept-req/${request_id}/accept`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) throw new Error("Failed to accept request");

    return await response.json(); // { success, message }
  } catch (error) {
    console.error("[acceptAssignmentRequest error]", error);
    return null;
  }
};

// Get editors assigned to the logged-in creator
export const getAssignedEditors = async () => {
  try {
    const response = await fetch(
      "https://yt-editorial-backend.onrender.com/user/assigned-editors",
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch assigned editors");
    }

    return await response.json(); // { success: true, editors: [...] }
  } catch (error) {
    console.error("[getAssignedEditors error]", error);
    return null;
  }
};
