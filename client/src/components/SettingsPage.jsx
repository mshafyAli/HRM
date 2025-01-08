// src/pages/SettingsPage.jsx


const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <header className="bg-primary p-4">
          <h1 className="text-white text-2xl font-semibold">Settings</h1>
        </header>
        <div className="p-6">
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <form className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-gray-700">First Name</label>
                <input
                  type="text"
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-gray-700">Last Name</label>
                <input
                  type="text"
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Doe"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="john.doe@example.com"
                />
              </div>
            </form>
          </section>
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            <form className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-gray-700">Username</label>
                <input
                  type="text"
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="john_doe"
                />
              </div>
              <div>
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="********"
                />
              </div>
            </form>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-blue-600" />
                <label className="ml-2 block text-gray-700">
                  Email Notifications
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-blue-600" />
                <label className="ml-2 block text-gray-700">
                  SMS Notifications
                </label>
              </div>
            </div>
          </section>
        </div>
        <footer className="bg-gray-50 p-4 text-right">
          <button className="bg-primary text-white px-4 py-2 rounded-md">
            Save Changes
          </button>
        </footer>
      </div>
    </div>
  );
};

export default SettingsPage;
