import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function UserInfoCard({ user, profile }: { user: any, profile: any }) {
  return (
    <div className="user-info">
      <div className="user-header">
        <FontAwesomeIcon icon={faUser} className="user-icon" />
        <h1>{user?.name}</h1>
      </div>
      <div className="user-info-text">
        <p>Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
        {profile && (
          <>
            <p>Business Name: {profile.name}</p>
            <p>Business Email: {profile.email}</p>
            <p>About: {profile.about}</p>
          </>
        )}
      </div>
    </div>
  );
}
