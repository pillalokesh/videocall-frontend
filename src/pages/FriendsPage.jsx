import { useEffect, useState } from "react";
import { getUserFriends } from "../lib/api"; // make sure the path is correct
import { MapPinIcon } from "lucide-react";

const FriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const data = await getUserFriends();
        setFriends(data);
      } catch (error) {
        console.error("Failed to fetch friends:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Your Friends</h2>

      {loading ? (
        <p>Loading friends...</p>
      ) : friends.length === 0 ? (
        <p>No friends yet!</p>
      ) : (
        friends.map((user) => (
          <div key={user._id} className="bg-base-200 p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className="avatar size-16 rounded-full overflow-hidden">
                <img src={user.profilePic} alt={user.fullName} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{user.fullName}</h3>
                {user.location && (
                  <div className="flex items-center text-xs opacity-70 mt-1">
                    <MapPinIcon className="size-3 mr-1" />
                    {user.location}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FriendsPage;
