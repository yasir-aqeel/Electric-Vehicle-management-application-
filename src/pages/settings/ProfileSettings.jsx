import { useSelector } from "react-redux";
import "./ProfileSettings.scss";

const ProfileSettings = () => {
  const { user } = useSelector((state) => state.AuthenticationSlice);
  const firstName = user?.first_name || "VoltGrid";
  const lastName = user?.last_name || "User";
  const email = user?.email || "demo@voltgrid.local";
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  return (
    <main className="profile-settings">
      <header className="profile-settings__header">
        <div>
          <p className="profile-settings__eyebrow">Account settings</p>
          <h1>Profile</h1>
          <p className="profile-settings__subtitle">
            Manage your basic VoltGrid account details.
          </p>
        </div>
        <button className="profile-settings__button" type="button">
          Save changes
        </button>
      </header>

      <section className="profile-settings__grid">
        <aside className="settings-card profile-card">
          <div className="profile-card__avatar">{initials}</div>
          <h2>{firstName} {lastName}</h2>
          <p>{email}</p>
          <div className="profile-meta">
            <span>Role</span>
            <strong>{user?.role || "operator"}</strong>
          </div>
          <div className="profile-meta">
            <span>Workspace</span>
            <strong>VoltGrid Operations</strong>
          </div>
          <div className="profile-meta">
            <span>Status</span>
            <strong>Active</strong>
          </div>
        </aside>

        <section className="settings-card settings-card--wide">
          <h2>Personal information</h2>
          <p className="profile-settings__subtitle">
            These fields are demo-only and keep users away from a 404 page.
          </p>

          <div className="settings-form">
            <label>
              First name
              <input defaultValue={firstName} />
            </label>
            <label>
              Last name
              <input defaultValue={lastName} />
            </label>
            <label>
              Email
              <input defaultValue={email} />
            </label>
            <label>
              Phone
              <input defaultValue="+49 555 0182" />
            </label>
          </div>

          <div className="settings-panels">
            <div className="settings-panel">
              <h3>Notifications</h3>
              <label className="settings-check">
                <input type="checkbox" defaultChecked />
                Station alerts
              </label>
              <label className="settings-check">
                <input type="checkbox" defaultChecked />
                Weekly reports
              </label>
            </div>
            <div className="settings-panel">
              <h3>Security</h3>
              <label>
                Current password
                <input type="password" placeholder="Password" />
              </label>
              <label>
                New password
                <input type="password" placeholder="New password" />
              </label>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

export default ProfileSettings;
